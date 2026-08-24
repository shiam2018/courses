// Generate wide lesson-header banners for course 183101 ("Product-маркетинг:
// продукт, аудитория и запуск" — FREE course).
// Usage: node scripts/gen_183101_headers.mjs <html_out_dir>
import fs from 'node:fs';
import path from 'node:path';
import { BRAND, fontFaceCss } from './slide_template.mjs';

const [, , htmlOutDir] = process.argv;
if (!htmlOutDir) {
  console.error('Usage: node gen_183101_headers.mjs <html_out_dir>');
  process.exit(1);
}
fs.mkdirSync(htmlOutDir, { recursive: true });

const W = 1920;
const H = 420;

export const HEADERS = [
  { lesson: 2546540, label: 'СТАРТ · ВИДЕО', title: 'Видео-приветствие' },
  { lesson: 2546541, label: 'СТАРТ', title: 'Что будет на курсе' },

  { lesson: 2546542, label: 'ПРОДАКТ-МАРКЕТИНГ · МОДУЛЬ', title: 'Что будет в модуле «Что такое продакт-маркетинг»' },
  { lesson: 2546543, label: 'ПРОДАКТ-МАРКЕТИНГ · УРОК 1', title: 'Продакт-маркетинг: роль на стыке продукта и маркетинга' },
  { lesson: 2546544, label: 'ПРОДАКТ-МАРКЕТИНГ · УРОК 2', title: 'Аудитория и Jobs to be Done: для кого мы делаем продукт' },
  { lesson: 2546545, label: 'ПРОДАКТ-МАРКЕТИНГ · ТЕСТ', title: 'Проверка знаний' },

  { lesson: 2546546, label: 'ОТ ИДЕИ К MVP · МОДУЛЬ', title: 'Что будет в модуле «От идеи к MVP»' },
  { lesson: 2546547, label: 'ОТ ИДЕИ К MVP · УРОК 1', title: 'Этапы разработки продукта: от идеи до релиза' },
  { lesson: 2546548, label: 'ОТ ИДЕИ К MVP · УРОК 2', title: 'MVP, Proof of Concept и product-market fit' },
  { lesson: 2546549, label: 'ОТ ИДЕИ К MVP · ТЕСТ', title: 'Проверка знаний' },

  { lesson: 2546550, label: 'МЕТОДОЛОГИИ · МОДУЛЬ', title: 'Что будет в модуле «Методологии и жизненный цикл»' },
  { lesson: 2546551, label: 'МЕТОДОЛОГИИ · УРОК 1', title: 'Agile, Scrum и Kanban: как работают команды разработки' },
  { lesson: 2546552, label: 'МЕТОДОЛОГИИ · УРОК 2', title: 'Жизненный цикл продукта: от внедрения до упадка' },
  { lesson: 2546553, label: 'МЕТОДОЛОГИИ · ТЕСТ', title: 'Проверка знаний' },

  { lesson: 2546554, label: 'GO-TO-MARKET · МОДУЛЬ', title: 'Что будет в модуле «Go-to-market стратегия»' },
  { lesson: 2546555, label: 'GO-TO-MARKET · УРОК 1', title: 'Позиционирование: чем ваш продукт отличается от других' },
  { lesson: 2546556, label: 'GO-TO-MARKET · УРОК 2', title: 'Каналы запуска и первый план выхода на рынок' },
  { lesson: 2546557, label: 'GO-TO-MARKET · ТЕСТ', title: 'Проверка знаний' },

  { lesson: 2546558, label: 'МЕТРИКИ И ПРИМЕРЫ · МОДУЛЬ', title: 'Что будет в модуле «Метрики и примеры»' },
  { lesson: 2546559, label: 'МЕТРИКИ И ПРИМЕРЫ · УРОК 1', title: 'Метрики запуска: активация, удержание, NPS' },
  { lesson: 2546560, label: 'МЕТРИКИ И ПРИМЕРЫ · УРОК 2', title: 'Примеры известных MVP: Uber, Airbnb, eBay, Spotify' },
  { lesson: 2546561, label: 'МЕТРИКИ И ПРИМЕРЫ · ТЕСТ', title: 'Проверка знаний' },

  { lesson: 2546562, label: 'ЧТО ДАЛЬШЕ · УРОК 1', title: 'Итоги курса' },
  { lesson: 2546563, label: 'ЧТО ДАЛЬШЕ · УРОК 2', title: 'Что дальше' },
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
