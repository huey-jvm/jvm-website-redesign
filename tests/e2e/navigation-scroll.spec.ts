import { test, expect } from "@playwright/test";

test("page navigation starts at the title while anchors still reach their section", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.evaluate(() => window.scrollTo({ top: 1800, behavior: "instant" }));
  await page.getByRole("navigation", { name: "Primary", exact: true }).getByRole("link", { name: "About JVM", exact: true }).click();
  await expect(page).toHaveURL(/\/about$/);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(101);
  await expect.poll(() => page.locator(".jvm-utility").evaluate(el => el.getBoundingClientRect().bottom)).toBeLessThanOrEqual(0);
  const title = page.getByRole("heading", { name: "About JVM Solutions", exact: true });
  await expect(title).toBeInViewport();
  expect((await title.boundingBox())!.y).toBeGreaterThan(72);
  await page.getByRole("link", { name: "Meet our leadership", exact: true }).click();
  await expect(page).toHaveURL(/#leadership$/);
  await expect(page.getByRole("heading", { name: "Driving Missions Forward" })).toBeInViewport();
  await page.screenshot({ path: "test-results/navigation-anchor.png" });
  await page.locator("header").getByRole("link", { name: "JVM Solutions, home", exact: true }).click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThanOrEqual(101);
  await page.getByRole("navigation", { name: "Primary", exact: true }).getByRole("link", { name: "About JVM", exact: true }).click();
  await expect(title).toBeInViewport();
  await page.screenshot({ path: "test-results/navigation-about.png" });
});
