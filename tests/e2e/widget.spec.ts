import { test, expect } from "@playwright/test";
import { contact } from "../../content/contact";

test("contact widget opens, routes, validates and closes with Escape", async ({
  page,
}) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await page
    .getByRole("button", { name: /start a conversation/i })
    .first()
    .click();
  const dialog = page.getByRole("dialog", { name: /start a conversation/i });
  await expect(dialog).toBeVisible();
  await dialog.getByRole("button", { name: "Send message" }).click();
  await expect(dialog.getByRole("alert").first()).toContainText(
    /choose who you are/i,
  );
  await expect(dialog.getByRole("alert").first()).toBeFocused();
  await dialog.getByText("I'm a contracting or program officer").click();
  await expect(dialog.getByRole("radio", { name: "I'm a contracting or program officer" })).toBeChecked();
  await expect(dialog.getByText(/pick a route/i)).toBeHidden();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});

test("pending contact submission sends one request and keyboard dismissal restores the opener", async ({
  page,
}) => {
  let sends = 0;
  let release: (() => void) | undefined;
  const held = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route("**/api/contact", async (route) => {
    sends++;
    await held;
    await route.fulfill({ status: 200, json: { ok: true, simulated: true } });
  });
  await page.goto("/");
  const launcher = page.getByRole("button", { name: "Start a conversation", exact: true });
  await launcher.focus();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog", { name: "Start a conversation" });
  await expect(page.locator("main")).toHaveAttribute("inert", "");
  await dialog.getByText("Something else").click();
  await dialog.getByLabel(/^Name/).fill("Test Person");
  await dialog
    .getByRole("textbox", { name: /^Email/ })
    .fill("test@example.com");
  await dialog
    .getByLabel(/^Message/)
    .fill("A held request to verify duplicate prevention.");
  const send = dialog.getByRole("button", { name: "Send message" });
  await send.click();
  await expect(send).toHaveAttribute("aria-busy", "true");
  await expect.poll(() => sends).toBe(1);
  await send.evaluate((el) => {
    (el as HTMLButtonElement).click();
    (el as HTMLButtonElement).click();
  });
  await page.waitForTimeout(150);
  expect(sends).toBe(1);
  release!();
  await expect(
    dialog.getByRole("heading", { name: "Message sent" }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(launcher).toBeFocused();
  await expect(page.locator("main")).not.toHaveAttribute("inert", "");
});

for (const success of [true, false])
  test(`contact form ${success ? "confirms success and moves focus" : "retains failure with an email fallback"}`, async ({
    page,
  }) => {
    await page.route("**/api/contact", (r) =>
      r.fulfill({
        status: success ? 200 : 502,
        json: success
          ? { ok: true, simulated: true }
          : { ok: false, message: "Could not deliver your message." },
      }),
    );
    await page.goto("/contact", { waitUntil: "networkidle" });
    await page.getByText("Something else").click();
    await page.getByLabel(/^Name/).fill("Test Person");
    await page
      .getByRole("textbox", { name: /^Email/ })
      .fill("test@example.com");
    await page
      .getByLabel(/^Message/)
      .fill("This is a test message from the suite.");
    await page.getByRole("button", { name: "Send message" }).click();
    if (success) {
      await expect(
        page.getByRole("heading", { name: "Message sent" }),
      ).toBeFocused();
      await expect(
        page.getByText(
          `Your message has reached ${contact.routes.other.reads}`,
          { exact: false },
        ),
      ).toBeVisible();
      await page.getByRole("button", { name: "Send another" }).click();
      await expect(
        page.getByRole("radio", { name: "Something else" }),
      ).toBeFocused();
    } else {
      await expect(page.locator("main").getByRole("alert")).toContainText(
        "Could not deliver",
      );
      await expect(
        page.getByRole("link", { name: "Email us directly" }),
      ).toHaveAttribute("href", `mailto:${contact.routes.other.to}`);
    }
  });


for (const width of [375, 1440]) {
  test(`contact shell opens while form code is held and remains dismissible at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/", { waitUntil: "networkidle" });
    let release!: () => void;
    const held = new Promise<void>(resolve => { release = resolve; });
    await page.route("**/_next/static/**/*.js", async route => {
      await held;
      await route.continue();
    });
    try {
      const opener = page.getByRole("button", { name: "Start a conversation", exact: true });
      await opener.click();
      const dialog = page.getByRole("dialog", { name: "Start a conversation" });
      await expect(dialog).toBeVisible();
      await expect(dialog.getByRole("status")).toHaveText("Loading the contact form…");
      await expect(dialog.getByRole("button", { name: "Close", exact: true })).toBeFocused();
      await page.keyboard.press("Escape");
      await expect(dialog).toHaveCount(0);
      await expect(opener).toBeFocused();
      await expect(page.locator("main")).not.toHaveAttribute("inert", "");
      release();
      await page.unrouteAll({ behavior: "wait" });
      await opener.click();
      await expect(dialog.getByRole("button", { name: "Send message" })).toBeVisible();
      // Backdrop must remain interactive while the rest of the document is inert.
      await page.locator("[data-contact-backdrop]").click({ position: { x: 5, y: 5 } });
      await expect(dialog).toHaveCount(0);
      await expect(opener).toBeFocused();
      await page.emulateMedia({ reducedMotion: "reduce" });
      await opener.click();
      await dialog.getByRole("button", { name: "Close", exact: true }).click();
      await expect(dialog).toHaveCount(0);
      await expect(page.locator("main")).not.toHaveAttribute("inert", "");
    } finally {
      release();
      await page.unrouteAll({ behavior: "wait" });
    }
  });
}


test("copy failure explains the manual fallback without claiming success", async ({ page }) => {
  await page.goto("/contracting", { waitUntil: "networkidle" });
  await page.evaluate(() => Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: { writeText: async () => { throw new Error("Permission denied"); } },
  }));
  const button = page.getByRole("button", { name: "Copy UEI", exact: true });
  await button.focus();
  await button.click();
  await expect(page.getByRole("status").filter({ hasText: "Could not copy UEI" })).toContainText("Select and copy the displayed text.");
  await expect(button).toHaveAccessibleName("Copy UEI");
});
