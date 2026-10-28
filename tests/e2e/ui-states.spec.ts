import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs";

const widths = [320, 375, 430, 640, 768, 1024, 1440, 1920];

test("missing pages offer a working way home at every viewport", async ({ page }) => {
  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    const response = await page.goto("/this-page-does-not-exist", { waitUntil: "domcontentloaded" });
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Let’s get you back on track");
    await expect(page.locator("main")).not.toContainText(/\b(404|500|503)\b/);
    const action = page.getByRole("link", { name: "Back to home", exact: true });
    await expect(action).toBeVisible();
    const rect = await action.boundingBox();
    expect(rect!.height).toBeGreaterThanOrEqual(44);
    expect(rect!.x).toBeGreaterThanOrEqual(0);
    expect(rect!.x + rect!.width).toBeLessThanOrEqual(width);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  const results = await new AxeBuilder({ page }).include("main").withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(results.violations).toEqual([]);
  await page.getByRole("link", { name: "Back to home", exact: true }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator("h1")).toContainText("Your Mission");
});

test("quality link and footer remain usable from phone to desktop", async ({ page }) => {
  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator("main").getByRole("link", {name:"Quality and Compliance",exact:true})).toHaveAttribute("href", "/about/quality-compliance");
    const credentials = page.locator('footer ul[aria-label="Certifications"]');
    await expect(credentials.locator("a")).toHaveCount(4);
    const social = page.locator('footer ul[aria-label="Social"]');
    if (width >= 1024) {
      const a = await credentials.boundingBox(), b = await social.boundingBox();
      expect(Math.abs(a!.y + a!.height / 2 - b!.y - b!.height / 2)).toBeLessThan(2);
    }
    expect(await page.locator("footer, .footer-credentials, .footer-credentials + div").evaluateAll(els => els.every(el => getComputedStyle(el).borderTopWidth === "0px"))).toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});

test.describe("temporary state preview", () => {
  test.skip(process.env.STATE_PREVIEW !== "true", "Run node scripts/preview-states.mjs, then set STATE_PREVIEW=true; clean the fixture after testing.");
  const names = fs.readdirSync("components/site/skeletons").filter(name => name.endsWith(".json")).map(name => name.replace(".json", ""));
  for (const name of names) {
    test(`${name}: loading silhouettes adapt to every measured layout`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(`/ui-state-preview?view=loading&name=${name}`, { waitUntil: "domcontentloaded" });
      for (const width of widths) {
        await page.setViewportSize({ width, height: 900 });
        await expect(page.getByRole("status")).toHaveText("Loading page. One moment, please.");
        const sample = page.locator(".skeleton-sample:visible");
        await expect(sample).toHaveCount(1);
        await expect(sample).toHaveClass(new RegExp(`skeleton-at-${width}\\b`));
        const boxes = await sample.locator(".skeleton-blocks rect").count();
        expect(boxes).toBeGreaterThan(5);
        await expect(page.locator("main a, main button, main input")).toHaveCount(0);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
        expect(await sample.locator(".skeleton-blocks").evaluate(el => getComputedStyle(el).animationName)).toBe("none");
        if ((name === "home" || name === "contact" || name === "health-it") && (width === 375 || width === 1440)) {
          await page.screenshot({ path: `diagnostic-results/skeleton-${name}-${width}.png` });
        }
      }
    });
  }

  test("render failures recover, including an offline connection", async ({ page, context }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/ui-state-preview?view=boundary", { waitUntil: "domcontentloaded" });
    await page.getByRole("button", { name: "Simulate interruption" }).click();
    await expect(page.getByRole("heading", { name: "A brief interruption" })).toBeVisible();
    // Next's development overlay is separate from the customer-facing boundary.
    await page.addStyleTag({ content: 'nextjs-portal { display:none !important; }' });
    await page.screenshot({ path: "diagnostic-results/error-interruption-mobile.png" });
    const results = await new AxeBuilder({ page }).include("main").withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
    expect(results.violations).toEqual([]);
    await context.setOffline(true);
    await expect(page.getByRole("heading", { name: "Let’s reconnect" })).toBeVisible();
    await page.screenshot({ path: "diagnostic-results/error-offline-mobile.png" });
    await context.setOffline(false);
    await expect(page.getByRole("heading", { name: "A brief interruption" })).toBeVisible();
    await page.getByRole("button", { name: "Try again", exact: true }).click();
    await expect(page.getByRole("heading", { name: "Recovery test" })).toBeVisible();
    await expect(page.locator(".error-state")).toHaveCount(0);
  });
});
