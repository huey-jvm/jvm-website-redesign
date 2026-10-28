import { test, expect } from "@playwright/test";

test("next-page navigation appears at the page edge after scrolling and follows menu order", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/services");
  for (const destination of [
    "/services/healthcare-operations", "/services/health-it", "/services/logistics",
    "/services/facilities-management", "/contracting/capability-statement", "/services/management-support",
  ]) {
    const nav = page.getByRole("navigation", { name: "Next service page" });
    await page.evaluate(() => scrollTo(0, 0));
    await expect(nav).toHaveCount(0);
    await page.locator("main .cta-content").scrollIntoViewIfNeeded();
    await page.evaluate(() => scrollTo(0, document.querySelector("main")!.getBoundingClientRect().bottom + scrollY - innerHeight + 80));
    await expect(nav).toBeVisible();
    const placement = await nav.evaluate(el => {
      const box = el.getBoundingClientRect();
      return { right: innerWidth - box.right, bottom: document.querySelector("main")!.getBoundingClientRect().bottom - box.bottom };
    });
    expect(placement.right).toBe(24);
    expect(placement.bottom).toBe(16);
    await expect(nav.getByRole("link")).toHaveAttribute("href", destination);
    await nav.getByRole("link").click();
    await expect(page).toHaveURL(destination);
  }
  await expect(page.getByRole("navigation", { name: "Next service page" })).toHaveCount(0);
});
