#!/usr/bin/env python3
"""Set per-lesson square cover icons (lessons.cover_url), matching the visual
style established for courses 183080/183097 (Flat Color Icons by Icons8,
MIT-licensed, served via api.iconify.design; white background, ~180x180).

Earlier attempts assumed cover_url only accepts ucarecdn.stepik.net URLs
(true) and that uploading there required a Stepik-internal key (previously
unconfirmed). This script proves the workaround used for 183080/183097 also
works end-to-end: Uploadcare's PUBLIC unauthenticated upload endpoint
(https://upload.uploadcare.com/base/) accepts uploads under the demo public
key "demopublickey", returns a UUID, and the resulting ucarecdn.com/<uuid>/
URL (same Uploadcare infrastructure, different domain than ucarecdn.stepik.net)
IS accepted by Stepik's PUT /api/lessons cover_url field. Confirmed live on
course 183103, lesson 2542278, 2026-08-21.

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
import urllib.request

sys.path.insert(0, os.path.dirname(__file__))
from stepik_push import load_env, get_token, api_get  # noqa: E402

ICONIFY_SVG = "https://api.iconify.design/flat-color-icons/{}.svg"
UPLOADCARE_UPLOAD = "https://upload.uploadcare.com/base/"
UPLOADCARE_PUBLIC_KEY = "demopublickey"


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
    body = b"".join([
        f"--{boundary}\r\nContent-Disposition: form-data; name=\"UPLOADCARE_PUB_KEY\"\r\n\r\n{UPLOADCARE_PUBLIC_KEY}\r\n".encode(),
        f"--{boundary}\r\nContent-Disposition: form-data; name=\"UPLOADCARE_STORE\"\r\n\r\n1\r\n".encode(),
        f"--{boundary}\r\nContent-Disposition: form-data; name=\"file\"; filename=\"icon.png\"\r\nContent-Type: image/png\r\n\r\n".encode() + file_data + b"\r\n",
        f"--{boundary}--\r\n".encode(),
    ])
    req = urllib.request.Request(
        UPLOADCARE_UPLOAD, data=body,
        headers={"Content-Type": f"multipart/form-data; boundary={boundary}"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=30) as resp:
        uuid = json.load(resp)["file"]
    return f"https://ucarecdn.com/{uuid}/-/scale_crop/180x180/center/"


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
            results[str(lesson_id)] = confirmed
            print(f"lesson {lesson_id} ({icon}) -> {confirmed}")

    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
    print("saved", out_path)


if __name__ == "__main__":
    main()
