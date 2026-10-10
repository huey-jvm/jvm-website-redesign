import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { pages } from "./pages";

for (const path of pages) {
  test(`${path} has no serious or critical accessibility violations`, async ({ page }) => {
    await page.goto(path, { waitUntil: "networkidle" });
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
    const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
    expect(serious.map((v) => `${v.id}: ${v.help} (${v.nodes.length} nodes) ${v.nodes.slice(0, 2).map((n) => n.target.join(" ")).join(" | ")}`)).toEqual([]);
  });
}
