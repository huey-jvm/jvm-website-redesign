import { test, expect } from "@playwright/test";

test("dropdown selection follows the route rather than the first service", async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto("/", { waitUntil: "networkidle" });
  const nav = page.locator('header nav[aria-label="Primary"]:visible');
  await nav.getByRole("button", { name: "Services" }).click();
  const first = nav.getByRole("link", { name: /Healthcare Staffing and Operations/ });
  await expect(first).toBeVisible();
  await expect(nav.locator('[aria-current="page"]')).toHaveCount(0);
  await expect(first).toContainText("Our core");
  await first.click();
  await expect(page).toHaveURL(/services\/healthcare-operations/);
  await nav.getByRole("button", { name: "Services" }).click();
  await expect(first).toHaveAttribute("aria-current", "page");
  await expect(nav.locator('[aria-current="page"]')).toHaveCount(1);
});

test("the cream proof strip follows a content-sized hero and outcomes share one uncropped row", async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.evaluate(() => document.fonts.ready);
  const hero = page.locator("[data-hero]");
  await expect(page.locator("[data-hero] + section").getByRole("heading", { name: "Certifications and Contract Vehicles" })).toBeVisible();
  const heroBox = await hero.boundingBox();
  expect(heroBox!.height).toBeLessThanOrEqual(1080 * 0.85);
  const cards = page.locator(".outcomes-row > li");
  await expect(cards).toHaveCount(5);
  const boxes = await cards.evaluateAll(els => els.map(el => el.getBoundingClientRect().top));
  expect(new Set(boxes.map(Math.round)).size).toBe(1);
  for (const img of await page.locator(".outcomes-row img").all()) {
    expect(await img.evaluate(el => getComputedStyle(el).objectFit)).toBe("contain");
  }
});

test("the floating conversation control has hover and open states and toggles closed", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.locator(".outcomes-row").scrollIntoViewIfNeeded();
  const launcher = page.locator(".widget-launcher");
  await expect(launcher).toBeVisible();
  const rest = await launcher.evaluate(el => getComputedStyle(el).backgroundColor);
  await launcher.hover();
  expect(await launcher.evaluate(el => getComputedStyle(el).backgroundColor)).not.toBe(rest);
  await launcher.click();
  await expect(launcher).toHaveAttribute("aria-expanded", "true");
  await expect(launcher).toHaveText("Close conversation");
  await launcher.click();
  await expect(launcher).toHaveAttribute("aria-expanded", "false");
  await expect(page.getByRole("dialog", { name: "Start a conversation" })).toBeHidden();
});

test("sections and cards size to their content without viewport height floors", async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto("/", { waitUntil: "networkidle" });
  const hasFloor = await page.locator("main > section, .outcomes-row > li, .outcomes-row > li > a").evaluateAll(els => els.some(el => parseFloat(getComputedStyle(el).minHeight) > 0));
  expect(hasFloor).toBe(false);
  const cta = page.locator("main > section").filter({ has: page.locator(".cta-content") });
  expect((await cta.boundingBox())!.height).toBeLessThan(500);
  await page.goto("/services", { waitUntil: "networkidle" });
  expect((await page.locator("main > section").first().boundingBox())!.height).toBeLessThan(500);
  await page.goto("/legal/privacy", { waitUntil: "networkidle" });
  const chapters = page.locator(".chapter-section");
  expect(await chapters.count()).toBeGreaterThan(0);
  expect(await chapters.evaluateAll(els => els.every(el => getComputedStyle(el).minHeight === "0px"))).toBe(true);
});
