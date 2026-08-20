from PIL import Image

import os
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(SCRIPT_DIR, 'out')
ORDER = ['b01-title', 'b02-chto-uznaete', 'b03-chemu-nauchites', 'b04-struktura',
         'b05-praktika', 'b06-itogi-i-proverka', 'b07-final']
images = [Image.open(f'{OUT}/{name}.png').convert('RGB') for name in ORDER]
out_path = os.path.join(SCRIPT_DIR, 'Vvedenie-Modul-Baza-Loom-prezentaciya.pdf')
images[0].save(out_path, save_all=True, append_images=images[1:])
print(len(images), '->', out_path)
