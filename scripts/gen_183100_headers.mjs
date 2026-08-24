// Generate wide lesson-header banners for course 183100 ("Тимлид в
// маркетинге: найм, 1-1, мотивация команды"), same visual language as
// 183103/297305/94836/183079/183094/183089.
// Usage: node scripts/gen_183100_headers.mjs <html_out_dir>
import fs from 'node:fs';
import path from 'node:path';
import { BRAND, fontFaceCss } from './slide_template.mjs';

const [, , htmlOutDir] = process.argv;
if (!htmlOutDir) {
  console.error('Usage: node gen_183100_headers.mjs <html_out_dir>');
  process.exit(1);
}
fs.mkdirSync(htmlOutDir, { recursive: true });

const W = 1920;
const H = 420;

export const HEADERS = [
  { lesson: 2545824, label: 'СТАРТ · ВИДЕО', title: 'Видео-приветствие' },
  { lesson: 2545825, label: 'СТАРТ', title: 'Что будет на курсе' },

  { lesson: 2545826, label: 'ПОИСК И НАЙМ · МОДУЛЬ', title: 'Что будет в модуле «Поиск и найм»' },
  { lesson: 2545827, label: 'ПОИСК И НАЙМ · УРОК 1', title: 'Портрет кандидата: что определить до начала поиска' },
  { lesson: 2545828, label: 'ПОИСК И НАЙМ · УРОК 2', title: 'Собеседование: как оценить, а не просто поговорить' },
  { lesson: 2545829, label: 'ПОИСК И НАЙМ · УРОК 3', title: 'Оффер и испытательный срок: как выглядит успешный старт' },
  { lesson: 2545830, label: 'ПОИСК И НАЙМ · ПРОВЕРКА ЗНАНИЙ', title: 'Проверка знаний: поиск и найм' },

  { lesson: 2545831, label: 'РАБОТА С СОТРУДНИКОМ · МОДУЛЬ', title: 'Что будет в модуле «Работа с сотрудником»' },
  { lesson: 2545832, label: 'РАБОТА С СОТРУДНИКОМ · УРОК 1', title: 'SMART и делегирование: как ставить задачи' },
  { lesson: 2545833, label: 'РАБОТА С СОТРУДНИКОМ · УРОК 2', title: 'Встречи 1-1: как проводить их регулярно и по делу' },
  { lesson: 2545834, label: 'РАБОТА С СОТРУДНИКОМ · УРОК 3', title: 'Ревью и индивидуальный план развития' },
  { lesson: 2545835, label: 'РАБОТА С СОТРУДНИКОМ · УРОК 4', title: 'Развивающая обратная связь: как говорить об ошибках' },
  { lesson: 2545836, label: 'РАБОТА С СОТРУДНИКОМ · ПРОВЕРКА ЗНАНИЙ', title: 'Проверка знаний: работа с сотрудником' },

  { lesson: 2545837, label: 'КОМАНДНАЯ КОММУНИКАЦИЯ · МОДУЛЬ', title: 'Что будет в модуле «Командная коммуникация»' },
  { lesson: 2545838, label: 'КОММУНИКАЦИЯ · УРОК 1', title: 'Ежедневные стендапы в чат: как выглядит сводка' },
  { lesson: 2545839, label: 'КОММУНИКАЦИЯ · УРОК 2', title: 'Еженедельные синки и отчёты команды' },
  { lesson: 2545840, label: 'КОММУНИКАЦИЯ · УРОК 3', title: 'Правила эффективных встреч' },
  { lesson: 2545841, label: 'КОММУНИКАЦИЯ · ПРОВЕРКА ЗНАНИЙ', title: 'Проверка знаний: командная коммуникация' },

  { lesson: 2545842, label: 'МОТИВАЦИЯ · МОДУЛЬ', title: 'Что будет в модуле «Мотивация»' },
  { lesson: 2545843, label: 'МОТИВАЦИЯ · УРОК 1', title: 'Виды мотивации: материальная и нематериальная' },
  { lesson: 2545844, label: 'МОТИВАЦИЯ · УРОК 2', title: 'Какая мотивация подходит какой роли' },
  { lesson: 2545845, label: 'МОТИВАЦИЯ · УРОК 3', title: 'Как и когда говорить о мотивации с сотрудником' },
  { lesson: 2545846, label: 'МОТИВАЦИЯ · ПРОВЕРКА ЗНАНИЙ', title: 'Проверка знаний: мотивация' },

  { lesson: 2545847, label: 'ЧТО ДАЛЬШЕ · УРОК 1', title: 'Итоги курса' },
  { lesson: 2545848, label: 'ЧТО ДАЛЬШЕ · УРОК 2', title: 'Что дальше' },
];

function bannerHtml({ label, title }) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    ${fontFaceCss()}
    html, body { width: ${W}px; height: ${H}px; }
    body { font-family: 'Manrope', sans-serif; overflow: hidden; }
    .banner-a {
      width: ${W}px; height: ${H}px;
      display: flex; flex-direction: column; justify-content: center;
      padding: 0 90px;
      background: linear-gradient(120deg, ${BRAND.coral1}, ${BRAND.coral2} 55%, ${BRAND.coral3});
      position: relative;
      overflow: hidden;
    }
    .banner-a::after {
      content: '';
      position: absolute; right: -120px; top: -160px;
      width: 560px; height: 560px; border-radius: 50%;
      background: rgba(255,255,255,0.10);
    }
    .banner-a::before {
      content: '';
      position: absolute; right: 160px; bottom: -220px;
      width: 380px; height: 380px; border-radius: 50%;
      background: rgba(255,255,255,0.08);
    }
    .eyebrow { display: flex; align-items: center; gap: 16px; position: relative; z-index: 1; }
    .eyebrow-line { width: 44px; height: 5px; border-radius: 3px; background: #fff; }
    .eyebrow-label { font-size: 18px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: #fff; }
    h1 { font-size: 50px; font-weight: 800; color: #fff; line-height: 1.16; margin-top: 22px; max-width: 1560px; text-wrap: balance; position: relative; z-index: 1; }
  </style></head><body>
    <div class="banner-a">
      <div class="eyebrow"><span class="eyebrow-line"></span><span class="eyebrow-label">${label}</span></div>
      <h1>${title}</h1>
    </div>
  </body></html>`;
}

for (const h of HEADERS) {
  const filePath = path.join(htmlOutDir, `header-${h.lesson}.html`);
  fs.writeFileSync(filePath, bannerHtml(h));
}
console.log(`Wrote ${HEADERS.length} banner HTML files to ${htmlOutDir}`);
