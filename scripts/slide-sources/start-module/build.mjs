import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  BRAND, wrap, signatureHtml, eyebrowHtml, waveClipPath, CANVAS_W, CANVAS_H,
} from '../../slide_template.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASSETS = path.resolve(__dirname, '..', '..', '..', 'assets', 'generated', 'start-module');
const OUT_DIR = path.resolve(__dirname, 'out');
fs.mkdirSync(ASSETS, { recursive: true });
fs.mkdirSync(OUT_DIR, { recursive: true });
const R = 'stepik-sync/94834/raw/01_Старт';
const RB = 'stepik-sync/94834/raw/02_База';

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

function contentSlide(eyebrow, title, innerHtml, titleMaxWidth = 640) {
  return wrap('', `
    ${signatureHtml(false)}
    <div class="content-pad">
      ${eyebrowHtml(eyebrow)}
      <h1 class="title" style="max-width:${titleMaxWidth}px;">${title}</h1>
      ${innerHtml}
    </div>
  `);
}

const slides = [];

// slide 1 — Давайте начнём ваш путь маркетолога! [photo-wave]
slides.push({
  out: 'start-01-nachnem-put',
  target: `${R}/02_Сколько_зарабатывает_интернет-маркетолог/01_text.html`,
  old: '1.png', alt: 'Давайте начнём ваш путь маркетолога!',
  build: () => photoWave('nachnem-put.png', 'Модуль Старт · Введение', 'Давайте начнём ваш путь маркетолога!', `
    <p class="body-text" style="margin-top:10px;font-size:13.5px;">Добро пожаловать на курс, который поможет быстро погрузиться в мир интернет-маркетинга и уверенно начать карьеру.</p>
    <ul class="list-plain" style="margin-top:14px;font-size:13px;">
      <li>От основ до реальной практики: вы узнаете, как работают рекламные кампании, как находить свою аудиторию и добиваться нужных результатов</li>
      <li>После прохождения курса вы сможете претендовать на первую работу в маркетинге или сделать шаг к повышению, если уже в индустрии</li>
    </ul>
  `, { titleMaxWidth: 600 }),
});

// slide 2 — Карьера в маркетинге [custom chevron career ladder]
slides.push({
  out: 'start-02-kariera-v-marketinge',
  target: `${R}/02_Сколько_зарабатывает_интернет-маркетолог/01_text.html`,
  old: '2.png', alt: 'Карьера в маркетинге',
  build: () => {
    const steps = [
      { role: 'Джун', top: null, bottom: ['Базовые навыки', 'Работа с отдельными каналами под руководством наставника'] },
      { role: 'Мидл', top: ['Самостоятельные кампании', 'Управление бюджетом и достижение KPI'], bottom: null },
      { role: 'Сеньор', top: null, bottom: ['Сложные кампании', 'Сквозная аналитика и бизнес-результаты'] },
      { role: 'Тимлид', top: ['Управление командой', 'Развитие сотрудников и оптимизация процессов'], bottom: null },
      { role: 'Хед', top: null, bottom: ['Планы и процессы', 'Интеграция в бизнес-процессы и кросс-функциональное взаимодействие'] },
      { role: 'СМО', top: ['Бизнес-стратегия', 'Долгосрочное развитие и управление изменениями'], bottom: null },
    ];
    const colors = ['#1c2f5e', '#2f6fb3', '#3aa8c1', '#3ec19a', '#7ac16a', '#4f8f3e'];
    const css = `
      .career-wrap { position: relative; height: 100%; padding: 40px 48px; }
      .career-chain { position: absolute; top: 340px; left: 48px; right: 48px; display: flex; }
      .career-seg {
        flex: 1; height: 64px; display: flex; align-items: center; justify-content: center;
        color: #fff; font-weight: 800; font-size: 15px; text-transform: uppercase;
        clip-path: polygon(0 0, 92% 0, 100% 50%, 92% 100%, 0 100%, 8% 50%);
        margin-left: -14px;
      }
      .career-seg:first-child { margin-left: 0; clip-path: polygon(0 0, 92% 0, 100% 50%, 92% 100%, 0 100%, 0 100%); }
      .career-top, .career-bottom { position: absolute; width: calc((100% - 96px) / 6); text-align: center; font-size: 11px; line-height: 1.35; }
      .career-top h4, .career-bottom h4 { font-size: 13px; font-weight: 800; color: ${BRAND.ink}; margin-bottom: 4px; }
      .career-top p, .career-bottom p { color: ${BRAND.bodyGray}; }
    `;
    let topHtml = '';
    let bottomHtml = '';
    steps.forEach((s, i) => {
      const left = 48 + i * ((CANVAS_W - 96) / 6);
      if (s.top) {
        topHtml += `<div class="career-top" style="left:${left}px;top:220px;"><h4>${s.top[0]}</h4><p>${s.top[1]}</p></div>`;
      }
      if (s.bottom) {
        bottomHtml += `<div class="career-bottom" style="left:${left}px;top:430px;"><h4>${s.bottom[0]}</h4><p>${s.bottom[1]}</p></div>`;
      }
    });
    const chainHtml = steps.map((s, i) => `<div class="career-seg" style="background:${colors[i]};">${s.role}</div>`).join('');
    const html = `
      ${signatureHtml(false)}
      <div class="career-wrap">
        ${eyebrowHtml('Модуль Старт · Урок 2')}
        <h1 class="title" style="max-width:700px;">Карьера в маркетинге</h1>
        ${topHtml}
        <div class="career-chain">${chainHtml}</div>
        ${bottomHtml}
      </div>
    `;
    return wrap('', html, css);
  },
});

// slide 3 — Портрет кандидата [2-column plain list, 22 items]
slides.push({
  out: 'start-03-portret-kandidata',
  target: `${R}/03_Чему_нужно_научиться_чтобы_получить_работу/01_text.html`,
  old: '4.png', alt: 'Портрет кандидата',
  build: () => {
    const left = ['Высшее образование', 'Английский язык B2+', 'Опыт работы от 3 лет', 'Опыт в контент-маркетинге', 'Опыт в SEO-продвижении', 'Опыт с веб-аналитикой (Я.Метрика)', 'Опыт работы с таргетом', 'Опыт исследования конкурентов', 'Навыки коммуникации', 'Адаптивность', 'Высокая ответственность'];
    const right = ['Инициативность', 'Соблюдение сроков', 'Креативное мышление', 'Стремление к саморазвитию', 'Командный игрок', 'Глубокое понимание ЦА', 'Умение планировать', 'Data driven', 'Приятное общение', 'Умение работать в стартапах', 'Поддержка ценностей компании'];
    const col = (items, startNum) => `<ul class="list-plain" style="font-size:12.5px;gap:9px;">${items.map((t, i) => `<li>#${startNum + i} ${t}</li>`).join('')}</ul>`;
    return contentSlide('Модуль Старт · Урок 3', 'Портрет кандидата', `
      <div class="col-grid" style="margin-top:22px;">
        <div class="col-card" style="background:transparent;box-shadow:none;border:none;padding:0;">${col(left, 1)}</div>
        <div class="col-card" style="background:transparent;box-shadow:none;border:none;padding:0;">${col(right, 12)}</div>
      </div>
    `, 700);
  },
});

// slide 4 — 5 шагов найма [steps-num, 5 items]
slides.push({
  out: 'start-04-5-shagov-najma',
  target: `${R}/03_Чему_нужно_научиться_чтобы_получить_работу/01_text.html`,
  old: '5.png', alt: '5 шагов найма',
  build: () => contentSlide('Модуль Старт · Урок 3', '5 шагов найма', `
    <div class="steps-num" style="max-width:820px;">
      <div class="step-num-item"><div class="step-num-chip">1</div><div class="step-num-body"><h4>Отклик</h4><p>Соискатель отправляет резюме и сопроводительное письмо.</p></div></div>
      <div class="step-num-item"><div class="step-num-chip">2</div><div class="step-num-body"><h4>Скрининг</h4><p>HR просматривает резюме и оценивает базовое соответствие на созвоне.</p></div></div>
      <div class="step-num-item"><div class="step-num-chip">3</div><div class="step-num-body"><h4>Тестовое</h4><p>Кандидат выполняет пробное задание для оценки навыков.</p></div></div>
      <div class="step-num-item"><div class="step-num-chip">4</div><div class="step-num-body"><h4>Техническое</h4><p>Проводится интервью с оценкой профессиональных компетенций.</p></div></div>
      <div class="step-num-item"><div class="step-num-chip">5</div><div class="step-num-body"><h4>Менеджер</h4><p>Финальное интервью с руководителем команды.</p></div></div>
    </div>
  `, 700),
});

// slide 5 — Программа курса [col-grid, 4 items]
slides.push({
  out: 'start-05-programma-kursa',
  target: `${R}/04_Что_вас_ждет_на_курсе/01_text.html`,
  old: '6.png', alt: 'Программа курса',
  build: () => contentSlide('Модуль Старт · Урок 4', 'Программа курса', `
    <div class="col-grid" style="margin-top:24px;">
      <div class="col-card"><h3>1. База</h3><p style="font-size:12.5px;color:${BRAND.bodyGray};">Целевая аудитория, воронка продаж, каналы продвижения, метрики эффективности.</p></div>
      <div class="col-card"><h3>2. Инструменты</h3><p style="font-size:12.5px;color:${BRAND.bodyGray};">Сайты, аналитика, креативы, CRM, email-маркетинг, управление репутацией.</p></div>
      <div class="col-card"><h3>3. Каналы</h3><p style="font-size:12.5px;color:${BRAND.bodyGray};">Контекстная реклама, таргет, SEO, SMM, CPA, медийная реклама.</p></div>
      <div class="col-card"><h3>4. Работа</h3><p style="font-size:12.5px;color:${BRAND.bodyGray};">Резюме, портфолио, поиск вакансий, собеседования, карьерный рост.</p></div>
    </div>
  `, 700),
});

// slide 6 — Воронка продаж [custom funnel diagram, fix for the specifically-flagged slide]
slides.push({
  out: 'voronka-prodazh-fix',
  target: `${RB}/05_Воронка_продаж_и_путь_клиента_CJM/01_text.html`,
  old: 'Инструменты интернет-маркетолога 2.gslides (3).png', alt: 'Воронка продаж',
  build: () => {
    const rows = [
      { stage: 'Привлечь внимание', label: 'Верх воронки', detail: 'Реклама, блог, соцсети' },
      { stage: 'Удержать интерес', label: 'Середина', detail: 'Рассылки, вебинары, статьи, квизы' },
      { stage: 'Побудить к действию', label: 'Низ', detail: 'Офферы, акции, триггеры, чат-бот' },
      { stage: 'Действие', label: 'Покупка', detail: 'Удобная оплата, бонусы, поддержка' },
    ];
    const shades = [BRAND.coral1, '#e2653f', '#ea8a63', '#f0a988'];
    // Widths at each of the 5 horizontal boundaries (4 bands between them) —
    // strictly decreasing so the funnel actually tapers downward, and every
    // band's top width equals the previous band's bottom width so the
    // silhouette has no seams: one continuous shape, not 4 stacked boxes.
    const WIDTHS = [380, 300, 225, 165, 125];
    const BAND_H = 78;
    const FUNNEL_W = 380;
    const CENTER_X = FUNNEL_W / 2;
    const funnelTotalH = BAND_H * 4;
    const stemH = 30;
    const boxH = 44;
    const boxW = 170;

    const css = `
      .funnel-wrap { position: relative; height: 100%; padding: 40px 48px; }
      .funnel-col { position: absolute; top: 190px; left: 48px; width: ${FUNNEL_W}px; height: ${funnelTotalH + stemH + boxH}px; }
      .funnel-label {
        position: absolute; left: 0; width: 100%; display: flex; align-items: center; justify-content: center;
        color: #fff; font-weight: 800; font-size: 13px; text-transform: uppercase; text-align: center; pointer-events: none;
      }
      .funnel-stem { position: absolute; left: ${CENTER_X - 1}px; width: 2px; background: ${BRAND.coral1}; }
      .repeat-chip {
        position: absolute; left: ${CENTER_X - boxW / 2}px; width: ${boxW}px; height: ${boxH}px;
        background: ${BRAND.paper}; border: 2px solid ${BRAND.coral3}; border-radius: 10px;
        display: flex; align-items: center; justify-content: center;
        font-weight: 800; font-size: 11.5px; color: ${BRAND.coral1}; text-align: center;
      }
      .detail-col { position: absolute; top: 190px; left: 470px; width: 640px; }
      .detail-row { display: flex; align-items: center; gap: 16px; height: ${BAND_H}px; }
      .detail-bar { color: #fff; font-weight: 800; font-size: 13px; text-transform: uppercase; padding: 14px 20px; width: 220px; text-align: center; }
      .detail-text { font-size: 13px; color: ${BRAND.ink}; }
    `;

    let polygons = '';
    let labels = '';
    rows.forEach((r, i) => {
      const yTop = i * BAND_H;
      const yBottom = yTop + BAND_H;
      const wTop = WIDTHS[i];
      const wBottom = WIDTHS[i + 1];
      const xTopL = CENTER_X - wTop / 2;
      const xTopR = CENTER_X + wTop / 2;
      const xBotL = CENTER_X - wBottom / 2;
      const xBotR = CENTER_X + wBottom / 2;
      polygons += `<polygon points="${xTopL},${yTop} ${xTopR},${yTop} ${xBotR},${yBottom} ${xBotL},${yBottom}" fill="${shades[i]}" />`;
      labels += `<div class="funnel-label" style="top:${yTop}px;height:${BAND_H}px;">${r.stage}</div>`;
    });

    const detailHtml = rows
      .map((r) => `<div class="detail-row"><div class="detail-bar" style="background:${shades[rows.indexOf(r)]};">${r.label}</div><div class="detail-text">${r.detail}</div></div>`)
      .join('');

    const html = `
      ${signatureHtml(false)}
      <div class="funnel-wrap">
        ${eyebrowHtml('Модуль База · Урок 5')}
        <h1 class="title" style="max-width:700px;">Воронка продаж</h1>
        <div class="funnel-col">
          <svg width="${FUNNEL_W}" height="${funnelTotalH}" viewBox="0 0 ${FUNNEL_W} ${funnelTotalH}" style="position:absolute;top:0;left:0;">
            ${polygons}
          </svg>
          ${labels}
          <div class="funnel-stem" style="top:${funnelTotalH}px;height:${stemH}px;"></div>
          <div class="repeat-chip" style="top:${funnelTotalH + stemH}px;">Повторная покупка</div>
        </div>
        <div class="detail-col">${detailHtml}</div>
      </div>
    `;
    return wrap('', html, css);
  },
});

fs.writeFileSync(path.join(OUT_DIR, '_manifest.json'), JSON.stringify(slides.map(({ build, ...s }) => s), null, 2));
for (const s of slides) {
  fs.writeFileSync(path.join(OUT_DIR, `${s.out}.html`), s.build());
}
console.log(`${slides.length} slides built`);
