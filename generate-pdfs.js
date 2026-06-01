const puppeteer = require('C:/Users/RAZER/AppData/Roaming/npm/node_modules/md-to-pdf/node_modules/puppeteer');
const fs = require('fs');
const path = require('path');
let markedFn;
try { markedFn = require('C:/Users/RAZER/AppData/Roaming/npm/node_modules/md-to-pdf/node_modules/marked').marked; }
catch { markedFn = require('C:/Users/RAZER/AppData/Roaming/npm/node_modules/md-to-pdf/node_modules/marked'); }
async function mdToPdf(mdFile, cssFile, outFile) {
  const html = markedFn(fs.readFileSync(mdFile, 'utf8'));
  const css = fs.readFileSync(cssFile, 'utf8');
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'], headless: true });
  const page = await browser.newPage();
  await page.setContent(`<!DOCTYPE html><html><head><meta charset="utf-8"><style>${css}</style></head><body>${html}</body></html>`, { waitUntil: 'networkidle0' });
  await page.pdf({ path: outFile, format: 'A4', margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' } });
  await browser.close();
  console.log('Generated:', outFile);
}
const base = __dirname, css = path.join(base, 'pdf-style.css');
(async () => {
  await mdToPdf(path.join(base, 'privacy-policy.md'), css, path.join(base, 'privacy-policy.pdf'));
  await mdToPdf(path.join(base, 'terms-of-service.md'), css, path.join(base, 'terms-of-service.pdf'));
  await mdToPdf(path.join(base, 'cookie-policy.md'), css, path.join(base, 'cookie-policy.pdf'));
})();
