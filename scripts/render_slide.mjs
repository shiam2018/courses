// Render a self-contained slide HTML file's .frame element to a PNG at 2x scale.
// Usage: node render_slide.mjs <input.html> <output.png> [widthPx]
import { chromium } from 'playwright';
import path from 'node:path';

const [, , inputPath, outputPath, widthArg] = process.argv;
if (!inputPath || !outputPath) {
  console.error('Usage: node render_slide.mjs <input.html> <output.png> [widthPx]');
  process.exit(1);
}
const width = widthArg ? parseInt(widthArg, 10) : 1200;
const height = Math.round(width * 587 / 1000);

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: width + 80, height: height + 80 },
  deviceScaleFactor: 2,
});
await page.goto('file://' + path.resolve(inputPath));
await page.waitForTimeout(300); // let @font-face / layout settle
const el = await page.$('.frame, .igsh-frame');
if (!el) {
  console.error('No .frame or .igsh-frame element found');
  process.exit(1);
}
await el.screenshot({ path: outputPath });
await browser.close();
console.log('saved', outputPath);
