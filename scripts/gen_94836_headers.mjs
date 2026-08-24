// Generate wide lesson-header banners for course 94836 ("База
// интернет-маркетинга"), same visual language as 183103/297305.
// Usage: node scripts/gen_94836_headers.mjs <html_out_dir>
import fs from 'node:fs';
import path from 'node:path';
import { BRAND, fontFaceCss } from './slide_template.mjs';

const [, , htmlOutDir] = process.argv;
if (!htmlOutDir) {
  console.error('Usage: node gen_94836_headers.mjs <html_out_dir>');
  process.exit(1);
}
fs.mkdirSync(htmlOutDir, { recursive: true });

const W = 1920;
const H = 420;

export const HEADERS = [
  { lesson: 2543760, label: 'СТАРТ', title: 'Что будет на курсе' },

  { lesson: 2543761, label: 'КАК УСТРОЕН ИМ · МОДУЛЬ', title: 'Что будет в модуле «Как устроен интернет-маркетинг»' },
  { lesson: 2543762, label: 'КАК УСТРОЕН ИМ · УРОК 1', title: 'Что такое интернет-маркетинг и чем он отличается от офлайна' },
  { lesson: 2543763, label: 'КАК УСТРОЕН ИМ · УРОК 2', title: 'Целевая аудитория и путь клиента' },
  { lesson: 2543764, label: 'КАК УСТРОЕН ИМ · ПРОВЕРКА ЗНАНИЙ', title: 'Проверка знаний: как устроен интернет-маркетинг' },

  { lesson: 2543765, label: 'КАРТА КАНАЛОВ · МОДУЛЬ', title: 'Что будет в модуле «Карта каналов»' },
  { lesson: 2543766, label: 'КАРТА КАНАЛОВ · УРОК 1', title: 'Платные, собственные и заслуженные каналы' },
  { lesson: 2543767, label: 'КАРТА КАНАЛОВ · УРОК 2', title: 'SEO: трафик, за который платят временем, а не деньгами' },
  { lesson: 2543768, label: 'КАРТА КАНАЛОВ · УРОК 3', title: 'SMM и таргетированная реклама: работа с холодной аудиторией' },
  { lesson: 2543769, label: 'КАРТА КАНАЛОВ · УРОК 4', title: 'Контекстная реклама: реклама для тех, кто уже ищет' },
  { lesson: 2543770, label: 'КАРТА КАНАЛОВ · ПРОВЕРКА ЗНАНИЙ', title: 'Проверка знаний: карта каналов' },

  { lesson: 2543771, label: 'EMAIL И РЕПУТАЦИЯ · МОДУЛЬ', title: 'Что будет в модуле «Email-маркетинг и репутация»' },
  { lesson: 2543772, label: 'EMAIL И РЕПУТАЦИЯ · УРОК 1', title: 'Email-маркетинг: как возвращать клиентов, а не только привлекать' },
  { lesson: 2543773, label: 'EMAIL И РЕПУТАЦИЯ · УРОК 2', title: 'Репутация и digital PR: что говорят о вас без спроса' },
  { lesson: 2543774, label: 'EMAIL И РЕПУТАЦИЯ · ПРОВЕРКА ЗНАНИЙ', title: 'Проверка знаний: email-маркетинг и репутация' },

  { lesson: 2543775, label: 'МЕТРИКИ · МОДУЛЬ', title: 'Что будет в модуле «Метрики»' },
  { lesson: 2543776, label: 'МЕТРИКИ · УРОК 1', title: 'Метрики воронки: от показов до повторной покупки' },
  { lesson: 2543777, label: 'МЕТРИКИ · УРОК 2', title: 'Реальный пример: где на самом деле ваша аудитория' },
  { lesson: 2543778, label: 'МЕТРИКИ · ПРОВЕРКА ЗНАНИЙ', title: 'Проверка знаний: метрики' },

  { lesson: 2543779, label: 'ЧТО ДАЛЬШЕ · УРОК 1', title: 'Итоги курса' },
  { lesson: 2543780, label: 'ЧТО ДАЛЬШЕ · УРОК 2', title: 'Продолжите обучение' },
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
    .eyebrow-label { font-size: 20px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: #fff; }
    h1 { font-size: 54px; font-weight: 800; color: #fff; line-height: 1.16; margin-top: 22px; max-width: 1550px; text-wrap: balance; position: relative; z-index: 1; }
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
