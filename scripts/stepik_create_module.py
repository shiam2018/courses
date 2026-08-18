import json, os, sys, urllib.request, urllib.parse, base64

API = "https://stepik.org/api"
TOKEN_URL = "https://stepik.org/oauth2/token/"
ENV_PATH = "/Users/igorshenshin/Developer/Web/Stepik/courses/.env"
COURSE_ID = 183080
OUT_DIR = os.path.join(os.path.dirname(__file__), "out")


def load_env():
    with open(ENV_PATH) as f:
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
    req.add_header("Authorization", "Basic " + base64.b64encode(creds.encode()).decode())
    with urllib.request.urlopen(req) as resp:
        return json.load(resp)["access_token"]


def api_post(path, token, wrapper_key, body):
    payload = json.dumps({wrapper_key: body}).encode("utf-8")
    req = urllib.request.Request(f"{API}/{path}", data=payload, method="POST")
    req.add_header("Authorization", f"Bearer {token}")
    req.add_header("Content-Type", "application/json")
    try:
        with urllib.request.urlopen(req) as resp:
            return json.load(resp)
    except urllib.error.HTTPError as e:
        print("FAIL POST", path, e.code, e.read().decode()[:800])
        raise


def main():
    load_env()
    token = get_token()

    folders = sorted(d for d in os.listdir(OUT_DIR) if os.path.isdir(os.path.join(OUT_DIR, d)))
    # position offset: module 1 already occupies position 1
    start_pos = 2

    results = []
    for i, folder in enumerate(folders):
        pos = start_pos + i
        section_title = open(os.path.join(OUT_DIR, folder, "_section_title.txt"), encoding="utf-8").read().strip()
        lesson_dir = os.path.join(OUT_DIR, folder, "01_Урок_0_Что_будет_в_модуле")
        html_text = open(os.path.join(lesson_dir, "01_text.html"), encoding="utf-8").read()

        print(f"--- {folder} (position {pos}) ---")

        # 1. create lesson
        lesson_resp = api_post("lessons", token, "lesson", {
            "title": "Урок 0. Что будет в модуле",
            "language": "ru",
        })
        lesson = lesson_resp["lessons"][0]
        lesson_id = lesson["id"]
        print("lesson created:", lesson_id)

        # 2. create step-source under the lesson
        step_resp = api_post("step-sources", token, "stepSource", {
            "lesson": lesson_id,
            "position": 1,
            "block": {"name": "text", "text": html_text},
        })
        step = step_resp["step-sources"][0]
        print("step-source created:", step["id"])

        # 3. create section
        section_resp = api_post("sections", token, "section", {
            "course": COURSE_ID,
            "title": section_title,
            "position": pos,
        })
        section = section_resp["sections"][0]
        section_id = section["id"]
        print("section created:", section_id)

        # 4. create unit (attach lesson to section)
        unit_resp = api_post("units", token, "unit", {
            "section": section_id,
            "lesson": lesson_id,
            "position": 1,
        })
        unit = unit_resp["units"][0]
        print("unit created:", unit["id"])

        results.append({
            "folder": folder,
            "section_id": section_id,
            "lesson_id": lesson_id,
            "step_source_id": step["id"],
            "unit_id": unit["id"],
        })

    json.dump(results, open(os.path.join(OUT_DIR, "_created.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    print("\nAll done:", json.dumps(results, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
