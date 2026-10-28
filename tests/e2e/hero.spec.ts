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

test("every photographic hero keeps its text readable at 1280 and 375", async ({ page }) => {
  test.setTimeout(180_000);
  const seen: string[] = [];
  for (const route of pages) {
    for (const width of [1280, 375]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(route, { waitUntil: "networkidle" });
      const count = await page.locator("[data-hero]").count();
      if (!count) continue;
      await markForMeasure(page, "[data-hero]", 0);
      const measured = await measureContrast(page, test.info(), `hero${route.replaceAll("/", "_")}-${width}`, true);
      expect(measured.length, `${route} at ${width}px has measured hero text`).toBeGreaterThan(0);
      const worst = measured.reduce((a, b) => (b.ratio < a.ratio ? b : a));
      console.log(`hero on ${route} at ${width}px: ${measured.length} text lines, lowest contrast ${worst.ratio.toFixed(2)} ("${worst.text}"), brightest backdrop under text ${(Math.max(...measured.map((m) => m.bgMax)) * 100).toFixed(1)} percent`);
      for (const m of measured) expect(m.ratio, `"${m.text}" on ${route} at ${width}px`).toBeGreaterThanOrEqual(m.large ? 3 : 4.5);
      if (width === 1280) seen.push(route);
    }
  }
  console.log(`full-bleed heroes found on ${seen.length} pages: ${seen.join(", ")}`);
  expect(seen).toEqual(expect.arrayContaining(["/", "/careers"]));
});

test("hero crops stay still on scroll and mobile photos have their own frame", async ({ browser }) => {
  for (const reducedMotion of ["no-preference", "reduce"] as const) {
    const context = await browser.newContext({ reducedMotion });
    const page = await context.newPage();
    for (const width of [1280, 390]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/", { waitUntil: "networkidle" });
      const layers = page.locator("[data-hero] .hero-image");
      expect(await layers.count()).toBeGreaterThan(0);
      const transforms = () => layers.evaluateAll((els) => els.map((el) => getComputedStyle(el).transform));
      expect(new Set(await transforms())).toEqual(new Set(["none"]));
      await page.evaluate(() => window.scrollTo(0, 400));
      expect(new Set(await transforms())).toEqual(new Set(["none"]));
      const shown = await layers.evaluateAll((els) => els.filter((el) => el.getClientRects().length > 0).map((img) => ({ src: (img as HTMLImageElement).currentSrc, width: (img as HTMLImageElement).naturalWidth })));
      expect(shown.length, `a hero photo is visible at ${width}px`).toBeGreaterThan(0);
      for (const img of shown) expect(img.width, `${img.src} loads at ${width}px`).toBeGreaterThan(0);
    }
    await context.close();
  }
});

test("control: gold text on a gold backdrop fails the contrast measurement", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await page.evaluate(() => {
    const box = document.createElement("section");
    box.setAttribute("data-art-control", "");
    box.style.cssText = "padding:24px;background:#c39f63";
    box.innerHTML = '<p style="color:#c39f63;font-size:16px">control text</p>';
    document.querySelector("main")?.prepend(box);
  });
  await markForMeasure(page, "[data-art-control]", 0);
  const lines = await measureContrast(page, test.info(), "art-control");
  expect(lines.length).toBeGreaterThan(0);
  expect(Math.min(...lines.map((l) => l.ratio))).toBeLessThan(3);
});

for (const width of [1280, 375]) {
  test(`homepage quality link is available without procurement-led hero content at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await expect(page.locator("main").getByRole("link", {name:"Quality and Compliance",exact:true})).toBeVisible();
    await expect(page.locator("[data-hero]")).not.toContainText("STARS III");
  });
}
