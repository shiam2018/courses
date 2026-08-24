// Generate wide lesson-header banners for course 183088 ("Профессия SMM:
// продвинутый курс" — PAID tier-1 course).
// Usage: node scripts/gen_183088_headers.mjs <html_out_dir>
import fs from 'node:fs';
import path from 'node:path';
import { BRAND, fontFaceCss } from './slide_template.mjs';

const [, , htmlOutDir] = process.argv;
if (!htmlOutDir) {
  console.error('Usage: node gen_183088_headers.mjs <html_out_dir>');
  process.exit(1);
}
fs.mkdirSync(htmlOutDir, { recursive: true });

const W = 1920;
const H = 420;

export const HEADERS = [
  { lesson: 2546239, label: 'СТАРТ · ВИДЕО', title: 'Видео-приветствие' },
  { lesson: 2546240, label: 'СТАРТ', title: 'Что будет на курсе и какой проект мы соберём' },

  { lesson: 2546241, label: 'АУДИТ И СТРАТЕГИЯ · МОДУЛЬ', title: 'Что будет в модуле «Аудит и стратегия»' },
  { lesson: 2546242, label: 'АУДИТ И СТРАТЕГИЯ · УРОК 1', title: 'Реальный аккаунт: с чего начинается аудит' },
  { lesson: 2546243, label: 'АУДИТ И СТРАТЕГИЯ · УРОК 2', title: 'От аудита к позиционированию: что писать и для кого' },
  { lesson: 2546244, label: 'АУДИТ И СТРАТЕГИЯ · ПРАКТИКА', title: 'Практика: провести аудит своего или чужого аккаунта' },

  { lesson: 2546245, label: 'КОНТЕНТ-ПЛАН · МОДУЛЬ', title: 'Что будет в модуле «Контент-план»' },
  { lesson: 2546246, label: 'КОНТЕНТ-ПЛАН · УРОК 1', title: 'Система постов вместо разовых публикаций' },
  { lesson: 2546247, label: 'КОНТЕНТ-ПЛАН · УРОК 2', title: 'Форматы, которые двигают вовлечённость' },
  { lesson: 2546248, label: 'КОНТЕНТ-ПЛАН · ПРАКТИКА', title: 'Практика: собрать контент-план на месяц' },

  { lesson: 2546249, label: 'ПРОДВИЖЕНИЕ · МОДУЛЬ', title: 'Что будет в модуле «Продвижение»' },
  { lesson: 2546250, label: 'ПРОДВИЖЕНИЕ · УРОК 1', title: 'Бесплатные способы роста аккаунта' },
  { lesson: 2546251, label: 'ПРОДВИЖЕНИЕ · УРОК 2', title: 'Платное продвижение: если бюджет есть' },
  { lesson: 2546252, label: 'ПРОДВИЖЕНИЕ · ПРАКТИКА', title: 'Практика: составить план продвижения' },

  { lesson: 2546253, label: 'ОТЧЁТ · МОДУЛЬ', title: 'Что будет в модуле «Отчёт с рекомендацией»' },
  { lesson: 2546254, label: 'ОТЧЁТ · УРОК 1', title: 'Структура отчёта для клиента или руководителя' },
  { lesson: 2546255, label: 'ОТЧЁТ · УРОК 2', title: 'Как сформулировать рекомендацию с конкретной цифрой' },
  { lesson: 2546257, label: 'ОТЧЁТ · ПРАКТИКА', title: 'Практика: написать отчёт по своему проекту' },

  { lesson: 2546258, label: 'КОММЕНТАРИИ · МОДУЛЬ', title: 'Что будет в модуле «Комментарии и репутация»' },
  { lesson: 2546260, label: 'КОММЕНТАРИИ · УРОК 1', title: 'Токсичные комментарии: как отвечать, а когда молчать' },
  { lesson: 2546261, label: 'КОММЕНТАРИИ · УРОК 2', title: 'Кризис-коммуникация: если что-то пошло не так' },
  { lesson: 2546262, label: 'КОММЕНТАРИИ · ПРАКТИКА', title: 'Практика: подготовить ответы на сложные комментарии' },

  { lesson: 2546264, label: 'ЧТО ДАЛЬШЕ · УРОК 1', title: 'Итоги курса' },
  { lesson: 2546265, label: 'ЧТО ДАЛЬШЕ · УРОК 2', title: 'Что дальше' },
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
