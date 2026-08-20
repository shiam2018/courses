// Standalone presentation for Igor to read from while recording the Loom
// intro video for the "Введение в модуль База" lesson (currently a bare
// video-slot lesson, 02_База/01_Введение.../01_video.json). NOT uploaded to
// Stepik. Content sourced directly from 02_База/02_Что_будет_в_модуле_База,
// which already spells out the module's promise/topics/skills/structure/
// practice/quiz in full prose.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  BRAND, wrap, eyebrowHtml, recapSlide,
} from '../../slide_template.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
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

const slides = [];

// 1 — Title
slides.push({
  out: 'b01-title',
  build: () => {
    const css = `
      .title-wrap { position: relative; height: 100%; padding: 60px 64px; display: flex; flex-direction: column; justify-content: center; }
      h1.big { font-size: 46px; font-weight: 800; color: #fff; line-height: 1.15; max-width: 900px; }
      p.sub { margin-top: 16px; font-size: 17px; color: rgba(255,255,255,0.9); max-width: 780px; }
    `;
    const html = `
      <div class="title-wrap">
        ${eyebrowHtml('Видео-введение · для записи в Loom')}
        <h1 class="big" style="color:#fff;">Модуль «База»</h1>
        <p class="sub">Заложим фундамент интернет-маркетинга: от ключевых понятий до собственного маркетингового брифа.</p>
      </div>
    `;
    return wrap('on-coral', html, css);
  },
});

// 2 — Что вы узнаете
slides.push({
  out: 'b02-chto-uznaete',
  build: () => contentSlide('Тезисы · Обещание модуля', 'Что вы узнаете в этом модуле', `
    <p class="body-text" style="margin-top:10px;max-width:840px;">Даже если вы никогда не занимались маркетингом: этот модуль даёт фундамент, без которого невозможно стать профессионалом.</p>
    <ul class="list-plain" style="margin-top:14px;max-width:840px;">
      <li>Что такое интернет-маркетинг и чем он отличается от традиционного</li>
      <li>Как определить целевую аудиторию и создать портрет идеального клиента</li>
      <li>Как работает воронка продаж и карта пути клиента (CJM)</li>
      <li>Какие бывают каналы привлечения: платные, собственные, заслуженные</li>
      <li>Как оценивать эффективность маркетинга с помощью метрик</li>
      <li>Как составить маркетинговый бриф для реального проекта</li>
    </ul>
  `, 840),
});

// 3 — Чему вы научитесь
slides.push({
  out: 'b03-chemu-nauchites',
  build: () => contentSlide('Тезисы · Навыки', 'После модуля вы сможете', `
    <ul class="list-plain" style="margin-top:20px;max-width:840px;font-size:15px;">
      <li>Говорить на профессиональном языке маркетологов</li>
      <li>Анализировать целевую аудиторию и создавать сегменты</li>
      <li>Составлять воронку продаж и карту пути клиента</li>
      <li>Выбирать оптимальные каналы продвижения для разных задач</li>
      <li>Рассчитывать основные маркетинговые метрики (CTR, CPA, CR, ROMI)</li>
      <li>Создавать маркетинговый бриф для сайта и продвижения</li>
    </ul>
  `, 700),
});

// 4 — Структура модуля (8 steps, two columns)
slides.push({
  out: 'b04-struktura',
  build: () => {
    const left = [
      { h: 'Введение в интернет-маркетинг', p: 'Базовые понятия, специфика онлайна, тренды.' },
      { h: 'Целевая аудитория', p: 'Сегментация, портрет клиента, боли и потребности.' },
      { h: 'Воронка продаж и CJM', p: 'Этапы решения, точки контакта, триггеры и барьеры.' },
      { h: 'Каналы привлечения', p: 'Платные, собственные, заслуженные, маркетинговый микс.' },
    ];
    const right = [
      { h: 'Метрики эффективности', p: 'KPI, OKR и ROI, перформанс и брендформанс.' },
      { h: 'Практическое задание', p: 'Составление брифа для вашего проекта.' },
      { h: 'Основные определения', p: 'Глоссарий и повторение ключевых понятий.' },
      { h: 'Проверка знаний', p: 'Тест для закрепления материала.' },
    ];
    const css = `.struktura-cols { display: flex; gap: 40px; margin-top: 20px; } .struktura-cols .steps-num { flex: 1; max-width: none; }`;
    const html = `
      ${eyebrowHtml('Тезисы · Формат обучения')}
      <h1 class="title" style="max-width:760px;">Структура модуля: 8 шагов</h1>
      <div class="struktura-cols">${stepsNum(left, 1)}${stepsNum(right, 5)}</div>
    `;
    return wrap('', `<div class="content-pad">${html}</div>`, css);
  },
});

// 5 — Практическое задание модуля
slides.push({
  out: 'b05-praktika',
  build: () => contentSlide('Тезисы · Практика', 'Главный результат: маркетинговый бриф', `
    <p class="body-text" style="margin-top:10px;max-width:840px;">Профессиональный маркетинговый бриф для вашего проекта — документ, который ляжет в основу дальнейшей работы на курсе.</p>
    <p class="body-text" style="margin-top:14px;max-width:840px;font-weight:700;color:${BRAND.ink};">В каждом уроке — небольшое упражнение, из которых соберётся бриф:</p>
    <ul class="list-plain" style="margin-top:10px;max-width:840px;">
      <li>Определите свою целевую аудиторию</li>
      <li>Создадите карту пути клиента</li>
      <li>Составите маркетинговый микс каналов</li>
      <li>Подготовите мини-медиаплан</li>
    </ul>
  `, 840),
});

// 6 — Итоги модуля и проверка знаний
slides.push({
  out: 'b06-itogi-i-proverka',
  build: () => contentSlide('Тезисы · Итоги и проверка знаний', 'Итоги модуля → проверка знаний', `
    <div class="col-grid" style="margin-top:22px;max-width:900px;">
      <div class="col-card"><h3>Итоги модуля</h3><ul><li>Повторение ключевых определений</li><li>Полезные ссылки и материалы</li><li>Что добавить в резюме</li></ul></div>
      <div class="col-card"><h3>Проверка знаний</h3><ul><li>Тест из 15 вопросов</li><li>В каждом один верный ответ</li><li>Несколько неверных — с юмором</li></ul></div>
    </div>
  `, 900),
});

// 7 — Готовы начать? (closing, coral)
slides.push({
  out: 'b07-final',
  build: () => recapSlide({
    title: 'Готовы начать?',
    cards: [
      { heading: 'Это ваш первый шаг', text: 'Даже если вы новичок — объясним все термины простым языком и дадим практические инструменты.' },
      { heading: 'Без диплома, с планом', text: 'Интернет-маркетинг — профессия, где можно начать с чёткого плана обучения и практики.' },
      { heading: 'Итог модуля', text: 'Фундамент знаний, на котором можно строить карьеру или развивать свой бизнес.' },
    ],
    footer: 'Для лекции: закончить словом «Приступим?» и переходом к первому уроку.',
  }),
});

fs.writeFileSync(path.join(OUT_DIR, '_manifest.json'), JSON.stringify(slides.map(({ build, ...s }) => s), null, 2));
for (const s of slides) {
  if (s.build) fs.writeFileSync(path.join(OUT_DIR, `${s.out}.html`), s.build());
}
console.log(`${slides.length} slides built`);
