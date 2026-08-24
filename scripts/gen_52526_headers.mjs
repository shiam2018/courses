// Generate wide lesson-header banners for course 52526 ("Creative
// Production: креативы для перформанс-маркетинга"), same visual language
// as the rest of the free-course line-up.
// Usage: node scripts/gen_52526_headers.mjs <html_out_dir>
import fs from 'node:fs';
import path from 'node:path';
import { BRAND, fontFaceCss } from './slide_template.mjs';

const [, , htmlOutDir] = process.argv;
if (!htmlOutDir) {
  console.error('Usage: node gen_52526_headers.mjs <html_out_dir>');
  process.exit(1);
}
fs.mkdirSync(htmlOutDir, { recursive: true });

const W = 1920;
const H = 420;

export const HEADERS = [
  { lesson: 2546432, label: 'СТАРТ · ВИДЕО', title: 'Видео-приветствие' },
  { lesson: 2546433, label: 'СТАРТ', title: 'Что будет на курсе' },

  { lesson: 2546434, label: 'ОСНОВЫ · МОДУЛЬ', title: 'Что будет в модуле «Основы креативного продакшена»' },
  { lesson: 2546435, label: 'ОСНОВЫ · УРОК 1', title: 'Что такое creative production и роль дизайнера в закупке трафика' },
  { lesson: 2546436, label: 'ОСНОВЫ · УРОК 2', title: 'Метрики креатива: показы, клики, CTR, конверсии, CVR' },
  { lesson: 2546437, label: 'ОСНОВЫ · ПРОВЕРКА ЗНАНИЙ', title: 'Проверка знаний: основы креативного продакшена' },

  { lesson: 2546438, label: 'ДИЗАЙН И КРЕАТИВ · МОДУЛЬ', title: 'Что будет в модуле «Дизайн и креатив»' },
  { lesson: 2546439, label: 'ДИЗАЙН И КРЕАТИВ · УРОК 1', title: 'Чем хороший дизайн отличается от хорошего креатива' },
  { lesson: 2546440, label: 'ДИЗАЙН И КРЕАТИВ · УРОК 2', title: 'Что мотивирует пользователей кликать и покупать' },
  { lesson: 2546441, label: 'ДИЗАЙН И КРЕАТИВ · ПРОВЕРКА ЗНАНИЙ', title: 'Проверка знаний: дизайн и креатив' },

  { lesson: 2546442, label: 'ЧЕСТНОСТЬ · МОДУЛЬ', title: 'Что будет в модуле «Честность в креативах»' },
  { lesson: 2546443, label: 'ЧЕСТНОСТЬ · УРОК 1', title: 'Преувеличение против обмана: где проходит грань' },
  { lesson: 2546444, label: 'ЧЕСТНОСТЬ · УРОК 2', title: 'Почему копировать чужой бренд — плохая идея' },
  { lesson: 2546445, label: 'ЧЕСТНОСТЬ · ПРОВЕРКА ЗНАНИЙ', title: 'Проверка знаний: честность в креативах' },

  { lesson: 2546446, label: 'ФОРМАТЫ · МОДУЛЬ', title: 'Что будет в модуле «Форматы по категориям продукта»' },
  { lesson: 2546447, label: 'ФОРМАТЫ · УРОК 1', title: 'Креативы для e-commerce: что работает на практике' },
  { lesson: 2546448, label: 'ФОРМАТЫ · УРОК 2', title: 'Креативы для приложений, обучения и услуг' },
  { lesson: 2546449, label: 'ФОРМАТЫ · ПРОВЕРКА ЗНАНИЙ', title: 'Проверка знаний: форматы по категориям продукта' },

  { lesson: 2546450, label: 'ТЕСТИРОВАНИЕ · МОДУЛЬ', title: 'Что будет в модуле «Тестирование креативов»' },
  { lesson: 2546451, label: 'ТЕСТИРОВАНИЕ · УРОК 1', title: 'Как тестировать несколько креативов одновременно' },
  { lesson: 2546452, label: 'ТЕСТИРОВАНИЕ · УРОК 2', title: 'Как читать результаты теста и делать следующий шаг' },
  { lesson: 2546453, label: 'ТЕСТИРОВАНИЕ · ПРОВЕРКА ЗНАНИЙ', title: 'Проверка знаний: тестирование креативов' },

  { lesson: 2546454, label: 'ЧТО ДАЛЬШЕ · УРОК 1', title: 'Итоги курса' },
  { lesson: 2546455, label: 'ЧТО ДАЛЬШЕ · УРОК 2', title: 'Что дальше' },
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
