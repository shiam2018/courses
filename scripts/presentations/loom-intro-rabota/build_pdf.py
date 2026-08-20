from PIL import Image

import os
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(SCRIPT_DIR, 'out')
ORDER = ['r01-title', 'r02-struktura', 'r03-podhod', 'r04-chemu-nauchites',
         'r05-realnost', 'r06-praktika', 'r07-resursy', 'r08-final']
images = [Image.open(f'{OUT}/{name}.png').convert('RGB') for name in ORDER]
out_path = os.path.join(SCRIPT_DIR, 'Vvedenie-Modul-Rabota-Loom-prezentaciya.pdf')
images[0].save(out_path, save_all=True, append_images=images[1:])
print(len(images), '->', out_path)
