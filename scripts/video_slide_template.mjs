// Shared base for AI-avatar video slides (course 94834 module intros).
//
// Different from slide_template.mjs on purpose: that one is 1200x700 and
// packs a full lesson's text onto one page for reading (PDF/Loom). These are
// 16:9 for video, carry far less text per slide (the avatar speaks it), and
// reserve a bottom-right safe zone so the HeyGen avatar circle never covers
// content. Same brand palette and font stack so the two sets look related.
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

// 1600x900 at deviceScaleFactor 2 -> 3200x1800 PNG, downscales cleanly to 1080p.
export const FRAME_W = 1600;
export const FRAME_H = 900;

// Bottom-right area the avatar occupies. Nothing important may render here.
export const AVATAR_SAFE_W = 420;
export const AVATAR_SAFE_H = 420;

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

export const baseCss = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: #ffffff; font-family: 'Manrope', -apple-system, sans-serif; }
  .frame {
    width: ${FRAME_W}px; height: ${FRAME_H}px;
    position: relative; overflow: hidden;
    background: ${BRAND.paper};
    display: flex; flex-direction: column;
    padding: 72px 80px;
  }
  .frame.dark { background: linear-gradient(135deg, ${BRAND.coral1}, ${BRAND.coral2}); }

  .eyebrow {
    display: flex; align-items: center; gap: 14px;
    font-size: 20px; font-weight: 700; letter-spacing: 0.08em;
    text-transform: uppercase; color: ${BRAND.coral1}; margin-bottom: 22px;
  }
  .eyebrow::before {
    content: ''; width: 48px; height: 4px; border-radius: 2px;
    background: ${BRAND.coral1};
  }
  .dark .eyebrow { color: rgba(255,255,255,0.92); }
  .dark .eyebrow::before { background: rgba(255,255,255,0.92); }

  h1 { font-size: 76px; font-weight: 800; color: ${BRAND.ink}; line-height: 1.08; letter-spacing: -0.02em; }
  .dark h1 { color: #fff; }
  h2 { font-size: 52px; font-weight: 800; color: ${BRAND.ink}; line-height: 1.12; letter-spacing: -0.01em; }
  .lead { margin-top: 26px; font-size: 30px; line-height: 1.42; color: ${BRAND.bodyGray}; max-width: 1020px; }
  .dark .lead { color: rgba(255,255,255,0.94); }

  /* Content must clear the avatar's corner. */
  .body { margin-top: 42px; max-width: ${FRAME_W - 160 - AVATAR_SAFE_W}px; }
  .body.wide { max-width: 1180px; }

  ul.points { list-style: none; display: flex; flex-direction: column; gap: 22px; }
  ul.points li {
    position: relative; padding-left: 46px;
    font-size: 30px; line-height: 1.36; color: ${BRAND.ink}; font-weight: 500;
  }
  ul.points li::before {
    content: ''; position: absolute; left: 0; top: 14px;
    width: 20px; height: 20px; border-radius: 6px; background: ${BRAND.coral2};
  }
  ul.points li b { font-weight: 800; }

  .cards { display: grid; grid-template-columns: repeat(var(--cols, 3), 1fr); gap: 24px; }
  .card {
    background: #fff; border: 3px solid ${BRAND.coral3}; border-radius: 20px;
    padding: 28px 26px;
  }
  .card .num {
    font-size: 22px; font-weight: 800; color: ${BRAND.coral1};
    letter-spacing: 0.06em; margin-bottom: 10px;
  }
  .card .t { font-size: 30px; font-weight: 800; color: ${BRAND.ink}; line-height: 1.2; }
  .card .d { margin-top: 12px; font-size: 22px; line-height: 1.38; color: ${BRAND.bodyGray}; }

  .formula {
    display: inline-block; background: #fff; border: 3px solid ${BRAND.coral3};
    border-radius: 16px; padding: 20px 28px; font-size: 34px; font-weight: 800;
    color: ${BRAND.ink};
  }
  .formula span { color: ${BRAND.coral1}; }

  .kicker { margin-top: 34px; font-size: 26px; font-weight: 700; color: ${BRAND.coral1}; }

  .avatar-zone {
    position: absolute; right: 0; bottom: 0;
    width: ${AVATAR_SAFE_W}px; height: ${AVATAR_SAFE_H}px;
  }
`;

export function wrap(bodyHtml, { dark = false, extraCss = '' } = {}) {
  return `<!DOCTYPE html><html lang="ru"><head><meta charset="utf-8">
<style>${fontFaceCss()}${baseCss}${extraCss}</style></head>
<body><div class="frame${dark ? ' dark' : ''}">${bodyHtml}<div class="avatar-zone"></div></div></body></html>`;
}

export function titleSlide({ eyebrow, title, lead }) {
  return wrap(`
    <div style="margin:auto 0;">
      ${eyebrow ? `<div class="eyebrow">${eyebrow}</div>` : ''}
      <h1>${title}</h1>
      ${lead ? `<p class="lead">${lead}</p>` : ''}
    </div>
  `, { dark: true });
}

export function pointsSlide({ eyebrow, title, points, wide = false }) {
  return wrap(`
    ${eyebrow ? `<div class="eyebrow">${eyebrow}</div>` : ''}
    <h2>${title}</h2>
    <div class="body${wide ? ' wide' : ''}">
      <ul class="points">${points.map((p) => `<li>${p}</li>`).join('')}</ul>
    </div>
  `);
}

export function cardsSlide({ eyebrow, title, cards, cols = 3 }) {
  return wrap(`
    ${eyebrow ? `<div class="eyebrow">${eyebrow}</div>` : ''}
    <h2>${title}</h2>
    <div class="body wide">
      <div class="cards" style="--cols:${cols};">
        ${cards.map((c, i) => `
          <div class="card">
            ${c.num ? `<div class="num">${c.num}</div>` : `<div class="num">${String(i + 1).padStart(2, '0')}</div>`}
            <div class="t">${c.title}</div>
            ${c.desc ? `<div class="d">${c.desc}</div>` : ''}
          </div>`).join('')}
      </div>
    </div>
  `);
}

export function statementSlide({ eyebrow, title, lead, kicker }) {
  return wrap(`
    <div style="margin:auto 0;">
      ${eyebrow ? `<div class="eyebrow">${eyebrow}</div>` : ''}
      <h2 style="max-width:1080px;">${title}</h2>
      ${lead ? `<p class="lead">${lead}</p>` : ''}
      ${kicker ? `<p class="kicker">${kicker}</p>` : ''}
    </div>
  `);
}

export function formulaSlide({ eyebrow, title, formulas, note }) {
  return wrap(`
    ${eyebrow ? `<div class="eyebrow">${eyebrow}</div>` : ''}
    <h2>${title}</h2>
    <div class="body wide" style="display:flex;flex-direction:column;gap:22px;align-items:flex-start;">
      ${formulas.map((f) => `<div class="formula">${f}</div>`).join('')}
      ${note ? `<p class="lead" style="margin-top:8px;font-size:26px;">${note}</p>` : ''}
    </div>
  `);
}

export function writeDeck(outDir, slides) {
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(
    path.join(outDir, '_manifest.json'),
    JSON.stringify(slides.map(({ build, ...s }) => s), null, 2),
  );
  for (const s of slides) {
    fs.writeFileSync(path.join(outDir, `${s.out}.html`), s.build());
  }
  console.log(`${slides.length} slides built -> ${outDir}`);
}
