// Generate wide lesson-header banners for course 183075 ("Сайт без кода:
// конструкторы для начинающих" — FREE course).
import fs from 'node:fs';
import path from 'node:path';
import { BRAND, fontFaceCss } from './slide_template.mjs';

const [, , htmlOutDir] = process.argv;
if (!htmlOutDir) {
  console.error('Usage: node gen_183075_headers.mjs <html_out_dir>');
  process.exit(1);
}
fs.mkdirSync(htmlOutDir, { recursive: true });

const W = 1920;
const H = 420;

export const HEADERS = [
  { lesson: 2546990, label: 'СТАРТ · ВИДЕО', title: 'Видео-приветствие' },
  { lesson: 2546992, label: 'СТАРТ', title: 'Что будет на курсе' },

  { lesson: 2546993, label: 'КОНСТРУКТОР · МОДУЛЬ', title: 'Что будет в модуле «Конструктор или разработка с нуля»' },
  { lesson: 2546994, label: 'КОНСТРУКТОР · УРОК 1', title: 'Что такое конструктор сайтов и когда он подходит' },
  { lesson: 2546995, label: 'КОНСТРУКТОР · УРОК 2', title: 'Какой конструктор выбрать под свою задачу' },
  { lesson: 2546997, label: 'КОНСТРУКТОР · ТЕСТ', title: 'Проверка знаний' },

  { lesson: 2546999, label: 'СТРУКТУРА · МОДУЛЬ', title: 'Что будет в модуле «Планирование структуры»' },
  { lesson: 2547000, label: 'СТРУКТУРА · УРОК 1', title: 'Из каких страниц состоит простой сайт' },
  { lesson: 2547002, label: 'СТРУКТУРА · УРОК 2', title: 'Как спланировать структуру до открытия конструктора' },
  { lesson: 2547003, label: 'СТРУКТУРА · ТЕСТ', title: 'Проверка знаний' },

  { lesson: 2547005, label: 'ШАБЛОН · МОДУЛЬ', title: 'Что будет в модуле «Шаблон и контент»' },
  { lesson: 2547007, label: 'ШАБЛОН · УРОК 1', title: 'Как выбрать и адаптировать шаблон под задачу' },
  { lesson: 2547008, label: 'ШАБЛОН · УРОК 2', title: 'Текст и изображения, которые не отпугивают посетителя' },
  { lesson: 2547010, label: 'ШАБЛОН · ТЕСТ', title: 'Проверка знаний' },

  { lesson: 2547011, label: 'SEO · МОДУЛЬ', title: 'Что будет в модуле «Базовый SEO без кода»' },
  { lesson: 2547012, label: 'SEO · УРОК 1', title: 'Заголовки и метаописания: что настроить в конструкторе' },
  { lesson: 2547013, label: 'SEO · УРОК 2', title: 'Скорость загрузки и мобильная версия сайта' },
  { lesson: 2547014, label: 'SEO · ТЕСТ', title: 'Проверка знаний' },

  { lesson: 2547015, label: 'ПУБЛИКАЦИЯ · МОДУЛЬ', title: 'Что будет в модуле «Публикация сайта»' },
  { lesson: 2547016, label: 'ПУБЛИКАЦИЯ · УРОК 1', title: 'Как подключить свой домен' },
  { lesson: 2547017, label: 'ПУБЛИКАЦИЯ · УРОК 2', title: 'Что проверить перед публикацией' },
  { lesson: 2547018, label: 'ПУБЛИКАЦИЯ · ТЕСТ', title: 'Проверка знаний' },

  { lesson: 2547019, label: 'ЧТО ДАЛЬШЕ · УРОК 1', title: 'Итоги курса' },
  { lesson: 2547020, label: 'ЧТО ДАЛЬШЕ · УРОК 2', title: 'Что дальше' },
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
