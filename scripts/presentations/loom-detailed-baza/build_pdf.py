from PIL import Image
import json

OUT = 'out'
ORDER = json.load(open(f'{OUT}/_manifest.json'))
ORDER = [s['out'] for s in ORDER]
images = [Image.open(f'{OUT}/{name}.png').convert('RGB') for name in ORDER]
out_path = 'Modul-Baza-Podrobnyj-konspekt.pdf'
images[0].save(out_path, save_all=True, append_images=images[1:])
print(len(images), '->', out_path)
