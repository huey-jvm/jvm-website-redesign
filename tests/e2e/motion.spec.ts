import { test, expect } from "@playwright/test";
import { pages } from "./pages";

const revealPages = pages.filter((p) => !p.startsWith("/legal") && !["/contact", "/contracting/certifications", "/contracting/capability-statement", "/contracting/stars-iii", "/about/quality-compliance"].includes(p));

for (const path of revealPages) {
  test(`${path} reveals every card grid once it scrolls into view`, async ({ page }) => {
    await page.goto(path, { waitUntil: "networkidle" });
    const grids = page.locator("[data-reveal]");
    expect(await grids.count(), "the page has at least one reveal grid").toBeGreaterThan(0);
    const states = await grids.evaluateAll((els) => els.map((e) => e.getAttribute("data-reveal")));
    expect(states, "nothing is left in its server state once observed").not.toContain("");
    await page.evaluate(async () => {
      for (let y = 0; y <= document.documentElement.scrollHeight; y += 300) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
    });
    await expect.poll(async () => grids.evaluateAll((els) => els.map((e) => e.getAttribute("data-reveal")))).toEqual(Array((await grids.count())).fill("in"));
    await page.waitForTimeout(700);
    const hidden = await page.locator("[data-reveal] > :is(ul, ol) > li").evaluateAll((els) => els.filter((e) => getComputedStyle(e).opacity !== "1").length);
    expect(hidden, "every card is fully visible after the reveal").toBe(0);
  });
}

test("control: an armed grid hides its cards until it is revealed", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const belowFold = page.locator("[data-reveal='armed']").first();
  await expect(belowFold).toHaveCount(1);
  const opacity = await belowFold.locator(":scope > :is(ul, ol) > li").first().evaluate((e) => getComputedStyle(e).opacity);
  expect(opacity).toBe("0");
});

test("reduced motion never hides a card", async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/", { waitUntil: "networkidle" });
  const hidden = await page.locator("[data-reveal] > :is(ul, ol) > li").evaluateAll((els) => els.filter((e) => getComputedStyle(e).opacity !== "1").length);
  expect(hidden).toBe(0);
  await context.close();
});

test("the floating launcher waits for a scroll on large screens and is always there on small ones", async ({ page }) => {
  const launcher = page.locator("button[aria-controls='contact-widget-panel']");
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/", { waitUntil: "networkidle" });
  expect(await launcher.evaluate((e) => getComputedStyle(e).visibility)).toBe("hidden");
  await page.evaluate(() => window.scrollTo(0, 600));
  await expect.poll(() => launcher.evaluate((e) => getComputedStyle(e).visibility)).toBe("visible");
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto("/", { waitUntil: "networkidle" });
  expect(await launcher.evaluate((e) => getComputedStyle(e).visibility)).toBe("visible");
});

test("closing the widget returns focus to the control that opened it", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/", { waitUntil: "networkidle" });
  const opener = page.locator("header").getByRole("button", { name: /start a conversation/i });
  await opener.click();
  await expect(page.getByRole("dialog", { name: /start a conversation/i })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(opener).toBeFocused();
});
