// Generate wide lesson-header banners for course 183076 ("Введение в
// email-маркетинг" — FREE course).
// Usage: node scripts/gen_183076_headers.mjs <html_out_dir>
import fs from 'node:fs';
import path from 'node:path';
import { BRAND, fontFaceCss } from './slide_template.mjs';

const [, , htmlOutDir] = process.argv;
if (!htmlOutDir) {
  console.error('Usage: node gen_183076_headers.mjs <html_out_dir>');
  process.exit(1);
}
fs.mkdirSync(htmlOutDir, { recursive: true });

const W = 1920;
const H = 420;

export const HEADERS = [
  { lesson: 2546899, label: 'СТАРТ · ВИДЕО', title: 'Видео-приветствие' },
  { lesson: 2546901, label: 'СТАРТ', title: 'Что будет на курсе' },

  { lesson: 2546902, label: 'ОСНОВЫ · МОДУЛЬ', title: 'Что будет в модуле «Основы email-маркетинга»' },
  { lesson: 2546903, label: 'ОСНОВЫ · УРОК 1', title: 'Зачем бизнесу email-маркетинг и чем он отличается от других' },
  { lesson: 2546904, label: 'ОСНОВЫ · УРОК 2', title: 'Как законно собирать базу подписчиков' },
  { lesson: 2546905, label: 'ОСНОВЫ · ТЕСТ', title: 'Проверка знаний' },

  { lesson: 2546906, label: 'СЕГМЕНТАЦИЯ · МОДУЛЬ', title: 'Что будет в модуле «Сегментация базы»' },
  { lesson: 2546907, label: 'СЕГМЕНТАЦИЯ · УРОК 1', title: 'Зачем сегментировать базу и по каким признакам' },
  { lesson: 2546908, label: 'СЕГМЕНТАЦИЯ · УРОК 2', title: 'Жизненный цикл подписчика: от новичка до постоянного клиента' },
  { lesson: 2546909, label: 'СЕГМЕНТАЦИЯ · ТЕСТ', title: 'Проверка знаний' },

  { lesson: 2546910, label: 'ПИСЬМА · МОДУЛЬ', title: 'Что будет в модуле «Письма, которые читают»' },
  { lesson: 2546911, label: 'ПИСЬМА · УРОК 1', title: 'Тема письма: как получить открытие, а не удаление' },
  { lesson: 2546912, label: 'ПИСЬМА · УРОК 2', title: 'Текст и призыв к действию: как получить клик' },
  { lesson: 2546913, label: 'ПИСЬМА · ТЕСТ', title: 'Проверка знаний' },

  { lesson: 2546914, label: 'АВТОМАТИЗАЦИЯ · МОДУЛЬ', title: 'Что будет в модуле «Автоматизация рассылок»' },
  { lesson: 2546915, label: 'АВТОМАТИЗАЦИЯ · УРОК 1', title: 'Welcome-серия: первое впечатление в автоматическом режиме' },
  { lesson: 2546916, label: 'АВТОМАТИЗАЦИЯ · УРОК 2', title: 'Триггерные письма: брошенная корзина и реактивация' },
  { lesson: 2546917, label: 'АВТОМАТИЗАЦИЯ · ТЕСТ', title: 'Проверка знаний' },

  { lesson: 2546918, label: 'МЕТРИКИ · МОДУЛЬ', title: 'Что будет в модуле «Метрики email-маркетинга»' },
  { lesson: 2546919, label: 'МЕТРИКИ · УРОК 1', title: 'Open rate и CTR: что они на самом деле показывают' },
  { lesson: 2546920, label: 'МЕТРИКИ · УРОК 2', title: 'Отписки и доставляемость: как не попасть в спам' },
  { lesson: 2546921, label: 'МЕТРИКИ · ТЕСТ', title: 'Проверка знаний' },

  { lesson: 2546922, label: 'ЧТО ДАЛЬШЕ · УРОК 1', title: 'Итоги курса' },
  { lesson: 2546923, label: 'ЧТО ДАЛЬШЕ · УРОК 2', title: 'Что дальше' },
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
