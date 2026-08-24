// Generate wide lesson-header banners for course 183089 ("Английский для
// маркетолога: словарь и рабочие ситуации"), same visual language as
// 183103/297305/94836/183079/183094.
// Usage: node scripts/gen_183089_headers.mjs <html_out_dir>
import fs from 'node:fs';
import path from 'node:path';
import { BRAND, fontFaceCss } from './slide_template.mjs';

const [, , htmlOutDir] = process.argv;
if (!htmlOutDir) {
  console.error('Usage: node gen_183089_headers.mjs <html_out_dir>');
  process.exit(1);
}
fs.mkdirSync(htmlOutDir, { recursive: true });

const W = 1920;
const H = 420;

export const HEADERS = [
  { lesson: 2544236, label: 'СТАРТ · ВИДЕО', title: 'Видео-приветствие' },
  { lesson: 2544237, label: 'СТАРТ', title: 'Что будет на курсе' },

  { lesson: 2544238, label: 'ЗАЧЕМ АНГЛИЙСКИЙ · МОДУЛЬ', title: 'Что будет в модуле «Зачем маркетологу английский»' },
  { lesson: 2544239, label: 'ЗАЧЕМ АНГЛИЙСКИЙ · УРОК 1', title: 'Восемь ситуаций, где английский нужен маркетологу каждый день' },
  { lesson: 2544240, label: 'ЗАЧЕМ АНГЛИЙСКИЙ · УРОК 2', title: 'Как английский влияет на карьеру и доход в маркетинге' },
  { lesson: 2544241, label: 'ЗАЧЕМ АНГЛИЙСКИЙ · ПРОВЕРКА ЗНАНИЙ', title: 'Проверка знаний: зачем маркетологу английский' },

  { lesson: 2544242, label: 'СЛОВАРЬ · МОДУЛЬ', title: 'Что будет в модуле «Словарь маркетолога: метрики и каналы»' },
  { lesson: 2544243, label: 'СЛОВАРЬ · УРОК 1', title: 'Метрики и KPI: 20 терминов, которые нужны каждый день' },
  { lesson: 2544244, label: 'СЛОВАРЬ · УРОК 2', title: 'Каналы и форматы: словарь маркетингового микса' },
  { lesson: 2544245, label: 'СЛОВАРЬ · ПРОВЕРКА ЗНАНИЙ', title: 'Проверка знаний: словарь метрик и каналов' },

  { lesson: 2544246, label: 'ДЕЛОВОЕ ОБЩЕНИЕ · МОДУЛЬ', title: 'Что будет в модуле «Деловое общение»' },
  { lesson: 2544247, label: 'ДЕЛОВОЕ ОБЩЕНИЕ · УРОК 1', title: 'Переписка с поддержкой и партнёрами: готовые фразы' },
  { lesson: 2544248, label: 'ДЕЛОВОЕ ОБЩЕНИЕ · УРОК 2', title: 'Общение со смежными командами: продукт, разработка, продажи' },
  { lesson: 2544249, label: 'ДЕЛОВОЕ ОБЩЕНИЕ · ПРОВЕРКА ЗНАНИЙ', title: 'Проверка знаний: деловое общение' },

  { lesson: 2544250, label: 'ЧТЕНИЕ · МОДУЛЬ', title: 'Что будет в модуле «Чтение: документация, пресса, конкуренты»' },
  { lesson: 2544251, label: 'ЧТЕНИЕ · УРОК 1', title: 'Как быстро читать техническую документацию на английском' },
  { lesson: 2544252, label: 'ЧТЕНИЕ · УРОК 2', title: 'Чтение отраслевой прессы: с чего начать' },
  { lesson: 2544253, label: 'ЧТЕНИЕ · УРОК 3', title: 'Анализ конкурентов на английском: сайты, приложения, питчи' },
  { lesson: 2544254, label: 'ЧТЕНИЕ · ПРОВЕРКА ЗНАНИЙ', title: 'Проверка знаний: чтение на английском' },

  { lesson: 2544255, label: 'ОШИБКИ В РЕКЛАМЕ · МОДУЛЬ', title: 'Что будет в модуле «Ошибки в рекламе и на сайте»' },
  { lesson: 2544256, label: 'ОШИБКИ В РЕКЛАМЕ · УРОК 1', title: 'Частые ошибки в рекламных текстах: ложные друзья и кальки' },
  { lesson: 2544257, label: 'ОШИБКИ В РЕКЛАМЕ · УРОК 2', title: 'Как проверить текст сайта на английском перед публикацией' },
  { lesson: 2544258, label: 'ОШИБКИ В РЕКЛАМЕ · ПРОВЕРКА ЗНАНИЙ', title: 'Проверка знаний: ошибки в рекламе и на сайте' },

  { lesson: 2544259, label: 'СОБЕСЕДОВАНИЕ · МОДУЛЬ', title: 'Что будет в модуле «Собеседование на английском»' },
  { lesson: 2544260, label: 'СОБЕСЕДОВАНИЕ · УРОК 1', title: 'Рассказ о себе и опыте на английском' },
  { lesson: 2544261, label: 'СОБЕСЕДОВАНИЕ · УРОК 2', title: 'Ответы на вопросы про метрики и кейсы' },
  { lesson: 2544262, label: 'СОБЕСЕДОВАНИЕ · УРОК 3', title: 'Вопросы работодателю и разговор об оффере' },
  { lesson: 2544263, label: 'СОБЕСЕДОВАНИЕ · ПРОВЕРКА ЗНАНИЙ', title: 'Проверка знаний: собеседование на английском' },

  { lesson: 2544264, label: 'ЧТО ДАЛЬШЕ · УРОК 1', title: 'Итоги курса' },
  { lesson: 2544265, label: 'ЧТО ДАЛЬШЕ · УРОК 2', title: 'Что дальше' },
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
