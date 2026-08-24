// Generate wide lesson-header banners for course 183096 ("Профессия
// продакт-маркетолог" — PAID tier-1 course).
// Usage: node scripts/gen_183096_headers.mjs <html_out_dir>
import fs from 'node:fs';
import path from 'node:path';
import { BRAND, fontFaceCss } from './slide_template.mjs';

const [, , htmlOutDir] = process.argv;
if (!htmlOutDir) {
  console.error('Usage: node gen_183096_headers.mjs <html_out_dir>');
  process.exit(1);
}
fs.mkdirSync(htmlOutDir, { recursive: true });

const W = 1920;
const H = 420;

export const HEADERS = [
  { lesson: 2546564, label: 'СТАРТ · ВИДЕО', title: 'Видео-приветствие' },
  { lesson: 2546565, label: 'СТАРТ', title: 'Что будет на курсе и какой проект мы соберём' },

  { lesson: 2546566, label: 'ПОЗИЦИОНИРОВАНИЕ · МОДУЛЬ', title: 'Что будет в модуле «Позиционирование продукта»' },
  { lesson: 2546567, label: 'ПОЗИЦИОНИРОВАНИЕ · УРОК 1', title: 'Как найти реальное отличие продукта от конкурентов' },
  { lesson: 2546568, label: 'ПОЗИЦИОНИРОВАНИЕ · УРОК 2', title: 'От отличия к сообщению: как это сформулировать' },
  { lesson: 2546569, label: 'ПОЗИЦИОНИРОВАНИЕ · ПРАКТИКА', title: 'Практика: написать позиционирование своего продукта' },

  { lesson: 2546570, label: 'GO-TO-MARKET · МОДУЛЬ', title: 'Что будет в модуле «Go-to-market план»' },
  { lesson: 2546571, label: 'GO-TO-MARKET · УРОК 1', title: 'Как выбрать каналы запуска под свой продукт и аудиторию' },
  { lesson: 2546572, label: 'GO-TO-MARKET · УРОК 2', title: 'План и чек-лист запуска: что нужно успеть до и после' },
  { lesson: 2546573, label: 'GO-TO-MARKET · ПРАКТИКА', title: 'Практика: составить go-to-market план' },

  { lesson: 2546574, label: 'КОМАНДА · МОДУЛЬ', title: 'Что будет в модуле «Работа с командой»' },
  { lesson: 2546575, label: 'КОМАНДА · УРОК 1', title: 'Обратная связь продуктовой команде по фичам и приоритетам' },
  { lesson: 2546576, label: 'КОМАНДА · УРОК 2', title: 'Как подготовить команду продаж к запуску' },
  { lesson: 2546577, label: 'КОМАНДА · ПРАКТИКА', title: 'Практика: подготовить материал для команды продаж' },

  { lesson: 2546578, label: 'ТЕСТИРОВАНИЕ · МОДУЛЬ', title: 'Что будет в модуле «Тестирование гипотез запуска»' },
  { lesson: 2546579, label: 'ТЕСТИРОВАНИЕ · УРОК 1', title: 'Что тестировать при запуске: цена, сообщение, канал' },
  { lesson: 2546580, label: 'ТЕСТИРОВАНИЕ · УРОК 2', title: 'Как читать первые данные и принимать решение' },
  { lesson: 2546581, label: 'ТЕСТИРОВАНИЕ · ПРАКТИКА', title: 'Практика: составить план теста для своего запуска' },

  { lesson: 2546582, label: 'ОТЧЁТ · МОДУЛЬ', title: 'Что будет в модуле «Отчёт и метрики»' },
  { lesson: 2546583, label: 'ОТЧЁТ · УРОК 1', title: 'Метрики запуска, которые нужны бизнесу' },
  { lesson: 2546584, label: 'ОТЧЁТ · УРОК 2', title: 'Как показать результат запуска руководству' },
  { lesson: 2546585, label: 'ОТЧЁТ · ПРАКТИКА', title: 'Практика: подготовить отчёт по своему запуску' },

  { lesson: 2546586, label: 'ЧТО ДАЛЬШЕ · УРОК 1', title: 'Итоги курса' },
  { lesson: 2546587, label: 'ЧТО ДАЛЬШЕ · УРОК 2', title: 'Что дальше' },
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
