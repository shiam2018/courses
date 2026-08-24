// Generate wide lesson-header banners for course 183083 ("Приложение без
// кода: конструкторы для начинающих" — FREE course).
import fs from 'node:fs';
import path from 'node:path';
import { BRAND, fontFaceCss } from './slide_template.mjs';

const [, , htmlOutDir] = process.argv;
if (!htmlOutDir) {
  console.error('Usage: node gen_183083_headers.mjs <html_out_dir>');
  process.exit(1);
}
fs.mkdirSync(htmlOutDir, { recursive: true });

const W = 1920;
const H = 420;

export const HEADERS = [
  { lesson: 2547021, label: 'СТАРТ · ВИДЕО', title: 'Видео-приветствие' },
  { lesson: 2547022, label: 'СТАРТ', title: 'Что будет на курсе' },

  { lesson: 2547023, label: 'КОНСТРУКТОР · МОДУЛЬ', title: 'Что будет в модуле «Конструктор приложений»' },
  { lesson: 2547024, label: 'КОНСТРУКТОР · УРОК 1', title: 'Что такое no-code конструктор приложений' },
  { lesson: 2547025, label: 'КОНСТРУКТОР · УРОК 2', title: 'Какой конструктор выбрать под свою задачу' },
  { lesson: 2547026, label: 'КОНСТРУКТОР · ТЕСТ', title: 'Проверка знаний' },

  { lesson: 2547027, label: 'ЭКРАНЫ · МОДУЛЬ', title: 'Что будет в модуле «Планирование экранов»' },
  { lesson: 2547028, label: 'ЭКРАНЫ · УРОК 1', title: 'Из каких экранов состоит простое приложение' },
  { lesson: 2547029, label: 'ЭКРАНЫ · УРОК 2', title: 'Как спланировать переходы между экранами' },
  { lesson: 2547030, label: 'ЭКРАНЫ · ТЕСТ', title: 'Проверка знаний' },

  { lesson: 2547031, label: 'ИНТЕРФЕЙС · МОДУЛЬ', title: 'Что будет в модуле «Интерфейс и данные»' },
  { lesson: 2547032, label: 'ИНТЕРФЕЙС · УРОК 1', title: 'Как собрать интерфейс из готовых блоков' },
  { lesson: 2547033, label: 'ИНТЕРФЕЙС · УРОК 2', title: 'Подключение данных: списки, карточки, формы' },
  { lesson: 2547034, label: 'ИНТЕРФЕЙС · ТЕСТ', title: 'Проверка знаний' },

  { lesson: 2547035, label: 'ЛОГИКА · МОДУЛЬ', title: 'Что будет в модуле «Простая логика без кода»' },
  { lesson: 2547036, label: 'ЛОГИКА · УРОК 1', title: 'Кнопки, переходы и условия в конструкторе' },
  { lesson: 2547037, label: 'ЛОГИКА · УРОК 2', title: 'Уведомления и обратная связь пользователю' },
  { lesson: 2547038, label: 'ЛОГИКА · ТЕСТ', title: 'Проверка знаний' },

  { lesson: 2547039, label: 'ПУБЛИКАЦИЯ · МОДУЛЬ', title: 'Что будет в модуле «Публикация приложения»' },
  { lesson: 2547040, label: 'ПУБЛИКАЦИЯ · УРОК 1', title: 'Тестирование на реальном телефоне' },
  { lesson: 2547041, label: 'ПУБЛИКАЦИЯ · УРОК 2', title: 'Публикация в сторе или как веб-версии' },
  { lesson: 2547042, label: 'ПУБЛИКАЦИЯ · ТЕСТ', title: 'Проверка знаний' },

  { lesson: 2547043, label: 'ЧТО ДАЛЬШЕ · УРОК 1', title: 'Итоги курса' },
  { lesson: 2547044, label: 'ЧТО ДАЛЬШЕ · УРОК 2', title: 'Что дальше' },
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
    h1 { font-size: 48px; font-weight: 800; color: #fff; line-height: 1.16; margin-top: 22px; max-width: 1560px; text-wrap: balance; position: relative; z-index: 1; }
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
