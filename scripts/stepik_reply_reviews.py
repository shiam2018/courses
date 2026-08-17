#!/usr/bin/env python3
"""Publish replies to Stepik course-reviews.

Usage:
    source .env && python3 scripts/stepik_reply_reviews.py [--dry-run] <replies.json> [more.json ...]

Each replies.json is a list of {"id": <review_id>, "reply": "<text>"}.
"""
import json
import os
import sys
import urllib.parse
import urllib.request
import base64

TOKEN_URL = "https://stepik.org/oauth2/token/"
API = "https://stepik.org/api"


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
    req.add_header("Authorization", "Basic " + base64.b64encode(creds.encode()).decode())
    with urllib.request.urlopen(req) as resp:
        return json.load(resp)["access_token"]


def put_reply(review_id, text, token):
    body = json.dumps({"courseReview": {"reply_text": text}}).encode("utf-8")
    req = urllib.request.Request(f"{API}/course-reviews/{review_id}", data=body, method="PUT")
    req.add_header("Authorization", f"Bearer {token}")
    req.add_header("Content-Type", "application/json")
    try:
        with urllib.request.urlopen(req) as resp:
            return resp.status, None
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode("utf-8", errors="replace")


def main():
    args = sys.argv[1:]
    dry_run = False
    if args and args[0] == "--dry-run":
        dry_run = True
        args = args[1:]
    if not args:
        print("usage: stepik_reply_reviews.py [--dry-run] <replies.json> [more...]")
        sys.exit(1)

    load_env()
    token = get_token()

    total = 0
    ok = 0
    fail = 0
    for path in args:
        items = json.load(open(path, encoding="utf-8"))
        for item in items:
            total += 1
            rid = item["id"]
            text = item["reply"]
            if dry_run:
                print(f"WOULD REPLY {rid}: {text[:60]}")
                continue
            status, err = put_reply(rid, text, token)
            if status == 200:
                ok += 1
            else:
                fail += 1
                print(f"FAIL {rid} status={status} {err}")

    print(f"total={total} ok={ok} fail={fail}")


if __name__ == "__main__":
    main()
