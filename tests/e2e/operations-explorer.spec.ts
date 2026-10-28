import { test, expect } from "@playwright/test";

test("service explorer changes its explanation and destination with keyboard input", async ({ page }) => {
  await page.goto("/why-jvm");
  const group = page.getByRole("group", { name: "Explore service areas" });
  const detail = page.getByRole("region", { name: "Selected service contribution" });
  await expect(group.getByRole("button", { name: "Healthcare", exact: true })).toHaveAttribute("aria-pressed", "true");
  for (const [name, slug, heading] of [
    ["IT", "health-it", "Systems that support the people"],
    ["Logistics", "logistics", "Resources in the right place"],
    ["Facilities", "facilities-management", "Places ready for the mission"],
  ]) {
    await group.getByRole("button", { name, exact: true }).focus();
    await page.keyboard.press("Enter");
    await expect(detail.getByRole("heading", { name: heading })).toBeVisible();
    await expect(detail.getByRole("link", { name: `Explore ${name}` })).toHaveAttribute("href", `/services/${slug}`);
    await expect(group.locator('[aria-pressed="true"]')).toHaveCount(1);
  }
});
