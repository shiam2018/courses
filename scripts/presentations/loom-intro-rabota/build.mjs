// Standalone presentation for Igor to read from while recording the Loom
// intro video for "Введение в модуль Работа" (bare video-slot lesson).
// NOT uploaded to Stepik. Content sourced from
// 05_Работа/02_Что_будет_в_модуле_Работа/01_text.html.
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
  out: 'r01-title',
  build: () => {
    const css = `
      .title-wrap { position: relative; height: 100%; padding: 60px 64px; display: flex; flex-direction: column; justify-content: center; }
      h1.big { font-size: 44px; font-weight: 800; color: #fff; line-height: 1.15; max-width: 900px; }
      p.sub { margin-top: 16px; font-size: 17px; color: rgba(255,255,255,0.9); max-width: 800px; }
    `;
    const html = `
      <div class="title-wrap">
        ${eyebrowHtml('Видео-введение · для записи в Loom')}
        <h1 class="big" style="color:#fff;">Модуль «Работа»</h1>
        <p class="sub">От резюме до оффера: как найти первую работу интернет-маркетологом и уверенно пройти отбор.</p>
      </div>
    `;
    return wrap('on-coral', html, css);
  },
});

// 2 — Из чего состоит модуль (9 steps, two columns)
slides.push({
  out: 'r02-struktura',
  build: () => {
    const left = [
      { h: 'Портрет кандидата', p: 'Как работодатели выбирают маркетологов и что ищут на самом деле.' },
      { h: 'Составление резюме', p: 'Документ, который заставит HR пригласить на собеседование.' },
      { h: 'Поиск вакансий', p: 'Актуальные источники и стратегии поиска работы.' },
      { h: 'Отклик на вакансию', p: 'Сопроводительное письмо, которое выделит среди конкурентов.' },
      { h: 'Собеседование', p: 'Как уверенно отвечать HR и руководителю.' },
    ];
    const right = [
      { h: 'Практика', p: 'Резюме, отклики, тестовое, техническое собеседование.' },
      { h: 'Тестовое задание', p: 'Как выполнить и презентовать, чтобы получить оффер.' },
      { h: 'Основные термины', p: 'Профессиональный словарь маркетолога.' },
      { h: 'Проверка знаний', p: 'Тест для закрепления и подготовки к интервью.' },
    ];
    const css = `.struktura-cols { display: flex; gap: 40px; margin-top: 20px; } .struktura-cols .steps-num { flex: 1; max-width: none; }`;
    const html = `
      ${eyebrowHtml('Тезисы · Формат обучения')}
      <h1 class="title" style="max-width:760px;">Из чего состоит модуль</h1>
      <div class="struktura-cols">${stepsNum(left, 1)}${stepsNum(right, 6)}</div>
    `;
    return wrap('', `<div class="content-pad">${html}</div>`, css);
  },
});

// 3 — Подход к поиску работы (mindset)
slides.push({
  out: 'r03-podhod',
  build: () => contentSlide('Тезисы · Настрой', 'Осознанность и постоянное развитие', `
    <p class="body-text" style="margin-top:10px;max-width:860px;">Теория — только начало. Реальный вызов: пройти отбор и стать частью команды. Вас ждёт череда собеседований, отказов и возвращений к поиску — это нормально, через это проходят все.</p>
    <p class="body-text" style="margin-top:14px;max-width:860px;font-weight:700;color:${BRAND.ink};">Вы на территории работодателя: предлагаете свои навыки, а он решает, во что инвестировать. После каждого собеседования — анализируйте ошибки, дорабатывайте резюме, адаптируйте подход.</p>
    <p class="body-text" style="margin-top:14px;max-width:860px;">Софтскиллы — второй по значимости фактор успеха: как вы презентуете себя, реагируете на неожиданные вопросы, принимаете обратную связь.</p>
  `, 860),
});

// 4 — Чему вы научитесь
slides.push({
  out: 'r04-chemu-nauchites',
  build: () => contentSlide('Тезисы · Навыки', 'После модуля вы сможете', `
    <ul class="list-plain" style="margin-top:16px;max-width:860px;font-size:14px;">
      <li>Создавать резюме, которое проходит ATS-фильтры и привлекает рекрутеров</li>
      <li>Эффективно искать вакансии, включая скрытые каналы поиска</li>
      <li>Писать персонализированные сопроводительные письма</li>
      <li>Уверенно проходить собеседования с HR и руководителями</li>
      <li>Блестяще выполнять тестовые задания</li>
      <li>Свободно оперировать профессиональной терминологией</li>
      <li>Психологически готовиться к процессу поиска работы</li>
    </ul>
  `, 780),
});

// 5 — Что нужно, чтобы получить работу (реальность зарплат + путь роста)
slides.push({
  out: 'r05-realnost',
  build: () => contentSlide('Тезисы · Реальность рынка', 'Что нужно, чтобы получить работу', `
    <p class="body-text" style="margin-top:10px;max-width:860px;">Путь: прочная база знаний → практический опыт (можно стажировка или начальная позиция) → постоянное развитие.</p>
    <div class="stat-row" style="max-width:640px;margin-top:16px;">
      <div class="stat-card"><b>50–70к ₽</b><span>типичный доход junior-позиции</span></div>
    </div>
    <p class="body-text" style="margin-top:16px;max-width:860px;font-weight:700;color:${BRAND.ink};">Честно: начальный доход может разочаровать. Но после года опыта карьерный рост и доход растут значительно быстрее.</p>
    <p class="body-text" style="margin-top:10px;max-width:860px;">Ключ: доп. курсы, практические навыки, софт-скиллы, новые инструменты, английский язык.</p>
  `, 860),
});

// 6 — Что вас ждёт на практике
slides.push({
  out: 'r06-praktika',
  build: () => contentSlide('Тезисы · Практика', 'Что вас ждёт на практике', `
    ${stepsNum([
      { h: 'Резюме и сопроводительные', p: 'Создадите резюме, потренируетесь на примерах вымышленных компаний.' },
      { h: 'Реальные отклики', p: 'Найдёте вакансии, заведёте трекер, отправите персонализированные отклики.' },
      { h: 'Тестовое задание', p: 'Рассчитаете метрики кампании, потренируетесь замечать ошибки в данных.' },
      { h: 'Собеседование', p: 'Подготовите ответы для технического интервью и обсуждения зарплаты.' },
    ])}
    <p class="body-text" style="margin-top:14px;max-width:860px;font-weight:700;color:${BRAND.ink};">В конце модуля — итоговый тест: проверка знаний и подготовка к реальным интервью.</p>
  `, 820),
});

// 7 — Полезные ресурсы
slides.push({
  out: 'r07-resursy',
  build: () => contentSlide('Тезисы · Ресурсы', 'Где искать работу', `
    <div class="col-grid" style="margin-top:22px;max-width:1000px;">
      <div class="col-card"><h3>HeadHunter</h3><p style="font-size:12.5px;color:${BRAND.bodyGray};">Крупнейшая платформа с вакансиями в маркетинге</p></div>
      <div class="col-card"><h3>Хабр Карьера</h3><p style="font-size:12.5px;color:${BRAND.bodyGray};">Для IT-специалистов и маркетологов, техкомпании</p></div>
      <div class="col-card"><h3>Career.ru</h3><p style="font-size:12.5px;color:${BRAND.bodyGray};">Для молодых специалистов: стажировки, junior</p></div>
      <div class="col-card"><h3>LinkedIn</h3><p style="font-size:12.5px;color:${BRAND.bodyGray};">Международная сеть, работа в глобальных компаниях</p></div>
      <div class="col-card"><h3>VC.ru</h3><p style="font-size:12.5px;color:${BRAND.bodyGray};">Вакансии от стартапов и диджитал-компаний</p></div>
      <div class="col-card"><h3>Marketing jobs</h3><p style="font-size:12.5px;color:${BRAND.bodyGray};">Telegram-канал с вакансиями в диджитале</p></div>
    </div>
  `, 900),
});

// 8 — Начнём! (closing, coral)
slides.push({
  out: 'r08-final',
  build: () => recapSlide({
    title: 'Начнём!',
    cards: [
      { heading: 'Первый урок', text: 'Портрет кандидата: как HR и руководители на самом деле выбирают маркетологов.' },
      { heading: 'Реальный настрой', text: 'Отказы — это нормально. Каждое собеседование делает вас сильнее.' },
      { heading: 'Итог модуля', text: 'Резюме, отклики, готовность к тестовым и собеседованиям — реальные инструменты для трудоустройства.' },
    ],
    footer: 'Для лекции: закончить фразой «Готовы к первому шагу к вашей карьере в маркетинге? Поехали!»',
  }),
});

fs.writeFileSync(path.join(OUT_DIR, '_manifest.json'), JSON.stringify(slides.map(({ build, ...s }) => s), null, 2));
for (const s of slides) {
  if (s.build) fs.writeFileSync(path.join(OUT_DIR, `${s.out}.html`), s.build());
}
console.log(`${slides.length} slides built`);
