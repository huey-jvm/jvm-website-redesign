import { test, expect, type Locator } from "@playwright/test";

const paint = (el: Locator) => el.evaluate((e) => { const s = getComputedStyle(e); const u=e.querySelector(":scope > .link-underline"); return `${s.backgroundColor} | ${s.color} | ${s.boxShadow} | ${u ? getComputedStyle(u,"::after").opacity : ""}`; });

test("control: a paint reading that never changes is reported as unchanged", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const logo = page.locator("footer");
  const before = await paint(logo);
  await logo.hover();
  await page.waitForTimeout(250);
  expect(await paint(logo)).toBe(before);
});

test("every button variant changes its paint on hover with a mouse", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/", { waitUntil: "networkidle" });
  const targets: [string, Locator][] = [
    ["light primary, header", page.locator("header").getByRole("button", { name: "Contact us" })],
    ["dark primary, hero", page.locator("[data-hero]").getByRole("link", { name: "Verify our credentials" })],
    ["dark secondary, hero", page.locator("[data-hero]").getByRole("link", { name: "Read the capability statement" })],
    ["tertiary, read how we work", page.getByRole("link", { name: "Read how we work" })],
  ];
  for (const [name, el] of targets) {
    await el.scrollIntoViewIfNeeded();
    await page.mouse.move(0, 0);
    await page.waitForTimeout(250);
    const rest = await paint(el);
    await el.hover();
    await page.waitForTimeout(250);
    expect(await paint(el), `${name} should look different on hover`).not.toBe(rest);
  }
});

test("on a touch device hover does nothing and the pressed state shows instead", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  const page = await context.newPage();
  await page.goto("/", { waitUntil: "networkidle" });
  const canHover = await page.evaluate(() => matchMedia("(hover: hover)").matches);
  expect(canHover, "the emulated device cannot hover").toBe(false);
  const button = page.locator("[data-hero]").getByRole("link", { name: "Read the capability statement" });
  await button.scrollIntoViewIfNeeded();
  const rest = await paint(button);
  const box = (await button.boundingBox())!;
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.waitForTimeout(250);
  expect(await paint(button), "hovering a touch device changes nothing").toBe(rest);
  await page.mouse.down();
  await page.waitForTimeout(250);
  expect(await paint(button), "pressing shows the active state").not.toBe(rest);
  await page.mouse.up();
  await context.close();
});

test("copy buttons are visible without hover on a touch device", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  const page = await context.newPage();
  await page.goto("/contracting", { waitUntil: "networkidle" });
  const copy = page.getByRole("button", { name: /^Copy UEI$/ });
  expect(await copy.evaluate((e) => getComputedStyle(e).opacity)).toBe("1");
  const row = page.locator("main dl > div").filter({ has: page.locator("dt").filter({ hasText: /^UEI$/ }) });
  const status = row.getByRole("status");
  await expect(status).toHaveText("");
  await page.evaluate(() => Object.defineProperty(navigator, "clipboard", { value: { writeText: async () => {} }, configurable: true }));
  await copy.click();
  await expect(status).toHaveText("UEI copied");
  await expect(row.locator("span[aria-hidden]")).toHaveText("Copied");
  await expect(status).toHaveText("");
  await context.close();
  const desktop = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const dpage = await desktop.newPage();
  await dpage.goto("/contracting", { waitUntil: "networkidle" });
  expect(await dpage.getByRole("button", { name: /^Copy UEI$/ }).evaluate((e) => getComputedStyle(e).opacity), "control: hidden until hover on a desktop").toBe("0");
  await desktop.close();
});
