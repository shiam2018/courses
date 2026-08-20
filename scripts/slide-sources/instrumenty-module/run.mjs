import fs from 'node:fs';
import path from 'node:path';
import { slides, OUT_DIR } from './build.mjs';

for (const s of slides) {
  const photoFile = s.photo ? s.photo.file : null;
  const html = s.build(photoFile);
  fs.writeFileSync(path.join(OUT_DIR, `${s.out}.html`), html);
}
console.log('wrote', slides.length, 'html files to', OUT_DIR);
