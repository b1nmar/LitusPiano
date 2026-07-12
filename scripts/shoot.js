const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const OUT = '/tmp/shots';
require('fs').mkdirSync(OUT, { recursive: true });

(async () => {
  const browser = await chromium.launch();

  // Desktop
  let page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const errs = [];
  page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  page.on('pageerror', e => errs.push('PAGEERR: ' + e.message));
  await page.goto('http://localhost:8099/index.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(700);
  await page.screenshot({ path: OUT + '/01-hero.png' });

  // total height + scroll to positions
  const H = await page.evaluate(() => document.body.scrollHeight);
  const vh = 900;
  const stops = [0.13, 0.30, 0.42, 0.52, 0.63, 0.78, 0.92];
  let i = 2;
  for (const s of stops) {
    await page.evaluate(y => window.scrollTo(0, y), Math.round(H * s));
    await page.waitForTimeout(650);
    await page.screenshot({ path: `${OUT}/${String(i++).padStart(2,'0')}-scroll-${Math.round(s*100)}.png` });
  }

  // EN toggle at top
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.click('#langToggle');
  await page.waitForTimeout(500);
  await page.screenshot({ path: OUT + '/20-hero-en.png' });

  // Mobile
  const m = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true });
  await m.goto('http://localhost:8099/index.html', { waitUntil: 'networkidle' });
  await m.waitForTimeout(600);
  await m.screenshot({ path: OUT + '/30-m-hero.png' });
  const MH = await m.evaluate(() => document.body.scrollHeight);
  for (const [j, s] of [[31,0.45],[32,0.72],[33,0.9]]) {
    await m.evaluate(y => window.scrollTo(0, y), Math.round(MH * s));
    await m.waitForTimeout(600);
    await m.screenshot({ path: `${OUT}/${j}-m-${Math.round(s*100)}.png` });
  }

  console.log('CONSOLE_ERRORS:', errs.length ? JSON.stringify(errs, null, 2) : 'none');
  console.log('DOC_HEIGHT:', H);
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
