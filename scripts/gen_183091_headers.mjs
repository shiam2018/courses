// Generate wide lesson-header banners for course 183091 ("Профессия
// креативный продюсер в маркетинге" — PAID tier-1 course).
// Usage: node scripts/gen_183091_headers.mjs <html_out_dir>
import fs from 'node:fs';
import path from 'node:path';
import { BRAND, fontFaceCss } from './slide_template.mjs';

const [, , htmlOutDir] = process.argv;
if (!htmlOutDir) {
  console.error('Usage: node gen_183091_headers.mjs <html_out_dir>');
  process.exit(1);
}
fs.mkdirSync(htmlOutDir, { recursive: true });

const W = 1920;
const H = 420;

export const HEADERS = [
  { lesson: 2546495, label: 'СТАРТ · ВИДЕО', title: 'Видео-приветствие' },
  { lesson: 2546496, label: 'СТАРТ', title: 'Что будет на курсе и какой проект мы соберём' },

  { lesson: 2546497, label: 'БРИФ И СТРАТЕГИЯ · МОДУЛЬ', title: 'Что будет в модуле «От брифа к стратегии»' },
  { lesson: 2546498, label: 'БРИФ И СТРАТЕГИЯ · УРОК 1', title: 'Реальный бриф: с чего начинается работа продюсера' },
  { lesson: 2546499, label: 'БРИФ И СТРАТЕГИЯ · УРОК 2', title: 'От брифа к креативной стратегии и концепциям' },
  { lesson: 2546500, label: 'БРИФ И СТРАТЕГИЯ · ПРАКТИКА', title: 'Практика: разобрать бриф своей кампании' },

  { lesson: 2546501, label: 'ПРОДАКШН · МОДУЛЬ', title: 'Что будет в модуле «Организация продакшена»' },
  { lesson: 2546502, label: 'ПРОДАКШН · УРОК 1', title: 'Как ставить задачу дизайнеру или видеографу' },
  { lesson: 2546503, label: 'ПРОДАКШН · УРОК 2', title: 'Сроки и приоритеты: как не сорвать дедлайн команды' },
  { lesson: 2546504, label: 'ПРОДАКШН · ПРАКТИКА', title: 'Практика: составить план продакшена' },

  { lesson: 2546505, label: 'ТЕСТИРОВАНИЕ · МОДУЛЬ', title: 'Что будет в модуле «Тестирование концепций»' },
  { lesson: 2546506, label: 'ТЕСТИРОВАНИЕ · УРОК 1', title: 'Как спланировать тест нескольких концепций' },
  { lesson: 2546507, label: 'ТЕСТИРОВАНИЕ · УРОК 2', title: 'Как использовать первые данные для решения' },
  { lesson: 2546508, label: 'ТЕСТИРОВАНИЕ · ПРАКТИКА', title: 'Практика: составить план теста для своего проекта' },

  { lesson: 2546509, label: 'КОМАНДА · МОДУЛЬ', title: 'Что будет в модуле «Работа с командой»' },
  { lesson: 2546510, label: 'КОМАНДА · УРОК 1', title: 'Обратная связь дизайнеру, которая не демотивирует' },
  { lesson: 2546511, label: 'КОМАНДА · УРОК 2', title: 'Фрилансеры или штат: как выбрать под задачу' },
  { lesson: 2546512, label: 'КОМАНДА · ПРАКТИКА', title: 'Практика: написать фидбек на реальный креатив' },

  { lesson: 2546514, label: 'ОТЧЁТ · МОДУЛЬ', title: 'Что будет в модуле «Отчёт и защита результата»' },
  { lesson: 2546515, label: 'ОТЧЁТ · УРОК 1', title: 'Как показать бизнесу эффективность креативной работы' },
  { lesson: 2546516, label: 'ОТЧЁТ · УРОК 2', title: 'Что отвечать, если результат ниже ожиданий' },
  { lesson: 2546517, label: 'ОТЧЁТ · ПРАКТИКА', title: 'Практика: подготовить отчёт по своему проекту' },

  { lesson: 2546518, label: 'ЧТО ДАЛЬШЕ · УРОК 1', title: 'Итоги курса' },
  { lesson: 2546519, label: 'ЧТО ДАЛЬШЕ · УРОК 2', title: 'Что дальше' },
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
