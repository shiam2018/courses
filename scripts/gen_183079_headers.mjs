// Generate wide lesson-header banners for course 183079 ("Введение в
// вайбкодинг"), same visual language as 183103/297305/94836.
// Usage: node scripts/gen_183079_headers.mjs <html_out_dir>
import fs from 'node:fs';
import path from 'node:path';
import { BRAND, fontFaceCss } from './slide_template.mjs';

const [, , htmlOutDir] = process.argv;
if (!htmlOutDir) {
  console.error('Usage: node gen_183079_headers.mjs <html_out_dir>');
  process.exit(1);
}
fs.mkdirSync(htmlOutDir, { recursive: true });

const W = 1920;
const H = 420;

export const HEADERS = [
  { lesson: 2543812, label: 'СТАРТ', title: 'Что будет на курсе' },

  { lesson: 2543813, label: 'ЧТО ТАКОЕ ВАЙБ-КОДИНГ · МОДУЛЬ', title: 'Что будет в модуле «Что такое вайб-кодинг»' },
  { lesson: 2543814, label: 'ЧТО ТАКОЕ ВАЙБ-КОДИНГ · УРОК 1', title: 'Что такое вайб-кодинг и когда он реально работает' },
  { lesson: 2543815, label: 'ЧТО ТАКОЕ ВАЙБ-КОДИНГ · УРОК 2', title: 'Как думает AI-агент: контекст, инструменты, ограничения' },
  { lesson: 2543816, label: 'ЧТО ТАКОЕ ВАЙБ-КОДИНГ · ПРОВЕРКА ЗНАНИЙ', title: 'Проверка знаний: что такое вайб-кодинг' },

  { lesson: 2543817, label: 'ИНСТРУМЕНТЫ · МОДУЛЬ', title: 'Что будет в модуле «Инструменты: как выбрать»' },
  { lesson: 2543818, label: 'ИНСТРУМЕНТЫ · УРОК 1', title: 'Claude Code: агент в терминале для реальных проектов' },
  { lesson: 2543819, label: 'ИНСТРУМЕНТЫ · УРОК 2', title: 'Codex: второй подход и когда он лучше подходит' },
  { lesson: 2543820, label: 'ИНСТРУМЕНТЫ · УРОК 3', title: 'Cursor: вводное в AI-кодинг в VS Code' },
  { lesson: 2543821, label: 'ИНСТРУМЕНТЫ · УРОК 4', title: 'YandexGPT для кодинга: когда это разумный выбор' },
  { lesson: 2543822, label: 'ИНСТРУМЕНТЫ · ПРОВЕРКА ЗНАНИЙ', title: 'Проверка знаний: инструменты вайб-кодинга' },

  { lesson: 2543823, label: 'КАК РАБОТАТЬ С АГЕНТОМ · МОДУЛЬ', title: 'Что будет в модуле «Как работать с агентом»' },
  { lesson: 2543824, label: 'КАК РАБОТАТЬ С АГЕНТОМ · УРОК 1', title: 'Как формулировать задачу, чтобы получить рабочий код' },
  { lesson: 2543825, label: 'КАК РАБОТАТЬ С АГЕНТОМ · УРОК 2', title: 'Итеративная разработка: маленькими шагами, с проверкой' },
  { lesson: 2543826, label: 'КАК РАБОТАТЬ С АГЕНТОМ · УРОК 3', title: 'Технический долг: что проверяет человек, а не агент' },
  { lesson: 2543827, label: 'КАК РАБОТАТЬ С АГЕНТОМ · ПРОВЕРКА ЗНАНИЙ', title: 'Проверка знаний: как работать с агентом' },

  { lesson: 2543828, label: 'ОТ ПРОТОТИПА К ПРОДУКТУ · МОДУЛЬ', title: 'Что будет в модуле «От прототипа к продукту»' },
  { lesson: 2543829, label: 'ОТ ПРОТОТИПА К ПРОДУКТУ · УРОК 1', title: 'Кейс cleanor.app: как выглядит реальный вайб-кодинг проект' },
  { lesson: 2543830, label: 'ОТ ПРОТОТИПА К ПРОДУКТУ · УРОК 2', title: 'Сколько стоит вайб-кодинг на самом деле' },
  { lesson: 2543831, label: 'ОТ ПРОТОТИПА К ПРОДУКТУ · УРОК 3', title: 'Деплой и что дальше после первой версии' },
  { lesson: 2543832, label: 'ОТ ПРОТОТИПА К ПРОДУКТУ · ПРОВЕРКА ЗНАНИЙ', title: 'Проверка знаний: от прототипа к продукту' },

  { lesson: 2543833, label: 'ЧТО ДАЛЬШЕ · УРОК 1', title: 'Итоги курса' },
  { lesson: 2543834, label: 'ЧТО ДАЛЬШЕ · УРОК 2', title: 'Что дальше' },
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
