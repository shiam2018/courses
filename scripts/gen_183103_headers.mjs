// Generate the 19 wide lesson-header banners for course 183103, matching the
// visual language established for course 94834's 58 header-mXX_lYY.webp banners
// (coral gradient, uppercase eyebrow label, bold Manrope title). That original
// template was ephemeral and not committed, so this rebuilds it from the
// shared BRAND/fontFaceCss() primitives in slide_template.mjs.
//
// Usage: node scripts/gen_183103_headers.mjs <html_out_dir>
// Then render separately with render_batch.mjs and convert to webp with cwebp
// (see scripts/push_183103_headers.py for the full pipeline).
import fs from 'node:fs';
import path from 'node:path';
import { BRAND, fontFaceCss } from './slide_template.mjs';

const [, , htmlOutDir] = process.argv;
if (!htmlOutDir) {
  console.error('Usage: node gen_183103_headers.mjs <html_out_dir>');
  process.exit(1);
}
fs.mkdirSync(htmlOutDir, { recursive: true });

const W = 1920;
const H = 420;

export const HEADERS = [
  { lesson: 2542265, label: 'СТАРТ', title: 'Что будет на курсе' },

  { lesson: 2542266, label: 'ПОРТРЕТ КАНДИДАТА · МОДУЛЬ', title: 'Что будет в модуле «Портрет кандидата»' },
  { lesson: 2542267, label: 'ПОРТРЕТ КАНДИДАТА · УРОК 1', title: 'Как рекрутер и руководитель выбирают кандидата' },
  { lesson: 2542268, label: 'ПОРТРЕТ КАНДИДАТА · УРОК 2', title: 'Сформируйте свой портрет соискателя' },
  { lesson: 2542269, label: 'ПОРТРЕТ КАНДИДАТА · ПРОВЕРКА ЗНАНИЙ', title: 'Проверка знаний: портрет кандидата' },

  { lesson: 2542279, label: 'ПОИСК РАБОТЫ · МОДУЛЬ', title: 'Что будет в модуле «Поиск работы»' },
  { lesson: 2542280, label: 'ПОИСК РАБОТЫ · УРОК 1', title: 'Резюме, которое приглашают на собеседование' },
  { lesson: 2542282, label: 'ПОИСК РАБОТЫ · УРОК 2', title: 'Сопроводительное письмо, которое дочитывают до конца' },
  { lesson: 2542283, label: 'ПОИСК РАБОТЫ · УРОК 3', title: 'Где искать вакансии, если работа не находит вас сама' },
  { lesson: 2542284, label: 'ПОИСК РАБОТЫ · ПРОВЕРКА ЗНАНИЙ', title: 'Проверка знаний: поиск работы' },

  { lesson: 2542270, label: 'СОБЕСЕДОВАНИЕ · МОДУЛЬ', title: 'Что будет в модуле «Собеседование»' },
  { lesson: 2542271, label: 'СОБЕСЕДОВАНИЕ · УРОК 1', title: 'Скрининг с HR: первое впечатление' },
  { lesson: 2542274, label: 'СОБЕСЕДОВАНИЕ · УРОК 2', title: 'Тестовое задание: как не провалить единственный шанс' },
  { lesson: 2542272, label: 'СОБЕСЕДОВАНИЕ · УРОК 3', title: 'Техническое собеседование: что проверяют' },
  { lesson: 2542273, label: 'СОБЕСЕДОВАНИЕ · УРОК 4', title: 'Встреча с нанимающим менеджером и разговор о зарплате' },
  { lesson: 2542275, label: 'СОБЕСЕДОВАНИЕ · ПРОВЕРКА ЗНАНИЙ', title: 'Проверка знаний: собеседование' },

  { lesson: 2542276, label: 'ЧТО ДАЛЬШЕ · УРОК 1', title: 'Работа с отказами: как не терять мотивацию' },
  { lesson: 2542277, label: 'ЧТО ДАЛЬШЕ · УРОК 2', title: 'Резюме курса' },
  { lesson: 2542278, label: 'ЧТО ДАЛЬШЕ · УРОК 3', title: 'Продолжите обучение' },
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
