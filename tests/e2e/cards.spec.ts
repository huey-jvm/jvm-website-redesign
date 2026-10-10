import fs from "node:fs";
import path from "node:path";
import { test, expect, type Page } from "@playwright/test";
import { pages } from "./pages";
import { outcomes } from "../../content/outcomes";
import { services } from "../../content/services";
import { differentiators } from "../../content/differentiators";

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
    for (const el of Array.from(document.querySelectorAll<HTMLElement>("body *"))) {
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

test("no source file clips card text", () => {
  const files = ["app", "components"].flatMap((dir) => fs.readdirSync(dir, { recursive: true, encoding: "utf8" }).filter((f) => f.endsWith(".tsx")).map((f) => path.join(dir, f)));
  expect(files.length).toBeGreaterThan(20);
  const hits = files.flatMap((f) => (fs.readFileSync(f, "utf8").match(clipPattern) ?? []).map((m) => `${f}: ${m}`));
  console.log(`clip scan: ${files.length} files, ${hits.length} hits`);
  expect(hits).toEqual([]);
});

test("control: the teaser check rejects a long, unfinished or dashed line", () => {
  expect(teaserProblems("x".repeat(130) + ".")).not.toEqual([]);
  expect(teaserProblems("Shorter waits and more capacity")).not.toEqual([]);
  expect(teaserProblems("Faster — and better.")).not.toEqual([]);
  expect(teaserProblems("Shorter waits and more capacity.")).toEqual([]);
});

test("every teaser is a complete sentence of at most 120 characters", () => {
  const items = [
    ...outcomes.map((o) => ({ name: `outcome ${o.id}`, teaser: o.teaser })),
    ...services.map((s) => ({ name: `service ${s.slug}`, teaser: s.teaser })),
    ...differentiators.map((d) => ({ name: `differentiator ${d.n}`, teaser: d.teaser })),
  ];
  console.log(`teasers checked: ${items.length}, longest ${Math.max(...items.map((i) => i.teaser.length))} characters`);
  expect(items.length).toBe(outcomes.length + services.length + differentiators.length);
  for (const i of items) expect(teaserProblems(i.teaser), i.name).toEqual([]);
});

test("control: the rendered check finds a clamped paragraph, an ellipsis and text cut off in a box", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await page.evaluate(() => {
    const host = document.createElement("div");
    host.innerHTML = [
      '<p style="display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;width:120px">a long clamped paragraph that needs several lines to show in full width here</p>',
      '<p style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis;width:60px">a long single line of text</p>',
      '<p style="overflow:hidden;height:12px;width:90px">a paragraph in a box too short for its words so it is cut</p>',
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
