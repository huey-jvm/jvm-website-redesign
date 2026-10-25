import { test, expect, type Page } from "@playwright/test";
import { pages, widths } from "./pages";

async function pageWidth(page: Page) {
  await expect(page.getByRole("main")).toBeVisible();
  return page.evaluate(async () => {
    await document.fonts.ready;
    return {
      scroll: document.documentElement.scrollWidth,
      client: document.documentElement.clientWidth,
    };
  });
}

for (const path of pages) {
  for (const width of widths) {
    test(`${path} has no horizontal scroll at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(path, { waitUntil: "domcontentloaded" });
      const overflow = await pageWidth(page);
      expect(overflow.scroll, `scrollWidth ${overflow.scroll} > clientWidth ${overflow.client}`).toBeLessThanOrEqual(overflow.client);
    });
  }
}

for (const path of ["/", "/services"]) {
  test(`${path} measures overflow while images are pending`, async ({ page }) => {
    let releaseImages!: () => void;
    const pendingImages = new Promise<void>((resolve) => { releaseImages = resolve; });
    let heldRequests = 0;
    await page.route("**/images/optimized/**", async (route) => {
      heldRequests += 1;
      await pendingImages;
      await route.abort();
    });
    try {
      await page.setViewportSize({ width: 768, height: 900 });
      await page.goto(path, { waitUntil: "domcontentloaded" });
      await expect.poll(() => heldRequests).toBeGreaterThan(0);
      const normal = await pageWidth(page);
      expect(normal.scroll).toBeLessThanOrEqual(normal.client);

      // Positive control: readiness must not hide actual layout overflow.
      await page.evaluate(() => {
        const wide = document.createElement("div");
        wide.style.cssText = "position:absolute;left:0;top:0;width:200vw;height:1px";
        document.body.append(wide);
      });
      const wide = await pageWidth(page);
      expect(wide.scroll).toBeGreaterThan(wide.client);
    } finally {
      releaseImages();
      await page.unrouteAll({ behavior: "wait" });
    }
  });
}
