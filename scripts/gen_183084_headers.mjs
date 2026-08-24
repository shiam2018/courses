// Generate wide lesson-header banners for course 183084 ("Профессия
// Email-маркетолог" — PAID tier-1 course).
// Usage: node scripts/gen_183084_headers.mjs <html_out_dir>
import fs from 'node:fs';
import path from 'node:path';
import { BRAND, fontFaceCss } from './slide_template.mjs';

const [, , htmlOutDir] = process.argv;
if (!htmlOutDir) {
  console.error('Usage: node gen_183084_headers.mjs <html_out_dir>');
  process.exit(1);
}
fs.mkdirSync(htmlOutDir, { recursive: true });

const W = 1920;
const H = 420;

export const HEADERS = [
  { lesson: 2546924, label: 'СТАРТ · ВИДЕО', title: 'Видео-приветствие' },
  { lesson: 2546925, label: 'СТАРТ', title: 'Что будет на курсе и какую рассылку мы соберём' },

  { lesson: 2546926, label: 'СЕГМЕНТАЦИЯ · МОДУЛЬ', title: 'Что будет в модуле «Сегментация и стратегия»' },
  { lesson: 2546927, label: 'СЕГМЕНТАЦИЯ · УРОК 1', title: 'Как сегментировать базу под конкретную рассылку' },
  { lesson: 2546928, label: 'СЕГМЕНТАЦИЯ · УРОК 2', title: 'Стратегия рассылки: цель, частота, ключевое сообщение' },
  { lesson: 2546929, label: 'СЕГМЕНТАЦИЯ · ПРАКТИКА', title: 'Практика: сегментировать базу своего проекта' },

  { lesson: 2546930, label: 'ПИСЬМО · МОДУЛЬ', title: 'Что будет в модуле «Письмо, которое работает»' },
  { lesson: 2546931, label: 'ПИСЬМО · УРОК 1', title: 'Как написать тему письма, которую откроют' },
  { lesson: 2546932, label: 'ПИСЬМО · УРОК 2', title: 'Текст письма и призыв к действию под одну цель' },
  { lesson: 2546933, label: 'ПИСЬМО · ПРАКТИКА', title: 'Практика: написать письмо для своей рассылки' },

  { lesson: 2546934, label: 'АВТОМАТИЗАЦИЯ · МОДУЛЬ', title: 'Что будет в модуле «Автоматизация цепочки»' },
  { lesson: 2546935, label: 'АВТОМАТИЗАЦИЯ · УРОК 1', title: 'Как спроектировать триггерную цепочку писем' },
  { lesson: 2546936, label: 'АВТОМАТИЗАЦИЯ · УРОК 2', title: 'Тайминг и условия: когда отправлять следующее письмо' },
  { lesson: 2546937, label: 'АВТОМАТИЗАЦИЯ · ПРАКТИКА', title: 'Практика: спроектировать цепочку для своего проекта' },

  { lesson: 2546938, label: 'A/B-ТЕСТ · МОДУЛЬ', title: 'Что будет в модуле «A/B-тест рассылки»' },
  { lesson: 2546939, label: 'A/B-ТЕСТ · УРОК 1', title: 'Что тестировать в письме: тема, время, содержание' },
  { lesson: 2546940, label: 'A/B-ТЕСТ · УРОК 2', title: 'Как читать результат теста и не обмануть себя' },
  { lesson: 2546941, label: 'A/B-ТЕСТ · ПРАКТИКА', title: 'Практика: составить план A/B-теста' },

  { lesson: 2546942, label: 'ОТЧЁТ · МОДУЛЬ', title: 'Что будет в модуле «Отчёт по рассылке»' },
  { lesson: 2546943, label: 'ОТЧЁТ · УРОК 1', title: 'Метрики рассылки, которые нужны бизнесу' },
  { lesson: 2546944, label: 'ОТЧЁТ · УРОК 2', title: 'Как показать результат рассылки руководству' },
  { lesson: 2546945, label: 'ОТЧЁТ · ПРАКТИКА', title: 'Практика: подготовить отчёт по своей рассылке' },

  { lesson: 2546946, label: 'ЧТО ДАЛЬШЕ · УРОК 1', title: 'Итоги курса' },
  { lesson: 2546947, label: 'ЧТО ДАЛЬШЕ · УРОК 2', title: 'Что дальше' },
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
