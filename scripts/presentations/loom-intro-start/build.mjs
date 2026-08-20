// Standalone presentation for Igor to read from while recording the Loom
// intro video for the course. NOT uploaded to Stepik — exported as a PDF
// for personal use only. Content sourced directly from the "Старт" module
// lessons (Кто автор, Сколько зарабатывает, Чему нужно научиться, Что вас
// ждёт на курсе), which already spells out the module/lesson/practice/quiz
// format in detail.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  BRAND, wrap, eyebrowHtml, waveClipPath, recapSlide, CANVAS_W, CANVAS_H,
} from '../../slide_template.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ASSETS = path.resolve(__dirname, '..', '..', '..', 'assets', 'generated', 'loom-intro-start');
const OUT_DIR = path.resolve(__dirname, 'out');
fs.mkdirSync(ASSETS, { recursive: true });
fs.mkdirSync(OUT_DIR, { recursive: true });
// Slides 4 and 6 intentionally reuse already-rendered PNGs from the "Старт"
// Stepik module (same career-ladder / program-overview visuals) — copy them
// in before running render_batch.mjs, see README note at bottom of this file.
const REUSE_SRC = path.resolve(__dirname, '..', '..', 'slide-sources', 'start-module', 'out');

function contentSlide(eyebrow, title, innerHtml, titleMaxWidth = 640) {
  return wrap('', `
    <div class="content-pad">
      ${eyebrowHtml(eyebrow)}
      <h1 class="title" style="max-width:${titleMaxWidth}px;">${title}</h1>
      ${innerHtml}
    </div>
  `);
}

function stepsNum(items) {
  return `<div class="steps-num" style="max-width:840px;">${items.map((it, i) => `
    <div class="step-num-item"><div class="step-num-chip">${i + 1}</div><div class="step-num-body"><h4>${it.h}</h4>${it.p ? `<p>${it.p}</p>` : ''}</div></div>
  `).join('')}</div>`;
}

function colGrid(cards, maxWidth = 960) {
  return `<div class="col-grid" style="margin-top:22px;max-width:${maxWidth}px;">${cards.map((c) => `
    <div class="col-card">
      <h3>${c.h}</h3>
      ${c.items ? `<ul>${c.items.map((i) => `<li>${i}</li>`).join('')}</ul>` : `<p style="font-size:12.5px;color:${BRAND.bodyGray};">${c.p}</p>`}
    </div>
  `).join('')}</div>`;
}

const slides = [];

// 1 — Title
slides.push({
  out: 'l01-title',
  build: () => {
    const css = `
      .title-wrap { position: relative; height: 100%; padding: 60px 64px; display: flex; flex-direction: column; justify-content: center; }
      h1.big { font-size: 46px; font-weight: 800; color: #fff; line-height: 1.15; max-width: 900px; }
      p.sub { margin-top: 16px; font-size: 17px; color: rgba(255,255,255,0.9); max-width: 760px; }
    `;
    const html = `
      <div class="title-wrap">
        ${eyebrowHtml('Видео-введение · для записи в Loom')}
        <h1 class="big" style="color:#fff;">Интернет-Маркетолог: Старт Карьеры</h1>
        <p class="sub">Знакомство с курсом: кто автор, сколько можно зарабатывать, что нужно освоить и как устроено обучение.</p>
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
      <div class="avtor-photo-wrap"><img src="file://${ASSETS}/main-png-2.png"></div>
      <div class="avtor-content">
        ${eyebrowHtml('Тезисы · Кто автор')}
        <h1 class="title" style="max-width:600px;">Игорь Шеньшин</h1>
        <ul class="list-plain" style="margin-top:12px;font-size:13px;">
          <li>Маркетингом занимаюсь больше 12 лет</li>
          <li>Специализация: user acquisition и платный трафик для мобильных приложений</li>
          <li>Запускал кампании в Google Ads, TikTok Ads на рынках США, Европы, России, Турции, СНГ</li>
          <li>Строил атрибуцию (включая SKAdNetwork), аналитику и креативные команды с нуля</li>
          <li>Data-driven подход: аналитика как основа эффективного маркетинга</li>
        </ul>
        <p class="body-text" style="margin-top:10px;font-size:12px;font-weight:700;">Сказать вслух: где искать меня дальше (LinkedIn, Telegram-канал shenshin.co, YouTube) и куда писать по сотрудничеству.</p>
      </div>
    `;
    return wrap('', html, css);
  },
});

// 3 — Что вас ждёт: обещание курса
slides.push({
  out: 'l03-obeshanie-kursa',
  build: () => contentSlide('Тезисы · Обещание курса', 'Это не теория. Это система подготовки', `
    <p class="body-text" style="margin-top:10px;max-width:820px;">Пройдём путь от новичка до интернет-маркетолога: навыки, знания, инструменты, портфолио и резюме, достаточные для выхода на рынок труда.</p>
    <ul class="list-plain" style="margin-top:14px;max-width:820px;">
      <li>Честно: мы не гарантируем трудоустройство — это зависит от рынка и ваших действий</li>
      <li>Мы гарантируем качество материалов: сами прошли курс и выполнили все задания</li>
      <li>Тезис для лекции: «пройдёте весь путь, будете прокачаны лучше 90% соискателей на стартовые позиции»</li>
    </ul>
  `, 820),
});

// 4 — Карьера в маркетинге (reuse the already-built visual)
slides.push({
  out: 'l04-kariera',
  reuse: 'start-02-kariera-v-marketinge.png',
});

// 5 — Портрет кандидата и путь найма (condensed talking points, not the full 22-item list)
slides.push({
  out: 'l05-portret-i-najm',
  build: () => contentSlide('Тезисы · Чему нужно научиться', 'Что ищут работодатели', colGrid([
    { h: 'Хард-скиллы', items: ['Целевая аудитория и аналитика', 'Рекламные каналы: контекст, таргет, SEO, SMM', 'Работа с CRM и креативами'] },
    { h: 'Софт-скиллы', items: ['Инициативность и адаптивность', 'Умение планировать, data driven', 'Командная работа, приятное общение'] },
    { h: 'Путь найма (5 шагов)', items: ['Отклик → Скрининг → Тестовое → Техническое → Менеджер'] },
  ], 1000), 820),
});

// 6 — Программа курса (reuse the already-built visual)
slides.push({
  out: 'l06-programma',
  reuse: 'start-05-programma-kursa.png',
});

// 7 — Как устроен каждый урок (4 шага)
slides.push({
  out: 'l07-kak-ustroen-urok',
  build: () => contentSlide('Тезисы · Формат обучения', 'Каждый урок: 4 шага', stepsNum([
    { h: 'Теория', p: 'Краткое изложение важной информации, без которой не выполнить задание.' },
    { h: 'Упражнение', p: 'Практическое задание на закрепление навыка, по шаблону или инструкции.' },
    { h: 'Пример решения', p: 'Образец выполненного задания, чтобы свериться с подходом.' },
    { h: 'Итоги урока', p: 'Ключевые определения, ссылки и строчка для резюме.' },
  ]), 700),
});

// 8 — Практическое задание модуля
slides.push({
  out: 'l08-praktika',
  build: () => contentSlide('Тезисы · Практика', 'Практическое задание модуля', `
    <p class="body-text" style="margin-top:10px;max-width:820px;">После всех уроков модуля: объёмная задача, объединяющая пройденные темы. Приближена к реальным рабочим задачам первых месяцев на позиции.</p>
    <p class="body-text" style="margin-top:14px;max-width:820px;font-weight:700;color:${BRAND.ink};">Результат становится частью итогового проекта — того, что можно будет показать и аргументированно разобрать на собеседовании.</p>
  `, 820),
});

// 9 — Итоги модуля и проверка знаний
slides.push({
  out: 'l09-itogi-i-proverka',
  build: () => contentSlide('Тезисы · Итоги и проверка знаний', 'Итоги модуля → подготовка к собеседованию', `
    ${colGrid([
      { h: 'Итоги модуля', items: ['Повторение ключевых терминов', 'Список полезных ссылок и материалов', 'Что добавить в резюме', 'Рекомендованная литература'] },
      { h: 'Подготовка к собеседованию', items: ['15 вопросов по теме модуля', 'Рекомендации, как отвечать', 'Совет: тренироваться вслух заранее'] },
    ])}
  `, 900),
});

// 10 — Как мы учим: поддержка
slides.push({
  out: 'l10-podderzhka',
  build: () => contentSlide('Тезисы · Поддержка', 'Пошагово, с поддержкой и обратной связью', `
    <ul class="list-plain" style="margin-top:20px;max-width:820px;font-size:15px;">
      <li>Пошаговая инструкция к каждому упражнению</li>
      <li>Пример выполнения, на который можно опереться</li>
      <li>Чат участников курса: обсуждение заданий, советы, поддержка (сказать: обязательно вступить)</li>
    </ul>
  `, 820),
});

// 11 — Финал: 4 модуля + что в конце
slides.push({
  out: 'l11-final',
  build: () => recapSlide({
    title: 'В конце курса',
    cards: [
      { heading: 'Модули курса', items: ['База', 'Инструменты', 'Источники трафика', 'Работа'] },
      { heading: 'Что получите', items: ['Итоговую проверку знаний', 'Сертификат', 'Резюме и проект'] },
      { heading: 'Итог', text: 'Станете кандидатом, готовым к найму.' },
    ],
    footer: 'Для лекции: закончить фразой-приглашением начать первый модуль прямо сейчас.',
  }),
});

fs.writeFileSync(path.join(OUT_DIR, '_manifest.json'), JSON.stringify(slides.map(({ build, ...s }) => s), null, 2));
for (const s of slides) {
  if (s.build) fs.writeFileSync(path.join(OUT_DIR, `${s.out}.html`), s.build());
  if (s.reuse) fs.copyFileSync(path.join(REUSE_SRC, s.reuse), path.join(OUT_DIR, `${s.out}.png`));
}
console.log(`${slides.length} slides built. Now run:`);
console.log(`  node ${path.relative(process.cwd(), path.resolve(__dirname, '..', '..', 'render_batch.mjs'))} ${path.relative(process.cwd(), OUT_DIR)} ${path.relative(process.cwd(), OUT_DIR)} 1200 700`);
console.log(`  python3 ${path.relative(process.cwd(), path.join(__dirname, 'build_pdf.py'))}`);
