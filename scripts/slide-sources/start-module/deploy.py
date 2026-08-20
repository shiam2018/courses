#!/usr/bin/env python3
"""Upload the 6 new no-logo slides (5 in module Старт + 1 Voronka fix)."""
import json
import os
import re
import subprocess
import sys
from collections import OrderedDict
from PIL import Image

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(SCRIPT_DIR, "..", "..", ".."))
OUT_DIR = os.path.join(SCRIPT_DIR, "out")
MANIFEST = os.path.join(OUT_DIR, "_manifest.json")
COURSE_ID = "94834"

with open(MANIFEST, encoding="utf-8") as f:
    slides = json.load(f)

touched_json_paths = OrderedDict()

for s in slides:
    webp_path = os.path.join(OUT_DIR, f"{s['out']}.webp")
    with Image.open(webp_path) as im:
        w, h = im.size
    upload_name = f"{s['out']}.webp"
    print(f"uploading {upload_name} ...", flush=True)
    result = subprocess.run(
        [sys.executable, os.path.join(ROOT, "scripts", "stepik_upload_attachment.py"), COURSE_ID, webp_path, upload_name],
        cwd=ROOT, capture_output=True, text=True,
    )
    if result.returncode != 0:
        print("UPLOAD FAILED", s['out'], result.stderr)
        sys.exit(1)
    url = result.stdout.strip().splitlines()[-1]
    print("  ->", url, f"{w}x{h}")

    old_name_escaped = re.escape(s["old"])
    pattern = re.compile(rf'<img[^>]*?name="{old_name_escaped}"[^>]*?>')
    new_tag = f'<img alt="{s["alt"]}" height="{h}" name="{upload_name}" src="{url}" width="{w}">'

    html_path = os.path.join(ROOT, s["target"])
    with open(html_path, encoding="utf-8") as f:
        html_text = f.read()
    new_html_text, n_html = pattern.subn(new_tag, html_text)
    if n_html != 1:
        print(f"WARNING: {n_html} matches (expected 1) for old='{s['old']}' in {html_path}")
        sys.exit(1)
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(new_html_text)

    json_path = html_path[:-5] + ".json"
    with open(json_path, encoding="utf-8") as f:
        step_data = json.load(f)
    text = step_data["block"]["text"]
    new_text, n_json = pattern.subn(new_tag, text)
    if n_json != 1:
        print(f"WARNING: {n_json} matches (expected 1) for old='{s['old']}' in {json_path}")
        sys.exit(1)
    step_data["block"]["text"] = new_text
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(step_data, f, ensure_ascii=False, indent=2)
        f.write("\n")

    touched_json_paths[json_path] = True

print(f"\nPatched {len(slides)} slides across {len(touched_json_paths)} step files.")
manifest_out = os.path.join(OUT_DIR, "_touched_json.txt")
with open(manifest_out, "w") as f:
    f.write("\n".join(touched_json_paths.keys()))
print("wrote", manifest_out)
