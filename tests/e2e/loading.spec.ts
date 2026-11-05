import { test, expect } from "@playwright/test";
import manifest from "../../lib/image-manifest.json";

const hero = manifest["/images/revision/mission-team-original-hd.jpg"];

test("slow hero shows a skeleton without blocking text or shifting layout", async ({ page }) => {
  let release!: () => void;
  const hold = new Promise<void>(resolve => { release = resolve; });
  await page.route(`**/images/optimized/${hero.hash}-*`, async route => {
    await hold;
    await route.continue();
  });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const skeleton = page.locator(".mission-backdrop .photo-loading");
  try {
    await expect(skeleton).toBeVisible();
    await expect(page.getByRole("heading", { name: "Your Mission Partner." })).toBeVisible();
    const before = await page.locator(".mission-hero").boundingBox();
    release();
    await expect(skeleton).toHaveAttribute("data-ready", "true");
    await expect(skeleton).not.toBeVisible();
    expect(await page.locator(".mission-hero").boundingBox()).toEqual(before);
    const img = page.locator(".mission-backdrop img");
    await expect(img).toHaveAttribute("srcset", /3840w/);
    await page.screenshot({ path: "test-results/hero-hd.png" });
  } finally { release(); }
});

test("failed photo clears its loading overlay", async ({ page }) => {
  let release!: () => void;
  const hold = new Promise<void>(resolve => { release = resolve; });
  await page.route(`**/images/optimized/${hero.hash}-*`, async route => { await hold; await route.abort(); });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const skeleton = page.locator(".mission-backdrop .photo-loading");
  try {
    await expect(skeleton).toBeVisible();
    release();
    await expect(skeleton).not.toBeVisible();
  } finally { release(); }
});

test("ready photos do not remain masked and mobile stays within the viewport", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect.poll(() => page.locator(".mission-backdrop img").evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
  await expect(page.locator('.mission-backdrop .photo-loading:not([data-ready="true"])')).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
