import { test, expect, type Page } from "@playwright/test";
import { proofStripSlugs } from "../../content/credentials";
import { outcomes } from "../../content/outcomes";

async function rows(page: Page, selector: string) {
  const tops = await page.locator(selector).evaluateAll((els) => els.map((e) => Math.round(e.getBoundingClientRect().top + window.scrollY)));
  return [...new Set(tops)];
}

test("the credentials strip has a heading and lays its marks out evenly", async ({ page }) => {
  const marks = "[aria-labelledby='credentials-title'] li";
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.getByRole("heading", { level: 2, name: "Certifications and Contract Vehicles" })).toBeVisible();
  expect(await page.locator(marks).count(), "the strip lists every mark").toBe(proofStripSlugs.length);
  expect(await rows(page, marks), "one row on a wide screen, no orphan").toHaveLength(1);
  await page.setViewportSize({ width: 768, height: 900 });
  const medium = await rows(page, marks);
  expect(medium.length, "evidenced marks fit evenly on a tablet").toBe(1);
  await page.setViewportSize({ width: 375, height: 800 });
  expect((await rows(page, marks)).length, "control: the row counter sees several rows on a phone").toBeGreaterThan(1);
});

test("the footer repeats every evidenced credential mark", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  expect(await page.locator("footer [aria-label='Certifications'] li").count()).toBe(proofStripSlugs.length);
  expect(await page.locator("footer").getByRole("link", {name: /SBA 8\(a\) Certified/}).count()).toBe(1);
  expect(await page.locator("[data-hero] + section[aria-labelledby='credentials-title']").count(), "the cream proof strip follows the hero").toBe(1);
});

const outcomeCards = (page: Page) => page.locator("section").filter({ has: page.getByRole("heading", { name: "What Changes for Your Mission" }) }).locator("ul > li");

test("every outcome card shows an illustration, its title and its deck sentence", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const cards = outcomeCards(page);
  expect(await cards.count()).toBe(outcomes.length);
  for (let i = 0; i < outcomes.length; i++) {
    const card = cards.nth(i);
    expect(await card.locator("svg[data-illustration], [data-slot^='IL-']").count(), `${outcomes[i].id} has one illustration`).toBe(1);
    await expect(card).toContainText(outcomes[i].title);
    await expect(card).toContainText(outcomes[i].body);
    await expect(card).toContainText("Read more");
  }
  expect(await page.locator("footer svg[data-illustration]").count(), "control: the illustration selector does not match everything").toBe(0);
});

test("the outcome cards form one row on desktop and a readable column on smaller screens", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const geometry = () => outcomeCards(page).evaluateAll((els) => els.map((e) => { const r = e.getBoundingClientRect(); return { top: Math.round(r.top + window.scrollY), left: Math.round(r.left), width: Math.round(r.width), height: Math.round(r.height) }; }));
  const grouped = (g: Awaited<ReturnType<typeof geometry>>) => Object.values(Object.groupBy(g, (c) => c.top)) as (typeof g)[];
  await page.setViewportSize({ width: 1280, height: 900 });
  const wide = grouped(await geometry());
  expect(wide.map((r) => r.length), "one row at 1280px").toEqual([5]);
  await page.setViewportSize({ width: 1920, height: 1080 });
  const full = grouped(await geometry());
  expect(full.map((r) => r.length), "five cards fit at 1920px").toEqual([5]);
  expect(full[0][4].left + full[0][4].width).toBeLessThanOrEqual(1920);
  await page.setViewportSize({ width: 768, height: 900 });
  const medium = grouped(await geometry());
  expect(medium.map((r) => r.length), "two up at 768px").toEqual([2, 2, 1]);
  await page.setViewportSize({ width: 1024, height: 900 });
  expect(grouped(await geometry()).map((r) => r.length), "three above two at 1024px").toEqual([3, 2]);
  for (const row of [...wide, ...full]) expect(new Set(row.map((c) => c.height)).size, "cards in a row are the same height").toBe(1);
  await page.setViewportSize({ width: 375, height: 800 });
  expect(grouped(await geometry()).map((r) => r.length), "control: a single column on a phone").toEqual([1, 1, 1, 1, 1]);
});

test("the differentiator cards stretch equally and contain their deck sentences", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/", { waitUntil: "networkidle" });
  const section = page.locator("section").filter({ has: page.getByRole("heading", { name: "Four Differentiators That Do Not Commoditize" }) });
  const heights = () => section.evaluate((s) => ({ section: Math.round(s.getBoundingClientRect().height), cards: Array.from(s.querySelectorAll("ol > li")).map((l) => Math.round(l.getBoundingClientRect().height)) }));
  const measured = await heights();
  console.log(`differentiators at 1280px: section ${measured.section} px, cards ${measured.cards.join(", ")} px`);
  expect(measured.cards, "four cards").toHaveLength(4);
  expect(new Set(measured.cards).size, "the four cards are the same height").toBe(1);
  const credentials = await page.locator("[aria-labelledby='credentials-title']").evaluate((s) => Math.round(s.getBoundingClientRect().height));
  expect(credentials, "control: a short section is reported as short").toBeLessThan(640);
  const text = await section.locator("ol > li").allInnerTexts();
  const { differentiators } = await import("../../content/differentiators");
  differentiators.forEach((d, i) => { expect(text[i]).toContain(d.title); expect(text[i]).toContain(d.body); });
});
