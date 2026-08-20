// Generate an image via OpenRouter (google/gemini-2.5-flash-image) and save it as PNG.
// Usage: node gen_image.mjs "<prompt>" <output.png>
import fs from 'node:fs';
import path from 'node:path';

const [, , prompt, outputPath] = process.argv;
if (!prompt || !outputPath) {
  console.error('Usage: node gen_image.mjs "<prompt>" <output.png>');
  process.exit(1);
}

function readEnvValue(envPath, name) {
  const text = fs.readFileSync(envPath, 'utf8');
  const match = text.split('\n').find((l) => l.startsWith(`${name}=`));
  if (!match) return undefined;
  return match.slice(name.length + 1).trim();
}

const apiKey = readEnvValue(
  path.join(process.env.HOME, 'Developer/Web/cleanor-web/.env.local'),
  'OPENROUTER_API_KEY'
);
if (!apiKey) {
  console.error('OPENROUTER_API_KEY not found in cleanor-web/.env.local');
  process.exit(1);
}

const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'google/gemini-2.5-flash-image',
    messages: [{ role: 'user', content: prompt }],
  }),
});

if (!res.ok) {
  console.error('OpenRouter error', res.status, await res.text());
  process.exit(1);
}

const data = await res.json();
const imageUrl = data?.choices?.[0]?.message?.images?.[0]?.image_url?.url;
if (!imageUrl || !imageUrl.startsWith('data:')) {
  console.error('No image in response:', JSON.stringify(data).slice(0, 500));
  process.exit(1);
}

const base64 = imageUrl.split(',')[1];
fs.writeFileSync(outputPath, Buffer.from(base64, 'base64'));
console.log('saved', outputPath);
