import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import path from "node:path";
import { capabilityDocuments } from "../../content/capabilities";

test("service pages serve every original PDF and provides distinct view and save actions", async ({ page, request }) => {
  for (const doc of capabilityDocuments) {
    await page.goto(`/services/${doc.service}`);
    const view = page.getByRole("link", { name: `View PDF: ${doc.title} capability statement (opens in a new tab)`, exact: true });
    await expect(view).toHaveAttribute("href", doc.href);
    await expect(view).toHaveAttribute("target", "_blank");
    await expect(page.getByRole("link", { name: `Download ${doc.title} capability statement`, exact: true })).toHaveAttribute("download", "");
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
    await expect(library.getByRole("link", { name: /^Download / })).toHaveCount(expected.length);
    for (const doc of expected) {
      await expect(library.getByRole("link", { name: `Download ${doc.title} capability statement`, exact: true })).toHaveAttribute("href", doc.href);
    }
  }
});
