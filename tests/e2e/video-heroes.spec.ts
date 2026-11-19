import { test, expect } from "@playwright/test";
import { markForMeasure, measureContrast } from "./contrast";

for (const [route, name] of [["/", "landing"], ["/about", "about-jvm"]]) {
  for (const width of [390, 1440]) {
    test(`${route} plays its own silent film with usable controls at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(route, { waitUntil: "domcontentloaded" });
      const video = page.locator(".hero-video");
      await expect.poll(() => video.evaluate((v: HTMLVideoElement) => !v.paused && v.currentTime > 0)).toBe(true);
      expect(await video.evaluate((v: HTMLVideoElement) => ({ muted: v.muted, loop: v.loop, inline: v.playsInline }))).toEqual({ muted: true, loop: true, inline: true });
      await expect(video).toHaveAttribute("src", `/videos/${name === "about-jvm" ? "about-jvm-32eef00a" : "landing-58adf9d2"}${width < 768 ? "-mobile" : ""}.mp4`);
      await expect(video).toHaveAttribute("poster", /\/images\/optimized\/.+\.webp$/);
      if (name === "about-jvm") expect(await video.evaluate((v: HTMLVideoElement) => v.duration)).toBeLessThan(5.2);
      const hero = await page.locator(".video-hero").boundingBox();
      const frame = await page.locator(".video-hero-media").boundingBox();
      expect(frame!.height).toBeCloseTo(hero!.height, 0);
      expect(frame!.width).toBeCloseTo(hero!.width, 0);
      const control = page.getByRole("button", { name: "Pause background video", exact: true });
      await expect(control).toHaveText("");
      await expect(control).toHaveCSS("width", "32px");
      await expect(control).toHaveCSS("height", "32px");
      expect(Number(await control.evaluate(el => getComputedStyle(el).opacity))).toBeLessThan(1);
      await control.hover();
      await expect(control).toHaveCSS("opacity", "1");
      await page.mouse.move(0, 0);
      await control.focus();
      await expect(control).toHaveCSS("opacity", "1");
      await page.getByRole("button", { name: "Pause background video", exact: true }).click();
      await expect.poll(() => video.evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);
      const time = await video.evaluate((v: HTMLVideoElement) => v.currentTime);
      await page.waitForTimeout(180);
      expect(await video.evaluate((v: HTMLVideoElement) => v.currentTime)).toBe(time);
      await page.getByRole("button", { name: "Play background video", exact: true }).click();
      await expect.poll(() => video.evaluate((v: HTMLVideoElement) => !v.paused)).toBe(true);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await page.screenshot({ path: `test-results/video-${name}-${width}.png` });
    });
  }

  test(`${route} respects reduced motion and can still play on request`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    const requests: string[] = [];
    page.on("request", request => { if (request.url().includes("/videos/")) requests.push(request.url()); });
    await page.goto(route, { waitUntil: "networkidle" });
    const video = page.locator(".hero-video");
    expect(requests).toEqual([]);
    await expect(video).not.toHaveAttribute("src");
    await expect(page.locator(".video-hero-poster")).toBeVisible();
    await page.getByRole("button", { name: "Play background video", exact: true }).click();
    await expect.poll(() => video.evaluate((v: HTMLVideoElement) => !v.paused)).toBe(true);
  });

  test(`${route} keeps its still frame and heading when the film fails`, async ({ page }) => {
    await page.route("**/videos/*.mp4", route => route.abort());
    await page.goto(route, { waitUntil: "networkidle" });
    await expect(page.locator(".hero-video-control")).toHaveCount(0);
    await expect(page.locator(".video-hero-poster")).toBeVisible();
    await expect(page.locator("main h1")).toBeVisible();
    await expect(page.locator(".hero-video")).toHaveAttribute("data-ready", "false");
  });

  for (const width of [375, 1280]) {
    test(`${route} keeps readable text even over a white video frame at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(route, { waitUntil: "networkidle" });
      await page.addStyleTag({ content: ".video-hero-media{background:white} .video-hero-media img,.video-hero-media video{visibility:hidden}" });
      await markForMeasure(page, ".video-hero", 0);
      const lines = await measureContrast(page, test.info(), `white-frame-${width}`, true);
      expect(lines.length).toBeGreaterThan(4);
      for (const line of lines) expect(line.ratio, `${line.text} at ${width}px`).toBeGreaterThanOrEqual(line.large ? 3 : 4.5);
    });
  }
}

test("video stops offscreen and a user pause survives leaving the hero", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const video = page.locator(".hero-video");
  await expect.poll(() => video.evaluate((v: HTMLVideoElement) => !v.paused)).toBe(true);
  await page.locator("footer").scrollIntoViewIfNeeded();
  await expect.poll(() => video.evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);
  await page.evaluate(() => scrollTo(0, 0));
  await expect.poll(() => video.evaluate((v: HTMLVideoElement) => !v.paused)).toBe(true);
  await page.getByRole("button", { name: "Pause background video", exact: true }).click();
  await page.locator("footer").scrollIntoViewIfNeeded();
  await page.evaluate(() => scrollTo(0, 0));
  await expect(page.getByRole("button", { name: "Play background video", exact: true })).toBeVisible();
  expect(await video.evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);
});

test("data-saving visitors do not download a video until they request playback", async ({ page }) => {
  await page.addInitScript(() => { const connection = new EventTarget(); Object.defineProperty(connection, "saveData", { value: true }); Object.defineProperty(navigator, "connection", { value: connection }); });
  const requests: string[] = [];
  page.on("request", request => { if (request.url().includes("/videos/")) requests.push(request.url()); });
  await page.goto("/", { waitUntil: "networkidle" });
  await expect(page.getByRole("button", { name: "Play background video", exact: true })).toBeVisible();
  expect(requests).toEqual([]);
  await page.getByRole("button", { name: "Play background video", exact: true }).click();
  await expect.poll(() => page.locator("video").evaluate((v: HTMLVideoElement) => !v.paused)).toBe(true);
});

test("phone drawer slides on first open and on close, then supports keyboard dismissal", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "networkidle" });
  const opener = page.getByRole("button", { name: "Open menu", exact: true });
  await page.evaluate(() => document.addEventListener("transitionrun", event => {
    if (event.target instanceof Element && event.target.matches(".mobile-drawer-panel")) {
      document.documentElement.dataset.drawerSlides = String(Number(document.documentElement.dataset.drawerSlides ?? 0) + 1);
    }
  }));
  await opener.click();
  const drawer = page.locator("#mobile-menu");
  const panel = page.locator(".mobile-drawer-panel");
  await expect(drawer).toHaveAttribute("data-open", "true");
  await expect(page.locator("html")).toHaveAttribute("data-drawer-slides", "1");
  await expect.poll(() => panel.evaluate(el => Math.abs(el.getBoundingClientRect().left) < 1)).toBe(true);
  await page.getByRole("button", { name: "Close menu", exact: true }).click();
  await expect(drawer).toHaveAttribute("data-open", "false");
  expect(await drawer.evaluate(el => (el as HTMLElement).inert)).toBe(true);
  await expect(page.locator("html")).toHaveAttribute("data-drawer-slides", "2");
  await expect(opener).toBeFocused();
  await expect(drawer).toHaveCSS("visibility", "hidden");
  await opener.press("Enter");
  await expect(page.getByRole("dialog", { name: "Menu", exact: true })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(drawer).toHaveCSS("visibility", "hidden");
  await expect(opener).toBeFocused();
});

test("phone drawer has no motion under reduced-motion preference", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Open menu", exact: true }).click();
  await expect(page.locator("#mobile-menu")).toHaveAttribute("data-open", "true");
  expect(await page.locator(".mobile-drawer-panel").evaluate(el => el.getAnimations().length)).toBe(0);
  await page.getByRole("button", { name: "Close menu", exact: true }).click();
  await expect(page.locator("#mobile-menu")).toHaveCSS("visibility", "hidden");
});
