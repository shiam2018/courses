// Standalone presentation for Igor to read from while recording the Loom
// intro video for course 183077 ("Аналитика для маркетолога: дашборд и
// отчёт для решения" — PAID tier-1 course). NOT uploaded to Stepik —
// exported as a PDF for personal use only, screen-shared during recording.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  BRAND, wrap, eyebrowHtml, recapSlide,
} from '../../slide_template.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const AUTHOR_PHOTO = path.resolve(__dirname, '..', '..', '..', 'assets', 'generated', 'loom-intro-start', 'main-png-2.png');
const OUT_DIR = path.resolve(__dirname, 'out');
fs.mkdirSync(OUT_DIR, { recursive: true });

function contentSlide(eyebrow, title, innerHtml, titleMaxWidth = 640) {
  return wrap('', `
    <div class="content-pad">
      ${eyebrowHtml(eyebrow)}
      <h1 class="title" style="max-width:${titleMaxWidth}px;">${title}</h1>
      ${innerHtml}
    </div>
  `);
}

function stepsNum(items, startAt = 1) {
  return `<div class="steps-num">${items.map((it, i) => `
    <div class="step-num-item"><div class="step-num-chip">${startAt + i}</div><div class="step-num-body"><h4>${it.h}</h4>${it.p ? `<p>${it.p}</p>` : ''}</div></div>
  `).join('')}</div>`;
}

const highlightCss = `
  .highlight-box {
    margin-top: 18px; padding: 16px 20px; max-width: 860px;
    background: #fff; border-left: 4px solid ${BRAND.coral1}; border-radius: 8px;
    box-shadow: 0 8px 18px rgba(28,26,24,0.05);
    font-size: 13px; line-height: 1.5; color: ${BRAND.bodyGray};
  }
  .highlight-box b { color: ${BRAND.ink}; }
  .highlight-label { font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: ${BRAND.coral1}; margin-bottom: 6px; display: block; }
`;
function highlightBox(label, html) {
  return `<div class="highlight-box"><span class="highlight-label">${label}</span>${html}</div>`;
}

const slides = [];

// 1 — Title
slides.push({
  out: 'l01-title',
  build: () => {
    const css = `
      .title-wrap { position: relative; height: 100%; padding: 60px 64px; display: flex; flex-direction: column; justify-content: center; }
      h1.big { font-size: 38px; font-weight: 800; color: #fff; line-height: 1.15; max-width: 940px; }
      p.sub { margin-top: 16px; font-size: 16px; color: rgba(255,255,255,0.9); max-width: 780px; }
    `;
    const html = `
      <div class="title-wrap">
        ${eyebrowHtml('Практический курс')}
        <h1 class="big" style="color:#fff;">Аналитика для маркетолога: дашборд и отчёт для решения</h1>
        <p class="sub">Не ещё одна теория метрик — один реальный проект от вопроса бизнеса до защищённой рекомендации.</p>
      </div>
    `;
    return wrap('on-coral', html, css);
  },
});

// 2 — Кто автор
slides.push({
  out: 'l02-kto-avtor',
  build: () => {
    const photoBoxW = 300;
    const photoBoxH = 300;
    const css = `
      .avtor-photo-wrap {
        position: absolute; top: 60px; right: 56px; width: ${photoBoxW}px; height: ${photoBoxH}px;
        border-radius: 24px; background: linear-gradient(160deg,#0e8a6f,#1fb8c9); overflow: hidden;
        box-shadow: 0 16px 32px rgba(28,26,24,0.15);
      }
      .avtor-photo-wrap img { width: 100%; height: 100%; object-fit: contain; object-position: bottom; }
      .avtor-content { position: relative; height: 100%; padding: 40px 48px; padding-right: ${photoBoxW + 96}px; display: flex; flex-direction: column; justify-content: center; }
    `;
    const html = `
      <div class="avtor-photo-wrap"><img src="file://${AUTHOR_PHOTO}"></div>
      <div class="avtor-content">
        ${eyebrowHtml('Автор курса')}
        <h1 class="title" style="max-width:600px;">Игорь Шеньшин</h1>
        <ul class="list-plain" style="margin-top:12px;font-size:13px;">
          <li>Руковожу направлением User Acquisition</li>
          <li>Каждую неделю прохожу этот же цикл на реальных данных cleanor.app</li>
          <li>Курс на данных, которые ещё не были известны заранее, а не на подогнанном примере</li>
        </ul>
      </div>
    `;
    return wrap('', html, css);
  },
});

// 3 — Для кого этот курс
slides.push({
  out: 'l03-dlya-kogo',
  build: () => contentSlide('Для кого этот курс', 'Продолжение для тех, кто прошёл основы', `
    <ul class="list-plain" style="margin-top:14px;max-width:820px;">
      <li>Для тех, кто прошёл бесплатные курсы «Маркетинговая аналитика» и «Excel с нуля» (или знает материал на их уровне)</li>
      <li>Не повторяем метрики и формулы — сразу практика поверх них</li>
      <li>3-4 часа, один сквозной проект</li>
      <li>5 модулей, в каждом — практическое задание на реальных данных</li>
    </ul>
  `, 820),
});

// 4 — Программа курса
slides.push({
  out: 'l04-programma',
  build: () => contentSlide('Программа курса', 'Один проект от вопроса до защиты решения', stepsNum([
    { h: 'От вопроса бизнеса к метрикам', p: 'Реальная загадка трафика /tools — с продолжением' },
    { h: 'Сбор и очистка данных', p: 'Главная ловушка: сравнение неполного периода с завершённым' },
    { h: 'Дашборд', p: 'Что выносить на дашборд, а что нет' },
    { h: 'Отчёт с рекомендацией', p: 'Конкретная цифра, а не общее наблюдение' },
    { h: 'Защита решения', p: 'Ответы на вопросы, когда не верят графику' },
  ]), 820),
});

// 5 — Чем этот курс отличается
slides.push({
  out: 'l05-honest',
  build: () => wrap('', `
    <div class="content-pad">
      ${eyebrowHtml('Чем этот курс отличается')}
      <h1 class="title" style="max-width:780px;">Реальное продолжение истории из бесплатного курса</h1>
      <ul class="list-plain" style="margin-top:14px;max-width:820px;">
        <li>В курсе «Маркетинговая аналитика» вопрос про трафик /tools остался открытым — здесь мы его закрываем на новых данных</li>
        <li>Скачиваемый файл с реальными данными cleanor.app, а не синтетический пример</li>
        <li>Каждый модуль заканчивается практикой, а не тестом с вариантами ответов</li>
      </ul>
      ${highlightBox('Честно', 'Вывод в курсе получился не тот, что ожидался на старте — и это тоже часть урока: реальные данные редко подтверждают первую гипотезу.')}
    </div>
  `, highlightCss),
});

// 6 — Как лучше проходить курс
slides.push({
  out: 'l06-kak-prohodit',
  build: () => contentSlide('Как лучше проходить', 'Один проект — от начала до конца, без перескакивания', `
    <ul class="list-plain" style="margin-top:20px;max-width:820px;font-size:15px;">
      <li>Скачайте файл-практикум перед первым модулем</li>
      <li>Выполняйте практические задания в файле, а не только читайте про них</li>
      <li>К концу курса у вас будет готовый дашборд и отчёт — реальный, не учебный</li>
    </ul>
  `, 820),
});

// 7 — В конце курса (recap)
slides.push({
  out: 'l07-final',
  build: () => recapSlide({
    title: 'В конце курса',
    cards: [
      { heading: 'Модули курса', items: ['Вопрос и метрики', 'Сбор и очистка данных', 'Дашборд', 'Отчёт с рекомендацией', 'Защита решения'] },
      { heading: 'Что получите', items: ['Готовый дашборд для портфолио', 'Отчёт с реальной рекомендацией', 'Отработанный цикл на своих будущих задачах'] },
      { heading: 'Дальше', text: 'Полная программа «Интернет-Маркетолог: Старт Карьеры» — по промокоду CAREERSTART дешевле на 3000 ₽.' },
    ],
  }),
});

fs.writeFileSync(path.join(OUT_DIR, '_manifest.json'), JSON.stringify(slides.map(({ build, ...s }) => s), null, 2));
for (const s of slides) {
  if (s.build) fs.writeFileSync(path.join(OUT_DIR, `${s.out}.html`), s.build());
}
console.log(`${slides.length} slides built. Now run:`);
console.log(`  node ${path.relative(process.cwd(), path.resolve(__dirname, '..', '..', 'render_batch.mjs'))} ${path.relative(process.cwd(), OUT_DIR)} ${path.relative(process.cwd(), OUT_DIR)} 1200 700`);
console.log(`  python3 ${path.relative(process.cwd(), path.join(__dirname, 'build_pdf.py'))}`);
