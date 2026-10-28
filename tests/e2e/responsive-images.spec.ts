import fs from "node:fs";
import path from "node:path";
import { test, expect } from "@playwright/test";
import imageLoader from "../../lib/image-loader";
import manifest from "../../lib/image-manifest.json";

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
