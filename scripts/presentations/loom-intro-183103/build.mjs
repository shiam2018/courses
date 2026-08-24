// Standalone presentation for Igor to read from while recording the Loom
// intro video for course 183103 ("Собеседование в маркетинге: как получить
// работу мечты" — free lead-magnet course). NOT uploaded to Stepik — exported
// as a PDF for personal use only, screen-shared during recording. All labels
// are viewer-facing (this deck is shown on screen during the recording, not
// just a private cue sheet) — no "для записи в Loom" / "Тезисы ·" internal
// production notes anywhere.
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
        <h1 class="big" style="color:#fff;">Собеседование в маркетинге: как получить работу мечты</h1>
        <p class="sub">Как на самом деле устроен наём и как пройти каждый этап отбора осознанно, а не наугад.</p>
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
          <li>Маркетингом занимаюсь больше 12 лет</li>
          <li>Руковожу направлением User Acquisition</li>
          <li>Сам провожу собеседования маркетологов и принимаю решение о найме</li>
          <li>Знаю, как рекрутер и руководитель на самом деле выбирают кандидата — с обеих сторон стола</li>
        </ul>
      </div>
    `;
    return wrap('', html, css);
  },
});

// 3 — Для кого этот курс
slides.push({
  out: 'l03-dlya-kogo',
  build: () => contentSlide('Для кого этот курс', 'Смотрим на найм со стороны нанимающего менеджера', `
    <ul class="list-plain" style="margin-top:14px;max-width:820px;">
      <li>Для тех, кто ищет первую работу в интернет-маркетинге</li>
      <li>Для тех, кто меняет профессию или текущее место работы</li>
      <li>Бесплатный, короткий — 1-2 часа, без воды</li>
      <li>3 модуля + тест на 10 вопросов после каждого — для проверки, что материал усвоен</li>
    </ul>
  `, 820),
});

// 4 — Модуль 1: Портрет кандидата
slides.push({
  out: 'l04-modul-1',
  build: () => wrap('', `
    <div class="content-pad">
      ${eyebrowHtml('Модуль 1 из 3 · Портрет кандидата')}
      <h1 class="title" style="max-width:780px;">Как рекрутер и руководитель выбирают кандидата</h1>
      <ul class="list-plain" style="margin-top:14px;max-width:820px;">
        <li>Откуда берётся вакансия и что такое «портрет кандидата» глазами работодателя</li>
        <li>На что смотрят при найме джуниора — и в каком порядке</li>
        <li>Как сформировать собственный портрет соискателя и выбирать компанию осознанно</li>
      </ul>
      ${highlightBox('Пример из урока', `Реальный портрет вакансии: <b>Junior Digital Marketer</b>, e-commerce стартап. Must-have: основы интернет-маркетинга, Google Analytics, опыт ведения соцсетей. Зарплата: 50-70 тыс. — и почему до финала доходят единицы, даже с таким описанием.`)}
    </div>
  `, highlightCss),
});

// 5 — Модуль 2: Поиск работы
slides.push({
  out: 'l05-modul-2',
  build: () => wrap('', `
    <div class="content-pad">
      ${eyebrowHtml('Модуль 2 из 3 · Поиск работы')}
      <h1 class="title" style="max-width:780px;">Резюме и письмо, которые доходят до собеседования</h1>
      <ul class="list-plain" style="margin-top:14px;max-width:820px;">
        <li>Резюме: блок «о себе» по AIDA, фотография, чек-лист перед отправкой</li>
        <li>Сопроводительное письмо, которое не пересказывает резюме</li>
        <li>Где реально искать вакансии и на что смотреть в самом тексте вакансии</li>
      </ul>
      ${highlightBox('Разница на практике', `«Я творческий человек, мне нравится реклама» — <b>плохо</b>. «Начинающий маркетолог с базовыми навыками Google Analytics, умею планировать SMM-кампании» — <b>хорошо</b>. Разбираем, почему.`)}
    </div>
  `, highlightCss),
});

// 6 — Модуль 3: Собеседование и тестовое задание
slides.push({
  out: 'l06-modul-3',
  build: () => wrap('', `
    <div class="content-pad">
      ${eyebrowHtml('Модуль 3 из 3 · Собеседование и тестовое задание')}
      <h1 class="title" style="max-width:780px;">Весь путь отбора по порядку</h1>
      ${stepsNum([
        { h: 'Скрининг с HR', p: 'Первое впечатление и на что реально смотрит HR' },
        { h: 'Тестовое задание', p: 'Делать или нет, и как не провалить единственный шанс' },
        { h: 'Техническое собеседование', p: 'Что проверяют и как отвечать на незнакомые вопросы' },
        { h: 'Встреча с нанимающим менеджером', p: 'Финальный этап и разговор о зарплате' },
      ])}
    </div>
  `),
});

// 7 — Как лучше проходить курс
slides.push({
  out: 'l07-kak-prohodit',
  build: () => contentSlide('Как проходить курс', 'Коротко, по порядку, с практикой', `
    <ul class="list-plain" style="margin-top:20px;max-width:820px;font-size:15px;">
      <li>Уроки короткие — 5-10 минут на каждый, читаются за один присест</li>
      <li>Не пропускайте практические задания — именно они превращают теорию в готовое резюме и письмо</li>
      <li>После каждого модуля — тест на 10 вопросов: пройдите его, чтобы закрепить материал перед следующим модулем</li>
    </ul>
  `, 820),
});

// 8 — В конце курса (recap)
slides.push({
  out: 'l08-final',
  build: () => recapSlide({
    title: 'В конце курса',
    cards: [
      { heading: 'Модули курса', items: ['Портрет кандидата', 'Поиск работы', 'Собеседование и тестовое задание'] },
      { heading: 'Что получите', items: ['Понимание логики найма на каждом этапе', 'Резюме и письмо, готовые к откликам', 'Уверенность на собеседовании вместо страха'] },
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
