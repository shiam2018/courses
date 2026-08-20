import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import { slides, ASSETS, OUT_DIR } from './build.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GEN_IMAGE = path.resolve(__dirname, '..', '..', 'gen_image.mjs');

// 1. Generate any missing photos.
for (const s of slides) {
  if (!s.photo) continue;
  const outPath = path.join(ASSETS, s.photo.file);
  if (fs.existsSync(outPath)) {
    console.log('skip (exists)', s.photo.file);
    continue;
  }
  console.log('generating', s.photo.file);
  execSync(`node ${GEN_IMAGE} ${JSON.stringify(s.photo.prompt)} ${JSON.stringify(outPath)}`, { stdio: 'inherit' });
}

// 2. Build each slide's HTML.
for (const s of slides) {
  const photoFile = s.photo ? s.photo.file : null;
  const html = s.build(photoFile);
  fs.writeFileSync(path.join(OUT_DIR, `${s.out}.html`), html);
}
console.log('wrote', slides.length, 'html files to', OUT_DIR);
