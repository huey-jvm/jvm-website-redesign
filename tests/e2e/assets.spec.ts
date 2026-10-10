import fs from "node:fs";
import path from "node:path";
import { test, expect, type Page, type TestInfo } from "@playwright/test";
import { assets } from "../../content/assets";
import { pages } from "./pages";

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

type Line = { text: string; x: number; y: number; w: number; h: number; textLum: number; large: boolean };

async function contrastOverBackdrop(page: Page, id: string, index: number, info: TestInfo, route: string) {
  await page.evaluate(({ id, index }) => {
    document.querySelectorAll("[data-measure]").forEach((el) => el.removeAttribute("data-measure"));
    document.querySelectorAll(`[data-backdrop="${id}"]`)[index]?.setAttribute("data-measure", "");
  }, { id, index });
  const selector = "[data-measure]";
  const section = page.locator(selector);
  await section.scrollIntoViewIfNeeded();
  await page.evaluate(() => document.querySelectorAll("img").forEach((i) => { i.loading = "eager"; }));
  await page.waitForFunction(() => Array.from(document.images).every((i) => i.complete), null, { timeout: 15_000 });
  const lines: Line[] = await section.evaluate((root) => {
    const lin = (v: number) => { const s = v / 255; return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4); };
    const lum = (c: number[]) => 0.2126 * lin(c[0]) + 0.7152 * lin(c[1]) + 0.0722 * lin(c[2]);
    const nums = (s: string) => (s.match(/[\d.]+/g) ?? []).map(Number);
    const box = root.getBoundingClientRect();
    const out: Line[] = [];
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode as Text;
      const text = node.textContent?.trim();
      const el = node.parentElement;
      if (!text || !el) continue;
      let onOwnSurface = false;
      for (let a: HTMLElement | null = el; a && a !== root; a = a.parentElement) {
        const bg = nums(getComputedStyle(a).backgroundColor);
        if (bg.length >= 3 && (bg[3] ?? 1) > 0) { onOwnSurface = true; break; }
      }
      if (onOwnSurface) continue;
      const cs = getComputedStyle(el);
      const size = parseFloat(cs.fontSize);
      const large = size >= 24 || (size >= 18.66 && Number(cs.fontWeight) >= 700);
      const range = document.createRange();
      range.selectNodeContents(node);
      for (const r of Array.from(range.getClientRects())) {
        if (r.width < 2 || r.height < 2) continue;
        out.push({ text: text.slice(0, 40), x: r.left - box.left, y: r.top - box.top, w: r.width, h: r.height, textLum: lum(nums(cs.color)), large });
      }
    }
    return out;
  });
  await page.evaluate((sel) => {
    const root = document.querySelector(sel);
    document.querySelectorAll("body *").forEach((el) => {
      const pos = getComputedStyle(el).position;
      if ((pos === "fixed" || pos === "sticky") && !root?.contains(el)) el.setAttribute("data-chrome", "");
    });
  }, selector);
  const hide = await page.addStyleTag({ content: `${selector} *, ${selector} *::before, ${selector} *::after { color: transparent !important; } ${selector} svg { visibility: hidden !important; } [data-chrome] { visibility: hidden !important; }` });
  const png = await section.screenshot({ scale: "css", animations: "disabled" });
  await info.attach(`${id}${route.replaceAll("/", "_")}-${index}.png`, { body: png, contentType: "image/png" });
  await hide.evaluate((s) => (s as HTMLElement).remove());
  return page.evaluate(async ({ b64, lines }) => {
    const lin = (v: number) => { const s = v / 255; return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4); };
    const img = new Image();
    img.src = `data:image/png;base64,${b64}`;
    await img.decode();
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0);
    const ratio = (a: number, b: number) => (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
    return lines.map((l) => {
      const d = ctx.getImageData(Math.max(0, Math.floor(l.x)), Math.max(0, Math.floor(l.y)), Math.max(1, Math.ceil(l.w)), Math.max(1, Math.ceil(l.h))).data;
      let min = 1, max = 0;
      for (let i = 0; i < d.length; i += 4) {
        const L = 0.2126 * lin(d[i]) + 0.7152 * lin(d[i + 1]) + 0.0722 * lin(d[i + 2]);
        if (L < min) min = L;
        if (L > max) max = L;
      }
      return { ...l, bgMin: min, bgMax: max, ratio: Math.min(ratio(l.textLum, min), ratio(l.textLum, max)) };
    });
  }, { b64: png.toString("base64"), lines });
}

for (const asset of assets.filter((a) => a.kind === "texture" && a.id !== "AS-10")) {
  test(`${asset.id} keeps text readable where it sits behind text`, async ({ page }) => {
    test.skip(!present(asset.path), `${asset.path} is not present`);
    for (const route of asset.where) {
      await page.goto(route, { waitUntil: "networkidle" });
      const count = await page.locator(`[data-backdrop="${asset.id}"]`).count();
      expect(count, `${asset.id} backdrop on ${route}`).toBeGreaterThan(0);
      const measured = [];
      for (let i = 0; i < count; i++) measured.push(...(await contrastOverBackdrop(page, asset.id, i, test.info(), route)));
      if (!measured.length) {
        console.log(`${asset.id} on ${route}: no text sits directly on the backdrop`);
        continue;
      }
      const worst = measured.reduce((a, b) => (b.ratio < a.ratio ? b : a));
      const brightest = Math.max(...measured.map((m) => m.bgMax));
      console.log(`${asset.id} on ${route}: ${count} section(s), ${measured.length} text lines, lowest contrast ${worst.ratio.toFixed(2)} ("${worst.text}"), highest backdrop luminance under text ${(brightest * 100).toFixed(1)} percent`);
      for (const m of measured) expect(m.ratio, `"${m.text}" on ${route}`).toBeGreaterThanOrEqual(m.large ? 3 : 4.5);
      if (darkTextures.has(asset.id)) expect(brightest, `backdrop luminance under text on ${route}`).toBeLessThan(0.2);
    }
  });
}
