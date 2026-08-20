#!/usr/bin/env python3
"""Upload a local file as a Stepik course attachment, print the public URL.

Usage:
    python3 scripts/stepik_upload_attachment.py <course_id> <local_file_path> [upload_name]

Uses the same OAuth client-credentials flow as stepik_push.py (source .env first).
"""
import json
import os
import sys
import uuid
import urllib.request

sys.path.insert(0, os.path.dirname(__file__))
from stepik_push import load_env, get_token  # noqa: E402

API = "https://stepik.org/api"


def upload(course_id, file_path, upload_name=None):
    upload_name = upload_name or os.path.basename(file_path)
    content_type = {
        ".webp": "image/webp",
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".pdf": "application/pdf",
    }.get(os.path.splitext(upload_name)[1].lower(), "application/octet-stream")

    with open(file_path, "rb") as f:
        file_data = f.read()

    token = get_token()
    boundary = uuid.uuid4().hex
    body = b"".join([
        f"--{boundary}\r\nContent-Disposition: form-data; name=\"course\"\r\n\r\n{course_id}\r\n".encode(),
        f"--{boundary}\r\nContent-Disposition: form-data; name=\"file\"; filename=\"{upload_name}\"\r\nContent-Type: {content_type}\r\n\r\n".encode() + file_data + b"\r\n",
        f"--{boundary}--\r\n".encode(),
    ])
    req = urllib.request.Request(
        f"{API}/attachments",
        data=body,
        headers={"Authorization": f"Bearer {token}", "Content-Type": f"multipart/form-data; boundary={boundary}"},
        method="POST",
    )
    with urllib.request.urlopen(req) as resp:
        data = json.load(resp)
    att = data["attachments"][0]
    return "https://stepik.org" + att["file"], att["id"]


if __name__ == "__main__":
    load_env()
    if len(sys.argv) < 3:
        print("Usage: stepik_upload_attachment.py <course_id> <local_file_path> [upload_name]")
        sys.exit(1)
    course_id = sys.argv[1]
    file_path = sys.argv[2]
    upload_name = sys.argv[3] if len(sys.argv) > 3 else None
    url, att_id = upload(course_id, file_path, upload_name)
    print(url)
