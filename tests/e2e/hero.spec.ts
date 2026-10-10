import { test, expect } from "@playwright/test";
import { pages } from "./pages";
import { markForMeasure, measureContrast } from "./contrast";

test("control: the contrast measurement flags light text over a light backdrop", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await page.evaluate(() => {
    const box = document.createElement("section");
    box.setAttribute("data-control", "");
    box.style.cssText = "position:relative;padding:24px;background:#f1e8da";
    box.innerHTML = '<p style="color:#e8d9b8;font-size:16px">control text</p>';
    document.querySelector("main")?.prepend(box);
  });
  await markForMeasure(page, "[data-control]", 0);
  const lines = await measureContrast(page, test.info(), "control");
  expect(lines.length).toBeGreaterThan(0);
  expect(Math.min(...lines.map((l) => l.ratio))).toBeLessThan(2);
});

test("every full-bleed hero keeps its text readable at 1280 and 375", async ({ page }) => {
  const seen: string[] = [];
  for (const route of pages) {
    for (const width of [1280, 375]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(route, { waitUntil: "networkidle" });
      const count = await page.locator("[data-hero]").count();
      if (!count) continue;
      await markForMeasure(page, "[data-hero]", 0);
      const measured = await measureContrast(page, test.info(), `hero${route.replaceAll("/", "_")}-${width}`);
      if (width === 1280) expect(measured.length, `${route} at ${width}px has text over the hero image`).toBeGreaterThan(0);
      if (!measured.length) {
        console.log(`hero on ${route} at ${width}px: the text sits on its own solid panel, nothing to measure against the image`);
        continue;
      }
      const worst = measured.reduce((a, b) => (b.ratio < a.ratio ? b : a));
      console.log(`hero on ${route} at ${width}px: ${measured.length} text lines, lowest contrast ${worst.ratio.toFixed(2)} ("${worst.text}"), brightest backdrop under text ${(Math.max(...measured.map((m) => m.bgMax)) * 100).toFixed(1)} percent`);
      for (const m of measured) expect(m.ratio, `"${m.text}" on ${route} at ${width}px`).toBeGreaterThanOrEqual(m.large ? 3 : 4.5);
      if (width === 1280) seen.push(route);
    }
  }
  console.log(`full-bleed heroes found on ${seen.length} pages: ${seen.join(", ")}`);
  expect(seen).toEqual(expect.arrayContaining(["/", "/about", "/careers"]));
});

test("the hero image drifts with the scroll where the browser supports scroll-driven animation, and stays put under reduced motion", async ({ page, browser }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/", { waitUntil: "networkidle" });
  const supported = await page.evaluate(() => CSS.supports("animation-timeline: view()"));
  const layer = page.locator("[data-hero] .hero-parallax");
  const before = await layer.evaluate((e) => getComputedStyle(e).transform);
  await page.evaluate(() => window.scrollTo(0, 400));
  await page.waitForTimeout(100);
  const after = await layer.evaluate((e) => getComputedStyle(e).transform);
  console.log(`parallax supported ${supported}: transform at 0px "${before}", at 400px "${after}"`);
  if (supported) {
    expect(after).not.toBe(before);
    const y = Number(after.match(/matrix\(([^)]+)\)/)?.[1].split(",")[5] ?? 0);
    expect(y).toBeGreaterThan(0);
  }
  const context = await browser.newContext({ reducedMotion: "reduce", viewport: { width: 1280, height: 900 } });
  const quiet = await context.newPage();
  await quiet.goto("/", { waitUntil: "networkidle" });
  await quiet.evaluate(() => window.scrollTo(0, 400));
  await quiet.waitForTimeout(100);
  expect(await quiet.locator("[data-hero] .hero-parallax").evaluate((e) => getComputedStyle(e).transform)).toBe("none");
  await context.close();
});
