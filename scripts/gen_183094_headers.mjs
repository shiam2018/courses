// Generate wide lesson-header banners for course 183094 ("Excel с нуля:
// формулы, ВПР и сводные таблицы"), same visual language as 183103/297305/94836/183079.
// Usage: node scripts/gen_183094_headers.mjs <html_out_dir>
import fs from 'node:fs';
import path from 'node:path';
import { BRAND, fontFaceCss } from './slide_template.mjs';

const [, , htmlOutDir] = process.argv;
if (!htmlOutDir) {
  console.error('Usage: node gen_183094_headers.mjs <html_out_dir>');
  process.exit(1);
}
fs.mkdirSync(htmlOutDir, { recursive: true });

const W = 1920;
const H = 420;

export const HEADERS = [
  { lesson: 2543876, label: 'СТАРТ · ВИДЕО', title: 'Видео-приветствие' },
  { lesson: 2543877, label: 'СТАРТ', title: 'Что будет на курсе' },

  { lesson: 2543878, label: 'ФОРМУЛЫ И ССЫЛКИ · МОДУЛЬ', title: 'Что будет в модуле «Формулы и ссылки»' },
  { lesson: 2543879, label: 'ФОРМУЛЫ И ССЫЛКИ · УРОК 1', title: 'Как устроен Excel: ячейки, листы, формулы' },
  { lesson: 2543880, label: 'ФОРМУЛЫ И ССЫЛКИ · УРОК 2', title: 'Абсолютные и относительные ссылки' },
  { lesson: 2543881, label: 'ФОРМУЛЫ И ССЫЛКИ · УРОК 3', title: 'Математические и статистические формулы' },
  { lesson: 2543882, label: 'ФОРМУЛЫ И ССЫЛКИ · ПРОВЕРКА ЗНАНИЙ', title: 'Проверка знаний: формулы и ссылки' },

  { lesson: 2543883, label: 'ТЕКСТ, ДАТЫ И ПОИСК · МОДУЛЬ', title: 'Что будет в модуле «Текст, даты и поиск данных»' },
  { lesson: 2543884, label: 'ТЕКСТ, ДАТЫ И ПОИСК · УРОК 1', title: 'Работа с текстом: СЦЕПИТЬ, ЛЕВСИМВ, ПРАВСИМВ' },
  { lesson: 2543885, label: 'ТЕКСТ, ДАТЫ И ПОИСК · УРОК 2', title: 'Работа с датами: СЕГОДНЯ, ДАТА, РАЗНДАТ' },
  { lesson: 2543886, label: 'ТЕКСТ, ДАТЫ И ПОИСК · УРОК 3', title: 'ВПР и ИНДЕКС+ПОИСКПОЗ: ищем данные в других таблицах' },
  { lesson: 2543887, label: 'ТЕКСТ, ДАТЫ И ПОИСК · ПРОВЕРКА ЗНАНИЙ', title: 'Проверка знаний: текст, даты и поиск данных' },

  { lesson: 2543888, label: 'ЛОГИКА И ФИЛЬТРЫ · МОДУЛЬ', title: 'Что будет в модуле «Логика, сортировка и фильтры»' },
  { lesson: 2543889, label: 'ЛОГИКА И ФИЛЬТРЫ · УРОК 1', title: 'Функция ЕСЛИ и условный подсчёт: СУММЕСЛИ, СЧЁТЕСЛИ' },
  { lesson: 2543890, label: 'ЛОГИКА И ФИЛЬТРЫ · УРОК 2', title: 'Сортировка и фильтрация данных' },
  { lesson: 2543891, label: 'ЛОГИКА И ФИЛЬТРЫ · УРОК 3', title: 'Условное форматирование' },
  { lesson: 2543892, label: 'ЛОГИКА И ФИЛЬТРЫ · ПРОВЕРКА ЗНАНИЙ', title: 'Проверка знаний: логика, сортировка и фильтры' },

  { lesson: 2543893, label: 'СВОДНЫЕ ТАБЛИЦЫ · МОДУЛЬ', title: 'Что будет в модуле «Сводные таблицы»' },
  { lesson: 2543894, label: 'СВОДНЫЕ ТАБЛИЦЫ · УРОК 1', title: 'Как построить сводную таблицу с нуля' },
  { lesson: 2543895, label: 'СВОДНЫЕ ТАБЛИЦЫ · УРОК 2', title: 'Группировка и вычисляемые поля в сводной таблице' },
  { lesson: 2543896, label: 'СВОДНЫЕ ТАБЛИЦЫ · ПРОВЕРКА ЗНАНИЙ', title: 'Проверка знаний: сводные таблицы' },

  { lesson: 2543897, label: 'ДИАГРАММЫ И ОТЧЁТ · МОДУЛЬ', title: 'Что будет в модуле «Диаграммы и итоговый отчёт»' },
  { lesson: 2543898, label: 'ДИАГРАММЫ И ОТЧЁТ · УРОК 1', title: 'Как выбрать тип диаграммы под задачу' },
  { lesson: 2543899, label: 'ДИАГРАММЫ И ОТЧЁТ · УРОК 2', title: 'Собираем итоговый отчёт: формулы, сводная, диаграмма' },
  { lesson: 2543900, label: 'ДИАГРАММЫ И ОТЧЁТ · ПРОВЕРКА ЗНАНИЙ', title: 'Проверка знаний: диаграммы и итоговый отчёт' },

  { lesson: 2543901, label: 'ЧТО ДАЛЬШЕ · УРОК 1', title: 'Итоги курса' },
  { lesson: 2543902, label: 'ЧТО ДАЛЬШЕ · УРОК 2', title: 'Что дальше' },
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
    h1 { font-size: 52px; font-weight: 800; color: #fff; line-height: 1.16; margin-top: 22px; max-width: 1560px; text-wrap: balance; position: relative; z-index: 1; }
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
