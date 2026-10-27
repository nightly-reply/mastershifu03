// Renders each .slide in carousel.html to out/slideN.png (1080x1350)
const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
  await page.goto('file://' + path.resolve(__dirname, 'carousel.html'));
  await page.evaluate(() => document.fonts.ready);
  const slides = await page.$$('.slide');
  for (let i = 0; i < slides.length; i++) {
    await slides[i].screenshot({ path: path.join(__dirname, 'out', `slide${i + 1}.png`) });
  }
  await browser.close();
  console.log(`rendered ${slides.length} slides`);
})();
