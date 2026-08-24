// Standalone presentation for Igor to read from while recording the Loom
// intro video for course 183097 ("Профессия таргетолог: с нуля до первой
// работы" — free course). NOT uploaded to Stepik — exported as a PDF for
// personal use only, screen-shared during recording. All labels are
// viewer-facing (this deck is shown on screen during the recording).
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
    margin-top: 18px; padding: 16px 20px; max-width: 820px;
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
      h1.big { font-size: 42px; font-weight: 800; color: #fff; line-height: 1.15; max-width: 920px; }
      p.sub { margin-top: 16px; font-size: 17px; color: rgba(255,255,255,0.9); max-width: 780px; }
    `;
    const html = `
      <div class="title-wrap">
        ${eyebrowHtml('Бесплатный курс')}
        <h1 class="big" style="color:#fff;">Профессия таргетолог: с нуля до первой работы</h1>
        <p class="sub">Чем занимается таргетолог на практике, как настраивать рекламу и как получить первую работу или клиентов.</p>
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
          <li>Больше 12 лет закупаю трафик, Head of User Acquisition</li>
          <li>Сам нанимаю таргетологов в команду и ставлю им задачи</li>
          <li>Знаю профессию с обеих сторон: и как специалист, и как тот, кто нанимает</li>
        </ul>
      </div>
    `;
    return wrap('', html, css);
  },
});

// 3 — Для кого этот курс
slides.push({
  out: 'l03-dlya-kogo',
  build: () => contentSlide('Для кого этот курс', 'Профессия без иллюзий — что реально входит в работу таргетолога', `
    <ul class="list-plain" style="margin-top:14px;max-width:820px;">
      <li>Для тех, кто хочет войти в профессию таргетолога с нуля</li>
      <li>Для предпринимателей, которые хотят вести рекламу самостоятельно</li>
      <li>Бесплатный курс, 6-8 часов — с практикой, а не только теорией</li>
      <li>7 модулей, в каждом — практическое задание и проверка знаний</li>
    </ul>
  `, 820),
});

// 4 — Программа: модули 1-4
slides.push({
  out: 'l04-programma-1',
  build: () => wrap('', `
    <div class="content-pad">
      ${eyebrowHtml('Программа курса · 1-4 из 7')}
      <h1 class="title" style="max-width:780px;">От основ до первых кампаний</h1>
      ${stepsNum([
        { h: 'Введение в профессию', p: 'Чем занимается таргетолог и с чего начать без единого рекламного кабинета' },
        { h: 'Основы таргетированной рекламы', p: 'Как устроен аукцион, виды таргетинга, сегментация аудитории' },
        { h: 'Настройка рекламных кампаний', p: 'Структура кампании, ставки, тестирование гипотез' },
        { h: 'Креативы, которые работают', p: 'Идеи, тексты объявлений, форматы и их тестирование' },
      ])}
    </div>
  `),
});

// 5 — Программа: модули 5-7
slides.push({
  out: 'l05-programma-2',
  build: () => wrap('', `
    <div class="content-pad">
      ${eyebrowHtml('Программа курса · 5-7 из 7')}
      <h1 class="title" style="max-width:780px;">От цифр к первой работе</h1>
      ${stepsNum([
        { h: 'Аналитика и оптимизация', p: 'CTR, CPC, CPL, CPA, ROI — решения на основе цифр, а не ощущений' },
        { h: 'Портфолио без бюджета', p: 'Как собрать портфолио и получить подтверждения квалификации без клиентов' },
        { h: 'Как найти работу или первых клиентов', p: 'Резюме, собеседование глазами того, кто его проводит, план на 30 и 90 дней' },
      ], 5)}
      ${highlightBox('Особенность курса', 'Модуль «Портфолио без бюджета» — то, чего обычно нет в других курсах: как показать реальные результаты работодателю, даже если у вас ещё не было ни одного платящего клиента.')}
    </div>
  `, highlightCss),
});

// 6 — Как устроен каждый модуль
slides.push({
  out: 'l06-kak-ustroen',
  build: () => contentSlide('Как устроен каждый модуль', 'Уроки → практика → проверка знаний', `
    <ul class="list-plain" style="margin-top:20px;max-width:820px;font-size:15px;">
      <li>Уроки по конкретным темам модуля, без воды</li>
      <li>Практическое задание в конце — применяете материал сразу, а не откладываете</li>
      <li>Тест на 10 вопросов — закрепляете материал перед следующим модулем</li>
    </ul>
  `, 820),
});

// 7 — В конце курса (recap)
slides.push({
  out: 'l07-final',
  build: () => recapSlide({
    title: 'В конце курса',
    cards: [
      { heading: 'Что получите', items: ['Понимание профессии без иллюзий', 'Портфолио без единого клиента', 'Резюме и уверенность на собеседовании'] },
      { heading: '7 модулей', text: 'От «кто такой таргетолог» до плана на первые 30 и 90 дней в профессии.' },
      { heading: 'Формат', text: '6-8 часов, практика в каждом модуле, тест на закрепление.' },
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
