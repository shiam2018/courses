import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  BRAND, wrap, signatureHtml, eyebrowHtml, waveClipPath, recapSlide, CANVAS_W, CANVAS_H,
} from '../../slide_template.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Generated images live in assets/generated/baza-module/ (repo-committed,
// reused across runs — gen_image.mjs calls are skipped when the file exists).
const ASSETS = path.resolve(__dirname, '..', '..', '..', 'assets', 'generated', 'baza-module');
// Rendered HTML/PNG/WebP output is build ephemera — regenerate with run.mjs.
const OUT_DIR = path.resolve(__dirname, 'out');
fs.mkdirSync(ASSETS, { recursive: true });
fs.mkdirSync(OUT_DIR, { recursive: true });

function photoWave(photoFile, eyebrow, title, innerHtml, { photoFrac = 0.42, amplitude = 60, titleMaxWidth = null } = {}) {
  const clip = waveClipPath(photoFrac, amplitude);
  const leftPx = Math.round(CANVAS_W * photoFrac) + 56;
  const widthPx = CANVAS_W - leftPx - 40;
  const css = `
    .photo-panel { position: absolute; top: 0; left: 0; width: ${CANVAS_W}px; height: ${CANVAS_H}px; object-fit: cover; clip-path: path('${clip}'); }
    .content1 { position: absolute; top: 0; left: ${leftPx}px; width: ${widthPx}px; height: ${CANVAS_H}px; display: flex; flex-direction: column; justify-content: center; gap: 4px; }
  `;
  const html = `
    <img class="photo-panel" src="file://${ASSETS}/${photoFile}">
    ${signatureHtml(false)}
    <div class="content1">
      ${eyebrowHtml(eyebrow)}
      <h1 class="title"${titleMaxWidth ? ` style="max-width:${titleMaxWidth}px;"` : ''}>${title}</h1>
      ${innerHtml}
    </div>
  `;
  return { css, html };
}

function contentSlide(eyebrow, title, innerHtml, titleMaxWidth = 640) {
  return `
    ${signatureHtml(false)}
    <div class="content-pad">
      ${eyebrowHtml(eyebrow)}
      <h1 class="title" style="max-width:${titleMaxWidth}px;">${title}</h1>
      ${innerHtml}
    </div>
  `;
}

const slides = [];

// slide 2 — Содержание модуля
slides.push({
  out: 'slide-02-soderzhanie-modulya',
  target: 'stepik-sync/94834/raw/02_База/02_Что_будет_в_модуле_База/01_text.html',
  old: 'Soderzhanie-modulya.png',
  alt: 'Содержание модуля',
  build: () => wrap('', contentSlide('Модуль База · Содержание', 'Содержание модуля', `
    <ul class="list-plain" style="margin-top:26px;max-width:680px;font-size:16px;">
      <li>Основы интернет-маркетинга: базовые понятия и отличия от традиционного маркетинга</li>
      <li>Целевая аудитория: как определить и создать портрет идеального клиента</li>
      <li>Воронка продаж и CJM: как работает путь клиента от первого контакта до покупки</li>
      <li>Каналы привлечения: платные, собственные и заслуженные медиа</li>
    </ul>
  `)),
});

// slide 4 — Проект для работы на курсе
slides.push({
  out: 'slide-04-proekt-dlya-raboty',
  target: 'stepik-sync/94834/raw/02_База/03_Как_устроен_интернет-маркетинг/02_text.html',
  old: 'Proekt-dlya-raboty-na-kurse.png',
  alt: 'Проект для работы на курсе',
  build: () => wrap('', contentSlide('Модуль База · Урок 3', 'Проект для работы на курсе', `
    <div class="col-grid" style="margin-top:22px;">
      <div class="col-card">
        <h3>Выберите из вариантов</h3>
        <ul>
          <li>Кофейня или ресторан</li>
          <li>Онлайн-курс или блог</li>
          <li>Интернет-магазин</li>
          <li>Цифровой сервис</li>
        </ul>
      </div>
      <div class="col-card">
        <h3>Задание</h3>
        <ul>
          <li>Опишите его в 2–3 предложениях</li>
          <li>Объясните мотивацию выбора</li>
          <li>Определите ключевые задачи</li>
          <li>Укажите каналы продвижения</li>
        </ul>
      </div>
    </div>
  `)),
});

// slide 5 — English for Marketers [photo-wave]
slides.push({
  out: 'slide-05-english-for-marketers',
  target: 'stepik-sync/94834/raw/02_База/03_Как_устроен_интернет-маркетинг/03_text.html',
  old: 'English-for-Marketers.png',
  alt: 'English for Marketers',
  photo: { file: 'english-for-marketers.png', prompt: 'Professional lifestyle photo, young person studying English on a laptop with headphones, flashcards with English words on the desk, warm cream and teal color grade, soft natural window light, shallow depth of field, cozy modern desk, photorealistic editorial photography, no visible readable text, no logos, no full face visible' },
  build: (photoFile) => {
    const { css, html } = photoWave(photoFile, 'Модуль База · Пример', 'English for Marketers', `
      <p class="body-text" style="margin-top:12px;font-size:13px;">Сервис английского языка для интернет-маркетологов. Цель — подготовка к международным собеседованиям и работе с глобальными проектами.</p>
      <div class="col-grid" style="margin-top:16px;">
        <div class="col-card" style="padding:16px;">
          <h3 style="font-size:13px;">Задачи</h3>
          <ul style="font-size:11.5px;">
            <li>Упаковка продукта, УТП</li>
            <li>Исследование ЦА и конкурентов</li>
            <li>SEO-лендинг</li>
            <li>Воронка: лид-магнит → оффер</li>
            <li>Запуск рекламы</li>
          </ul>
        </div>
        <div class="col-card" style="padding:16px;">
          <h3 style="font-size:13px;">Каналы</h3>
          <ul style="font-size:11.5px;">
            <li>VK Ads — таргет в СНГ</li>
            <li>Telegram-каналы</li>
            <li>Партнёрства с EdTech</li>
            <li>Контент, вебинары</li>
            <li>LinkedIn, X, Reddit</li>
          </ul>
        </div>
      </div>
    `, { photoFrac: 0.4, amplitude: 55 });
    return wrap('', html, css);
  },
});

// slide 6 — Поздравляю с первым шагом [recap]
slides.push({
  out: 'slide-06-pervym-shagom',
  target: 'stepik-sync/94834/raw/02_База/03_Как_устроен_интернет-маркетинг/04_text.html',
  old: 'Pozdravlyayu-s-pervym-shagom.png',
  alt: 'Поздравляю с первым шагом!',
  build: () => recapSlide({
    title: 'Поздравляю с первым шагом!',
    cards: [
      { heading: 'Измеримость результатов', text: 'Интернет-маркетинг позволяет отслеживать эффективность каждого действия и канала.' },
      { heading: 'Решения на основе данных', text: 'Аналитика помогает оптимизировать каждый этап воронки.' },
      { heading: 'Профессиональный набор', text: 'Современный маркетолог владеет разными инструментами и может выбрать специализацию.' },
    ],
    footer: 'Выбранный проект станет фундаментом для вашего профессионального роста.',
  }),
});

// slide 7 — Целевая аудитория: зачем она нужна
slides.push({
  out: 'slide-07-celevaya-auditoriya',
  target: 'stepik-sync/94834/raw/02_База/04_Целевая_аудитория_и_портрет_клиента_персона/01_text.html',
  old: 'Celevaya-auditoriya-zachem-ona-nuzhna.png',
  alt: 'Целевая аудитория: зачем она нужна',
  build: () => wrap('', contentSlide('Модуль База · Урок 4', 'Целевая аудитория: зачем она нужна', `
    <div class="col-grid" style="margin-top:24px;">
      <div class="col-card"><h3>Точные креативы</h3><p style="font-size:12.5px;color:${BRAND.bodyGray};">Создание рекламы, которая попадает в цель</p></div>
      <div class="col-card"><h3>Понятные тексты</h3><p style="font-size:12.5px;color:${BRAND.bodyGray};">Коммуникация на языке клиента</p></div>
      <div class="col-card"><h3>Продающие офферы</h3><p style="font-size:12.5px;color:${BRAND.bodyGray};">Предложения под конкретные сегменты</p></div>
      <div class="col-card"><h3>Настройка рекламы</h3><p style="font-size:12.5px;color:${BRAND.bodyGray};">Выбор площадок и таргетингов</p></div>
    </div>
  `, 720)),
});

// slide 8 — Сегментация
slides.push({
  out: 'slide-08-segmentaciya',
  target: 'stepik-sync/94834/raw/02_База/04_Целевая_аудитория_и_портрет_клиента_персона/01_text.html',
  old: 'Segmentaciya.png',
  alt: 'Сегментация',
  build: () => wrap('', contentSlide('Модуль База · Урок 4', 'Сегментация', `
    <div class="steps-num" style="max-width:680px;">
      <div class="step-num-item"><div class="step-num-chip">1</div><div class="step-num-body"><h4>Признаки</h4><p>Демографические, географические, поведенческие и психографические характеристики клиентов</p></div></div>
      <div class="step-num-item"><div class="step-num-chip">2</div><div class="step-num-body"><h4>Группировка</h4><p>Разделение клиентов на группы со схожими потребностями и моделями поведения</p></div></div>
      <div class="step-num-item"><div class="step-num-chip">3</div><div class="step-num-body"><h4>Анализ</h4><p>Изучение критериев выбора внутри каждого сегмента (цена, качество, сервис)</p></div></div>
      <div class="step-num-item"><div class="step-num-chip">4</div><div class="step-num-body"><h4>Оптимизация</h4><p>Настройка маркетинговых инструментов под особенности каждого сегмента</p></div></div>
    </div>
  `)),
});

// slide 9 — Персона: портрет вашего клиента [photo-wave]
slides.push({
  out: 'slide-09-persona-portret',
  target: 'stepik-sync/94834/raw/02_База/04_Целевая_аудитория_и_портрет_клиента_персона/01_text.html',
  old: 'Persona-portret-vashego-klienta.png',
  alt: 'Персона — портрет вашего клиента',
  photo: { file: 'persona-portret.png', prompt: 'Professional lifestyle photo, hands arranging colorful sticky notes with a customer persona sketch on a desk, warm cream and teal color grade, soft natural window light, shallow depth of field, cozy modern desk with coffee, photorealistic editorial photography, no readable text on notes, no logos, no full face visible' },
  build: (photoFile) => {
    const { css, html } = photoWave(photoFile, 'Модуль База · Урок 4', 'Персона — портрет вашего клиента', `
      <p class="body-text" style="margin-top:10px;font-size:12.5px;">Детальный портрет типичного представителя целевой аудитории: демография, потребности, боли и поведенческие паттерны.</p>
      <ul class="list-plain" style="margin-top:14px;font-size:12.5px;">
        <li>Составляющие: имя, возраст, профессия, цели, боли, критерии выбора, возражения</li>
        <li>Зачем: точные материалы, таргетинг, релевантные предложения, персонализация</li>
      </ul>
    `, { photoFrac: 0.4, amplitude: 55 });
    return wrap('', html, css);
  },
});

// slide 10 — Выберите бизнес и проведите анализ ЦА
slides.push({
  out: 'slide-10-vyberite-biznes',
  target: 'stepik-sync/94834/raw/02_База/04_Целевая_аудитория_и_портрет_клиента_персона/02_text.html',
  old: 'Vyberite-biznes-i-provedite-analiz-CA (1).png',
  alt: 'Выберите бизнес и проведите анализ ЦА',
  build: () => wrap('', contentSlide('Модуль База · Практика', 'Выберите бизнес и проведите анализ ЦА', `
    <div class="steps-num" style="max-width:720px;">
      <div class="step-num-item"><div class="step-num-chip">1</div><div class="step-num-body"><h4>Определите целевую аудиторию</h4><p>Опишите в 2–3 предложениях портрет ваших клиентов, чем они живут, какие у них задачи</p></div></div>
      <div class="step-num-item"><div class="step-num-chip">2</div><div class="step-num-body"><h4>Выявите критерии выбора</h4><p>Назовите 2–3 ключевых фактора принятия решений (цена, качество, скорость или бренд)</p></div></div>
      <div class="step-num-item"><div class="step-num-chip">3</div><div class="step-num-body"><h4>Найдите различия</h4><p>Определите, чем отличаются разные сегменты вашей аудитории и какие у них уникальные потребности</p></div></div>
      <div class="step-num-item"><div class="step-num-chip">4</div><div class="step-num-body"><h4>Обоснуйте выводы</h4><p>Подкрепите свой анализ данными или логическими рассуждениями</p></div></div>
    </div>
  `, 700)),
});

// slide 11 — Персоны E4M [avatar cards]
slides.push({
  out: 'slide-11-persony-e4m',
  target: 'stepik-sync/94834/raw/02_База/04_Целевая_аудитория_и_портрет_клиента_персона/03_text.html',
  old: 'Persony-E4M.png',
  alt: 'Персоны E4M',
  build: () => wrap('', contentSlide('Модуль База · Пример', 'Персоны E4M', `
    <div class="avatar-grid" style="margin-top:22px;">
      <div class="avatar-card">
        <div class="avatar-circle">А</div>
        <h4>Аня, 23 года</h4>
        <div class="role">Начинающий маркетолог</div>
        <p>Выпускница ищет первую работу, базовый английский без терминологии, хочет выделиться среди кандидатов.</p>
      </div>
      <div class="avatar-card">
        <div class="avatar-circle">И</div>
        <h4>Игорь, 28 лет</h4>
        <div class="role">Middle User Acquisition</div>
        <p>Специалист по платному трафику с планами релокации, средний разговорный английский, метит на международный рынок.</p>
      </div>
      <div class="avatar-card">
        <div class="avatar-circle">О</div>
        <h4>Ольга, 32 года</h4>
        <div class="role">Фрилансер</div>
        <p>Моушн-дизайнер работает с зарубежными заказчиками, неуверенность в деловой коммуникации.</p>
      </div>
    </div>
  `, 900)),
});

// slide 12 — Поздравляю с первым анализом ЦА [recap]
slides.push({
  out: 'slide-12-pervym-analizom',
  target: 'stepik-sync/94834/raw/02_База/04_Целевая_аудитория_и_портрет_клиента_персона/04_text.html',
  old: 'Pozdravlyayu-s-pervym-analizom-celevoj-auditorii.png',
  alt: 'Поздравляю с первым анализом целевой аудитории!',
  build: () => recapSlide({
    title: 'Поздравляю с первым анализом целевой аудитории!',
    cards: [
      { heading: 'Основа маркетинга', text: 'Понимание клиента помогает подобрать правильные каналы и настроить точную рекламу.' },
      { heading: 'Сегментация', text: 'Разделение аудитории на группы делает продвижение точнее и снижает расходы.' },
      { heading: 'Персоны', text: 'Делают маркетинг человечным, помогая видеть реальных людей вместо безликой массы.' },
    ],
    footer: 'Важно помнить: описания ЦА — рабочие гипотезы, а не жёсткие рамки. Главное — результат, а не соответствие теории.',
  }),
});

// slide 14 — Опишите путь клиента [5-row]
slides.push({
  out: 'slide-14-opishite-put-klienta',
  target: 'stepik-sync/94834/raw/02_База/05_Воронка_продаж_и_путь_клиента_CJM/02_text.html',
  old: 'Opishite-put-klienta-ot-pervogo-kontakta-do-povtornoj-pokupki.png',
  alt: 'Опишите путь клиента от первого контакта до повторной покупки',
  build: () => wrap('', contentSlide('Модуль База · Практика', 'Путь клиента: от контакта до покупки', `
    <div class="row-table" style="max-width:1000px;">
      <div class="row"><div class="row-chip">1</div><div><b>Осознание потребности</b><span>«Мне нужно решение моей проблемы»</span></div><div><span>Контент, который помогает определить проблему</span></div></div>
      <div class="row"><div class="row-chip">2</div><div><b>Поиск информации</b><span>«Какие варианты существуют?»</span></div><div><span>SEO, контекстная реклама там, где ищет клиент</span></div></div>
      <div class="row"><div class="row-chip">3</div><div><b>Оценка альтернатив</b><span>«Что лучше всего для меня?»</span></div><div><span>Сравнения, отзывы, обзоры</span></div></div>
      <div class="row"><div class="row-chip">4</div><div><b>Принятие решения</b><span>«Точно ли стоит покупать?»</span></div><div><span>Оффер, снимающий последние сомнения</span></div></div>
      <div class="row"><div class="row-chip">5</div><div><b>После покупки</b><span>«Доволен ли я своим выбором?»</span></div><div><span>Поддержка связи, стимулирование рекомендаций</span></div></div>
    </div>
  `, 780)),
});

// slide 15 — CJM для E4M [5-row]
slides.push({
  out: 'slide-15-cjm-dlya-e4m',
  target: 'stepik-sync/94834/raw/02_База/05_Воронка_продаж_и_путь_клиента_CJM/03_text.html',
  old: 'CJM-dlya-E4M.png',
  alt: 'CJM для E4M',
  build: () => wrap('', contentSlide('Модуль База · Пример', 'CJM для E4M', `
    <div class="row-table" style="max-width:1000px;">
      <div class="row"><div class="row-chip">1</div><div><b>Осознание</b><span>«Без английского сложно расти. С чего начать?»</span></div><div><span>Таргет с болью + бесплатный гайд по лексике</span></div></div>
      <div class="row"><div class="row-chip">2</div><div><b>Поиск и сравнение</b><span>«Нужен не школьный, а профессиональный английский»</span></div><div><span>Лендинг с кейсами + таблица сравнения курсов</span></div></div>
      <div class="row"><div class="row-chip">3</div><div><b>Выбор и заказ</b><span>«А вдруг не справлюсь? Есть отзывы?»</span></div><div><span>Отзывы, видео-примеры уроков, пробный доступ</span></div></div>
      <div class="row"><div class="row-chip">4</div><div><b>Получение опыта</b><span>«Главное — не бросить»</span></div><div><span>Чек-лист прогресса, напоминания, практика</span></div></div>
      <div class="row"><div class="row-chip">5</div><div><b>Повторная покупка</b><span>«Это стоит порекомендовать!»</span></div><div><span>Реферальная программа, истории успеха</span></div></div>
    </div>
  `, 780)),
});

// slide 17 — Каналы привлечения [3-col]
slides.push({
  out: 'slide-17-kanaly-privlecheniya',
  target: 'stepik-sync/94834/raw/02_База/06_Какие_каналы_бывают_платные_и_бесплатные/01_text.html',
  old: 'Kanaly-privlecheniya.png',
  alt: 'Каналы привлечения',
  build: () => wrap('', contentSlide('Модуль База · Урок 6', 'Каналы привлечения', `
    <div class="col-grid" style="margin-top:24px;">
      <div class="col-card"><h3>Платные</h3><ul><li>Контекстная реклама</li><li>Таргетированная реклама</li><li>Реклама у блогеров</li><li>Медийная реклама</li></ul></div>
      <div class="col-card"><h3>Собственные</h3><ul><li>Сайт и блог</li><li>Соцсети компании</li><li>Email-рассылки</li><li>Мобильное приложение</li></ul></div>
      <div class="col-card"><h3>Заслуженные</h3><ul><li>Отзывы и рекомендации</li><li>Пользовательский контент</li><li>Обзоры без оплаты</li><li>Репосты и упоминания</li></ul></div>
    </div>
  `, 900)),
});

// slide 18 — Выберите каналы продвижения
slides.push({
  out: 'slide-18-vyberite-kanaly',
  target: 'stepik-sync/94834/raw/02_База/06_Какие_каналы_бывают_платные_и_бесплатные/02_text.html',
  old: 'Vyberite-kanaly-prodvizheniya.png',
  alt: 'Выберите каналы продвижения',
  build: () => wrap('', contentSlide('Модуль База · Практика', 'Выберите каналы продвижения', `
    <p class="body-text" style="margin-top:10px;max-width:680px;">Выберите 5–7 каналов продвижения для привлечения клиентов:</p>
    <ul class="list-plain" style="max-width:680px;">
      <li>Минимум 1 платный канал (контекст, таргет, блогеры)</li>
      <li>Минимум 1 собственный канал (сайт, соцсети, Telegram)</li>
      <li>Минимум 1 заслуженный канал (отзывы, репосты)</li>
      <li>Ещё 2 любых канала по вашему выбору</li>
    </ul>
    <p class="body-text" style="margin-top:14px;max-width:680px;font-weight:700;color:${BRAND.ink};">Обоснуйте выбор с точки зрения бюджета, ниши и эффективности для вашего бизнеса.</p>
  `, 700)),
});

// slide 19 — Маркетинговый микс для E4M [dense]
slides.push({
  out: 'slide-19-marketingovyj-miks',
  target: 'stepik-sync/94834/raw/02_База/06_Какие_каналы_бывают_платные_и_бесплатные/03_text.html',
  old: 'Marketingovyj-miks-dlya-E4M.png',
  alt: 'Маркетинговый микс для E4M',
  build: () => wrap('', contentSlide('Модуль База · Пример', 'Маркетинговый микс для E4M', `
    <p class="body-text" style="margin-top:8px;max-width:900px;font-size:12.5px;">Цель — привлечь 20 новых клиентов в месяц. Анализ Яндекс.Вордстат показал отсутствие прямого спроса на продукт.</p>
    <div class="stat-row" style="max-width:700px;">
      <div class="stat-card"><b>5</b><span>каналов выбрано</span></div>
      <div class="stat-card"><b>3</b><span>этапа воронки</span></div>
    </div>
    <div class="col-grid" style="margin-top:14px;max-width:1000px;">
      <div class="col-card" style="padding:14px 16px;"><h3 style="font-size:12.5px;">Таргет ВК</h3><p style="font-size:11px;color:${BRAND.bodyGray};">Основной канал привлечения ЦА</p></div>
      <div class="col-card" style="padding:14px 16px;"><h3 style="font-size:12.5px;">Telegram</h3><p style="font-size:11px;color:${BRAND.bodyGray};">Удержание и вовлечение аудитории</p></div>
      <div class="col-card" style="padding:14px 16px;"><h3 style="font-size:12.5px;">Email</h3><p style="font-size:11px;color:${BRAND.bodyGray};">Конвертация лидов в клиентов</p></div>
      <div class="col-card" style="padding:14px 16px;"><h3 style="font-size:12.5px;">Лендинг</h3><p style="font-size:11px;color:${BRAND.bodyGray};">Точка конверсии с лид-магнитом</p></div>
    </div>
  `, 920)),
});

// slide 20 — Поздравляю с пониманием каналов [recap]
slides.push({
  out: 'slide-20-ponimaniem-kanalov',
  target: 'stepik-sync/94834/raw/02_База/06_Какие_каналы_бывают_платные_и_бесплатные/04_text.html',
  old: 'Pozdravlyayu-s-ponimaniem-kanalov-privlecheniya.png',
  alt: 'Поздравляю с пониманием каналов привлечения!',
  build: () => recapSlide({
    title: 'Поздравляю с пониманием каналов привлечения!',
    cards: [
      { heading: 'Ключевые выводы', items: ['Все каналы делятся на платные, собственные, заслуженные', '«Бесплатные» каналы требуют вложений времени', 'Маркетинг строится на комбинации каналов'] },
      { heading: 'Полученные знания', items: ['Особенности разных типов каналов', 'Концепция «условно бесплатного» трафика', 'Принципы формирования маркетингового микса'] },
      { heading: 'Начальные навыки', items: ['Анализ и выбор релевантных каналов', 'Составление сбалансированного микса', 'Обоснование выбора по бюджету и эффективности'] },
    ],
    footer: 'Для резюме: умение разрабатывать маркетинговый микс для бизнес-задач',
  }),
});

// slide 21 — KPI интернет-маркетинга
slides.push({
  out: 'slide-21-kpi',
  target: 'stepik-sync/94834/raw/02_База/07_Метрики_интернет-маркетинга/01_text.html',
  old: 'KPI-internet-marketinga.png',
  alt: 'KPI интернет-маркетинга',
  build: () => wrap('', contentSlide('Модуль База · Урок 7', 'KPI интернет-маркетинга', `
    <div class="col-grid" style="margin-top:26px;">
      <div class="col-card"><h3>CTR (кликабельность)</h3><p style="font-size:13px;color:${BRAND.ink};font-weight:700;">(Клики ÷ Показы) × 100%</p></div>
      <div class="col-card"><h3>CPA (стоимость действия)</h3><p style="font-size:13px;color:${BRAND.ink};font-weight:700;">Расход ÷ Количество действий</p></div>
      <div class="col-card"><h3>CR (конверсия)</h3><p style="font-size:13px;color:${BRAND.ink};font-weight:700;">(Целевые действия ÷ Клики) × 100%</p></div>
      <div class="col-card"><h3>ROI (рентабельность)</h3><p style="font-size:13px;color:${BRAND.ink};font-weight:700;">(Прибыль ÷ Расходы) × 100%</p></div>
    </div>
  `, 940)),
});

// slide 22 — Прогноз каналов и метрик
slides.push({
  out: 'slide-22-prognoz-kanalov',
  target: 'stepik-sync/94834/raw/02_База/07_Метрики_интернет-маркетинга/02_text.html',
  old: 'Prognoz-kanalov-i-metrik.png',
  alt: 'Прогноз каналов и метрик',
  build: () => wrap('', contentSlide('Модуль База · Практика', 'Прогноз каналов и метрик', `
    <div class="steps-num" style="max-width:760px;">
      <div class="step-num-item"><div class="step-num-chip">1</div><div class="step-num-body"><h4>Выберите бизнес-проект</h4><p>Существующий или новый</p></div></div>
      <div class="step-num-item"><div class="step-num-chip">2</div><div class="step-num-body"><h4>Определите 5 рекламных каналов</h4><p>Для продвижения</p></div></div>
      <div class="step-num-item"><div class="step-num-chip">3</div><div class="step-num-body"><h4>Спрогнозируйте бюджет, клики и конверсии</h4><p>По каждому каналу</p></div></div>
      <div class="step-num-item"><div class="step-num-chip">4</div><div class="step-num-body"><h4>Рассчитайте CR и CPA</h4><p>Конверсию и стоимость действия</p></div></div>
      <div class="step-num-item"><div class="step-num-chip">5</div><div class="step-num-body"><h4>Проанализируйте результаты</h4><p>Примите стратегические решения</p></div></div>
    </div>
  `, 780)),
});

// slide 24 — Поздравляю с расчетом метрик [recap]
slides.push({
  out: 'slide-24-raschetom-metrik',
  target: 'stepik-sync/94834/raw/02_База/07_Метрики_интернет-маркетинга/04_text.html',
  old: 'Pozdravlyayu-s-raschetom-marketingovyh-metrik.png',
  alt: 'Поздравляю с расчетом маркетинговых метрик!',
  build: () => recapSlide({
    title: 'Поздравляю с расчётом маркетинговых метрик!',
    cards: [
      { heading: 'Ключевые выводы', items: ['Метрики делают маркетинг измеримым бизнес-процессом', 'Разные подходы требуют разных метрик', 'ROI показывает реальную эффективность вложений'] },
      { heading: 'Полученные знания', items: ['KPI и OKR в интернет-маркетинге', 'CPC, CPM, CTR, CPA, CR', 'Финансовые показатели: ROI/ROMI'] },
      { heading: 'Навыки для резюме', items: ['Расчёт ключевых метрик маркетинга', 'Составление и анализ медиаплана', 'Прогнозирование результатов'] },
    ],
  }),
});

// slide 25 — Составляем бриф проекта [photo-wave]
slides.push({
  out: 'slide-25-sostavlyaem-brif',
  target: 'stepik-sync/94834/raw/02_База/08_Практика_заполните_бриф_на_сайт_и_продвижение/01_text.html',
  old: 'Sostavlyaem-brif-proekta.png',
  alt: 'Составляем бриф проекта',
  photo: { file: 'sostavlyaem-brif.png', prompt: 'Professional lifestyle photo, hands writing on a printed project brief document with a pen, laptop blurred in the background, warm cream and teal color grade, soft natural window light, shallow depth of field, cozy modern desk with a coffee cup, photorealistic editorial photography, no readable text, no logos, no full face visible' },
  build: (photoFile) => {
    const { css, html } = photoWave(photoFile, 'Модуль База · Практика', 'Составляем бриф проекта', `
      <ul class="list-plain" style="margin-top:12px;font-size:12.5px;">
        <li>Выберите проект для дальнейшей работы в курсе</li>
        <li>Заполните бриф по предоставленному шаблону</li>
        <li>По желанию добавьте пояснение для лучшего понимания</li>
      </ul>
      <p class="body-text" style="margin-top:12px;font-size:12px;font-weight:700;color:${BRAND.ink};">Бриф — отправная точка всех маркетинговых работ. Экономит время, деньги и нервы.</p>
    `, { photoFrac: 0.4, amplitude: 55 });
    return wrap('', html, css);
  },
});

// slide 26 — Бриф для E4M
slides.push({
  out: 'slide-26-brif-dlya-e4m',
  target: 'stepik-sync/94834/raw/02_База/08_Практика_заполните_бриф_на_сайт_и_продвижение/02_text.html',
  old: 'Brif-dlya-E4M.png',
  alt: 'Бриф для E4M',
  build: () => wrap('', contentSlide('Модуль База · Пример', 'Бриф для E4M', `
    <div class="steps-num" style="max-width:760px;">
      <div class="step-num-item"><div class="step-num-chip">1</div><div class="step-num-body"><h4>Основа для разработки</h4><p>Документ служит фундаментом для лендинга и рекламных кампаний</p></div></div>
      <div class="step-num-item"><div class="step-num-chip">2</div><div class="step-num-body"><h4>Практический навык</h4><p>Помогает структурировать воронку продаж и оценивать каналы</p></div></div>
      <div class="step-num-item"><div class="step-num-chip">3</div><div class="step-num-body"><h4>Профессиональное преимущество</h4><p>Необходим для работы с клиентами и собеседований</p></div></div>
    </div>
  `, 760)),
});

// slide 27 — Поздравляю с первым брифом [recap]
slides.push({
  out: 'slide-27-pervym-brifom',
  target: 'stepik-sync/94834/raw/02_База/08_Практика_заполните_бриф_на_сайт_и_продвижение/03_text.html',
  old: 'Pozdravlyayu-s-pervym-brifom.png',
  alt: 'Поздравляю с первым брифом!',
  build: () => recapSlide({
    title: 'Поздравляю с первым брифом!',
    cards: [
      { heading: 'Структурирование', text: 'Систематизация данных о проекте для эффективной работы.' },
      { heading: 'Формулирование целей', text: 'Теперь вы умеете определять конкретные измеримые результаты.' },
      { heading: 'Ценность', items: ['Портфолио: пример профессиональной работы', 'Основа для сайта в следующем модуле', 'План продвижения и рекламы'] },
    ],
    footer: 'В следующих модулях вы создадите сайт, настроите аналитику и запустите продвижение.',
  }),
});

// slide 28 — Поздравляю с завершением первого модуля [recap final]
slides.push({
  out: 'slide-28-zavershenie-modulya',
  target: 'stepik-sync/94834/raw/02_База/09_Итоги_модуля_База_интернет-маркетинга/01_text.html',
  old: 'Pozdravlyayu-s-zaversheniem-pervogo-modulya.png',
  alt: 'Поздравляю с завершением первого модуля!',
  build: () => recapSlide({
    steps: ['Модуль База пройден'],
    title: 'Поздравляю с завершением первого модуля!',
    cards: [
      { heading: 'Понятия усвоены', items: ['Интернет-маркетинг и целевая аудитория', 'Метрики эффективности', 'Медиаплан'] },
      { heading: 'Навыки приобретены', items: ['Анализ ЦА, построение воронки', 'Маркетинговый микс', 'Расчёт метрик'] },
      { heading: 'Для резюме', items: ['Customer Personas', 'Customer Journey Map', 'Расчёт метрик и медиаплан'] },
    ],
    footer: 'Готовы к изучению инструментов маркетолога и более прикладных навыков.',
  }),
});

// slide 29 — Подготовка к интервью [photo-wave]
slides.push({
  out: 'slide-29-podgotovka-k-intervyu',
  target: 'stepik-sync/94834/raw/02_База/09_Итоги_модуля_База_интернет-маркетинга/02_text.html',
  old: 'Podgotovka-k-intervyu.png',
  alt: 'Подготовка к интервью',
  photo: { file: 'podgotovka-k-intervyu.png', prompt: 'Professional lifestyle photo, young person on a video call interview on a laptop, sitting at a home desk, confident posture, warm cream and teal color grade, soft natural window light, shallow depth of field, cozy modern desk, photorealistic editorial photography, no readable text, no logos, seen from behind or side angle, no full face visible' },
  build: (photoFile) => {
    const { css, html } = photoWave(photoFile, 'Модуль База · Итоги', 'Подготовка к интервью', `
      <p class="body-text" style="margin-top:10px;font-size:12.5px;">Рекрутеры проверяют не только знания, но и понимание практического применения концепций маркетинга.</p>
      <p class="body-text" style="margin-top:10px;font-size:12.5px;">Твёрдая база хард-скиллов — фундамент для успешного технического интервью. Важнее понимать суть вопросов, чем знать готовые ответы.</p>
      <p class="body-text" style="margin-top:10px;font-size:12px;font-weight:700;color:${BRAND.ink};">Подготовлено 15 вопросов по базе интернет-маркетинга.</p>
    `, { photoFrac: 0.4, amplitude: 55 });
    return wrap('', html, css);
  },
});

// slide 30 — Запомнили основные понятия?
slides.push({
  out: 'slide-30-zapomnili-ponyatiya',
  target: 'stepik-sync/94834/raw/02_База/10_Проверка_знаний_база_интернет-маркетинга/01_text.html',
  old: 'Zapomnili-osnovnye-ponyatiya.png',
  alt: 'Запомнили основные понятия?',
  build: () => wrap('', contentSlide('Модуль База · Проверка знаний', 'Запомнили основные понятия?', `
    <ul class="list-plain" style="margin-top:24px;max-width:760px;font-size:15px;">
      <li>Мини-тест из 5 вопросов: в каждом только один правильный ответ</li>
      <li>10 задач на расчёт метрик: подготовка к тестовым заданиям работодателей</li>
      <li>Новичкам часто дают задания по расчёту метрик и анализу таблиц на собеседованиях</li>
    </ul>
  `, 800)),
});

fs.writeFileSync(path.join(OUT_DIR, '_manifest.json'), JSON.stringify(slides.map(({ build, ...s }) => s), null, 2));
console.log(`${slides.length} slides defined`);

export { slides, ASSETS, OUT_DIR };
