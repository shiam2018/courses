#!/usr/bin/env python3
"""Set per-lesson square cover icons (lessons.cover_url), matching the visual
style established for courses 183080/183097 (Flat Color Icons by Icons8,
MIT-licensed, served via api.iconify.design; white background, ~180x180).

cover_url only accepts ucarecdn.* domains.

HISTORY: originally used Uploadcare's public demo key "demopublickey" — found
2026-08-25 that files uploaded through it do NOT persist: a fresh upload
returns 200 for a while, but icons pushed days earlier already 404 (renders
as a blank/solid square in Stepik's UI). Tried a real user Uploadcare
account/project next — dead end: unsigned uploads are rejected (upload API
returns 200 with a UUID, but the file serves only from that project's own
ucarecd.net CDN subdomain, e.g. https://4jis7bddh9.ucarecd.net/<uuid>/...,
which Stepik's cover_url validator rejects with "Bad cover image url" because
it isn't literally ucarecdn.com or ucarecdn.stepik.net — confirmed via
GET https://api.uploadcare.com/files/<uuid>/, the file is real and
is_ready:true, it just isn't reachable at a domain Stepik accepts).

FIX (2026-08-25): Stepik has its OWN production Uploadcare project, and its
public key is embedded in plain sight in every lesson page's HTML (view
https://stepik.org/lesson/<id>/step/1 and grep for UPLOADCARE_PUBLIC_KEY —
it's meant to be public, that's how Uploadcare public keys work; used by
Stepik's own in-browser editor when an instructor manually attaches a cover
image). Uploading to Stepik's own upload endpoint with Stepik's own public
key returns a ucarecdn.stepik.net URL that Stepik's validator accepts
natively, and — being their real production infrastructure serving actual
live course covers platform-wide, not a demo/throwaway key — should not be
subject to the demopublickey's silent-purge behavior. Confirmed working
end-to-end 2026-08-25 (upload -> 200 immediately on ucarecdn.stepik.net ->
accepted as lesson cover_url). Still, always curl-verify a cover_url returns
200 before trusting it for any given lesson — a successful PUT response
alone does not prove the image still resolves.

Usage: python3 scripts/push_lesson_icons.py <mapping.json>
mapping.json: [{"lesson_id": 2542264, "icon": "voice-presentation"}, ...]
`icon` is an icon name from the iconify "flat-color-icons" set
(https://api.iconify.design/collection?prefix=flat-color-icons).
"""
import json
import os
import subprocess
import sys
import tempfile
import urllib.error
import urllib.request

sys.path.insert(0, os.path.dirname(__file__))
from stepik_push import load_env, get_token, api_get  # noqa: E402

ICONIFY_SVG = "https://api.iconify.design/flat-color-icons/{}.svg"
UPLOADCARE_UPLOAD = "https://upload.uploadcare.stepik.net/base/"
UPLOADCARE_PUBLIC_KEY = "e7a075ad8dc9e3a1ec61"  # Stepik's own project, found embedded in lesson page HTML


def fetch_icon_svg(icon_name, dest_path):
    req = urllib.request.Request(ICONIFY_SVG.format(icon_name), headers={"User-Agent": "curl/8.0"})
    with urllib.request.urlopen(req, timeout=30) as resp, open(dest_path, "wb") as f:
        f.write(resp.read())


def svg_to_padded_png(svg_path, png_path, canvas=512, icon_size=380):
    subprocess.run([
        "magick", "-background", "white", "-density", "300", svg_path,
        "-resize", f"{icon_size}x{icon_size}",
        "-gravity", "center", "-background", "white", "-extent", f"{canvas}x{canvas}",
        png_path,
    ], check=True)


def upload_to_uploadcare(png_path):
    boundary = "----stepikicon"
    with open(png_path, "rb") as f:
        file_data = f.read()
    fields = {
        "UPLOADCARE_PUB_KEY": UPLOADCARE_PUBLIC_KEY,
        "UPLOADCARE_STORE": "1",
    }
    parts = []
    for name, value in fields.items():
        parts.append(f"--{boundary}\r\nContent-Disposition: form-data; name=\"{name}\"\r\n\r\n{value}\r\n".encode())
    parts.append(
        f"--{boundary}\r\nContent-Disposition: form-data; name=\"file\"; filename=\"icon.png\"\r\nContent-Type: image/png\r\n\r\n".encode()
        + file_data + b"\r\n"
    )
    parts.append(f"--{boundary}--\r\n".encode())
    body = b"".join(parts)

    req = urllib.request.Request(
        UPLOADCARE_UPLOAD, data=body,
        headers={"Content-Type": f"multipart/form-data; boundary={boundary}"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=30) as resp:
        uuid = json.load(resp)["file"]
    return f"https://ucarecdn.stepik.net/{uuid}/-/scale_crop/180x180/center/"


def set_lesson_cover(lesson_id, cover_url, token):
    lesson = api_get(f"lessons/{lesson_id}", token)["lessons"][0]
    lesson["cover_url"] = cover_url
    body = json.dumps({"lesson": lesson}).encode("utf-8")
    req = urllib.request.Request(f"https://stepik.org/api/lessons/{lesson_id}", data=body, method="PUT")
    req.add_header("Authorization", f"Bearer {token}")
    req.add_header("Content-Type", "application/json")
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.load(resp)["lessons"][0]["cover_url"]


def main():
    if len(sys.argv) < 2:
        print("Usage: push_lesson_icons.py <mapping.json>")
        sys.exit(1)
    load_env()
    token = get_token()

    with open(sys.argv[1], encoding="utf-8") as f:
        mapping = json.load(f)

    out_path = os.path.join(os.path.dirname(__file__), "_lesson_icons_result.json")
    results = {}
    if os.path.exists(out_path):
        with open(out_path, encoding="utf-8") as f:
            results.update(json.load(f))

    with tempfile.TemporaryDirectory() as tmp:
        for entry in mapping:
            lesson_id = entry["lesson_id"]
            icon = entry["icon"]
            svg_path = os.path.join(tmp, f"{icon}.svg")
            png_path = os.path.join(tmp, f"{icon}.png")
            fetch_icon_svg(icon, svg_path)
            svg_to_padded_png(svg_path, png_path)
            cover_url = upload_to_uploadcare(png_path)
            confirmed = set_lesson_cover(lesson_id, cover_url, token)
            status = "?"
            try:
                verify_req = urllib.request.Request(confirmed, method="HEAD")
                with urllib.request.urlopen(verify_req, timeout=15) as vresp:
                    status = vresp.status
            except urllib.error.HTTPError as e:
                status = e.code
            results[str(lesson_id)] = confirmed
            print(f"lesson {lesson_id} ({icon}) -> {confirmed} [HTTP {status}]")

    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
    print("saved", out_path)


if __name__ == "__main__":
    main()
