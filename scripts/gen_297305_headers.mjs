// Generate wide lesson-header banners for course 297305 (free "Маркетинговая
// аналитика: с нуля до первого отчёта"), same visual language as 183103/94834.
// Usage: node scripts/gen_297305_headers.mjs <html_out_dir>
import fs from 'node:fs';
import path from 'node:path';
import { BRAND, fontFaceCss } from './slide_template.mjs';

const [, , htmlOutDir] = process.argv;
if (!htmlOutDir) {
  console.error('Usage: node gen_297305_headers.mjs <html_out_dir>');
  process.exit(1);
}
fs.mkdirSync(htmlOutDir, { recursive: true });

const W = 1920;
const H = 420;

export const HEADERS = [
  { lesson: 2543729, label: 'СТАРТ', title: 'Что будет на курсе' },

  { lesson: 2543730, label: 'ОСНОВЫ АНАЛИТИКИ · МОДУЛЬ', title: 'Что будет в модуле «Основы аналитики»' },
  { lesson: 2543731, label: 'ОСНОВЫ АНАЛИТИКИ · УРОК 1', title: 'Что такое аналитика и зачем она маркетологу' },
  { lesson: 2543732, label: 'ОСНОВЫ АНАЛИТИКИ · УРОК 2', title: 'Ключевые метрики: CTR, CPC, CPA, CR, ROI' },
  { lesson: 2543733, label: 'ОСНОВЫ АНАЛИТИКИ · ПРОВЕРКА ЗНАНИЙ', title: 'Проверка знаний: основы аналитики' },

  { lesson: 2543734, label: 'ИНСТРУМЕНТЫ АНАЛИТИКА · МОДУЛЬ', title: 'Что будет в модуле «Инструменты аналитика»' },
  { lesson: 2543735, label: 'ИНСТРУМЕНТЫ АНАЛИТИКА · УРОК 1', title: 'Яндекс.Метрика: счётчик и цели' },
  { lesson: 2543736, label: 'ИНСТРУМЕНТЫ АНАЛИТИКА · УРОК 2', title: 'Google Analytics 4: на что смотреть в первую очередь' },
  { lesson: 2543737, label: 'ИНСТРУМЕНТЫ АНАЛИТИКА · УРОК 3', title: 'Excel и сводные таблицы: как свести цифры в отчёт' },
  { lesson: 2543738, label: 'ИНСТРУМЕНТЫ АНАЛИТИКА · ПРОВЕРКА ЗНАНИЙ', title: 'Проверка знаний: инструменты аналитика' },

  { lesson: 2543739, label: 'ОТЧЁТЫ И МЕТРИКИ · МОДУЛЬ', title: 'Что будет в модуле «Отчёты и метрики»' },
  { lesson: 2543740, label: 'ОТЧЁТЫ И МЕТРИКИ · УРОК 1', title: 'Как читать отчёт по трафику' },
  { lesson: 2543741, label: 'ОТЧЁТЫ И МЕТРИКИ · УРОК 2', title: 'Атрибуция: почему разные модели показывают разную картину' },
  { lesson: 2543742, label: 'ОТЧЁТЫ И МЕТРИКИ · УРОК 3', title: 'Визуализация: отчёт, который поймут с первого взгляда' },
  { lesson: 2543743, label: 'ОТЧЁТЫ И МЕТРИКИ · ПРОВЕРКА ЗНАНИЙ', title: 'Проверка знаний: отчёты и метрики' },

  { lesson: 2543744, label: 'ИНСАЙТЫ И ГИПОТЕЗЫ · МОДУЛЬ', title: 'Что будет в модуле «Инсайты и гипотезы»' },
  { lesson: 2543745, label: 'ИНСАЙТЫ И ГИПОТЕЗЫ · УРОК 1', title: 'Как искать инсайты в цифрах' },
  { lesson: 2543746, label: 'ИНСАЙТЫ И ГИПОТЕЗЫ · УРОК 2', title: 'Как сформулировать проверяемую гипотезу' },
  { lesson: 2543747, label: 'ИНСАЙТЫ И ГИПОТЕЗЫ · ПРОВЕРКА ЗНАНИЙ', title: 'Проверка знаний: инсайты и гипотезы' },

  { lesson: 2543748, label: 'ЭКСПЕРИМЕНТЫ · МОДУЛЬ', title: 'Что будет в модуле «Эксперименты»' },
  { lesson: 2543749, label: 'ЭКСПЕРИМЕНТЫ · УРОК 1', title: 'Что такое A/B-тест и когда он нужен' },
  { lesson: 2543750, label: 'ЭКСПЕРИМЕНТЫ · УРОК 2', title: 'Контрольная группа и типичные ошибки самообмана' },
  { lesson: 2543751, label: 'ЭКСПЕРИМЕНТЫ · УРОК 3', title: 'Как оценивать результат эксперимента' },
  { lesson: 2543752, label: 'ЭКСПЕРИМЕНТЫ · ПРОВЕРКА ЗНАНИЙ', title: 'Проверка знаний: эксперименты' },

  { lesson: 2543753, label: 'ЧТО ДАЛЬШЕ · УРОК 1', title: 'Итоги курса' },
  { lesson: 2543754, label: 'ЧТО ДАЛЬШЕ · УРОК 2', title: 'Продолжите обучение' },
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
    .eyebrow-label { font-size: 22px; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase; color: #fff; }
    h1 { font-size: 56px; font-weight: 800; color: #fff; line-height: 1.16; margin-top: 22px; max-width: 1500px; text-wrap: balance; position: relative; z-index: 1; }
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
