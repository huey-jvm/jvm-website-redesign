import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { test, expect } from "@playwright/test";
import imageLoader from "../../lib/image-loader";
import manifest from "../../lib/image-manifest.json";

test("phone hero loads one correctly framed HD derivative without downloading the desktop image", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  try {
    const page = await context.newPage();
    const hash = manifest["/images/revision/mission-team-original-hd.jpg"].hash;
    const requested: string[] = [];
    page.on("request", request => { if (request.url().includes(`/optimized/${hash}-`)) requested.push(request.url()); });
    await page.goto("/", { waitUntil: "networkidle" });
    const image = page.locator(".mission-backdrop img");
    await expect.poll(() => image.evaluate((img: HTMLImageElement) => img.complete && img.naturalHeight > 0)).toBe(true);
    const currentSrc = await image.evaluate((img: HTMLImageElement) => img.currentSrc);
    expect(currentSrc).toMatch(/portrait-v\d+-\d+-75\.webp$/);
    const metadata = await sharp(path.join(process.cwd(), "public", new URL(currentSrc).pathname)).metadata();
    expect(metadata.height).toBeGreaterThanOrEqual(1000);
    expect([...new Set(requested)]).toHaveLength(1);
    expect(requested.every(url => url.includes("-portrait-v"))).toBe(true);
    const frame = await page.locator(".mission-hero").boundingBox();
    expect(frame!.width / frame!.height).toBeLessThanOrEqual(0.6);
    await expect(image).toHaveAttribute("srcset", /3840w/);
  } finally { await context.close(); }
});

test("static images have real width-specific files and quality variants", () => {
  for (const [src, image] of Object.entries(manifest)) {
    for (const width of image.widths) for (const quality of [75, 90]) {
      const url = imageLoader({ src, width, quality });
      expect(url).toContain(`-${width}-${quality}.webp`);
      expect(fs.statSync(path.join(process.cwd(), "public", url)).size).toBeGreaterThan(0);
    }
  }
});

test("small slots choose smaller files, cap at source size, and preserve fallbacks", () => {
  const src = "/images/location/texas-office-map.png";
  expect(imageLoader({src, width: 375})).toContain("-384-75.webp");
  expect(imageLoader({src, width: 3840, quality:90})).toContain("-1459-90.webp");
  expect(imageLoader({src:"/missing.svg", width:640})).toBe("/missing.svg");
  expect(imageLoader({src:"https://example.com/photo.jpg", width:640})).toBe("https://example.com/photo.jpg");
});

for (const width of [375, 1440]) {
  test(`the browser loads responsive files without an image API at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const requested: string[] = [];
    page.on("request", request => { if (request.resourceType() === "image") requested.push(request.url()); });
    await page.goto("/services", { waitUntil: "load" });
    const photo = page.locator('img[data-image-src="/images/revision/clinical-team-enhanced.png"]').first();
    await expect(photo).toBeVisible();
    expect(await photo.evaluate(async image => { await (image as HTMLImageElement).decode(); return (image as HTMLImageElement).currentSrc; })).toContain("/images/optimized/");
    expect(requested.some(url => url.includes("/_next/image") || url.endsWith("jvm-official.png"))).toBe(false);
  });
}
