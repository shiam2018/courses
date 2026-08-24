// Generate wide lesson-header banners for course 183078 ("Основы SMM:
// ВКонтакте, Telegram и контент, который работает"), same visual language
// as the rest of the free-course line-up.
// Usage: node scripts/gen_183078_headers.mjs <html_out_dir>
import fs from 'node:fs';
import path from 'node:path';
import { BRAND, fontFaceCss } from './slide_template.mjs';

const [, , htmlOutDir] = process.argv;
if (!htmlOutDir) {
  console.error('Usage: node gen_183078_headers.mjs <html_out_dir>');
  process.exit(1);
}
fs.mkdirSync(htmlOutDir, { recursive: true });

const W = 1920;
const H = 420;

export const HEADERS = [
  { lesson: 2545951, label: 'СТАРТ · ВИДЕО', title: 'Видео-приветствие' },
  { lesson: 2545952, label: 'СТАРТ', title: 'Что будет на курсе' },

  { lesson: 2545953, label: 'ЧТО ТАКОЕ SMM · МОДУЛЬ', title: 'Что будет в модуле «Что такое SMM»' },
  { lesson: 2545954, label: 'ЧТО ТАКОЕ SMM · УРОК 1', title: 'Что такое SMM и чем занимается SMM-специалист' },
  { lesson: 2545955, label: 'ЧТО ТАКОЕ SMM · УРОК 2', title: 'Контент-план: как планировать посты на месяц вперёд' },
  { lesson: 2545956, label: 'ЧТО ТАКОЕ SMM · ПРОВЕРКА ЗНАНИЙ', title: 'Проверка знаний: что такое SMM' },

  { lesson: 2545957, label: 'ВКОНТАКТЕ · МОДУЛЬ', title: 'Что будет в модуле «ВКонтакте»' },
  { lesson: 2545958, label: 'ВКОНТАКТЕ · УРОК 1', title: 'Сообщество ВКонтакте: с чего начать и что работает' },
  { lesson: 2545959, label: 'ВКОНТАКТЕ · УРОК 2', title: 'Реклама ВКонтакте: как устроен рекламный кабинет' },
  { lesson: 2545960, label: 'ВКОНТАКТЕ · ПРОВЕРКА ЗНАНИЙ', title: 'Проверка знаний: ВКонтакте' },

  { lesson: 2545961, label: 'TELEGRAM · МОДУЛЬ', title: 'Что будет в модуле «Telegram»' },
  { lesson: 2545962, label: 'TELEGRAM · УРОК 1', title: 'Telegram-канал: контент и рост без алгоритмической ленты' },
  { lesson: 2545963, label: 'TELEGRAM · УРОК 2', title: 'Telegram Ads и посевы: как устроено продвижение' },
  { lesson: 2545964, label: 'TELEGRAM · ПРОВЕРКА ЗНАНИЙ', title: 'Проверка знаний: Telegram' },

  { lesson: 2545965, label: 'КОНТЕНТ · МОДУЛЬ', title: 'Что будет в модуле «Контент, который работает»' },
  { lesson: 2545966, label: 'КОНТЕНТ · УРОК 1', title: 'Как писать текст поста, который дочитывают' },
  { lesson: 2545967, label: 'КОНТЕНТ · УРОК 2', title: 'Визуал и формат: что действительно заходит' },
  { lesson: 2545968, label: 'КОНТЕНТ · ПРОВЕРКА ЗНАНИЙ', title: 'Проверка знаний: контент, который работает' },

  { lesson: 2545969, label: 'МЕТРИКИ · МОДУЛЬ', title: 'Что будет в модуле «Метрики и отчётность»' },
  { lesson: 2545970, label: 'МЕТРИКИ · УРОК 1', title: 'Какие метрики считать: охват, вовлечённость, ER' },
  { lesson: 2545971, label: 'МЕТРИКИ · УРОК 2', title: 'Как отчитываться перед руководителем или клиентом' },
  { lesson: 2545972, label: 'МЕТРИКИ · ПРОВЕРКА ЗНАНИЙ', title: 'Проверка знаний: метрики и отчётность' },

  { lesson: 2545973, label: 'ЧТО ДАЛЬШЕ · УРОК 1', title: 'Итоги курса' },
  { lesson: 2545974, label: 'ЧТО ДАЛЬШЕ · УРОК 2', title: 'Что дальше' },
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
    h1 { font-size: 50px; font-weight: 800; color: #fff; line-height: 1.16; margin-top: 22px; max-width: 1560px; text-wrap: balance; position: relative; z-index: 1; }
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
