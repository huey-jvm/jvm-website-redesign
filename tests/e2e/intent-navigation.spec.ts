import { test, expect } from "@playwright/test";

test("primary navigation warms a destination on keyboard intent, then opens its title", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  const aboutRequests: string[] = [];
  page.on("request", request => {
    if (new URL(request.url()).pathname === "/about" && request.headers()["rsc"] === "1") aboutRequests.push(request.url());
  });
  await page.goto("/", { waitUntil: "networkidle" });
  expect(aboutRequests).toHaveLength(0);
  const about = page.locator("header").getByRole("link", { name: "About JVM", exact: true });
  await about.focus();
  await expect.poll(() => aboutRequests.length).toBeGreaterThan(0);
  await about.press("Enter");
  await expect(page).toHaveURL(/\/about\/?$/);
  await expect(page.getByRole("heading", { name: "About JVM Solutions", exact: true })).toBeVisible();
});
