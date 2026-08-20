// Shared design-system base for the Gamma-slide rebuild (course 94834).
// Matches the approved reference slide "Modul-Baza-v2.webp" (lesson
// 02_База/02_Что_будет_в_модуле_База, step 1, live on Stepik): a thick
// rounded coral-gradient picture-frame border, a single S-curve wave
// splitting photo (left) from paper (right), a top-right two-line
// signature, and a coral eyebrow-line + label above a bold black title.
// Fonts self-hosted from assets/fonts/*.woff2 (Manrope, Latin + Cyrillic subsets —
// Stepik strips <style> tags on save, so slides are rendered to PNG/WebP, never
// pasted as live HTML; this file only feeds render_slide.mjs / render_batch.mjs).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FONTS_DIR = path.join(__dirname, '..', 'assets', 'fonts');

function b64(file) {
  return fs.readFileSync(path.join(FONTS_DIR, file)).toString('base64');
}

export const BRAND = {
  coral1: '#e2532f',
  coral2: '#f0764a',
  coral3: '#ffbf98',
  paper: '#fdfaf6',
  ink: '#1c1a18',
  bodyGray: '#57524b',
  muted: '#9b948c',
};

// 1200x700 frame, 2x-rendered by render_batch.mjs -> ~2400x1400 output (matches
// the original Gamma exports' ~2400x1406 aspect ratio closely enough).
export const FRAME_W = 1200;
export const FRAME_H = 700;
export const BORDER = 12;
export const OUTER_RADIUS = 28;
export const INNER_RADIUS = OUTER_RADIUS - BORDER;
export const CANVAS_W = FRAME_W - BORDER * 2;
export const CANVAS_H = FRAME_H - BORDER * 2;

export function fontFaceCss() {
  const latin = b64('manrope-latin.woff2');
  const cyrillic = b64('manrope-cyrillic.woff2');
  return `
    @font-face {
      font-family: 'Manrope';
      font-weight: 400 800;
      font-style: normal;
      src: url(data:font/woff2;base64,${latin}) format('woff2');
      unicode-range: U+0000-00FF, U+2000-206F, U+2122;
    }
    @font-face {
      font-family: 'Manrope';
      font-weight: 400 800;
      font-style: normal;
      src: url(data:font/woff2;base64,${cyrillic}) format('woff2');
      unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
    }
  `;
}

// No signature and no logo on any slide — user's explicit instruction
// (2026-08-20: removed the "Автор курса / Игорь Шеньшин" mark entirely,
// after an earlier instruction had it replace the removed Wise Bird logo).
// Kept as a no-op function so every call site across build scripts stays
// unchanged; never resurrect a signature or logo here without being asked.
export function signatureHtml() {
  return '';
}

// Coral accent line + uppercase label, used above every slide title.
export function eyebrowHtml(label) {
  return `
    <div class="eyebrow-row">
      <span class="eyebrow-line"></span>
      <span class="eyebrow-label">${label}</span>
    </div>`;
}

// Single S-curve dividing a left photo panel from the right paper panel.
// Returns an SVG path `d` string in canvas-local coordinates (0,0 top-left
// of the paper canvas, i.e. already inset by BORDER). `photoFrac` is the
// approximate width fraction of the photo panel at rest (~0.44 in the
// reference); `amplitude` controls how far the curve bulges off that line.
export function waveClipPath(photoFrac = 0.44, amplitude = 70) {
  const w = CANVAS_W;
  const h = CANVAS_H;
  const x0 = w * photoFrac;
  const p1x = x0 - amplitude * 0.55;
  const p2x = x0 + amplitude * 0.75;
  const p3x = x0 - amplitude * 0.35;
  return (
    `M ${x0.toFixed(1)},0 ` +
    `C ${(x0 - amplitude * 0.3).toFixed(1)},${(h * 0.18).toFixed(1)} ${p1x.toFixed(1)},${(h * 0.32).toFixed(1)} ${x0.toFixed(1)},${(h * 0.46).toFixed(1)} ` +
    `C ${(x0 + amplitude * 0.5).toFixed(1)},${(h * 0.58).toFixed(1)} ${p2x.toFixed(1)},${(h * 0.7).toFixed(1)} ${(x0 + amplitude * 0.15).toFixed(1)},${(h * 0.82).toFixed(1)} ` +
    `C ${p3x.toFixed(1)},${(h * 0.92).toFixed(1)} ${(x0 - amplitude * 0.2).toFixed(1)},${(h * 0.97).toFixed(1)} ${x0.toFixed(1)},${h.toFixed(1)} ` +
    `L 0,${h.toFixed(1)} L 0,0 Z`
  );
}

export const baseCss = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: ${FRAME_W}px; height: ${FRAME_H}px; }
  body {
    font-family: 'Manrope', sans-serif;
    color: ${BRAND.ink};
    background: #fff;
    overflow: hidden;
  }
  .frame {
    position: relative;
    width: ${FRAME_W}px;
    height: ${FRAME_H}px;
    padding: ${BORDER}px;
    border-radius: ${OUTER_RADIUS}px;
    background: linear-gradient(135deg, ${BRAND.coral1}, ${BRAND.coral2} 55%, ${BRAND.coral3});
    overflow: hidden;
  }
  .canvas {
    position: relative;
    width: ${CANVAS_W}px;
    height: ${CANVAS_H}px;
    border-radius: ${INNER_RADIUS}px;
    background: ${BRAND.paper};
    overflow: hidden;
  }
  .canvas.on-coral {
    background: linear-gradient(135deg, ${BRAND.coral1}, ${BRAND.coral2} 55%, ${BRAND.coral3});
  }
  .signature {
    position: absolute;
    top: 26px;
    right: 30px;
    text-align: right;
    z-index: 5;
  }
  .sig-caption {
    font-size: 10.5px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${BRAND.muted};
  }
  .sig-name {
    font-size: 15px;
    font-weight: 800;
    color: ${BRAND.ink};
    margin-top: 2px;
  }
  .signature.on-dark .sig-caption { color: rgba(255,255,255,0.72); }
  .signature.on-dark .sig-name { color: #fff; }
  .eyebrow-row {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .eyebrow-line {
    width: 30px; height: 3px; border-radius: 2px;
    background: ${BRAND.coral1};
  }
  .eyebrow-label {
    font-size: 13.5px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${BRAND.coral1};
  }
  h1.title {
    font-size: 44px;
    font-weight: 800;
    line-height: 1.12;
    color: ${BRAND.ink};
    margin-top: 14px;
    text-wrap: balance;
  }
  .on-coral .eyebrow-label, .on-coral .eyebrow-line { background: #fff; color: #fff; }
  .on-coral h1.title { color: #fff; }
  p.body-text {
    font-size: 15px;
    line-height: 1.55;
    color: ${BRAND.bodyGray};
  }

  /* ---- shared no-photo content components ---- */
  .content-pad { position: relative; height: 100%; padding: 40px 48px; display: flex; flex-direction: column; justify-content: center; gap: 4px; }
  .content-pad.narrow { max-width: 620px; }

  .list-plain { list-style: none; display: flex; flex-direction: column; gap: 11px; margin-top: 18px; }
  .list-plain li { font-size: 14px; line-height: 1.5; color: ${BRAND.ink}; padding-left: 20px; position: relative; }
  .list-plain li:before { content: '—'; position: absolute; left: 0; color: ${BRAND.coral2}; font-weight: 700; }

  .steps-num { display: flex; flex-direction: column; gap: 13px; margin-top: 18px; }
  .step-num-item { display: flex; gap: 14px; align-items: flex-start; }
  .step-num-chip {
    flex: 0 0 auto; width: 28px; height: 28px; border-radius: 50%;
    background: ${BRAND.coral1}; color: #fff; font-weight: 800; font-size: 13px;
    display: flex; align-items: center; justify-content: center; margin-top: 1px;
  }
  .step-num-body h4 { font-size: 14.5px; font-weight: 800; margin-bottom: 2px; }
  .step-num-body p { font-size: 12.5px; color: ${BRAND.bodyGray}; line-height: 1.45; }

  .col-grid { display: flex; gap: 18px; margin-top: 20px; }
  .col-card {
    flex: 1; background: #fff; border: 1px solid rgba(28,26,24,0.06);
    border-radius: 16px; padding: 20px; box-shadow: 0 10px 22px rgba(28,26,24,0.05);
  }
  .col-card h3 { font-size: 14.5px; font-weight: 800; color: ${BRAND.coral1}; margin-bottom: 10px; }
  .col-card ul { list-style: none; }
  .col-card li { font-size: 12.5px; line-height: 1.5; margin-bottom: 6px; padding-left: 14px; position: relative; color: ${BRAND.ink}; }
  .col-card li:before { content: '—'; position: absolute; left: 0; color: ${BRAND.coral2}; }

  .stat-row { display: flex; gap: 12px; margin-top: 16px; }
  .stat-card {
    background: #fff; border: 1px solid rgba(28,26,24,0.08); border-radius: 12px;
    padding: 12px 16px; flex: 1; box-shadow: 0 8px 18px rgba(28,26,24,0.05);
  }
  .stat-card b { display: block; font-size: 17px; font-weight: 800; color: ${BRAND.coral1}; }
  .stat-card span { font-size: 11px; color: ${BRAND.muted}; }

  .avatar-grid { display: flex; gap: 16px; margin-top: 20px; }
  .avatar-card { flex: 1; background: #fff; border-radius: 16px; padding: 18px; box-shadow: 0 10px 22px rgba(28,26,24,0.05); }
  .avatar-circle {
    width: 46px; height: 46px; border-radius: 50%; margin-bottom: 10px;
    background: linear-gradient(135deg, ${BRAND.coral1}, ${BRAND.coral3});
    color: #fff; font-weight: 800; font-size: 16px;
    display: flex; align-items: center; justify-content: center;
  }
  .avatar-card h4 { font-size: 13.5px; font-weight: 800; margin-bottom: 1px; }
  .avatar-card .role { font-size: 11px; color: ${BRAND.coral1}; font-weight: 700; margin-bottom: 8px; }
  .avatar-card p { font-size: 11.5px; line-height: 1.42; color: ${BRAND.bodyGray}; }

  .row-table { margin-top: 16px; display: flex; flex-direction: column; gap: 8px; }
  .row-table .row { display: grid; grid-template-columns: 26px 1fr 1fr; gap: 14px; align-items: start; padding: 9px 0; border-bottom: 1px solid rgba(28,26,24,0.08); }
  .row-table .row-chip { width: 22px; height: 22px; border-radius: 50%; background: ${BRAND.coral1}; color: #fff; font-size: 11px; font-weight: 800; display: flex; align-items: center; justify-content: center; }
  .row-table .row b { display: block; font-size: 12px; font-weight: 800; color: ${BRAND.ink}; margin-bottom: 2px; }
  .row-table .row span { font-size: 11.5px; line-height: 1.4; color: ${BRAND.bodyGray}; }

  /* ---- recap (full-bleed coral) shell, shared across recap slides ---- */
  .canvas.on-coral.recap { padding: 44px 48px 40px; display: flex; flex-direction: column; justify-content: center; gap: 26px; }
  .steps2 { display: flex; gap: 6px; }
  .step2 {
    display: flex; align-items: center; gap: 6px;
    background: rgba(255,255,255,0.16); color: #fff;
    font-size: 12px; font-weight: 700; padding: 7px 14px 7px 10px;
    clip-path: polygon(0 0, 92% 0, 100% 50%, 92% 100%, 0 100%, 8% 50%);
  }
  h1.title2 { font-size: 32px; font-weight: 800; color: #fff; line-height: 1.2; max-width: 800px; text-wrap: balance; }
  .grid3 { display: flex; gap: 20px; }
  .gcard { flex: 1; background: ${BRAND.paper}; border-radius: 18px; padding: 24px 22px; box-shadow: 0 14px 26px rgba(0,0,0,0.12); }
  .gcard h3 { font-size: 15px; font-weight: 800; color: ${BRAND.coral1}; margin-bottom: 11px; }
  .gcard ul { list-style: none; }
  .gcard li { font-size: 12.5px; line-height: 1.5; margin-bottom: 8px; padding-left: 14px; position: relative; color: ${BRAND.ink}; }
  .gcard li:before { content: '—'; position: absolute; left: 0; color: ${BRAND.coral2}; }
  .gcard p { font-size: 12.5px; line-height: 1.55; color: ${BRAND.ink}; }
  .footer2 {
    background: rgba(255,255,255,0.14); border: 1px solid rgba(255,255,255,0.3);
    border-radius: 14px; padding: 15px 22px; color: #fff; font-size: 13.5px; font-weight: 700; line-height: 1.4;
  }
`;

export function wrap(canvasClass, bodyHtml, extraCss = '') {
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    ${fontFaceCss()}
    ${baseCss}
    ${extraCss}
  </style></head><body><div class="frame"><div class="canvas ${canvasClass}">${bodyHtml}</div></div></body></html>`;
}

// Shared recap-slide builder: coral full-bleed, optional step chevrons,
// title, up to 3 knowledge cards (or a couple of paragraphs), footer callout.
export function recapSlide({ steps = [], title, cards = [], footer = '' }) {
  const stepsHtml = steps.length
    ? `<div class="steps2">${steps.map((s) => `<div class="step2">✓ ${s}</div>`).join('')}</div>`
    : '';
  const cardsHtml = cards.length
    ? `<div class="grid3">${cards
        .map(
          (c) => `<div class="gcard"><h3>${c.heading}</h3>${
            c.items ? `<ul>${c.items.map((i) => `<li>${i}</li>`).join('')}</ul>` : `<p>${c.text}</p>`
          }</div>`
        )
        .join('')}</div>`
    : '';
  const footerHtml = footer ? `<div class="footer2">${footer}</div>` : '';
  return wrap(
    'on-coral recap',
    `${signatureHtml(true)}${stepsHtml}<h1 class="title2">${title}</h1>${cardsHtml}${footerHtml}`
  );
}
