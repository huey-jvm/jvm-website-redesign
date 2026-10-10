import { test, expect } from "@playwright/test";
import { pages, widths } from "./pages";

for (const path of pages) {
  for (const width of widths) {
    test(`${path} has no horizontal scroll at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(path, { waitUntil: "networkidle" });
      const overflow = await page.evaluate(() => ({
        scroll: document.documentElement.scrollWidth,
        client: document.documentElement.clientWidth,
      }));
      expect(overflow.scroll, `scrollWidth ${overflow.scroll} > clientWidth ${overflow.client}`).toBeLessThanOrEqual(overflow.client);
    });
  }
}
