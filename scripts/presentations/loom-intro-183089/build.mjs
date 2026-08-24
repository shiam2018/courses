// Standalone presentation for Igor to read from while recording the Loom
// intro video for course 183089 ("Английский для маркетолога: словарь и
// рабочие ситуации" — free, standalone course, soft cross-link to 183103).
// NOT uploaded to Stepik — exported as a PDF for personal use only,
// screen-shared during recording.
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
        <h1 class="big" style="color:#fff;">Английский для маркетолога: словарь и рабочие ситуации</h1>
        <p class="sub">Не грамматика с нуля, а рабочая лексика: поддержка, партнёры, документация, пресса, конкуренты, реклама и собеседование.</p>
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
          <li>12 лет в интернет-маркетинге, руковожу направлением User Acquisition</li>
          <li>Каждый день работаю с англоязычной документацией рекламных платформ и зарубежными партнёрами</li>
          <li>Курс — практический словарь и фразы, а не теория грамматики</li>
        </ul>
      </div>
    `;
    return wrap('', html, css);
  },
});

// 3 — Для кого этот курс
slides.push({
  out: 'l03-dlya-kogo',
  build: () => contentSlide('Для кого этот курс', 'Для тех, у кого английский уже есть, но не хватает рабочей лексики', `
    <ul class="list-plain" style="margin-top:14px;max-width:820px;">
      <li>Английский от Pre-Intermediate — курс не учит алфавит и грамматику с нуля</li>
      <li>Для маркетологов, которым нужна лексика метрик, каналов и деловой переписки</li>
      <li>Бесплатный курс, 2-2,5 часа</li>
      <li>6 модулей, тест на 10 вопросов после каждого</li>
    </ul>
  `, 820),
});

// 4 — Программа курса
slides.push({
  out: 'l04-programma',
  build: () => contentSlide('Программа курса', 'От мотивации до собеседования на английском', stepsNum([
    { h: 'Зачем маркетологу английский', p: 'Восемь рабочих ситуаций и влияние на карьеру' },
    { h: 'Словарь: метрики и каналы', p: '35+ терминов с переводом и примерами' },
    { h: 'Деловое общение', p: 'Готовые фразы для поддержки, партнёров, команд' },
    { h: 'Чтение на английском', p: 'Документация, пресса, сайты конкурентов' },
    { h: 'Ошибки в рекламе и на сайте', p: 'Ложные друзья, кальки, чек-лист проверки' },
    { h: 'Собеседование на английском', p: 'Рассказ о себе, кейсы по STAR, разговор об оффере' },
  ]), 820),
});

// 5 — Чем этот курс отличается
slides.push({
  out: 'l05-honest',
  build: () => wrap('', `
    <div class="content-pad">
      ${eyebrowHtml('Чем этот курс отличается')}
      <h1 class="title" style="max-width:780px;">Не грамматика, а конкретные рабочие ситуации</h1>
      <ul class="list-plain" style="margin-top:14px;max-width:820px;">
        <li>Каждый урок — таблица терминов или готовых фраз, а не теория</li>
        <li>Все примеры — из реального маркетингового контекста</li>
        <li>Отдельный модуль про собеседование на английском — то, чего обычно нет в языковых курсах</li>
      </ul>
      ${highlightBox('Готовые фразы', 'Фразы для переписки с поддержкой, партнёрами и командами можно скопировать и использовать сразу — без адаптации.')}
    </div>
  `, highlightCss),
});

// 6 — Как лучше проходить курс
slides.push({
  out: 'l06-kak-prohodit',
  build: () => contentSlide('Как лучше проходить', 'Читайте — и сразу используйте фразы в реальной переписке', `
    <ul class="list-plain" style="margin-top:20px;max-width:820px;font-size:15px;">
      <li>Берите 5 терминов за раз, а не все 35+ сразу</li>
      <li>Пробуйте готовые фразы в реальном письме или сообщении на этой неделе</li>
      <li>После каждого модуля — тест на 10 вопросов</li>
    </ul>
  `, 820),
});

// 7 — В конце курса (recap)
slides.push({
  out: 'l07-final',
  build: () => recapSlide({
    title: 'В конце курса',
    cards: [
      { heading: 'Модули курса', items: ['Зачем нужен английский', 'Словарь метрик и каналов', 'Деловое общение', 'Чтение на английском', 'Ошибки в рекламе', 'Собеседование'] },
      { heading: 'Что получите', items: ['Рабочий словарь на 35+ терминов', 'Готовые фразы для переписки', 'Структуру ответов на собеседовании'] },
      { heading: 'Дальше', text: 'Возьмите один реальный текст и перепишите его с фразами из курса — это закрепляет быстрее всего.' },
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
