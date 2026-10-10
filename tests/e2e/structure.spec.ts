import { test, expect } from "@playwright/test";
import { pages } from "./pages";

const forbidden = ["Double click", "This is your", "Add answer here", "wix", "Columbus", "lorem ipsum"];

for (const path of pages) {
  test(`${path} has one h1, ordered headings, a description, and no template text`, async ({ page }) => {
    await page.goto(path, { waitUntil: "networkidle" });
    const h1s = await page.locator("main h1").count();
    expect(h1s, "exactly one h1 in main").toBe(1);

    const levels = await page.locator("main h1, main h2, main h3, main h4").evaluateAll((els) => els.map((e) => Number(e.tagName[1])));
    for (let i = 1; i < levels.length; i++) {
      expect(levels[i] - levels[i - 1], `heading jump at index ${i}: ${levels[i - 1]} -> ${levels[i]}`).toBeLessThanOrEqual(1);
    }
    const empty = await page.locator("main :is(h1,h2,h3,h4)").evaluateAll((els) => els.filter((e) => !e.textContent?.trim()).length);
    expect(empty, "no empty headings").toBe(0);

    const description = await page.locator('meta[name="description"]').getAttribute("content");
    expect(description?.length ?? 0).toBeGreaterThan(40);
    const title = await page.title();
    expect(title).toContain("JVM Solutions");

    const text = (await page.locator("body").innerText()).toLowerCase();
    for (const f of forbidden) expect(text, `template text "${f}" present`).not.toContain(f.toLowerCase());

    const badLinks = await page.locator("a").evaluateAll((els) =>
      els.filter((a) => !(a.textContent?.trim() || a.getAttribute("aria-label") || a.querySelector("img[alt]"))).map((a) => a.outerHTML.slice(0, 80)),
    );
    expect(badLinks, "every link has a name").toEqual([]);

    const tels = await page.locator("main, footer, header").evaluateAll((roots) => {
      const re = /\b210-504-4707\b/;
      let plain = 0;
      for (const root of roots) {
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        while (walker.nextNode()) {
          const n = walker.currentNode as Text;
          if (re.test(n.textContent ?? "") && !(n.parentElement?.closest('a[href^="tel:"]'))) plain++;
        }
      }
      return plain;
    });
    expect(tels, "every phone number is a tel: link").toBe(0);
  });
}

test("legacy Wix paths redirect", async ({ page }) => {
  for (const [from, to] of [["/about-us", "/about"], ["/services-2", "/services/healthcare-operations"], ["/contractvehicles", "/contracting"], ["/gsa-8a-stars-iii", "/contracting/stars-iii"], ["/job-seekers", "/careers"], ["/contact-us", "/contact"]]) {
    const res = await page.goto(from);
    expect(new URL(res!.url()).pathname).toBe(to);
  }
});

test("identifiers render whole at 320px", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto("/contracting", { waitUntil: "networkidle" });
  const clipped = await page.locator("[data-figure]").evaluateAll((els) => els.filter((e) => e.scrollWidth > e.clientWidth + 1).map((e) => e.textContent?.slice(0, 40)));
  expect(clipped).toEqual([]);
});
