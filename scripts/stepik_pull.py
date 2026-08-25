#!/usr/bin/env python3
"""Pull the full structure + content of a Stepik course via the REST API.

Read-only: never writes anything back to Stepik. Dumps sections/lessons/steps
into stepik-sync/ next to a manifest for later comparison against the local
course files.

Usage:
    source .env && python3 scripts/stepik_pull.py 183104
"""
import json
import os
import re
import sys
import urllib.parse
import urllib.request

API = "https://stepik.org/api"
TOKEN_URL = "https://stepik.org/oauth2/token/"
CHUNK = 20


def load_env():
    env_path = os.path.join(os.path.dirname(__file__), "..", ".env")
    if os.path.exists(env_path):
        with open(env_path) as f:
            for line in f:
                line = line.strip()
                if not line or line.startswith("#") or "=" not in line:
                    continue
                k, v = line.split("=", 1)
                os.environ.setdefault(k, v)


def get_token():
    client_id = os.environ["STEPIK_CLIENT_ID"]
    client_secret = os.environ["STEPIK_CLIENT_SECRET"]
    data = urllib.parse.urlencode({"grant_type": "client_credentials"}).encode()
    req = urllib.request.Request(TOKEN_URL, data=data, method="POST")
    creds = f"{client_id}:{client_secret}"
    import base64
    req.add_header("Authorization", "Basic " + base64.b64encode(creds.encode()).decode())
    with urllib.request.urlopen(req) as resp:
        return json.load(resp)["access_token"]


def api_get(path, token, params=None):
    url = f"{API}/{path}"
    if params:
        url += "?" + params
    req = urllib.request.Request(url)
    req.add_header("Authorization", f"Bearer {token}")
    with urllib.request.urlopen(req) as resp:
        return json.load(resp)


def batch_get(resource, ids, token, key=None):
    key = key or resource
    out = []
    ids = list(ids)
    for i in range(0, len(ids), CHUNK):
        chunk = ids[i : i + CHUNK]
        params = "&".join(f"ids[]={x}" for x in chunk)
        data = api_get(resource, token, params)
        out.extend(data.get(key, []))
    return out


def slugify(text, maxlen=60):
    text = re.sub(r"[^\w\- ]+", "", text, flags=re.UNICODE).strip()
    text = re.sub(r"\s+", "_", text)
    return text[:maxlen] or "untitled"


def main():
    if len(sys.argv) < 2:
        print("usage: stepik_pull.py <course_id>")
        sys.exit(1)
    course_id = sys.argv[1]

    load_env()
    token = get_token()

    courses = batch_get("courses", [course_id], token, key="courses")
    if not courses:
        print(f"course {course_id} not found / not accessible")
        sys.exit(1)
    course = courses[0]
    print(f"course {course_id}: {course['title']}")

    section_ids = course.get("sections", [])
    sections = batch_get("sections", section_ids, token, key="sections")
    sections.sort(key=lambda s: s.get("position", 0))

    out_root = os.path.join(os.path.dirname(__file__), "..", "stepik-sync", str(course_id))
    raw_root = os.path.join(out_root, "raw")
    os.makedirs(raw_root, exist_ok=True)

    with open(os.path.join(out_root, "course.json"), "w") as f:
        json.dump(course, f, ensure_ascii=False, indent=2)

    manifest = {
        "course_id": course_id,
        "course_title": course["title"],
        "course_cover": course.get("cover"),
        "sections": [],
    }

    for section in sections:
        sec_dir_name = f"{section.get('position', 0):02d}_{slugify(section['title'])}"
        sec_dir = os.path.join(raw_root, sec_dir_name)
        os.makedirs(sec_dir, exist_ok=True)
        print(f"  section {section['id']} pos={section.get('position')}: {section['title']}")

        unit_ids = section.get("units", [])
        units = batch_get("units", unit_ids, token, key="units")
        units.sort(key=lambda u: u.get("position", 0))

        lesson_ids = [u["lesson"] for u in units]
        lessons_by_id = {
            l["id"]: l for l in batch_get("lessons", lesson_ids, token, key="lessons")
        }

        sec_manifest = {
            "id": section["id"],
            "title": section["title"],
            "position": section.get("position"),
            "lessons": [],
        }

        for unit in units:
            lesson = lessons_by_id.get(unit["lesson"])
            if not lesson:
                continue
            lesson_dir_name = f"{unit.get('position', 0):02d}_{slugify(lesson['title'])}"
            lesson_dir = os.path.join(sec_dir, lesson_dir_name)
            os.makedirs(lesson_dir, exist_ok=True)

            step_ids = lesson.get("steps", [])
            step_sources = batch_get(
                "step-sources", step_ids, token, key="step-sources"
            )
            step_sources.sort(key=lambda s: s.get("position", 0))

            lesson_manifest = {
                "id": lesson["id"],
                "title": lesson["title"],
                "unit_id": unit["id"],
                "position": unit.get("position"),
                "steps": [],
            }

            for step in step_sources:
                block = step.get("block", {})
                block_name = block.get("name", "unknown")
                fname_base = f"{step.get('position', 0):02d}_{block_name}"

                with open(
                    os.path.join(lesson_dir, fname_base + ".json"), "w"
                ) as f:
                    json.dump(step, f, ensure_ascii=False, indent=2)

                text = block.get("text")
                if text:
                    with open(
                        os.path.join(lesson_dir, fname_base + ".html"), "w"
                    ) as f:
                        f.write(text)

                lesson_manifest["steps"].append(
                    {
                        "id": step["id"],
                        "position": step.get("position"),
                        "block_name": block_name,
                        "path": os.path.relpath(
                            os.path.join(lesson_dir, fname_base), out_root
                        ),
                    }
                )

            sec_manifest["lessons"].append(lesson_manifest)

        manifest["sections"].append(sec_manifest)

    with open(os.path.join(out_root, "manifest.json"), "w") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=2)

    print(f"\nDone. Pulled into {out_root}/")


if __name__ == "__main__":
    main()
