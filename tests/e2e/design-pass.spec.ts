import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { identifiers } from "../../content/identifiers";
import { statements } from "../../content/statements";
import { starsIII } from "../../content/vehicles";
import { evidencedCredentials } from "../../content/credentials";
import { quality } from "../../content/quality";
import { values } from "../../content/values";
import { team } from "../../content/team";

const routes = ["/services", "/contracting", "/contracting/capability-statement", "/contracting/certifications", "/contracting/stars-iii", "/about", "/about/quality-compliance"];

for (const route of routes) {
  test(`${route} stays usable from narrow phones to wide screens`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    for (const width of [320, 375, 768, 1024, 1440, 1920]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(route, { waitUntil: "domcontentloaded" });
      await expect(page.locator("main .brief-hero h1")).toBeVisible();
      await page.evaluate(() => document.fonts.ready);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${route} at ${width}px`).toBe(true);
    }
    expect(errors).toEqual([]);
  });
  for (const width of [375, 1440]) {
    test(`${route} has no serious accessibility issues at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(route, { waitUntil: "domcontentloaded" });
      await expect(page.locator("main .brief-hero h1")).toBeVisible();
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
      expect(results.violations.filter(v => v.impact === "critical" || v.impact === "serious")).toEqual([]);
    });
  }
}

test("service hover stays on the typography without a tinted panel, stripe or image zoom", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/services", { waitUntil: "domcontentloaded" });
  const row = page.locator(".service-entry").nth(2);
  await row.hover();
  await expect(row).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await expect(row).toHaveCSS("box-shadow", "none");
  await expect(row.locator("img")).toHaveCSS("transform", "none");
  await expect(row.locator("h2")).toHaveCSS("color", "rgb(118, 88, 34)");
  await row.focus();
  await expect(row.locator("h2")).toHaveCSS("transition-duration", "0s");
});

test("commercial note aligns beside resource buttons and capability lead centers beside the title", async ({ page }) => {
  for (const width of [1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/services", { waitUntil: "domcontentloaded" });
    await page.evaluate(() => document.fonts.ready);
    const note = page.locator(".commercial-services-note");
    await note.scrollIntoViewIfNeeded();
    const noteBox = await note.boundingBox();
    const buttonsBox = await page.locator(".services-resources > div").boundingBox();
    expect(noteBox!.x).toBeGreaterThan(buttonsBox!.x + buttonsBox!.width);
    expect(Math.abs((noteBox!.y + noteBox!.height / 2) - (buttonsBox!.y + buttonsBox!.height / 2))).toBeLessThan(2);
    await page.goto("/contracting/capability-statement", { waitUntil: "domcontentloaded" });
    const title = page.locator("main h1");
    await expect(title).toBeVisible();
    await title.scrollIntoViewIfNeeded();
    await page.evaluate(() => document.fonts.ready);
    const heading = await title.boundingBox();
    const lead = await page.locator(".brief-heading > div > p.text-lead-sm").boundingBox();
    expect(Math.abs((heading!.y + heading!.height / 2) - (lead!.y + lead!.height / 2))).toBeLessThan(2);
  }
});

test("contracting shares its hero surface with the call to action and retains all copy values", async ({ page }) => {
  await page.goto("/contracting", { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("load");
  const hero = page.locator(".contracting-hero");
  await expect(hero.getByRole("heading", { name: "Identifiers", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Reach Us Directly", exact: true })).toHaveCount(0);
  await expect(hero.locator(".cta-band--embedded")).toBeVisible();
  await page.evaluate(() => Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: async (value: string) => { document.documentElement.dataset.copyResult = value; } } }));
  for (const [label, value] of [
    ["Legal name", statements.companyName], ["UEI", identifiers.uei], ["CAGE", identifiers.cage],
    ["Primary NAICS", identifiers.naicsPrimary], ["Other NAICS", identifiers.naicsSecondary.join(", ")],
    ["Set-asides", identifiers.setAsides.join(", ")], ["STARS III", starsIII.contractNumber],
  ]) {
    const button = hero.getByRole("button", { name: `Copy ${label}`, exact: true });
    await button.focus(); await button.click();
    await expect.poll(() => page.evaluate(() => document.documentElement.dataset.copyResult)).toBe(value);
  }
  await expect(hero.getByRole("button", { name: "Copy SAM", exact: true })).toHaveCount(0);
});

test("certifications show one useful record action per credential", async ({ page }) => {
  await page.goto("/contracting/certifications", { waitUntil: "domcontentloaded" });
  const cards = page.locator(".credential-detail");
  await expect(cards).toHaveCount(evidencedCredentials.length);
  for (const credential of evidencedCredentials) {
    const card = cards.filter({ has: page.getByRole("heading", { name: credential.name, exact: true }) });
    await expect(card).toContainText(credential.meaning);
    await expect(card).toContainText(credential.issuer!);
    await expect(card.getByRole("link")).toHaveCount(1);
    await expect(card.getByRole("link")).toHaveAttribute("href", credential.evidenceHref!);
  }
});

test("About keeps its content while removing the story card and empty leadership tile", async ({ page }) => {
  await page.goto("/about", { waitUntil: "domcontentloaded" });
  await expect(page.locator(".about-hero .about-introduction")).toBeVisible();
  const quote = page.locator("#story blockquote");
  await expect(quote).toContainText(statements.story);
  await expect(quote).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await expect(page.locator("#story figure")).toHaveCount(0);
  for (const value of [...values.rita.items, ...values.roar.items]) await expect(page.locator(".about-values")).toContainText(value.line);
  for (const paragraph of team[0].bio) await expect(page.locator(".about-leadership")).toContainText(paragraph);
  await expect(page.locator(".about-leadership").getByRole("heading", { name: "Roy White", exact: true })).toHaveCount(0);
  await expect(page.locator(".company-overview")).toContainText(statements.companyName);
});

test("quality separates the standards from concern contacts and preserves source content", async ({ page }) => {
  await page.goto("/about/quality-compliance", { waitUntil: "domcontentloaded" });
  await expect(page.locator(".quality-standards")).toContainText(quality.isoBody);
  await expect(page.locator(".quality-standards")).toContainText(quality.jointCommission.paragraph);
  await expect(page.locator(".quality-concerns")).toContainText(quality.concern);
  const contacts = page.locator(".concern-contact");
  await expect(contacts).toHaveCount(2);
  await expect(contacts.last().getByRole("link", { name: quality.jointCommission.complaintRoute.email, exact: true })).toHaveAttribute("href", `mailto:${quality.jointCommission.complaintRoute.email}`);
  await expect(contacts.last()).toContainText(quality.jointCommission.complaintRoute.fax);
});

test("STARS III contact resources are actionable without the loose sentence or empty card", async ({ page }) => {
  await page.goto("/contracting/stars-iii", { waitUntil: "domcontentloaded" });
  const resources = page.locator(".stars-contact-resources");
  await expect(resources.getByRole("link", { name: /Call JVM/ })).toHaveCount(0);
  await expect(resources).toHaveCSS("border-top-width", "0px");
  await expect(resources.getByRole("link", { name: /GSA program details/ })).toHaveAttribute("href", starsIII.gsaUrl);
  await expect(page.locator("#contacts .team-contact")).toHaveCount(2);
  expect(await page.locator("#contacts .team-contact").evaluateAll(els => els.every(el => el.getBoundingClientRect().height < 250))).toBe(true);
});
