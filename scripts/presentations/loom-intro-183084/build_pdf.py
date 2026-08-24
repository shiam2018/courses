#!/usr/bin/env python3
"""Bundle the rendered slides into one PDF for course 183084's Loom intro video."""
import os
import json
from PIL import Image

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(SCRIPT_DIR, 'out')
ORDER = [s['out'] for s in json.load(open(f'{OUT}/_manifest.json'))]
images = [Image.open(f'{OUT}/{name}.png').convert('RGB') for name in ORDER]
out_path = os.path.join(SCRIPT_DIR, 'Email-Marketolog-Loom-prezentaciya.pdf')
images[0].save(out_path, save_all=True, append_images=images[1:])
print(len(images), '->', out_path)
