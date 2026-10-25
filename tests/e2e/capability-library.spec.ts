import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import path from "node:path";
import { capabilityDocuments } from "../../content/capabilities";

test("service pages preview every original PDF without a download button", async ({ page, request }) => {
  for (const doc of capabilityDocuments) {
    await page.goto(`/services/${doc.service}`);
    await expect(page.getByRole("link", { name: /^Download PDF:/ })).toHaveCount(0);
    const preview = page.getByRole("link", { name: `Preview PDF: ${doc.title} capability statement (opens in a new tab)`, exact: true });
    await expect(preview).toHaveAttribute("href", doc.href);
    await expect(preview).toHaveAttribute("target", "_blank");
    await expect(preview).not.toHaveAttribute("download");
    const response = await request.get(doc.href);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("application/pdf");
    expect(await response.body()).toEqual(readFileSync(path.join(process.cwd(), "public", doc.href)));
  }
});

test("each service offers exactly its relevant capability statements", async ({ page }) => {
  for (const service of [...new Set(capabilityDocuments.map(doc => doc.service))]) {
    await page.goto(`/services/${service}`);
    const library = page.locator("#documents");
    const expected = capabilityDocuments.filter(doc => doc.service === service);
    await expect(library.getByRole("link", { name: /^Preview PDF:/ })).toHaveCount(expected.length);
    for (const doc of expected) {
      await expect(library.getByRole("link", { name: `Preview PDF: ${doc.title} capability statement (opens in a new tab)`, exact: true })).toHaveAttribute("href", doc.href);
    }
  }
});

test("directory provides a preview link with a redirect icon for each document", async ({ page }) => {
  await page.goto("/contracting/capability-statement");
  const library = page.locator(".capability-library");
  await expect(library.locator("img")).toHaveCount(0);
  await expect(library.getByRole("link")).toHaveCount(capabilityDocuments.length);
  await expect(library.locator(".lucide-arrow-up-right")).toHaveCount(capabilityDocuments.length);
  await expect(library.locator(".lucide-eye, a[download]")).toHaveCount(0);
  for (const doc of capabilityDocuments) {
    await expect(library.getByRole("heading", { name: doc.title, exact: true })).toBeVisible();
    await expect(library.getByRole("link", { name: `Preview PDF: ${doc.title} capability statement (opens in a new tab)`, exact: true })).toHaveAttribute("href", doc.href);
  }
});
