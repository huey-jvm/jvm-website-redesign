import { test, expect , type Page } from "@playwright/test";
import { proofStripSlugs } from "../../content/credentials";
import { outcomes } from "../../content/outcomes";

test("homepage integrates quality into the operational-excellence content", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("[aria-labelledby='credentials-title']")).toHaveCount(0);
  await expect(page.locator(".differentiators").getByRole("link", { name: "Quality and Compliance" })).toHaveAttribute("href", "/about/quality-compliance");
});

test("the footer repeats every evidenced credential mark", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  expect(await page.locator("footer [aria-label='Certifications'] li").count()).toBe(proofStripSlugs.length);
  expect(await page.locator("footer").getByRole("link", {name: /SBA 8\(a\) Certified/}).count()).toBe(1);
  expect(await page.locator("[data-hero] + section[aria-labelledby='outcomes-title']").count(), "outcomes follow the hero").toBe(1);
});

const outcomeCards = (page: Page) => page.locator("section").filter({ has: page.getByRole("heading", { name: "Helping Your Mission Move Forward" }) }).locator(":is(ul, ol) > li");

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

test("the outcome index stacks one row per outcome at every width, sharing a left edge", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const geometry = () => outcomeCards(page).evaluateAll((els) => els.map((e) => { const r = e.getBoundingClientRect(); return { top: Math.round(r.top + window.scrollY), left: Math.round(r.left), right: Math.round(r.right) }; }));
  for (const [width, height] of [[1920, 1080], [1280, 900], [1024, 900], [768, 900], [375, 800]]) {
    await page.setViewportSize({ width, height });
    const g = await geometry();
    expect(new Set(g.map((c) => c.top)).size, `five rows at ${width}px`).toBe(outcomes.length);
    expect(new Set(g.map((c) => c.left)).size, `one left edge at ${width}px`).toBe(1);
    expect(Math.max(...g.map((c) => c.right)), `inside the viewport at ${width}px`).toBeLessThanOrEqual(width);
  }
});

test("the differentiator cards stretch equally and contain their deck sentences", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/", { waitUntil: "networkidle" });
  const section = page.locator("section").filter({ has: page.getByRole("heading", { name: "How We Support Your Mission" }) });
  const heights = () => section.evaluate((s) => ({ section: Math.round(s.getBoundingClientRect().height), cards: Array.from(s.querySelectorAll("ol > li")).map((l) => Math.round(l.getBoundingClientRect().height)) }));
  const measured = await heights();
  console.log(`differentiators at 1280px: section ${measured.section} px, cards ${measured.cards.join(", ")} px`);
  expect(measured.cards, "four cards").toHaveLength(4);
  expect(new Set(measured.cards).size, "the four cards are the same height").toBe(1);
  const text = await section.locator("ol > li").allInnerTexts();
  const { differentiators } = await import("../../content/differentiators");
  differentiators.forEach((d, i) => { expect(text[i]).toContain(d.title); expect(text[i]).toContain(d.body); });
});
