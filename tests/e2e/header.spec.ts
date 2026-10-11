import { test, expect } from "@playwright/test";

const primary = "header nav[aria-label=Primary]:visible";

test("desktop menus open on click only and a second click closes", async ({page}) => {
 await page.setViewportSize({width:1280,height:900}); await page.goto("/");
 const services=page.locator(primary).getByRole("button",{name:"Services"});
 await services.hover(); await page.waitForTimeout(250); await expect(services).toHaveAttribute("aria-expanded","false");
 await services.click(); await expect(services).toHaveAttribute("aria-expanded","true");
 await services.click(); await expect(services).toHaveAttribute("aria-expanded","false");
 await services.click(); await page.mouse.click(20,700); await expect(services).toHaveAttribute("aria-expanded","false");
});
test("mobile dismissal returns focus and releases the background", async ({page}) => {
 await page.setViewportSize({width:390,height:844}); await page.goto("/");
 const trigger=page.getByRole("button",{name:"Open menu"});
 for (const method of ["escape","close"]) { await trigger.click(); await expect(page.locator("main")).toHaveAttribute("inert",""); if(method === "escape") await page.keyboard.press("Escape"); else await page.getByRole("button",{name:"Close menu"}).click(); await expect(trigger).toBeFocused(); await expect(page.locator("main")).not.toHaveAttribute("inert",""); }
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
  await page.keyboard.press("Tab");
  await page.keyboard.press("Escape");
  await expect(services).toBeFocused();
  await expect(services).toHaveAttribute("aria-expanded", "false");
  await page.keyboard.press("Enter");
  await expect(services).toHaveAttribute("aria-expanded", "true");
  for (let i = 0; i < 6; i++) await page.keyboard.press("Tab");
  await expect(services, "tabbing past the last item closes the menu").toHaveAttribute("aria-expanded", "false");
  await page.mouse.move(0, 0);
  await services.click();
  await expect(services).toHaveAttribute("aria-expanded", "true");
  expect(await duration(), "control: a pointer opening does animate").toBe("0.2s");
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
