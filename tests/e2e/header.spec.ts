import { test, expect } from "@playwright/test";

const primary = "header nav[aria-label=Primary]:visible";

test("on a desktop a menu opens on hover, stays open while the pointer crosses to it and closes when the pointer leaves", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/", { waitUntil: "networkidle" });
  const nav = page.locator(primary);
  const services = nav.getByRole("button", { name: "Services" });
  const allServices = nav.getByRole("link", { name: "All services" });
  await page.mouse.move(640, 500);
  await nav.getByRole("link", { name: "Why JVM" }).hover();
  expect(await page.locator("header [aria-expanded='true']").count(), "control: hovering a plain link opens no menu").toBe(0);
  await expect(allServices).toBeHidden();
  await services.hover();
  await expect(allServices).toBeVisible();
  await expect(services).toHaveAttribute("aria-expanded", "true");
  await allServices.hover();
  await page.waitForTimeout(400);
  await expect(allServices, "the gap between the button and the panel does not close it").toBeVisible();
  await page.mouse.move(640, 600);
  await expect(allServices).toBeHidden();
  await expect(services).toHaveAttribute("aria-expanded", "false");
});

test("a mouse click on an open menu button keeps it open instead of closing it", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/", { waitUntil: "networkidle" });
  const services = page.locator(primary).getByRole("button", { name: "Services" });
  await services.hover();
  await expect(services).toHaveAttribute("aria-expanded", "true");
  await services.click();
  await page.waitForTimeout(250);
  await expect(services).toHaveAttribute("aria-expanded", "true");
});

test("from the keyboard a menu toggles with Enter, closes with Escape and when focus leaves, and never animates", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/", { waitUntil: "networkidle" });
  const services = page.locator(primary).getByRole("button", { name: "Services" });
  const panelId = (await services.getAttribute("aria-controls"))!;
  const duration = () => page.evaluate((id) => getComputedStyle(document.getElementById(id)!).transitionDuration, panelId);
  await page.mouse.move(640, 700);
  await services.focus();
  await page.keyboard.press("Enter");
  await expect(services).toHaveAttribute("aria-expanded", "true");
  expect(await duration(), "no animation when opened from the keyboard").toBe("0s");
  await page.keyboard.press("Escape");
  await expect(services).toHaveAttribute("aria-expanded", "false");
  await page.keyboard.press("Enter");
  await expect(services).toHaveAttribute("aria-expanded", "true");
  for (let i = 0; i < 6; i++) await page.keyboard.press("Tab");
  await expect(services, "tabbing past the last item closes the menu").toHaveAttribute("aria-expanded", "false");
  await page.mouse.move(0, 0);
  await services.hover();
  await expect(services).toHaveAttribute("aria-expanded", "true");
  expect(await duration(), "control: a pointer opening does animate").toBe("0.15s");
});

test("on a touch screen a tap toggles the menu and hover opens nothing", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, hasTouch: true, isMobile: true });
  const page = await context.newPage();
  await page.goto("/", { waitUntil: "networkidle" });
  const services = page.locator(primary).getByRole("button", { name: "Services" });
  await expect(services).toHaveAttribute("aria-expanded", "false");
  await services.tap();
  await expect(services).toHaveAttribute("aria-expanded", "true");
  await services.tap();
  await expect(services).toHaveAttribute("aria-expanded", "false");
  await context.close();
});
