// Extended (~10 minute) Loom presentation for course 297305 ("Маркетинговая
// аналитика: с нуля до первого отчёта"). Unlike loom-intro-297305 (a short
// 3-4 min welcome deck), this one is built to be talked through with real
// content from the course — four "useful, teach something real" slides
// using the exact numbers/formulas already published in the lessons
// (2543732 metrics, 2543740 traffic report, 2543741 attribution, 2543745
// insights) so the narration matches what students will actually read.
// NOT uploaded to Stepik — exported as a PDF for personal use only,
// screen-shared during recording. All labels are viewer-facing.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  BRAND, wrap, eyebrowHtml, recapSlide, docSlide,
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
      h1.big { font-size: 38px; font-weight: 800; color: #fff; line-height: 1.15; max-width: 940px; }
      p.sub { margin-top: 16px; font-size: 16px; color: rgba(255,255,255,0.9); max-width: 780px; }
    `;
    const html = `
      <div class="title-wrap">
        ${eyebrowHtml('Бесплатный курс · подробный разбор')}
        <h1 class="big" style="color:#fff;">Маркетинговая аналитика: с нуля до первого отчёта</h1>
        <p class="sub">Хотите стать аналитиком и вам нравится маркетинг? Или учите маркетинг и нужно разобраться в аналитике?</p>
      </div>
    `;
    return wrap('on-coral', html, css);
  },
});

// 2 — Программа курса (5 модулей)
slides.push({
  out: 'l02-programma',
  build: () => contentSlide('Программа курса', 'От основ до постановки эксперимента', stepsNum([
    { h: 'Основы аналитики', p: 'Зачем она нужна и ключевые метрики: CTR, CPC, CPA, CR, ROI' },
    { h: 'Инструменты аналитика', p: 'Яндекс.Метрика, Google Analytics 4, Excel и сводные таблицы' },
    { h: 'Отчёты и метрики', p: 'Как читать отчёт по трафику, модели атрибуции, визуализация данных' },
    { h: 'Инсайты и гипотезы', p: 'Как искать закономерности в цифрах и формулировать проверяемые гипотезы' },
    { h: 'Эксперименты', p: 'A/B-тесты, контрольная группа, корректная оценка результата' },
  ]), 820),
});

// 3 — ROI: два способа посчитать одну и ту же цифру (real formulas from lesson 2543732)
slides.push({
  out: 'l03-roi',
  build: () => docSlide({
    eyebrow: 'Пример из модуля «Основы аналитики»',
    title: 'Два способа посчитать ROI',
    lead: 'Доход 120 000 ₽, расход 100 000 ₽, прибыль 20 000 ₽. Вот как эти цифры превращаются в ROI двумя разными способами.',
    columns: 1,
    sections: [
      { heading: 'Классически (правильно)', html: '<p class="formula">ROI = Прибыль ÷ Расход × 100%</p><p>20 000 ÷ 100 000 × 100% = <strong>20% ROI</strong> — на каждые вложенные 100 ₽ получили 20 ₽ прибыли.</p>' },
      { heading: 'Альтернативно (по доходу, а не прибыли)', html: '<p class="formula">ROI = Доход ÷ Расход × 100%</p><p>120 000 ÷ 100 000 × 100% = <strong>120% ROI</strong>.</p>' },
      { heading: 'Почему это важно', html: '<p>Разница — ровно 100 процентных пунктов на каждом отчёте. Если не уточнить у руководителя или клиента, какой способ принят, легко случайно завысить или занизить результат.</p>' },
    ],
  }),
});

// 4 — Как читать отчёт по трафику (real cleanor.app table from lesson 2543740)
slides.push({
  out: 'l04-traffic-report',
  build: () => docSlide({
    eyebrow: 'Пример из модуля «Отчёты и метрики»',
    title: 'Отчёт по трафику cleanor.app за месяц',
    lead: 'Реальный отчёт по каналам за месяц — читаем его по столбцам.',
    columns: 1,
    sections: [
      { heading: 'Полный отчёт', html: `
        <table>
          <tr><th>Канал</th><th>Сеансы</th><th>Конверсии</th><th>Вовлечённость</th></tr>
          <tr><td>Direct</td><td>12 871</td><td>1 649</td><td>20%</td></tr>
          <tr><td>Organic Search</td><td>12 680</td><td>10 674</td><td>68%</td></tr>
          <tr><td>Unassigned</td><td>923</td><td>648</td><td>8%</td></tr>
          <tr><td>Referral</td><td>169</td><td>160</td><td>57%</td></tr>
        </table>
      ` },
      { heading: 'Поверхностный вывод', html: '<p>По столбцу «Сеансы» лидирует Direct — логичный, но неверный вывод: делать ставку на прямые заходы.</p>' },
      { heading: 'Вывод при внимательном чтении', html: '<p><strong>Organic Search почти догоняет Direct по сеансам, но даёт в 6,5 раза больше конверсий.</strong> Это самый ценный канал в отчёте, хотя не первый по объёму трафика. А низкая вовлечённость Direct (20%) — сигнал, что туда попадает «нераспознанный» трафик, а не лояльная аудитория.</p>' },
    ],
  }),
});

// 5 — Атрибуция: один путь, разные модели (real $100 example from lesson 2543741)
slides.push({
  out: 'l05-attribution',
  build: () => docSlide({
    eyebrow: 'Пример из модуля «Отчёты и метрики»',
    title: 'Модель атрибуции меняет рекомендацию',
    lead: 'Клиент увидел рекламу в Директе → перешёл по рекламе в соцсетях → купил по email-рассылке на $100.',
    columns: 1,
    sections: [
      { heading: 'Как $100 распределяются между каналами', html: `
        <table>
          <tr><th>Модель</th><th>Директ</th><th>Соцсети</th><th>Email</th></tr>
          <tr><td>Last Click</td><td>$0</td><td>$0</td><td>$100</td></tr>
          <tr><td>First Click</td><td>$100</td><td>$0</td><td>$0</td></tr>
          <tr><td>Linear</td><td>$33,33</td><td>$33,33</td><td>$33,34</td></tr>
          <tr><td>Position-Based</td><td>$40</td><td>$20</td><td>$40</td></tr>
        </table>
      ` },
      { heading: 'Почему это критично', html: '<p>По Last Click Директ «не сработал» вообще — 0% ценности. По First Click — именно он привёл клиента. В зависимости от выбранной модели руководитель получит прямо противоположную рекомендацию: отключить Директ или увеличить на него бюджет.</p>' },
    ],
  }),
});

// 6 — Честный кейс без готового ответа (real ongoing case from lesson 2543745)
slides.push({
  out: 'l06-honest-case',
  build: () => docSlide({
    eyebrow: 'Пример из модуля «Инсайты и гипотезы»',
    title: 'Реальный, ещё не до конца разгаданный кейс',
    lead: 'Просадка сеансов на странице /tools cleanor.app в августе — на момент записи курса причина не найдена до конца.',
    columns: 2,
    sections: [
      { heading: 'По месяцам', html: `
        <table>
          <tr><th>Месяц</th><th>Сеансы</th></tr>
          <tr><td>Июнь</td><td>79</td></tr>
          <tr><td>Июль</td><td>373</td></tr>
          <tr><td>Август</td><td>320</td></tr>
        </table>
        <p>Снижение ~14% — не обвал, но и не шум.</p>
      ` },
      { heading: 'По каналам (июль → август)', html: `
        <table>
          <tr><th>Канал</th><th>Июль</th><th>Авг.</th></tr>
          <tr><td>Organic Search</td><td>221</td><td>198</td></tr>
          <tr><td>Referral</td><td>30</td><td>5</td></tr>
          <tr><td>Organic Social</td><td>10</td><td>0</td></tr>
        </table>
        <p>Падение размазано по мелким каналам — не одна явная причина, вроде «SEO сломалось».</p>
      ` },
    ],
  }),
});

// 7 — A/B-тест: почему нельзя просто "поменять и посмотреть" (real examples from 2543749/2543750)
slides.push({
  out: 'l07-ab-test',
  build: () => wrap('', `
    <div class="content-pad">
      ${eyebrowHtml('Пример из модуля «Эксперименты»')}
      <h1 class="title" style="max-width:780px;">Почему нельзя просто «поменять и посмотреть»</h1>
      <ul class="list-plain" style="margin-top:14px;max-width:860px;">
        <li>Поменяли кнопку на сайте в понедельник — в среду вышла статья в СМИ, трафик вырос в 3 раза. Конверсия тоже выросла — но не из-за кнопки</li>
        <li>Без контрольной группы, которая не видела изменения в то же время, отличить эффект от совпадения невозможно</li>
      </ul>
      ${highlightBox('Ошибка №1 из курса', '3 конверсии против 1 в первые часы теста выглядят как «рост в 3 раза» — статистически это ничего не значит. Нужен заранее рассчитанный размер выборки, а не подглядывание в промежуточный результат.')}
    </div>
  `, highlightCss),
});

// 8 — Как проходить курс
slides.push({
  out: 'l08-kak-prohodit',
  build: () => contentSlide('Как лучше проходить', 'Коротко, по порядку, с реальными примерами', `
    <ul class="list-plain" style="margin-top:20px;max-width:820px;font-size:15px;">
      <li>Уроки короткие — 5-10 минут на каждый</li>
      <li>В каждом уроке — рабочие формулы и ссылки на справки инструментов, чтобы возвращаться к ним в работе</li>
      <li>После каждого модуля — тест на 10 вопросов: закрепите материал перед следующим</li>
    </ul>
  `, 820),
});

// 9 — Финал (recap)
slides.push({
  out: 'l09-final',
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
