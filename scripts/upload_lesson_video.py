#!/usr/bin/env python3
"""Upload a video file to a Stepik lesson via POST /api/videos.

The endpoint takes a multipart body with `source` (the file) and `lesson`
(the lesson id the video belongs to). Stepik then transcodes it, so the
video is not playable the instant this returns; the script polls until the
video reports a duration or the timeout runs out.

Usage:
    python3 scripts/upload_lesson_video.py <lesson_id> <video_file> [--dry-run]

Existing module-video lessons in course 94834 (2026-08-26):
    Старт             2541494   (empty)
    База              1713094   (empty)
    Инструменты       1711843   (58s placeholder)
    Источники трафика 1754511   (65s placeholder)
    Работа            1754512   (47s placeholder)
    Финиш             1754514   (35s placeholder)

Uploading to a lesson that already has a video adds a new one rather than
replacing the old, so check the lesson afterwards and remove the stale
placeholder by hand if that is what you want.
"""
import json
import mimetypes
import os
import sys
import time
import urllib.error
import urllib.request
import uuid

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from stepik_push import API, load_env, get_token, api_get  # noqa: E402

POLL_TIMEOUT = 900
POLL_EVERY = 15


def upload(lesson_id, path, token):
    with open(path, "rb") as f:
        data = f.read()
    filename = os.path.basename(path)
    ctype = mimetypes.guess_type(filename)[0] or "video/mp4"
    boundary = f"----stepikvideo{uuid.uuid4().hex}"

    parts = [
        f"--{boundary}\r\nContent-Disposition: form-data; name=\"lesson\"\r\n\r\n{lesson_id}\r\n".encode(),
        (
            f"--{boundary}\r\nContent-Disposition: form-data; name=\"source\"; "
            f"filename=\"{filename}\"\r\nContent-Type: {ctype}\r\n\r\n"
        ).encode(),
        data,
        b"\r\n",
        f"--{boundary}--\r\n".encode(),
    ]
    body = b"".join(parts)

    req = urllib.request.Request(f"{API}/videos", data=body, method="POST")
    req.add_header("Authorization", f"Bearer {token}")
    req.add_header("Content-Type", f"multipart/form-data; boundary={boundary}")
    try:
        with urllib.request.urlopen(req, timeout=1800) as resp:
            return json.load(resp)
    except urllib.error.HTTPError as e:
        print("FAIL", e.code, e.read().decode()[:800])
        raise


def wait_ready(video_id, token):
    started = time.time()
    while time.time() - started < POLL_TIMEOUT:
        v = api_get(f"videos/{video_id}", token)["videos"][0]
        if v.get("duration"):
            return v
        print(f"  transcoding... ({int(time.time() - started)}s)")
        time.sleep(POLL_EVERY)
    return None


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    dry = "--dry-run" in sys.argv
    if len(args) < 2:
        print(__doc__)
        sys.exit(1)
    lesson_id, path = int(args[0]), args[1]

    if not os.path.exists(path):
        print(f"No such file: {path}")
        sys.exit(1)
    size_mb = os.path.getsize(path) / 1024 / 1024
    print(f"lesson {lesson_id} <- {path} ({size_mb:.1f} MB)")

    load_env()
    token = get_token()

    lesson = api_get(f"lessons/{lesson_id}", token)["lessons"][0]
    print(f"target lesson: {lesson['title']!r}")

    if dry:
        print("dry run, nothing uploaded")
        return

    resp = upload(lesson_id, path, token)
    video = resp["videos"][0]
    print(f"uploaded, video id {video['id']}, status {video.get('status')}")

    ready = wait_ready(video["id"], token)
    if ready:
        print(f"ready: duration {ready['duration']}s, urls {len(ready.get('urls') or [])}")
    else:
        print("still transcoding after the timeout; check the lesson in a few minutes")


if __name__ == "__main__":
    main()
