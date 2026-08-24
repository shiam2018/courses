// Generate wide lesson-header banners for course 183082 ("Профессия
// Zero-code разработчик" — PAID tier-1 course).
import fs from 'node:fs';
import path from 'node:path';
import { BRAND, fontFaceCss } from './slide_template.mjs';

const [, , htmlOutDir] = process.argv;
if (!htmlOutDir) {
  console.error('Usage: node gen_183082_headers.mjs <html_out_dir>');
  process.exit(1);
}
fs.mkdirSync(htmlOutDir, { recursive: true });

const W = 1920;
const H = 420;

export const HEADERS = [
  { lesson: 2547045, label: 'СТАРТ · ВИДЕО', title: 'Видео-приветствие' },
  { lesson: 2547046, label: 'СТАРТ', title: 'Что будет на курсе и какой проект мы соберём' },

  { lesson: 2547047, label: 'МАКЕТ · МОДУЛЬ', title: 'Что будет в модуле «От идеи к макету»' },
  { lesson: 2547048, label: 'МАКЕТ · УРОК 1', title: 'Как выбрать инструмент под задачу: сайт, приложение или оба' },
  { lesson: 2547049, label: 'МАКЕТ · УРОК 2', title: 'Как спланировать экраны и путь пользователя' },
  { lesson: 2547050, label: 'МАКЕТ · ПРАКТИКА', title: 'Практика: собрать макет своего проекта' },

  { lesson: 2547051, label: 'ИНТЕРФЕЙС · МОДУЛЬ', title: 'Что будет в модуле «Интерфейс и логика»' },
  { lesson: 2547052, label: 'ИНТЕРФЕЙС · УРОК 1', title: 'Как собрать интерфейс из готовых блоков конструктора' },
  { lesson: 2547053, label: 'ИНТЕРФЕЙС · УРОК 2', title: 'Условия и переходы: простая логика без кода' },
  { lesson: 2547054, label: 'ИНТЕРФЕЙС · ПРАКТИКА', title: 'Практика: собрать интерфейс своего проекта' },

  { lesson: 2547055, label: 'ДАННЫЕ · МОДУЛЬ', title: 'Что будет в модуле «Данные и интеграции»' },
  { lesson: 2547056, label: 'ДАННЫЕ · УРОК 1', title: 'Как подключить реальный источник данных' },
  { lesson: 2547057, label: 'ДАННЫЕ · УРОК 2', title: 'Формы, аккаунты и простая авторизация без кода' },
  { lesson: 2547058, label: 'ДАННЫЕ · ПРАКТИКА', title: 'Практика: подключить данные к своему проекту' },

  { lesson: 2547059, label: 'ТЕСТИРОВАНИЕ · МОДУЛЬ', title: 'Что будет в модуле «Тестирование и доработка»' },
  { lesson: 2547060, label: 'ТЕСТИРОВАНИЕ · УРОК 1', title: 'Как протестировать продукт на реальных пользователях' },
  { lesson: 2547061, label: 'ТЕСТИРОВАНИЕ · УРОК 2', title: 'Частые ошибки в no-code проектах и как их избежать' },
  { lesson: 2547062, label: 'ТЕСТИРОВАНИЕ · ПРАКТИКА', title: 'Практика: протестировать и доработать свой проект' },

  { lesson: 2547063, label: 'ПУБЛИКАЦИЯ · МОДУЛЬ', title: 'Что будет в модуле «Публикация и что дальше»' },
  { lesson: 2547064, label: 'ПУБЛИКАЦИЯ · УРОК 1', title: 'Как опубликовать сайт или приложение' },
  { lesson: 2547065, label: 'ПУБЛИКАЦИЯ · УРОК 2', title: 'Что делать после публикации: обратная связь и метрики' },
  { lesson: 2547066, label: 'ПУБЛИКАЦИЯ · ПРАКТИКА', title: 'Практика: опубликовать свой проект' },

  { lesson: 2547067, label: 'ЧТО ДАЛЬШЕ · УРОК 1', title: 'Итоги курса' },
  { lesson: 2547068, label: 'ЧТО ДАЛЬШЕ · УРОК 2', title: 'Что дальше' },
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
