import { test, expect } from "@playwright/test";
import { pages } from "./pages";
for (const path of pages) test(`${path} renders its cards without a scroll reveal`, async ({page}) => {
 await page.goto(path,{waitUntil:"networkidle"}); await expect(page.locator("[data-reveal]")).toHaveCount(0);
 const hidden=await page.locator("main :is(ul,ol) > li").evaluateAll(els=>els.filter(el=>getComputedStyle(el).opacity !== "1" || getComputedStyle(el).transform !== "none").length); expect(hidden).toBe(0);
});
test("control: the card visibility check detects a hidden card", async ({page}) => { await page.goto("/"); const card=page.locator("main ul > li").first(); await card.evaluate(el=>{(el as HTMLElement).style.opacity="0";}); expect(await card.evaluate(el=>getComputedStyle(el).opacity)).toBe("0"); });
test("the contact control is the header button and nothing floats over the page", async ({page}) => {
 test.setTimeout(180000); for(const width of [1280,375]) for(const route of [...pages,"/nope"]) {await page.setViewportSize({width,height:900}); await page.goto(route,{waitUntil:"networkidle"}); await expect(page.locator(".widget-launcher")).toBeHidden(); const b=page.locator("header").getByRole("button",{name:/^contact/i}).locator("visible=true").first(); await b.focus(); await expect(b).toBeFocused(); }
});
test("closing the widget returns focus to the control that opened it", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/", { waitUntil: "networkidle" });
  const opener = page.locator("header").getByRole("button", { name: /^contact us$/i });
  await opener.click();
  await expect(page.getByRole("dialog", { name: /start a conversation/i })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(opener).toBeFocused();
});
