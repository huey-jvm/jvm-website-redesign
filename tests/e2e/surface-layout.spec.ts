import { test, expect, type Page } from "@playwright/test";

async function openSurface(page: Page, path: string) {
  await page.goto(path, { waitUntil: "domcontentloaded" });
  await expect(page.locator("main")).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
}

test("control: surface readiness does not wait for an unfinished background request", async ({ page }) => {
  let release!: () => void;
  let requested = false;
  const held = new Promise<void>(resolve => { release = resolve; });
  await page.route("**/pending-readiness-control", async route => {
    requested = true;
    await held;
    await route.fulfill({ status: 204, body: "" });
  });
  await page.addInitScript(() => { void fetch("/pending-readiness-control"); });
  try {
    await openSurface(page, "/");
    await expect.poll(() => requested).toBe(true);
    await expect(page.locator(".outcomes-row > li")).toHaveCount(5);
    await expect(page.waitForLoadState("networkidle", { timeout: 1000 })).rejects.toThrow(/Timeout/);
  } finally {
    release();
    await page.unrouteAll({ behavior: "wait" });
  }
});

test("dropdown selection follows the route rather than the first service", async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await openSurface(page, "/");
  const nav = page.locator('header nav[aria-label="Primary"]:visible');
  await expect(nav.getByRole("link", { name: "About JVM" })).toHaveAttribute("data-current", "false");
  await nav.getByRole("button", { name: "Services" }).click();
  const first = nav.getByRole("link", { name: /Healthcare Operations/ });
  await expect(first).toBeVisible();
  await expect(nav.locator('[aria-current="page"]')).toHaveCount(0);
  await expect(first).toContainText("Our core");
  await first.click();
  await expect(page).toHaveURL(/services\/healthcare-operations/);
  await nav.getByRole("button", { name: "Services" }).click();
  await expect(first).toHaveAttribute("aria-current", "page");
  await expect(nav.locator('[aria-current="page"]')).toHaveCount(1);
});

test("outcomes follow the full-height hero and stack as one uncropped index", async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await openSurface(page, "/");
  const hero = page.locator("[data-hero]");
  await expect(page.locator("[data-hero] + section").getByRole("heading", { name: "Helping Your Mission Move Forward" })).toBeVisible();
  const heroBox = await hero.boundingBox();
  expect(heroBox!.height).toBeGreaterThanOrEqual(1080);
  const cards = page.locator(".outcomes-row > li");
  await expect(cards).toHaveCount(5);
  const boxes = await cards.evaluateAll(els => els.map(el => { const r = el.getBoundingClientRect(); return { top: Math.round(r.top), left: Math.round(r.left) }; }));
  expect(new Set(boxes.map(b => b.top)).size).toBe(5);
  expect(new Set(boxes.map(b => b.left)).size).toBe(1);
  for (const img of await page.locator(".outcomes-row img").all()) {
    expect(await img.evaluate(el => getComputedStyle(el).objectFit)).toBe("contain");
  }
});

test("the header contact button opens the dialog and Escape closes it", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const opener = page.locator("header").getByRole("button", { name: "Contact us" });
  const fill = (el: Element) => { const s = getComputedStyle(el); return `${s.backgroundColor} ${s.backgroundImage}`; };
  const rest = await opener.evaluate(fill);
  await opener.hover();
  expect(await opener.evaluate(fill)).not.toBe(rest);
  await opener.click();
  await expect(page.getByRole("dialog", { name: "Start a conversation" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: "Start a conversation" })).toBeHidden();
});

test("desktop chapters fill a viewport while compact sections and cards fit their content", async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await openSurface(page, "/");
  expect(await page.locator("main > section:not(.content-sized)").evaluateAll(els => els.every(el => parseFloat(getComputedStyle(el).minHeight) >= innerHeight))).toBe(true);
  expect(await page.locator(".outcomes-row > li, .outcomes-row > li > a").evaluateAll(els => els.every(el => parseFloat(getComputedStyle(el).minHeight) === 0))).toBe(true);
  const cta = page.locator(".cta-content");
  expect((await cta.boundingBox())!.height).toBeLessThan(1080);
  await openSurface(page, "/services");
  // The directory and CTA now share the hero's background. Check the heading,
  // rather than imposing a height ceiling on the entire combined section.
  expect(await page.locator("main > section").first().evaluate(el => parseFloat(getComputedStyle(el).minHeight))).toBeGreaterThanOrEqual(1080);
  expect((await page.locator(".brief-heading h1").first().boundingBox())!.height).toBeLessThan(200);
  await openSurface(page, "/legal/privacy");
  const chapters = page.locator(".chapter-section");
  expect(await chapters.count()).toBeGreaterThan(0);
  expect(await chapters.evaluateAll(els => els.every(el => getComputedStyle(el).minHeight === "0px"))).toBe(true);
  await page.setViewportSize({ width: 390, height: 844 });
  await openSurface(page, "/services");
  expect(await page.locator("main > section").first().evaluate(el => getComputedStyle(el).minHeight)).toBe("0px");
});
