// The 3 pilot slides shown to the user for design-v2 approval before the
// 25-slide batch. Kept separate from build.mjs since they predate it and
// use bespoke one-off CSS per slide rather than the shared components.
// Targets: 03_Как_устроен_интернет-маркетинг/01 (Oflajn-i-onlajn.png),
// 05_Воронка_продаж_и_путь_клиента_CJM/04 (Pozdravlyayu-s-osvoeniem...),
// 07_Метрики_интернет-маркетинга/03 (Kak-rabotaet-voronka-i-ekonomika-E4M).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  BRAND, CANVAS_W, CANVAS_H,
  fontFaceCss, baseCss, signatureHtml, eyebrowHtml, waveClipPath,
} from '../../slide_template.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASSETS = path.resolve(__dirname, '..', '..', '..', 'assets', 'generated', 'baza-module');
const OUT_DIR = path.resolve(__dirname, 'out');
fs.mkdirSync(OUT_DIR, { recursive: true });

function wrap(bodyCss, bodyHtml, canvasClass = '') {
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    ${fontFaceCss()}
    ${baseCss}
    ${bodyCss}
  </style></head><body><div class="frame"><div class="canvas ${canvasClass}">${bodyHtml}</div></div></body></html>`;
}

// --- Sample 1: wave photo (left) + bullet cards (right) ---
const photoFrac1 = 0.42;
const clip1 = waveClipPath(photoFrac1, 60);
const s1Css = `
  .photo-panel {
    position: absolute; top: 0; left: 0; width: ${CANVAS_W}px; height: ${CANVAS_H}px;
    object-fit: cover; clip-path: path('${clip1}');
  }
  .content1 { position: absolute; top: 46px; left: ${Math.round(CANVAS_W * photoFrac1) + 56}px; width: ${CANVAS_W - Math.round(CANVAS_W * photoFrac1) - 56 - 40}px; }
  .cards1 { margin-top: 22px; display: flex; flex-direction: column; gap: 14px; }
  .card1 { background: #ffffff; border-radius: 16px; padding: 18px 20px; box-shadow: 0 10px 24px rgba(28,26,24,0.05); border: 1px solid rgba(28,26,24,0.05); }
  .card1 h3 { font-size: 15px; font-weight: 800; color: ${BRAND.coral1}; margin-bottom: 6px; }
  .card1 p { font-size: 13px; line-height: 1.45; color: ${BRAND.bodyGray}; }
  .chips1 { margin-top: 16px; display: flex; flex-wrap: wrap; gap: 8px; }
  .chips1 .label { font-size: 12.5px; font-weight: 700; color: ${BRAND.ink}; width: 100%; margin-bottom: 4px; }
  .chip1 { background: ${BRAND.coral3}33; color: ${BRAND.coral1}; font-size: 11.5px; font-weight: 700; padding: 6px 12px; border-radius: 999px; }
`;
const s1Html = `
  <img class="photo-panel" src="file://${ASSETS}/offline-online-v2.png">
  ${signatureHtml(false)}
  <div class="content1">
    ${eyebrowHtml('Модуль База · Урок 3')}
    <h1 class="title">Офлайн и онлайн</h1>
    <div class="cards1">
      <div class="card1"><h3>Традиционный маркетинг</h3><p>Реклама в печатных СМИ, радио и ТВ: ограниченный охват, высокие затраты, долгий цикл производства.</p></div>
      <div class="card1"><h3>Интернет-маркетинг</h3><p>Цифровая среда: глобальный охват, точная аналитика, персонализация, быстрая корректировка.</p></div>
    </div>
    <div class="chips1">
      <div class="label">Ключевые отличия:</div>
      <div class="chip1">Интерактивность</div>
      <div class="chip1">Таргетирование</div>
      <div class="chip1">Обратная связь</div>
      <div class="chip1">Аналитика</div>
    </div>
  </div>
`;
fs.writeFileSync(path.join(OUT_DIR, 'sample-1-oflajn-i-onlajn.html'), wrap(s1Css, s1Html));

// --- Sample 2: full-bleed recap on coral canvas ---
const s2Css = `
  .canvas.on-coral {
    padding: 44px 48px 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 30px;
  }
  .steps2 { display: flex; gap: 6px; margin-bottom: -6px; }
  .step2 {
    display: flex; align-items: center; gap: 6px;
    background: rgba(255,255,255,0.16); color: #fff;
    font-size: 12px; font-weight: 700; padding: 7px 14px 7px 10px;
    clip-path: polygon(0 0, 92% 0, 100% 50%, 92% 100%, 0 100%, 8% 50%);
  }
  h1.title2 { font-size: 34px; font-weight: 800; color: #fff; line-height: 1.2; max-width: 780px; }
  .grid3 { display: flex; gap: 20px; }
  .gcard { flex: 1; background: ${BRAND.paper}; border-radius: 18px; padding: 26px 24px; box-shadow: 0 14px 26px rgba(0,0,0,0.12); }
  .gcard h3 { font-size: 16px; font-weight: 800; color: ${BRAND.coral1}; margin-bottom: 12px; }
  .gcard ul { list-style: none; }
  .gcard li { font-size: 13px; line-height: 1.55; margin-bottom: 9px; padding-left: 15px; position: relative; color: ${BRAND.ink}; }
  .gcard li:before { content: '—'; position: absolute; left: 0; color: ${BRAND.coral2}; }
  .footer2 {
    background: rgba(255,255,255,0.14); border: 1px solid rgba(255,255,255,0.3);
    border-radius: 14px; padding: 16px 22px; color: #fff; font-size: 14px; font-weight: 700; line-height: 1.4;
  }
`;
const s2Html = `
  ${signatureHtml(true)}
  <div class="steps2"><div class="step2">✓ Воронка продаж</div><div class="step2">✓ Путь клиента CJM</div></div>
  <h1 class="title2">Поздравляю с освоением воронки продаж и пути клиента!</h1>
  <div class="grid3">
    <div class="gcard"><h3>Ключевые выводы</h3><ul>
      <li>Решение о покупке проходит через 4–5 этапов</li>
      <li>Оптимизация касаний влияет на конверсию</li>
      <li>Разные сегменты — разные пути к покупке</li>
      <li>Устранение «болевых точек» повышает эффективность</li>
    </ul></div>
    <div class="gcard"><h3>Полученные знания</h3><ul>
      <li>Процесс принятия решений клиентами</li>
      <li>Структура воронки (TOFU, MOFU, BOFU)</li>
      <li>Метрики оценки эффективности воронки</li>
      <li>Принципы создания Customer Journey Map</li>
    </ul></div>
    <div class="gcard"><h3>Начальные навыки</h3><ul>
      <li>Составление пути клиента с учётом мотивов</li>
      <li>Анализ этапов воронки продаж</li>
      <li>Контент под этапы пути клиента</li>
    </ul></div>
  </div>
  <div class="footer2">Для резюме: умение составлять воронку продаж и опыт создания Customer Journey Map!</div>
`;
fs.writeFileSync(path.join(OUT_DIR, 'sample-2-pozdravlyayu-s-osvoeniem-voronki.html'), wrap(s2Css, s2Html, 'on-coral'));

// --- Sample 3: title + numbered striped table + rounded photo panel (right) ---
const s3Css = `
  .canvas3 { padding: 40px 48px; position: relative; }
  .intro3 { margin-top: 12px; width: 600px; font-size: 13.5px; color: ${BRAND.bodyGray}; line-height: 1.4; }
  table.stripe { margin-top: 16px; width: 600px; border-collapse: collapse; font-size: 12px; }
  table.stripe th { text-align: left; background: ${BRAND.ink}; color: #fff; padding: 8px 10px; font-weight: 700; }
  table.stripe td { padding: 8px 10px; }
  table.stripe tr:nth-child(odd) td { background: ${BRAND.coral3}22; }
  .stats3 { margin-top: 16px; width: 600px; display: flex; gap: 12px; }
  .stat3 { background: #fff; border: 1px solid rgba(28,26,24,0.08); border-radius: 12px; padding: 10px 14px; flex: 1; box-shadow: 0 8px 18px rgba(28,26,24,0.05); }
  .stat3 b { display: block; font-size: 16px; font-weight: 800; color: ${BRAND.coral1}; }
  .stat3 span { font-size: 10.5px; color: ${BRAND.muted}; }
  .closing3 { margin-top: 14px; width: 600px; font-size: 12.5px; font-weight: 700; color: ${BRAND.ink}; line-height: 1.4; }
  .photo3 { position: absolute; top: 68px; right: 48px; width: 340px; height: ${CANVAS_H - 108}px; border-radius: 20px; object-fit: cover; box-shadow: 0 16px 32px rgba(28,26,24,0.14); }
`;
const s3Html = `
  ${signatureHtml(false)}
  ${eyebrowHtml('Модуль База · Метрики')}
  <h1 class="title" style="max-width:600px;">Как работает воронка и экономика E4M</h1>
  <div class="intro3">Двухступенчатая система продаж объединяет каналы в единую воронку:</div>
  <table class="stripe">
    <tr><th>Этап</th><th>Функция</th><th>Каналы</th><th>Показатели</th></tr>
    <tr><td>Привлечение</td><td>Генерация лидов</td><td>Таргет, SEO, контент</td><td>CTR, конверсия в лид</td></tr>
    <tr><td>Конвертация</td><td>Доведение до продажи</td><td>Email-рассылка</td><td>Конверсия в покупку</td></tr>
  </table>
  <div class="stats3">
    <div class="stat3"><b>95 у.е.</b><span>CAC</span></div>
    <div class="stat3"><b>58%</b><span>ROI</span></div>
    <div class="stat3"><b>1900 у.е.</b><span>Бюджет</span></div>
    <div class="stat3"><b>20</b><span>Продаж</span></div>
  </div>
  <div class="closing3">Результат ROI 58% — отличный показатель для старта. Дальнейший рост возможен через LTV.</div>
  <img class="photo3" src="file://${ASSETS}/funnel-economics-v2.png">
`;
fs.writeFileSync(path.join(OUT_DIR, 'sample-3-kak-rabotaet-voronka.html'), wrap(s3Css, s3Html, 'canvas3'));

console.log('done');
