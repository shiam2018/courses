#!/usr/bin/env python3
"""Bundle the rendered slides into one PDF, ready to open full-screen while
recording the Loom intro video. Run after build.mjs + render_batch.mjs."""
import os
from PIL import Image

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(SCRIPT_DIR, 'out')
ORDER = ['l01-title', 'l02-kto-avtor', 'l03-obeshanie-kursa', 'l04-kariera', 'l05-portret-i-najm',
         'l06-programma', 'l07-kak-ustroen-urok', 'l08-praktika', 'l09-itogi-i-proverka',
         'l10-podderzhka', 'l11-final']
images = [Image.open(f'{OUT}/{name}.png').convert('RGB') for name in ORDER]
out_path = os.path.join(SCRIPT_DIR, 'Vvedenie-Loom-prezentaciya.pdf')
images[0].save(out_path, save_all=True, append_images=images[1:])
print(len(images), '->', out_path)
