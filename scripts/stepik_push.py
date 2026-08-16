#!/usr/bin/env python3
"""Push local edits back to a live Stepik course via step-sources PUT.

Safety model: for each step-source id, GET the CURRENT live object first,
then only overwrite block.text (and block.source for quiz options) with
the local content, then PUT the full merged object back. This avoids
clobbering any live fields (video, feedback, options metadata, etc.) that
weren't touched locally.

Usage:
    source .env && python3 scripts/stepik_push.py <course_id> <path1> [path2 ...]

Each <path> is a local .json step-source file path (its "id" field is used).
Pass --dry-run before any real path to only show what would change.
"""
import json
import os
import sys
import urllib.parse
import urllib.request
import base64

API = "https://stepik.org/api"
TOKEN_URL = "https://stepik.org/oauth2/token/"


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


def api_get(path, token):
    req = urllib.request.Request(f"{API}/{path}")
    req.add_header("Authorization", f"Bearer {token}")
    with urllib.request.urlopen(req) as resp:
        return json.load(resp)


def api_put(path, token, body):
    data = json.dumps(body).encode("utf-8")
    req = urllib.request.Request(f"{API}/{path}", data=data, method="PUT")
    req.add_header("Authorization", f"Bearer {token}")
    req.add_header("Content-Type", "application/json")
    try:
        with urllib.request.urlopen(req) as resp:
            return resp.status, json.load(resp)
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode("utf-8", errors="replace")


def main():
    args = sys.argv[1:]
    dry_run = False
    if args and args[0] == "--dry-run":
        dry_run = True
        args = args[1:]
    if len(args) < 2:
        print("usage: stepik_push.py [--dry-run] <course_id> <local_json_path|--filelist path> [more...]")
        sys.exit(1)
    course_id = args[0]
    if args[1] == "--filelist":
        with open(args[2], encoding="utf-8") as f:
            json_paths = [line.strip() for line in f if line.strip()]
    else:
        json_paths = args[1:]

    load_env()
    token = get_token()

    for jp in json_paths:
        local = json.load(open(jp, encoding="utf-8"))
        step_id = local["id"]
        html_path = jp[:-5] + ".html"
        local_text = None
        if os.path.exists(html_path):
            local_text = open(html_path, encoding="utf-8").read()

        live = api_get(f"step-sources/{step_id}", token)
        step_sources = live.get("step-sources") or live.get("stepSources")
        if not step_sources:
            print(f"SKIP {jp}: could not fetch live step-source {step_id}")
            continue
        live_obj = step_sources[0]

        changed = False
        if local_text is not None and live_obj["block"].get("text") != local_text:
            live_obj["block"]["text"] = local_text
            changed = True

        local_source = local.get("block", {}).get("source")
        if local_source is not None and live_obj["block"].get("source") != local_source:
            live_obj["block"]["source"] = local_source
            changed = True

        if not changed:
            print(f"NOCHANGE {jp} (id={step_id}) — live already matches local")
            continue

        if dry_run:
            print(f"WOULD PUSH {jp} (id={step_id})")
            continue

        body = {"stepSource": live_obj}
        status, resp = api_put(f"step-sources/{step_id}", token, body)
        if status == 200:
            print(f"OK {jp} (id={step_id})")
        else:
            print(f"FAIL {jp} (id={step_id}) status={status}")
            print(resp if isinstance(resp, str) else json.dumps(resp)[:500])


if __name__ == "__main__":
    main()
