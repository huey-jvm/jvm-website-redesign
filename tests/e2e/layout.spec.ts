import { test, expect } from "@playwright/test";

async function rows(page: import("@playwright/test").Page, selector: string) {
  const tops = await page.locator(selector).evaluateAll((els) => els.map((e) => Math.round(e.getBoundingClientRect().top + window.scrollY)));
  return [...new Set(tops)];
}

test("the credentials strip has a heading and lays its marks out evenly", async ({ page }) => {
  const marks = "section[aria-labelledby='credentials-title'] li";
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { level: 2, name: "Certifications and Contract Vehicles" })).toBeVisible();
  expect(await page.locator(marks).count(), "the strip lists every mark").toBeGreaterThanOrEqual(5);
  expect(await rows(page, marks), "one row on a wide screen, no orphan").toHaveLength(1);
  await page.setViewportSize({ width: 768, height: 900 });
  const medium = await rows(page, marks);
  expect(medium.length, "an even split on a tablet").toBe(Math.ceil((await page.locator(marks).count()) / 3));
  await page.setViewportSize({ width: 375, height: 800 });
  expect((await rows(page, marks)).length, "control: the row counter sees several rows on a phone").toBeGreaterThan(1);
});

test("the footer no longer repeats the certification marks", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  expect(await page.locator("footer [aria-label='Certifications']").count()).toBe(0);
  expect(await page.locator("footer").getByText("SBA 8(a) Certified").count()).toBe(0);
  expect(await page.locator("section[aria-labelledby='credentials-title']").getByText("SBA 8(a) Certified").count(), "control: the marks are still on the page above").toBe(1);
});
