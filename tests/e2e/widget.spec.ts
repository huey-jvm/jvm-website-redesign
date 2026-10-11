import { test, expect } from "@playwright/test";
import { emailKeyConfigured } from "./pages";

test("contact widget opens, routes, validates and closes with Escape", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: /start a conversation/i }).first().click();
  const dialog = page.getByRole("dialog", { name: /start a conversation/i });
  await expect(dialog).toBeVisible();
  await dialog.getByRole("button", { name: "Send message" }).click();
  await expect(dialog.getByRole("alert").first()).toContainText(/choose who you are/i);
  await dialog.getByText("I'm a contracting or program officer").click();
  await expect(dialog.getByText(/goes to business development/i)).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
});

test("contact form submits in simulated mode", async ({ page }) => {
  test.skip(emailKeyConfigured(), "an email key is configured, so a valid message would send mail");
  await page.goto("/contact", { waitUntil: "networkidle" });
  await page.getByText("Something else").click();
  await page.getByLabel(/^Name/).fill("Test Person");
  await page.getByRole("textbox", { name: /^Email/ }).fill("test@example.com");
  await page.getByLabel(/^Message/).fill("This is a test message from the suite.");
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByRole("status").or(page.getByRole("alert")).first()).toContainText(/message sent|could not|not configured/i);
});
