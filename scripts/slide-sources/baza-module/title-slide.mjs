// The module-title slide ("Модуль База") — the very first slide rebuilt,
// in a session before this build pipeline existed, so its source was lost
// once (see memory: "template not persisted"). Recreated 2026-08-20 to
// match the live reference and committed here so it never has to be
// reverse-engineered from a screenshot again.
// Target: 02_Что_будет_в_модуле_База/01 (Modul-Baza-v2.webp).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  wrap, signatureHtml, eyebrowHtml, waveClipPath, CANVAS_W, CANVAS_H,
} from '../../slide_template.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASSETS = path.resolve(__dirname, '..', '..', '..', 'assets', 'generated', 'baza-module');
const OUT_DIR = path.resolve(__dirname, 'out');
fs.mkdirSync(OUT_DIR, { recursive: true });

function photoWave(photoFile, eyebrow, title, innerHtml, { photoFrac = 0.4, amplitude = 55, titleMaxWidth = null } = {}) {
  const clip = waveClipPath(photoFrac, amplitude);
  const leftPx = Math.round(CANVAS_W * photoFrac) + 56;
  const widthPx = CANVAS_W - leftPx - 40;
  const css = `
    .photo-panel { position: absolute; top: 0; left: 0; width: ${CANVAS_W}px; height: ${CANVAS_H}px; object-fit: cover; clip-path: path('${clip}'); }
    .content1 { position: absolute; top: 0; left: ${leftPx}px; width: ${widthPx}px; height: ${CANVAS_H}px; display: flex; flex-direction: column; justify-content: center; gap: 4px; }
  `;
  const html = `
    <img class="photo-panel" src="file://${ASSETS}/${photoFile}">
    ${signatureHtml(false)}
    <div class="content1">
      ${eyebrowHtml(eyebrow)}
      <h1 class="title"${titleMaxWidth ? ` style="max-width:${titleMaxWidth}px;"` : ''}>${title}</h1>
      ${innerHtml}
    </div>
  `;
  return wrap('', html, css);
}

const html = photoWave('modul-baza-title-v2.png', 'Модуль 02', 'База', `
  <p class="body-text" style="margin-top:14px;">Заложим фундамент знаний, который станет опорой для вашего профессионального роста в интернет-маркетинге.</p>
  <p class="body-text" style="margin-top:12px;">Всего за несколько интенсивных уроков вы пройдёте путь от понимания ключевых концепций до разработки собственного маркетингового брифа, документа, с которого начинается каждый успешный проект.</p>
`, { titleMaxWidth: 400 });

fs.writeFileSync(path.join(OUT_DIR, 'modul-baza-title.html'), html);
console.log('done');
