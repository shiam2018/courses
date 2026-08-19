// Batch-render a directory of self-contained slide HTML files to PNGs.
// Usage: node render_batch.mjs <input_dir> <output_dir> <elementWidthPx> <elementHeightPx>
import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';

const [, , inputDir, outputDir, wArg, hArg] = process.argv;
if (!inputDir || !outputDir) {
  console.error('Usage: node render_batch.mjs <input_dir> <output_dir> <elementWidthPx> <elementHeightPx>');
  process.exit(1);
}
const elW = parseInt(wArg, 10);
const elH = parseInt(hArg, 10);
fs.mkdirSync(outputDir, { recursive: true });

const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.html'));
console.log(`Rendering ${files.length} files...`);

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: elW + 80, height: elH + 80 },
  deviceScaleFactor: 2,
});

for (const file of files) {
  const inputPath = path.join(inputDir, file);
  const outputPath = path.join(outputDir, file.replace(/\.html$/, '.png'));
  await page.goto('file://' + path.resolve(inputPath));
  await page.waitForTimeout(150);
  const el = await page.$('.banner-a, .frame, .igsh-frame');
  if (!el) {
    console.error('SKIP (no element found):', file);
    continue;
  }
  await el.screenshot({ path: outputPath });
  console.log('ok', file);
}

await browser.close();
console.log('done');
