// Generate wide lesson-header banners for course 183077 ("Аналитика для
// маркетолога: дашборд и отчёт для решения" — first PAID tier-1 course).
// Same visual language as the free courses, so the paid tier feels like a
// natural continuation rather than a different product.
// Usage: node scripts/gen_183077_headers.mjs <html_out_dir>
import fs from 'node:fs';
import path from 'node:path';
import { BRAND, fontFaceCss } from './slide_template.mjs';

const [, , htmlOutDir] = process.argv;
if (!htmlOutDir) {
  console.error('Usage: node gen_183077_headers.mjs <html_out_dir>');
  process.exit(1);
}
fs.mkdirSync(htmlOutDir, { recursive: true });

const W = 1920;
const H = 420;

export const HEADERS = [
  { lesson: 2545898, label: 'СТАРТ · ВИДЕО', title: 'Видео-приветствие' },
  { lesson: 2545899, label: 'СТАРТ', title: 'Что будет на курсе и какой проект мы соберём' },

  { lesson: 2545900, label: 'ВОПРОС И МЕТРИКИ · МОДУЛЬ', title: 'Что будет в модуле «От вопроса бизнеса к метрикам»' },
  { lesson: 2545901, label: 'ВОПРОС И МЕТРИКИ · УРОК 1', title: 'Реальный вопрос: куда делся трафик на /tools' },
  { lesson: 2545902, label: 'ВОПРОС И МЕТРИКИ · УРОК 2', title: 'От вопроса к списку метрик: что именно измерять' },
  { lesson: 2545903, label: 'ВОПРОС И МЕТРИКИ · ПРАКТИКА', title: 'Практика: сформулировать метрики для своего вопроса' },

  { lesson: 2545904, label: 'СБОР ДАННЫХ · МОДУЛЬ', title: 'Что будет в модуле «Сбор и очистка данных»' },
  { lesson: 2545905, label: 'СБОР ДАННЫХ · УРОК 1', title: 'Расширенный датасет: несколько каналов и периодов' },
  { lesson: 2545906, label: 'СБОР ДАННЫХ · УРОК 2', title: 'Частые проблемы реальных данных и как их чинить' },
  { lesson: 2545907, label: 'СБОР ДАННЫХ · ПРАКТИКА', title: 'Практика: собрать данные в единую таблицу' },

  { lesson: 2545908, label: 'ДАШБОРД · МОДУЛЬ', title: 'Что будет в модуле «Дашборд»' },
  { lesson: 2545909, label: 'ДАШБОРД · УРОК 1', title: 'Как выбрать, что выносить на дашборд, а что нет' },
  { lesson: 2545910, label: 'ДАШБОРД · УРОК 2', title: 'Сборка дашборда: от таблицы к наглядному виду' },
  { lesson: 2545911, label: 'ДАШБОРД · ПРАКТИКА', title: 'Практика: собрать дашборд по своим данным' },

  { lesson: 2545912, label: 'ОТЧЁТ · МОДУЛЬ', title: 'Что будет в модуле «Отчёт с рекомендацией»' },
  { lesson: 2545913, label: 'ОТЧЁТ · УРОК 1', title: 'Структура отчёта, который читают до конца' },
  { lesson: 2545914, label: 'ОТЧЁТ · УРОК 2', title: 'Как сформулировать рекомендацию с конкретной цифрой' },
  { lesson: 2545915, label: 'ОТЧЁТ · ПРАКТИКА', title: 'Практика: написать отчёт по своему дашборду' },

  { lesson: 2545916, label: 'ЗАЩИТА РЕШЕНИЯ · МОДУЛЬ', title: 'Что будет в модуле «Защита решения»' },
  { lesson: 2545917, label: 'ЗАЩИТА РЕШЕНИЯ · УРОК 1', title: 'Вопросы, которые задают, когда не верят графику' },
  { lesson: 2545918, label: 'ЗАЩИТА РЕШЕНИЯ · УРОК 2', title: 'Как отвечать на возражения, не теряя решения' },
  { lesson: 2545919, label: 'ЗАЩИТА РЕШЕНИЯ · ПРАКТИКА', title: 'Практика: подготовить защиту своего отчёта' },

  { lesson: 2545920, label: 'ЧТО ДАЛЬШЕ · УРОК 1', title: 'Итоги курса' },
  { lesson: 2545921, label: 'ЧТО ДАЛЬШЕ · УРОК 2', title: 'Что дальше' },
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
