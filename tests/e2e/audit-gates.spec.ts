import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import ts from "typescript";
import { test, expect } from "@playwright/test";
import { pages } from "./pages";

const sources = ["app", "components"].flatMap((dir) =>
  fs
    .readdirSync(dir, { recursive: true, encoding: "utf8" })
    .filter(
      (f) =>
        /\.(tsx?|css)$/.test(f) &&
        path.join(dir, f) !== path.join("app", "globals.css"),
    )
    .map((f) => path.join(dir, f)),
);
const rawColor = /#[0-9a-f]{3,8}\b|\b(rgba?|hsla?|oklch)\(/gi;

test("colors use the declared tokens, including alpha colors", () => {
  expect("#11223344 rgb(0 0 0)".match(rawColor)?.length).toBe(2);
  expect(
    fs.readFileSync("app/globals.css", "utf8").match(rawColor)!.length,
  ).toBeGreaterThan(0);
  expect(
    sources.flatMap((f) =>
      [...fs.readFileSync(f, "utf8").matchAll(rawColor)].map(
        (m) => `${f}: ${m[0]}`,
      ),
    ),
  ).toEqual([]);
});

function unpaired(classes: string) {
  const tokens = classes.split(/\s+/);
  return tokens.filter((token) => {
    if (
      token.includes("motion-reduce:") ||
      !/(^|:)(hover|group-hover[^:]*|peer-hover):/.test(token)
    )
      return false;
    // Timing changes deliberately apply only to pointer hover; keyboard actions are instant.
    if (/:((duration|delay)-|transition-)/.test(token)) return false;
    const alternatives = token.includes("group-hover")
      ? [
          token.replace("group-hover", "group-focus-visible"),
          token.replace("group-hover", "group-focus-within"),
        ]
      : token.includes("peer-hover")
        ? [token.replace("peer-hover", "peer-focus-visible")]
        : [
            token.replace("hover:", "focus-visible:"),
            token.replace("hover:", "has-focus-visible:"),
          ];
    return !alternatives.some((t) => tokens.includes(t));
  });
}

test("hover affordances have a keyboard pair in the same class expression", () => {
  expect(
    unpaired(
      "lg:hover:text-cream lg:focus-visible:text-cream group-hover/card:translate-x-1 group-focus-visible/card:translate-x-1",
    ),
  ).toEqual([]);
  expect(unpaired("hover:bg-cream group-hover/card:scale-105")).toHaveLength(2);
  const failures: string[] = [];
  let groups = 0;
  for (const file of sources.filter((f) => /\.tsx?$/.test(f))) {
    const source = ts.createSourceFile(
      file,
      fs.readFileSync(file, "utf8"),
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TSX,
    );
    function visit(node: ts.Node) {
      if (
        (ts.isJsxAttribute(node) &&
          node.name.getText(source) === "className") ||
        ts.isVariableDeclaration(node) ||
        ts.isPropertyAssignment(node)
      ) {
        const strings: string[] = [];
        function collect(child: ts.Node) {
          if (ts.isStringLiteralLike(child)) strings.push(child.text);
          ts.forEachChild(child, collect);
        }
        collect(node);
        const value = strings.join(" ");
        if (/hover[:/]/.test(value)) {
          groups++;
          failures.push(...unpaired(value).map((t) => `${file}: ${t}`));
        }
      }
      ts.forEachChild(node, visit);
    }
    visit(source);
  }
  expect(groups).toBeGreaterThan(20);
  expect([...new Set(failures)]).toEqual([]);
});

test("production hides preview markers and exposes downloadable capability statements", async ({
  page,
}) => {
  let markerCount = 0;
  for (const route of [...pages, "/missing-audit-route"]) {
    await page.goto(route);
    markerCount += await page.locator('[aria-label^="Placeholder"]').count();
    if (process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS !== "true")
      expect(await page.locator("body").innerText()).not.toContain(
        "Placeholder ·",
      );
  }
  expect(markerCount).toBe(
    process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS === "true" ? markerCount : 0,
  );
  if (process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS === "true")
    expect(markerCount).toBeGreaterThan(0);
  await page.goto("/services/healthcare-operations");
  await expect(
    page
      .getByRole("link", {
        name: "Preview PDF: Healthcare capability statement (opens in a new tab)",
        exact: true,
      })
      .first(),
  ).toHaveAttribute("href", "/downloads/jvm-healthcare-capability-statement.pdf");
  await page.evaluate(() => {
    const el = document.createElement("div");
    el.setAttribute("aria-label", "Placeholder control");
    document.body.append(el);
  });
  expect(
    await page.locator('[aria-label^="Placeholder"]').count(),
  ).toBeGreaterThan(0);
});

test("every route stays inside the 150 KiB gzip module JavaScript budget", async ({
  request,
}) => {
  const cache = new Map<string, number>();
  const totals: { route: string; gzip: number }[] = [];
  for (const route of [...pages, "/missing-audit-route"]) {
    const html = await (await request.get(route)).text();
    const scripts = [
      ...html.matchAll(/<script\b([^>]*?)src="([^"]+)"([^>]*?)>/g),
    ]
      .filter((m) => !/nomodule/i.test(m[1] + m[3]))
      .map((m) => m[2].replaceAll("&amp;", "&"));
    expect(scripts.length).toBeGreaterThan(0);
    let total = 0;
    for (const src of new Set(scripts)) {
      if (!cache.has(src))
        cache.set(
          src,
          zlib.gzipSync(await (await request.get(src)).body()).length,
        );
      total += cache.get(src)!;
    }
    totals.push({ route, gzip: total });
  }
  console.log(JSON.stringify({ javascriptGzip: totals }));
  expect(
    totals.every((t) => t.gzip > 1024),
    "control: a 1 KiB limit rejects the served modules",
  ).toBe(true);
  expect(totals.filter((t) => t.gzip > 150 * 1024)).toEqual([]);
});
