import fs from "node:fs";
import path from "node:path";
import { test, expect, type Page } from "@playwright/test";
import { assets } from "../../content/assets";
import { pages } from "./pages";
import { markForMeasure, measureContrast } from "./contrast";

const present = (p: string) => fs.existsSync(path.join(process.cwd(), "public", p));
const darkTextures = new Set(["AS-04"]);

async function brokenImages(page: Page) {
  await page.evaluate(() => document.querySelectorAll("img").forEach((i) => { i.loading = "eager"; }));
  await page.waitForFunction(() => Array.from(document.images).every((i) => i.complete), null, { timeout: 15_000 });
  return page.evaluate(() => Array.from(document.images).filter((i) => i.naturalWidth === 0).map((i) => i.getAttribute("src")));
}

test("every registered slot whose file exists renders an img with its src and alt on each of its pages", async ({ page }) => {
  const found = assets.filter((a) => present(a.path));
  console.log(`asset registry: ${assets.length} slots, ${found.length} with a file present${found.length ? `: ${found.map((a) => a.id).join(", ")}` : ""}`);
  for (const asset of found) {
    for (const route of asset.where) {
      await page.goto(route, { waitUntil: "networkidle" });
      const imgs = await page.locator(`[data-slot="${asset.id}"] img`).evaluateAll((els) => els.map((e) => ({ src: decodeURIComponent((e as HTMLImageElement).getAttribute("src") ?? ""), alt: e.getAttribute("alt") })));
      expect(imgs.length, `${asset.id} has an img on ${route}`).toBeGreaterThan(0);
      expect(imgs.some((i) => i.src.includes(asset.path)), `${asset.id} src on ${route} was ${imgs.map((i) => i.src).join(", ")}`).toBe(true);
      expect(imgs.every((i) => i.alt === asset.alt), `${asset.id} alt on ${route}`).toBe(true);
    }
  }
});

test("control: the broken image check detects an image whose file is missing", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await page.evaluate(() => { const i = document.createElement("img"); i.src = "/images/generated/zzq-not-a-file.png"; i.alt = ""; document.body.append(i); });
  expect(await brokenImages(page)).toContain("/images/generated/zzq-not-a-file.png");
});

for (const route of [...pages, "/this-page-does-not-exist"]) {
  test(`${route} renders no broken image`, async ({ page }) => {
    await page.goto(route, { waitUntil: "networkidle" });
    expect(await brokenImages(page)).toEqual([]);
  });
}

for (const asset of assets.filter((a) => a.kind === "texture" && a.id !== "AS-10")) {
  test(`${asset.id} keeps text readable where it sits behind text`, async ({ page }) => {
    test.skip(!present(asset.path), `${asset.path} is not present`);
    for (const [route, width] of asset.where.flatMap((r) => [[r, 1280], [r, 375]] as const)) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(route, { waitUntil: "networkidle" });
      const count = await page.locator(`[data-backdrop="${asset.id}"]`).count();
      expect(count, `${asset.id} backdrop on ${route}`).toBeGreaterThan(0);
      const measured = [];
      for (let i = 0; i < count; i++) {
        await markForMeasure(page, `[data-backdrop="${asset.id}"]`, i);
        measured.push(...(await measureContrast(page, test.info(), `${asset.id}${route.replaceAll("/", "_")}-${i}`)));
      }
      if (!measured.length) {
        console.log(`${asset.id} on ${route} at ${width}px: no text sits directly on the backdrop`);
        continue;
      }
      const worst = measured.reduce((a, b) => (b.ratio < a.ratio ? b : a));
      const brightest = Math.max(...measured.map((m) => m.bgMax));
      console.log(`${asset.id} on ${route} at ${width}px: ${count} section(s), ${measured.length} text lines, lowest contrast ${worst.ratio.toFixed(2)} ("${worst.text}"), highest backdrop luminance under text ${(brightest * 100).toFixed(1)} percent`);
      for (const m of measured) expect(m.ratio, `"${m.text}" on ${route} at ${width}px`).toBeGreaterThanOrEqual(m.large ? 3 : 4.5);
      if (darkTextures.has(asset.id)) expect(brightest, `backdrop luminance under text on ${route} at ${width}px`).toBeLessThan(0.2);
    }
  });
}
