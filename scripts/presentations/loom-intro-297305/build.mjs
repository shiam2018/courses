// Standalone presentation for Igor to read from while recording the Loom
// intro video for course 297305 ("Маркетинговая аналитика: с нуля до первого
// отчёта" — free course). NOT uploaded to Stepik — exported as a PDF for
// personal use only, screen-shared during recording. All labels are
// viewer-facing.
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
      h1.big { font-size: 40px; font-weight: 800; color: #fff; line-height: 1.15; max-width: 940px; }
      p.sub { margin-top: 16px; font-size: 17px; color: rgba(255,255,255,0.9); max-width: 780px; }
    `;
    const html = `
      <div class="title-wrap">
        ${eyebrowHtml('Бесплатный курс')}
        <h1 class="big" style="color:#fff;">Маркетинговая аналитика: с нуля до первого отчёта</h1>
        <p class="sub">Как перестать гадать по цифрам и начать принимать решения на данных.</p>
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
          <li>Больше 12 лет в интернет-маркетинге</li>
          <li>Руковожу направлением User Acquisition</li>
          <li>Каждый день принимаю решения на основе отчётов и цифр</li>
        </ul>
      </div>
    `;
    return wrap('', html, css);
  },
});

// 3 — Для кого этот курс
slides.push({
  out: 'l03-dlya-kogo',
  build: () => contentSlide('Для кого этот курс', 'Данные есть у всех — решения на их основе принимают немногие', `
    <ul class="list-plain" style="margin-top:14px;max-width:820px;">
      <li>Для маркетологов, которые хотят перестать гадать по цифрам</li>
      <li>Для начинающих аналитиков и всех, кто работает с отчётами Метрики, GA4 или Excel</li>
      <li>Бесплатный курс, 2-3 часа, без воды</li>
      <li>5 модулей, тест на 10 вопросов после каждого</li>
    </ul>
  `, 820),
});

// 4 — Программа курса (5 модулей)
slides.push({
  out: 'l04-programma',
  build: () => contentSlide('Программа курса', 'От основ до постановки эксперимента', stepsNum([
    { h: 'Основы аналитики', p: 'Зачем она нужна и ключевые метрики: CTR, CPC, CPA, CR, ROI' },
    { h: 'Инструменты аналитика', p: 'Яндекс.Метрика, Google Analytics 4, Excel и сводные таблицы' },
    { h: 'Отчёты и метрики', p: 'Как читать отчёт по трафику, модели атрибуции, визуализация данных' },
    { h: 'Инсайты и гипотезы', p: 'Как искать закономерности в цифрах и формулировать проверяемые гипотезы' },
    { h: 'Эксперименты', p: 'A/B-тесты, контрольная группа, корректная оценка результата' },
  ]), 820),
});

// 5 — Реальные данные, а не выдуманные таблицы
slides.push({
  out: 'l05-real-data',
  build: () => wrap('', `
    <div class="content-pad">
      ${eyebrowHtml('Чем этот курс отличается')}
      <h1 class="title" style="max-width:780px;">Реальные цифры вместо абстрактных таблиц</h1>
      <ul class="list-plain" style="margin-top:14px;max-width:820px;">
        <li>Разбор реального отчёта по трафику сайта cleanor.app</li>
        <li>Настоящая, ещё не до конца разгаданная загадка в данных — как ищут причину на практике</li>
        <li>Модели атрибуции — на конкретном примере с распределением $100</li>
      </ul>
      ${highlightBox('Честно', 'В курсе есть кейс без готового ответа: реальное снижение трафика на одной из страниц, которое разбирается по процессу поиска причины, а не по заранее известному решению. Так учит настоящая аналитика.')}
    </div>
  `, highlightCss),
});

// 6 — Как лучше проходить курс
slides.push({
  out: 'l06-kak-prohodit',
  build: () => contentSlide('Как лучше проходить', 'Коротко, по порядку, с реальными примерами', `
    <ul class="list-plain" style="margin-top:20px;max-width:820px;font-size:15px;">
      <li>Уроки короткие — 5-10 минут на каждый</li>
      <li>В каждом уроке — рабочие формулы и ссылки на справки инструментов, чтобы возвращаться к ним в работе</li>
      <li>После каждого модуля — тест на 10 вопросов: закрепите материал перед следующим</li>
    </ul>
  `, 820),
});

// 7 — В конце курса (recap)
slides.push({
  out: 'l07-final',
  build: () => recapSlide({
    title: 'В конце курса',
    cards: [
      { heading: 'Модули курса', items: ['Основы аналитики', 'Инструменты', 'Отчёты и метрики', 'Инсайты и гипотезы', 'Эксперименты'] },
      { heading: 'Что получите', items: ['Умение читать отчёт по трафику', 'Понимание моделей атрибуции', 'Навык ставить и оценивать A/B-тест'] },
      { heading: 'Если захотите дальше', text: 'Большая программа «Интернет-Маркетолог: Старт Карьеры» — со скидкой по промокоду CAREERSTART.' },
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
