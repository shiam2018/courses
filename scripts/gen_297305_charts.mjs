// Three data-visualization charts for course 297305 lessons, built from real
// cleanor.app GA4 numbers (traffic-by-channel, /tools monthly trend) and the
// donor $100 attribution example. Rendered the same way as header banners:
// standalone HTML with a `.banner-a` root (render_batch.mjs's selector),
// plain divs sized by inline percentage widths/heights — no chart library.
import fs from 'node:fs';
import path from 'node:path';
import { BRAND, fontFaceCss } from './slide_template.mjs';

const [, , htmlOutDir] = process.argv;
if (!htmlOutDir) {
  console.error('Usage: node gen_297305_charts.mjs <html_out_dir>');
  process.exit(1);
}
fs.mkdirSync(htmlOutDir, { recursive: true });

function shell(w, h, bodyHtml, extraCss = '') {
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    ${fontFaceCss()}
    html, body { width: ${w}px; height: ${h}px; }
    body { font-family: 'Manrope', sans-serif; overflow: hidden; }
    .banner-a {
      width: ${w}px; height: ${h}px; background: ${BRAND.paper};
      padding: 48px 56px; display: flex; flex-direction: column;
    }
    h2.chart-title { font-size: 26px; font-weight: 800; color: ${BRAND.ink}; margin-bottom: 6px; }
    p.chart-sub { font-size: 15px; color: ${BRAND.muted}; margin-bottom: 28px; }
    ${extraCss}
  </style></head><body><div class="banner-a">${bodyHtml}</div></body></html>`;
}

// --- Chart 1: sessions vs conversions by channel (grouped horizontal bars) ---
const CHANNELS = [
  { name: 'Direct', sessions: 12871, conversions: 1649 },
  { name: 'Organic Search', sessions: 12680, conversions: 10674 },
  { name: 'Unassigned', sessions: 923, conversions: 648 },
  { name: 'AI Assistant', sessions: 569, conversions: 519 },
  { name: 'Referral', sessions: 169, conversions: 160 },
];
const MAX1 = Math.max(...CHANNELS.map((c) => c.sessions));

function barRow(label, sessions, conversions) {
  const sessPct = (sessions / MAX1) * 100;
  const convPct = (conversions / MAX1) * 100;
  return `
    <div class="row">
      <div class="row-label">${label}</div>
      <div class="bar-track">
        <div class="bar bar-sessions" style="width:${sessPct}%;"><span class="bar-value">${sessions.toLocaleString('ru-RU')}</span></div>
      </div>
      <div class="bar-track">
        <div class="bar bar-conversions" style="width:${Math.max(convPct, 1.5)}%;"><span class="bar-value">${conversions.toLocaleString('ru-RU')}</span></div>
      </div>
    </div>`;
}

const chart1Css = `
  .legend { display: flex; gap: 24px; margin-bottom: 22px; }
  .legend-item { display: flex; align-items: center; gap: 8px; font-size: 14px; color: ${BRAND.bodyGray}; font-weight: 700; }
  .legend-dot { width: 14px; height: 14px; border-radius: 4px; }
  .row { display: grid; grid-template-columns: 160px 1fr 1fr; align-items: center; gap: 16px; margin-bottom: 16px; }
  .row-label { font-size: 15px; font-weight: 700; color: ${BRAND.ink}; }
  .bar-track { height: 30px; position: relative; }
  .bar { height: 100%; border-radius: 6px; display: flex; align-items: center; justify-content: flex-end; padding-right: 10px; min-width: 40px; }
  .bar-sessions { background: linear-gradient(90deg, ${BRAND.coral1}, ${BRAND.coral2}); }
  .bar-conversions { background: linear-gradient(90deg, #0e8a6f, #1fb8c9); }
  .bar-value { color: #fff; font-size: 13px; font-weight: 800; }
`;
const chart1Body = `
  <h2 class="chart-title">Сеансы и конверсии по каналам</h2>
  <p class="chart-sub">cleanor.app, последние 30 дней</p>
  <div class="legend">
    <div class="legend-item"><span class="legend-dot" style="background:${BRAND.coral1};"></span>Сеансы</div>
    <div class="legend-item"><span class="legend-dot" style="background:#0e8a6f;"></span>Конверсии</div>
  </div>
  ${CHANNELS.map((c) => barRow(c.name, c.sessions, c.conversions)).join('')}
`;
fs.writeFileSync(path.join(htmlOutDir, 'chart-traffic-report.html'), shell(1600, 780, chart1Body, chart1Css));

// --- Chart 2: /tools monthly trend (vertical bars) ---
const MONTHS = [
  { label: 'Июнь', sessions: 79 },
  { label: 'Июль', sessions: 373 },
  { label: 'Август', sessions: 320 },
];
const MAX2 = Math.max(...MONTHS.map((m) => m.sessions));
const chart2Css = `
  .cols { display: flex; align-items: flex-end; gap: 60px; flex: 1; padding: 0 40px; }
  .col { display: flex; flex-direction: column; align-items: center; flex: 1; height: 100%; justify-content: flex-end; }
  .col-bar { width: 90px; border-radius: 8px 8px 0 0; background: linear-gradient(180deg, ${BRAND.coral2}, ${BRAND.coral1}); display: flex; align-items: flex-start; justify-content: center; padding-top: 10px; }
  .col-value { color: #fff; font-weight: 800; font-size: 16px; }
  .col-label { margin-top: 14px; font-size: 15px; font-weight: 700; color: ${BRAND.ink}; }
`;
const chart2Body = `
  <h2 class="chart-title">Сеансы на странице /tools по месяцам</h2>
  <p class="chart-sub">cleanor.app — рост в июле, снижение на ~14% в августе</p>
  <div class="cols">
    ${MONTHS.map((m) => `
      <div class="col">
        <div class="col-bar" style="height:${(m.sessions / MAX2) * 100}%;"><span class="col-value">${m.sessions}</span></div>
        <div class="col-label">${m.label}</div>
      </div>
    `).join('')}
  </div>
`;
fs.writeFileSync(path.join(htmlOutDir, 'chart-tools-trend.html'), shell(1200, 700, chart2Body, chart2Css));

// --- Chart 3: $100 attribution split across models (stacked horizontal bars) ---
const MODELS = [
  { name: 'Last Click', parts: [{ l: 'Директ', v: 0, c: BRAND.coral1 }, { l: 'Соцсети', v: 0, c: BRAND.coral3 }, { l: 'Email', v: 100, c: '#0e8a6f' }] },
  { name: 'First Click', parts: [{ l: 'Директ', v: 100, c: BRAND.coral1 }, { l: 'Соцсети', v: 0, c: BRAND.coral3 }, { l: 'Email', v: 0, c: '#0e8a6f' }] },
  { name: 'Linear', parts: [{ l: 'Директ', v: 33.33, c: BRAND.coral1 }, { l: 'Соцсети', v: 33.33, c: BRAND.coral3 }, { l: 'Email', v: 33.34, c: '#0e8a6f' }] },
  { name: 'Position-Based', parts: [{ l: 'Директ', v: 40, c: BRAND.coral1 }, { l: 'Соцсети', v: 20, c: BRAND.coral3 }, { l: 'Email', v: 40, c: '#0e8a6f' }] },
];
const chart3Css = `
  .legend { display: flex; gap: 22px; margin-bottom: 24px; }
  .legend-item { display: flex; align-items: center; gap: 8px; font-size: 14px; color: ${BRAND.bodyGray}; font-weight: 700; }
  .legend-dot { width: 14px; height: 14px; border-radius: 4px; }
  .mrow { display: grid; grid-template-columns: 150px 1fr; align-items: center; gap: 16px; margin-bottom: 18px; }
  .mrow-label { font-size: 15px; font-weight: 700; color: ${BRAND.ink}; }
  .stack { height: 40px; border-radius: 8px; overflow: hidden; display: flex; }
  .seg { height: 100%; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 13px; font-weight: 800; }
`;
const chart3Body = `
  <h2 class="chart-title">Один путь клиента на $100 — четыре модели атрибуции</h2>
  <p class="chart-sub">Директ → Соцсети → Email, как в примере урока</p>
  <div class="legend">
    <div class="legend-item"><span class="legend-dot" style="background:${BRAND.coral1};"></span>Директ</div>
    <div class="legend-item"><span class="legend-dot" style="background:${BRAND.coral3};"></span>Соцсети</div>
    <div class="legend-item"><span class="legend-dot" style="background:#0e8a6f;"></span>Email</div>
  </div>
  ${MODELS.map((m) => `
    <div class="mrow">
      <div class="mrow-label">${m.name}</div>
      <div class="stack">
        ${m.parts.filter((p) => p.v > 0).map((p) => `<div class="seg" style="width:${p.v}%;background:${p.c};">$${p.v % 1 === 0 ? p.v : p.v.toFixed(2)}</div>`).join('')}
      </div>
    </div>
  `).join('')}
`;
fs.writeFileSync(path.join(htmlOutDir, 'chart-attribution.html'), shell(1600, 800, chart3Body, chart3Css));

console.log('Wrote 3 chart HTML files to', htmlOutDir);
