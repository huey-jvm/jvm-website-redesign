/** Regenerate loading silhouettes from the rendered site, not guessed layouts.
 * Start the site with NEXT_PUBLIC_SHOW_PLACEHOLDERS=false, then run:
 * node scripts/capture-skeletons.mjs (BASE_URL and PW_CHROMIUM are optional).
 * Screenshots and the measurement report stay in ignored diagnostic-results/.
 */
import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';

export const routes = {
  home: '/', services: '/services',
  'healthcare-operations': '/services/healthcare-operations',
  'health-it': '/services/health-it', 'logistics-facilities': '/services/logistics-facilities',
  'management-support': '/services/management-support',
  'why-jvm': '/why-jvm', contracting: '/contracting', 'stars-iii': '/contracting/stars-iii',
  certifications: '/contracting/certifications', 'capability-statement': '/contracting/capability-statement',
  'past-performance': '/contracting/past-performance', about: '/about',
  'quality-compliance': '/about/quality-compliance', careers: '/careers', contact: '/contact',
  privacy: '/legal/privacy', terms: '/legal/terms', accessibility: '/legal/accessibility', 'sms-consent': '/legal/sms-consent',
};
const widths = [320, 375, 430, 640, 768, 1024, 1440, 1920];
const requested = new Set(process.argv.slice(2));
for (const name of requested) if (!(name in routes)) throw new Error(`Unknown page: ${name}`);
const base = process.env.BASE_URL || 'http://localhost:3100';
const browser = await chromium.launch(process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : { channel: 'msedge' });
const page = await browser.newPage({ reducedMotion: 'reduce' });
const report = [];
await mkdir('components/site/skeletons', { recursive: true });
await mkdir('diagnostic-results/layouts', { recursive: true });
try {
  for (const [name, route] of Object.entries(routes)) {
    if (requested.size && !requested.has(name)) continue;
    const samples = [];
    for (const width of widths) {
      await page.setViewportSize({ width, height: 1000 });
      const response = await page.goto(base + route, { waitUntil: 'domcontentloaded' });
      if (!response?.ok()) { console.log(`Skipping ${route}: ${response?.status()}`); break; }
      await page.locator('main h1').waitFor();
      // App Router can stream not-found content with a successful HTTP status.
      if (await page.locator('main .error-state').count()) { console.log(`Skipping ${route}: unavailable page`); break; }
      await page.evaluate(() => document.fonts.ready);
      const sample = await page.evaluate(() => {
        const main = document.querySelector('main');
        const origin = main.getBoundingClientRect();
        const height = Math.min(1200, Math.ceil(origin.height));
        const blocks = [], regions = [];
        const round = n => Math.round(n);
        const visible = el => el.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true });
        const box = rect => [round(Math.max(0, rect.x)), round(Math.max(0, rect.y - origin.y)), round(Math.min(rect.width, innerWidth - Math.max(0, rect.x))), round(Math.min(rect.height, height - Math.max(0, rect.y - origin.y)))];
        const inFrame = r => r.width > 1 && r.height > 1 && r.bottom > origin.y && r.top < origin.y + height && r.left < innerWidth;
        const dark = el => Boolean(el.closest('.surface-dark, .mission-hero-editorial'));
        for (const el of main.querySelectorAll(':scope > section, :scope > div, .mission-facts')) {
          const r = el.getBoundingClientRect();
          if (!visible(el) || !inFrame(r)) continue;
          const color = getComputedStyle(el).backgroundColor;
          if (dark(el)) regions.push([...box(r), 2]);
          else if (color !== 'rgba(0, 0, 0, 0)' && color !== 'rgb(255, 255, 255)') regions.push([...box(r), 1]);
        }
        const solid = 'img, svg, iframe, input:not([type=hidden]), textarea, select, button, .jvm-button';
        for (const el of main.querySelectorAll(solid)) {
          if (el.parentElement.closest(solid) || el.closest('[aria-hidden=true]')) continue;
          const r = el.getBoundingClientRect();
          if (!visible(el) || !inFrame(r)) continue;
          blocks.push([...box(r), dark(el) ? 1 : 0]);
        }
        const walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT);
        while (walker.nextNode()) {
          const node = walker.currentNode, el = node.parentElement;
          if (!node.textContent.trim() || el.closest(solid + ', script, style, .sr-only, [aria-hidden=true]') || !visible(el)) continue;
          const range = document.createRange();
          range.selectNodeContents(node);
          for (const r of range.getClientRects()) {
            if (!inFrame(r)) continue;
            const b = box(r);
            b[1] += round(b[3] * .18); b[3] = Math.max(4, round(b[3] * .64));
            blocks.push([...b, dark(el) ? 1 : 0]);
          }
        }
        return { width: innerWidth, height, regions, blocks, heroHeight: round(main.firstElementChild.getBoundingClientRect().height), overflow: document.documentElement.scrollWidth > innerWidth };
      });
      report.push({ route, width, heroHeight: sample.heroHeight, blocks: sample.blocks.length, overflow: sample.overflow });
      samples.push({ width: sample.width, height: sample.height, regions: sample.regions, blocks: sample.blocks });
      if (width === 375 || width === 1440) await page.screenshot({ path: `diagnostic-results/layouts/${name}-${width}.png` });
    }
    if (samples.length) {
      await writeFile(`components/site/skeletons/${name}.json`, JSON.stringify(samples) + '\n');
      console.log(`${route}: ${samples.length} responsive layouts captured`);
    }
  }
  await writeFile('diagnostic-results/layouts/report.json', JSON.stringify(report, null, 2));
} finally { await browser.close(); }
