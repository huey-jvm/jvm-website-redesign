import { test, expect, type Page } from "@playwright/test";
import { outcomes } from "../../content/outcomes";

async function rows(page: Page, selector: string) {
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

const outcomeCards = (page: Page) => page.locator("section").filter({ has: page.getByRole("heading", { name: "What Changes for Your Mission" }) }).locator("ul > li");

test("every outcome card shows an illustration, its title and its whole teaser", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const cards = outcomeCards(page);
  expect(await cards.count()).toBe(outcomes.length);
  for (let i = 0; i < outcomes.length; i++) {
    const card = cards.nth(i);
    expect(await card.locator("svg[data-illustration], [data-slot^='IL-']").count(), `${outcomes[i].id} has one illustration`).toBe(1);
    await expect(card).toContainText(outcomes[i].title);
    await expect(card).toContainText(outcomes[i].teaser);
    await expect(card).toContainText("Read more");
  }
  expect(await page.locator("footer svg[data-illustration]").count(), "control: the illustration selector does not match everything").toBe(0);
});

test("the outcome cards form three above two on a wide screen, fill the last row on a tablet and keep each row level", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const geometry = () => outcomeCards(page).evaluateAll((els) => els.map((e) => { const r = e.getBoundingClientRect(); return { top: Math.round(r.top + window.scrollY), left: Math.round(r.left), width: Math.round(r.width), height: Math.round(r.height) }; }));
  const grouped = (g: Awaited<ReturnType<typeof geometry>>) => Object.values(Object.groupBy(g, (c) => c.top)) as (typeof g)[];
  await page.setViewportSize({ width: 1280, height: 900 });
  const wide = grouped(await geometry());
  expect(wide.map((r) => r.length), "three above two at 1280px").toEqual([3, 2]);
  await page.setViewportSize({ width: 768, height: 900 });
  const medium = grouped(await geometry());
  expect(medium.map((r) => r.length), "two, two and one full width at 768px").toEqual([2, 2, 1]);
  const last = medium[2][0];
  expect(last.width, "the last card spans the grid").toBeGreaterThan(medium[0][0].width * 1.8);
  for (const row of [...wide, ...medium]) expect(new Set(row.map((c) => c.height)).size, "cards in a row are the same height").toBe(1);
  await page.setViewportSize({ width: 375, height: 800 });
  expect(grouped(await geometry()).map((r) => r.length), "control: a single column on a phone").toEqual([1, 1, 1, 1, 1]);
});
