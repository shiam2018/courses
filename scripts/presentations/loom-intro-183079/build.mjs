// Standalone presentation for Igor to read from while recording the Loom
// intro video for course 183079 ("Введение в вайбкодинг" — free, standalone
// course, no funnel into 94834). NOT uploaded to Stepik — exported as a PDF
// for personal use only, screen-shared during recording.
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
        <h1 class="big" style="color:#fff;">Введение в вайб-кодинг</h1>
        <p class="sub">Программирование с AI-агентами без глубокого знания кода — на реальном опыте, а не на рекламе сервисов.</p>
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
          <li>Каждый день программирую через Claude Code и Codex</li>
          <li>Сайт cleanor.app и вся экосистема вокруг него построены через вайб-кодинг</li>
          <li>Это реальная рабочая практика, а не разовый эксперимент для курса</li>
        </ul>
      </div>
    `;
    return wrap('', html, css);
  },
});

// 3 — Для кого этот курс
slides.push({
  out: 'l03-dlya-kogo',
  build: () => contentSlide('Для кого этот курс', 'Текст и шпаргалки промптов, а не видео с устаревающим интерфейсом', `
    <ul class="list-plain" style="margin-top:14px;max-width:820px;">
      <li>Для тех, кто не пишет код, но хочет собрать сайт, бота или сервис для своей идеи</li>
      <li>Для тех, кто немного программирует и хочет работать быстрее с AI-агентом</li>
      <li>Бесплатный курс, 1,5-2 часа теории, дальше — ваш собственный проект</li>
      <li>4 модуля, тест на 10 вопросов после каждого</li>
    </ul>
  `, 820),
});

// 4 — Программа курса
slides.push({
  out: 'l04-programma',
  build: () => contentSlide('Программа курса', 'От принципов до задеплоенного проекта', stepsNum([
    { h: 'Что такое вайб-кодинг', p: 'Когда он реально работает и как думает AI-агент' },
    { h: 'Инструменты: как выбрать', p: 'Claude Code, Codex, Cursor, YandexGPT' },
    { h: 'Как работать с агентом', p: 'Формулировка задач, маленькие шаги, технический долг' },
    { h: 'От прототипа к продукту', p: 'Кейс cleanor.app, честные расходы, деплой' },
  ]), 820),
});

// 5 — Чем этот курс отличается
slides.push({
  out: 'l05-honest',
  build: () => wrap('', `
    <div class="content-pad">
      ${eyebrowHtml('Чем этот курс отличается')}
      <h1 class="title" style="max-width:780px;">Шпаргалка готовых промптов в каждом уроке</h1>
      <ul class="list-plain" style="margin-top:14px;max-width:820px;">
        <li>Никакого видео с интерфейсом, который переименуют через полгода</li>
        <li>Принципы работы с агентом вместо конкретных пунктов меню</li>
        <li>Честные цифры по расходам — без занижения</li>
      </ul>
      ${highlightBox('Готовые промпты', 'Каждый урок заканчивается блоком с промптами, которые можно сразу скопировать и вставить в диалог с агентом — не нужно запоминать формулировки на слух из видео.')}
    </div>
  `, highlightCss),
});

// 6 — Как лучше проходить курс
slides.push({
  out: 'l06-kak-prohodit',
  build: () => contentSlide('Как лучше проходить', 'Читайте — и сразу пробуйте на своей задаче', `
    <ul class="list-plain" style="margin-top:20px;max-width:820px;font-size:15px;">
      <li>Уроки короткие — 5-10 минут на каждый</li>
      <li>Пробуйте промпты из шпаргалки сразу в своём агенте, а не только читайте</li>
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
      { heading: 'Модули курса', items: ['Что такое вайб-кодинг', 'Инструменты', 'Работа с агентом', 'От прототипа к продукту'] },
      { heading: 'Что получите', items: ['Понимание, когда вайб-кодинг реально работает', 'Навык ставить задачу агенту', 'Шпаргалку промптов на каждый день'] },
      { heading: 'Дальше', text: 'Лучший способ закрепить — начать свой собственный проект.' },
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
