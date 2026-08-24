// Standalone presentation for Igor to read from while recording the Loom
// intro video for course 94836 ("База интернет-маркетинга" — free course).
// NOT uploaded to Stepik — exported as a PDF for personal use only,
// screen-shared during recording. All labels are viewer-facing.
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
      h1.big { font-size: 42px; font-weight: 800; color: #fff; line-height: 1.15; max-width: 940px; }
      p.sub { margin-top: 16px; font-size: 17px; color: rgba(255,255,255,0.9); max-width: 780px; }
    `;
    const html = `
      <div class="title-wrap">
        ${eyebrowHtml('Бесплатный курс')}
        <h1 class="big" style="color:#fff;">База интернет-маркетинга</h1>
        <p class="sub">Что такое интернет-маркетинг и из чего он состоит: карта всей системы за 1,5-2 часа.</p>
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
          <li>Работал на стыке SEO, таргета, контекста, email и аналитики</li>
        </ul>
      </div>
    `;
    return wrap('', html, css);
  },
});

// 3 — Для кого этот курс
slides.push({
  out: 'l03-dlya-kogo',
  build: () => contentSlide('Для кого этот курс', 'Карта системы, а не глубина в одном канале', `
    <ul class="list-plain" style="margin-top:14px;max-width:820px;">
      <li>Для тех, кто только начинает разбираться в интернет-маркетинге</li>
      <li>Для руководителей, которые хотят понимать, чем занимаются их маркетологи и подрядчики</li>
      <li>Бесплатный курс, 1,5-2 часа, без воды</li>
      <li>4 модуля, тест на 10 вопросов после каждого</li>
    </ul>
  `, 820),
});

// 4 — Программа курса (4 модуля)
slides.push({
  out: 'l04-programma',
  build: () => contentSlide('Программа курса', 'От общей логики до конкретных каналов и метрик', stepsNum([
    { h: 'Как устроен интернет-маркетинг', p: 'Отличие от офлайна, целевая аудитория и путь клиента' },
    { h: 'Карта каналов', p: 'Платные, собственные и заслуженные каналы: SEO, SMM, таргет, контекст' },
    { h: 'Email-маркетинг и репутация', p: 'Как удерживать клиентов и работать с отзывами' },
    { h: 'Метрики', p: 'Как проверить, что маркетинг действительно работает' },
  ]), 820),
});

// 5 — Честно о масштабе
slides.push({
  out: 'l05-honest',
  build: () => wrap('', `
    <div class="content-pad">
      ${eyebrowHtml('Чем этот курс НЕ является')}
      <h1 class="title" style="max-width:780px;">Это карта местности, а не подробная инструкция</h1>
      <ul class="list-plain" style="margin-top:14px;max-width:820px;">
        <li>После курса вы не станете SEO-специалистом или таргетологом за 2 часа</li>
        <li>Каждый канал из карты — тема отдельного полноценного курса</li>
        <li>Зато вы перестанете теряться в терминах и поймёте, куда двигаться дальше</li>
      </ul>
      ${highlightBox('Реальные данные', 'Примеры и цифры в модуле про метрики — реальная аналитика сайта cleanor.app, а не выдуманные таблицы.')}
    </div>
  `, highlightCss),
});

// 6 — Как лучше проходить курс
slides.push({
  out: 'l06-kak-prohodit',
  build: () => contentSlide('Как лучше проходить', 'Коротко, по порядку', `
    <ul class="list-plain" style="margin-top:20px;max-width:820px;font-size:15px;">
      <li>Уроки короткие — 5-10 минут на каждый</li>
      <li>После каждого модуля — тест на 10 вопросов, чтобы закрепить материал</li>
      <li>Если конкретный канал зацепит — в конце курса ссылки на отдельные бесплатные курсы поглубже</li>
    </ul>
  `, 820),
});

// 7 — В конце курса (recap)
slides.push({
  out: 'l07-final',
  build: () => recapSlide({
    title: 'В конце курса',
    cards: [
      { heading: 'Модули курса', items: ['Как устроен ИМ', 'Карта каналов', 'Email и репутация', 'Метрики'] },
      { heading: 'Что получите', items: ['Общую карту системы интернет-маркетинга', 'Понимание, когда какой канал применять', 'Базовый словарь метрик'] },
      { heading: 'Если захотите дальше', text: 'Отдельные курсы по таргету и аналитике, либо полная программа со скидкой по промокоду CAREERSTART.' },
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
