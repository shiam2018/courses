// Chart for course 94836's "Реальный пример: где на самом деле ваша
// аудитория" lesson — real cleanor.app device-category split.
import fs from 'node:fs';
import path from 'node:path';
import { BRAND, fontFaceCss } from './slide_template.mjs';

const [, , htmlOutDir] = process.argv;
if (!htmlOutDir) {
  console.error('Usage: node gen_94836_charts.mjs <html_out_dir>');
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

const DEVICES = [
  { name: 'Desktop', sessions: 18279, conversions: 9870 },
  { name: 'Mobile', sessions: 7970, conversions: 3697 },
  { name: 'Tablet', sessions: 291, conversions: 89 },
];
const MAX1 = Math.max(...DEVICES.map((d) => d.sessions));

function barRow(label, sessions, conversions) {
  const sessPct = (sessions / MAX1) * 100;
  const convPct = (conversions / MAX1) * 100;
  const rate = Math.round((conversions / sessions) * 100);
  return `
    <div class="row">
      <div class="row-label">${label}<span class="row-rate">CR ${rate}%</span></div>
      <div class="bar-track">
        <div class="bar bar-sessions" style="width:${sessPct}%;"><span class="bar-value">${sessions.toLocaleString('ru-RU')}</span></div>
      </div>
      <div class="bar-track">
        <div class="bar bar-conversions" style="width:${Math.max(convPct, 3)}%;"><span class="bar-value">${conversions.toLocaleString('ru-RU')}</span></div>
      </div>
    </div>`;
}

const css = `
  .legend { display: flex; gap: 24px; margin-bottom: 22px; }
  .legend-item { display: flex; align-items: center; gap: 8px; font-size: 14px; color: ${BRAND.bodyGray}; font-weight: 700; }
  .legend-dot { width: 14px; height: 14px; border-radius: 4px; }
  .row { display: grid; grid-template-columns: 190px 1fr 1fr; align-items: center; gap: 16px; margin-bottom: 18px; }
  .row-label { font-size: 15px; font-weight: 700; color: ${BRAND.ink}; display: flex; flex-direction: column; }
  .row-rate { font-size: 11px; font-weight: 700; color: ${BRAND.coral1}; margin-top: 2px; }
  .bar-track { height: 32px; position: relative; }
  .bar { height: 100%; border-radius: 6px; display: flex; align-items: center; justify-content: flex-end; padding-right: 10px; min-width: 46px; }
  .bar-sessions { background: linear-gradient(90deg, ${BRAND.coral1}, ${BRAND.coral2}); }
  .bar-conversions { background: linear-gradient(90deg, #0e8a6f, #1fb8c9); }
  .bar-value { color: #fff; font-size: 13px; font-weight: 800; }
`;
const body = `
  <h2 class="chart-title">Сеансы и конверсии по устройствам</h2>
  <p class="chart-sub">cleanor.app, последние 30 дней</p>
  <div class="legend">
    <div class="legend-item"><span class="legend-dot" style="background:${BRAND.coral1};"></span>Сеансы</div>
    <div class="legend-item"><span class="legend-dot" style="background:#0e8a6f;"></span>Конверсии</div>
  </div>
  ${DEVICES.map((d) => barRow(d.name, d.sessions, d.conversions)).join('')}
`;
fs.writeFileSync(path.join(htmlOutDir, 'chart-devices.html'), shell(1600, 620, body, css));
console.log('Wrote chart-devices.html to', htmlOutDir);
