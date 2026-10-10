import type { Page, TestInfo } from "@playwright/test";

export type Line = { text: string; x: number; y: number; w: number; h: number; textLum: number; large: boolean };

export async function markForMeasure(page: Page, selector: string, index: number) {
  await page.evaluate(({ selector, index }) => {
    document.querySelectorAll("[data-measure]").forEach((el) => el.removeAttribute("data-measure"));
    document.querySelectorAll(selector)[index]?.setAttribute("data-measure", "");
  }, { selector, index });
}

export async function measureContrast(page: Page, info: TestInfo, name: string) {
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
  await info.attach(`${name}.png`, { body: png, contentType: "image/png" });
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
