import { test, expect, type Page } from "@playwright/test";
import { pages } from "./pages";
import { services } from "../../content/services";

const clipPattern = /\b(?:line-clamp-\S+|truncate|text-ellipsis|overflow-ellipsis)\b/g;
const teaserLimit = 120;

const teaserProblems = (text: string) => {
  const problems: string[] = [];
  if (text.length > teaserLimit) problems.push(`${text.length} characters, over ${teaserLimit}`);
  if (!/[.!?]$/.test(text)) problems.push("is not a complete sentence ending in a full stop");
  if (/…|\.\.\./.test(text)) problems.push("contains an ellipsis");
  if (/—|–/.test(text)) problems.push("contains a dash used as punctuation");
  return problems;
};

async function clipped(page: Page) {
  return page.evaluate(() => {
    const found: string[] = [];
    for (const el of Array.from(document.querySelectorAll<HTMLElement>("[data-figure], .tabular, td, dd"))) {
      const cs = getComputedStyle(el);
      const box = el.getBoundingClientRect();
      if (box.width <= 2 || box.height <= 2) continue;
      const label = `${el.tagName.toLowerCase()} "${(el.textContent ?? "").trim().slice(0, 40)}"`;
      if (cs.getPropertyValue("-webkit-line-clamp") !== "none") found.push(`line clamp on ${label}`);
      if (cs.textOverflow === "ellipsis") found.push(`ellipsis on ${label}`);
      const ownText = Array.from(el.childNodes).some((n) => n.nodeType === 3 && n.textContent?.trim());
      if (!ownText) continue;
      if (/hidden|clip/.test(cs.overflowY) && el.scrollHeight > el.clientHeight + 1) found.push(`text cut off vertically in ${label}`);
      if (/hidden|clip/.test(cs.overflowX) && el.scrollWidth > el.clientWidth + 1) found.push(`text cut off sideways in ${label}`);
    }
    return found;
  });
}

test("control: the source scan finds a clamp, a truncate and an ellipsis class", () => {
  const sample = 'className="line-clamp-2 mt-2" className="truncate" className="text-ellipsis"';
  expect(sample.match(clipPattern)).toHaveLength(3);
});

test("card summary headings show their complete title without truncation", async ({page}) => { await page.goto("/"); const titles=page.locator("a.group\\/card h3"); expect(await titles.count()).toBeGreaterThan(0); for(const title of await titles.all()) { expect(await title.getAttribute("title")).toBe(await title.textContent()); expect(await title.evaluate(el=>getComputedStyle(el).textOverflow)).not.toBe("ellipsis"); expect(await title.evaluate(el=>el.scrollWidth<=el.clientWidth+1)).toBe(true); } });

test("control: the teaser check rejects a long, unfinished or dashed line", () => {
  expect(teaserProblems("x".repeat(130) + ".")).not.toEqual([]);
  expect(teaserProblems("Shorter waits and more capacity")).not.toEqual([]);
  expect(teaserProblems("Faster — and better.")).not.toEqual([]);
  expect(teaserProblems("Shorter waits and more capacity.")).toEqual([]);
});

test("every teaser is a complete sentence of at most 120 characters", () => {
  const items = [
    ...services.map((s) => ({ name: `service ${s.slug}`, teaser: s.teaser })),
  ];
  console.log(`teasers checked: ${items.length}, longest ${Math.max(...items.map((i) => i.teaser.length))} characters`);
  expect(items.length).toBe(services.length);
  for (const i of items) expect(teaserProblems(i.teaser), i.name).toEqual([]);
});

test("control: the rendered check finds a clamped paragraph, an ellipsis and text cut off in a box", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await page.evaluate(() => {
    const host = document.createElement("div");
    host.innerHTML = [
      '<p data-figure style="display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;width:120px">a long clamped paragraph that needs several lines to show in full width here</p>',
      '<p data-figure style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis;width:60px">a long single line of text</p>',
      '<p data-figure style="overflow:hidden;height:12px;width:90px">a paragraph in a box too short for its words so it is cut</p>',
    ].join("");
    document.body.append(host);
  });
  const found = await clipped(page);
  expect(found.some((f) => f.startsWith("line clamp"))).toBe(true);
  expect(found.some((f) => f.startsWith("ellipsis"))).toBe(true);
  expect(found.some((f) => f.startsWith("text cut off vertically"))).toBe(true);
});

for (const width of [320, 1280]) {
  test(`no page clips or ellipsizes any text at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const problems: string[] = [];
    for (const route of pages) {
      await page.goto(route, { waitUntil: "networkidle" });
      problems.push(...(await clipped(page)).map((p) => `${route}: ${p}`));
    }
    console.log(`rendered clip check at ${width}px: ${pages.length} pages, ${problems.length} problems`);
    expect(problems).toEqual([]);
  });
}
