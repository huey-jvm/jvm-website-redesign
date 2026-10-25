import { test, expect } from "@playwright/test";
import { pages } from "./pages";
import { services } from "../../content/services";
import { legalPages } from "../../content/legal";

test("outcome illustrations sit directly on the page and leadership highlights wrap as pills", async ({ page }) => {
  for (const width of [320, 375, 768, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const art = page.locator(".outcomes-row .outcome-art");
    await expect(art).toHaveCount(5);
    expect(await art.evaluateAll(els => els.every(el => {
      const style = getComputedStyle(el);
      return style.backgroundColor === "rgba(0, 0, 0, 0)" && style.borderTopWidth === "0px" && style.borderBottomWidth === "0px";
    }))).toBe(true);
    const pills = page.getByRole("list", { name: "Leadership experience" }).locator("li");
    await expect(pills).toHaveText(["U.S. Air Force veteran", "18 years of DoD experience"]);
    expect(await pills.evaluateAll(els => els.every(el => el.scrollWidth <= el.clientWidth && getComputedStyle(el).borderRadius === "9999px"))).toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});

for (const path of pages.filter(path => path.startsWith("/services/"))) {
  test(`${path} omits related outcomes and its navigation link`, async ({ page }) => {
    await page.goto(path, { waitUntil: "domcontentloaded" });
    await expect(page.locator("main h1")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Related Outcomes", exact: true })).toHaveCount(0);
    await expect(page.locator('main #outcomes, main a[href="#outcomes"]')).toHaveCount(0);
    await expect(page.locator("main .capability-library")).toBeVisible();
    await expect(page.locator(".service-body #documents .capability-library")).toHaveCount(1);
    expect(await page.locator("#documents").evaluate(el => {
      const style = getComputedStyle(el);
      return style.backgroundColor === "rgba(0, 0, 0, 0)" && style.backgroundImage === "none";
    })).toBe(true);
    await expect(page.locator("main .cta-band")).toBeVisible();
  });
}

test("the capability library continues the page hero background", async ({ page }) => {
  for (const width of [320, 375, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/contracting/capability-statement", { waitUntil: "domcontentloaded" });
    await expect(page.locator(".brief-hero .capability-library")).toHaveCount(1);
    await expect(page.getByRole("link", { name: /^Download PDF:/ })).toHaveCount(0);
    await expect(page.getByRole("link", { name: /^Preview PDF:/ })).toHaveCount(5);
    await expect(page.locator(".capability-library .lucide-eye")).toHaveCount(0);
    await expect(page.locator(".capability-library .lucide-arrow-up-right")).toHaveCount(5);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});

test("the footer retains its original dark palette", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator("footer")).toHaveClass(/site-footer/);
  await expect(page.locator("footer")).toHaveClass(/surface-dark/);
  await expect(page.locator("footer")).toHaveCSS("background-color", "rgb(16, 38, 50)");
  await expect(page.locator("footer")).toHaveCSS("color", "rgb(215, 224, 226)");
});

test("Why JVM is the first destination on desktop and mobile", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator('header nav[aria-label="Primary"] > ul > li').first()).toHaveText("Why JVM");
  await page.setViewportSize({ width: 375, height: 812 });
  await page.reload({ waitUntil: "load" });
  await page.getByRole("button", { name: "Open menu", exact: true }).click();
  await expect(page.getByRole("dialog", { name: "Menu", exact: true }).locator("nav > ul > li").first()).toHaveText("Why JVM");
  await page.keyboard.press("Escape");
});

test("the header logo returns to the homepage from any page", async ({ page }) => {
  for (const width of [375, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/services/logistics-facilities", { waitUntil: "domcontentloaded" });
    const logo = page.locator("header").getByRole("link", { name: "JVM Solutions, home", exact: true });
    await expect(logo).toHaveAttribute("href", "/");
    await logo.click();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator("main h1")).toContainText("People first.");
  }
});

test("nested service cards have a solid surface and a distinct outline", async ({ page }) => {
  await page.goto("/services/logistics-facilities", { waitUntil: "domcontentloaded" });
  const cards = page.locator(".service-capabilities > li");
  expect(await cards.evaluateAll(els => els.every(el => {
    const style = getComputedStyle(el);
    return style.backgroundColor === "rgb(255, 255, 255)" && parseFloat(style.borderLeftWidth) >= 3 && parseFloat(style.borderTopWidth) >= 1;
  }))).toBe(true);
});

test("How to Buy uses its spare width for a useful contract summary", async ({ page }) => {
  for (const width of [375, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/services/health-it", { waitUntil: "domcontentloaded" });
    await expect(page.locator("#stars-iii").getByRole("heading", { name: "Contract at a glance" })).toBeVisible();
    await expect(page.locator("#stars-iii .contract-at-glance")).toContainText("47QTCB22D0653");
    const summary = await page.locator("#stars-iii .contract-at-glance").boundingBox();
    const copy = await page.locator("#stars-iii .prose-measure").boundingBox();
    expect(width >= 1024 ? summary!.x > copy!.x : summary!.y > copy!.y).toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});

test("secondary button hover stays level and uses no floating shadow", async ({ page }) => {
  await page.goto("/contracting/capability-statement", { waitUntil: "domcontentloaded" });
  const preview = page.getByRole("link", { name: /^Preview PDF:/ }).first();
  const before = await preview.boundingBox();
  await preview.hover();
  await expect(preview).toHaveCSS("transform", "none");
  await expect(preview).toHaveCSS("box-shadow", "none");
  const after = await preview.boundingBox();
  expect(after!.y).toBe(before!.y);
  await preview.focus();
  await expect(preview).toHaveCSS("transition-duration", "0s");
});

test("contracting does not repeat a resource section or show an empty past-performance teaser", async ({ page }) => {
  await page.goto("/contracting", { waitUntil: "domcontentloaded" });
  await expect(page.locator('main [data-slot="AS-11"]')).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Request past performance", exact: true })).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Build your acquisition file" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Reach Us Directly" })).toHaveCount(0);
});

for (const service of services) {
  test(`${service.slug} shows every capability in one column without collapsing content`, async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(`/services/${service.slug}`, { waitUntil: "domcontentloaded" });
    const deliveries = service.sections.flatMap(section => section.delivers ?? []);
    for (const section of service.sections) {
      expect(section.body.match(/[.!?](?:\s|$)/g)?.length ?? 0).toBeLessThanOrEqual(3);
    }
    await expect(page.locator(".service-capability")).toHaveCount(deliveries.length);
    for (const delivery of deliveries) {
      const card = page.locator(".service-capability").filter({ has: page.getByRole("heading", { name: delivery.title, exact: true }) });
      await expect(card).toBeVisible();
      await expect(card.locator("details, summary, button")).toHaveCount(0);
      await expect(card.locator("p")).toHaveText(delivery.description);
      await expect(card.locator("p")).toBeVisible();
      const sentences = delivery.description.match(/[.!?](?:\s|$)/g)?.length ?? 0;
      expect(sentences).toBeGreaterThanOrEqual(2);
      expect(sentences).toBeLessThanOrEqual(3);
    }
    for (const width of [320, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      expect(await page.locator(".service-capabilities").evaluateAll(els => els.every(el => getComputedStyle(el).gridTemplateColumns.split(" ").length === 1))).toBe(true);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
  });
}

test("short pages omit the section navigator and reclaim its column", async ({ page }) => {
  const entries = [
    ...services.map(service => ({ path: `/services/${service.slug}`, count: service.sections.length + (service.lead ? 1 : 0) + 1 })),
    ...legalPages.map(legal => ({ path: `/legal/${legal.slug}`, count: legal.sections.length })),
  ];
  for (const { path, count } of entries) {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(path, { waitUntil: "domcontentloaded" });
    await expect(page.locator(".document-nav")).toHaveCount(count > 3 ? 1 : 0);
    if (count <= 3) {
      await expect.poll(() => page.locator(".document-layout").evaluate(el => getComputedStyle(el).gridTemplateColumns.split(" ").length), { message: `${path} reclaims the navigation column` }).toBe(1);
    }
    await page.setViewportSize({ width: 375, height: 812 });
    await expect(page.locator(".document-nav")).toHaveCount(count > 3 ? 1 : 0);
  }
});

for (const path of pages) {
  for (const width of [375, 1440]) {
    test(`${path} keeps a clean footer edge at ${width}px without client errors`, async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", error => errors.push(error.message));
      await page.setViewportSize({ width, height: 900 });
      await page.goto(path, { waitUntil: "domcontentloaded" });
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator("footer")).toBeVisible();
      await expect(page.locator(".section-blend")).toHaveCount(0);
      await expect(page.locator("footer")).toHaveCSS("mask-image", "none");
      expect(await page.evaluate(() => Math.abs(document.body.getBoundingClientRect().bottom - document.querySelector("footer")!.getBoundingClientRect().bottom))).toBeLessThanOrEqual(1);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      expect(errors).toEqual([]);
    });
  }
}

test("the clean footer edge remains after navigation, viewport changes, and browser back", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator("footer > .section-blend")).toHaveCount(0);
  await page.getByRole("link", { name: "Meet our leadership", exact: true }).click();
  await expect(page).toHaveURL(/\/about#leadership$/);
  await expect(page.locator("footer > .section-blend")).toHaveCount(0);
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goBack({ waitUntil: "domcontentloaded" });
  await expect(page.locator("footer > .section-blend")).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(errors).toEqual([]);
});
