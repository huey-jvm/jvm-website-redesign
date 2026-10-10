import { test, expect, type APIRequestContext } from "@playwright/test";
import { pages } from "./pages";
import { legacyRedirects } from "../../content/redirects";

async function resolveTargets(request: APIRequestContext, found: Map<string, Set<string>>) {
  const html = new Map<string, { status: number; body: string }>();
  const failures: string[] = [];
  let anchors = 0;
  for (const [target, from] of found) {
    const [pathname, hash] = target.split("#");
    const key = pathname || "/";
    if (!html.has(key)) {
      const res = await request.get(key);
      html.set(key, { status: res.status(), body: await res.text() });
    }
    const { status, body } = html.get(key)!;
    if (status !== 200) failures.push(`${target} returns ${status}, linked from ${[...from].join(", ")}`);
    if (hash) {
      anchors++;
      if (!body.includes(`id="${hash}"`)) failures.push(`${target} has no element with id "${hash}", linked from ${[...from].join(", ")}`);
    }
  }
  return { failures, anchors, fetched: html.size };
}

test("control: the link resolver flags a missing page and a missing anchor", async ({ request }) => {
  const targets = new Map([["/zzq-not-a-page", new Set(["control"])], ["/#zzq-missing-anchor", new Set(["control"])], ["/why-jvm#access", new Set(["control"])]]);
  const { failures } = await resolveTargets(request, targets);
  expect(failures).toHaveLength(2);
});

test("every internal link and anchor on every page resolves", async ({ page, request }) => {
  const found = new Map<string, Set<string>>();
  const contactLinks = new Set<string>();
  for (const path of pages) {
    await page.goto(path, { waitUntil: "networkidle" });
    const hrefs = await page.locator("a[href]").evaluateAll((els) => els.map((a) => a.getAttribute("href") ?? ""));
    for (const href of hrefs) {
      if (href.startsWith("mailto:") || href.startsWith("tel:")) contactLinks.add(href);
      if (!href.startsWith("/") && !href.startsWith("#")) continue;
      const target = href.startsWith("#") ? `${path}${href}` : href;
      if (!found.has(target)) found.set(target, new Set());
      found.get(target)!.add(path);
    }
  }
  const { failures, anchors, fetched } = await resolveTargets(request, found);
  const badContact = [...contactLinks].filter((h) => !/^mailto:[^@\s]+@[^@\s]+\.[a-z]{2,}(\?subject=[^\s]+)?$/i.test(h) && !/^tel:\+1\d{10}$/.test(h));
  console.log(`route crawl: ${pages.length} pages, ${found.size} unique internal targets, ${anchors} with an anchor, ${fetched} distinct paths fetched, ${contactLinks.size} mailto and tel links`);
  expect(failures).toEqual([]);
  expect(badContact, "mailto and tel links are well formed").toEqual([]);
});

test("the sitemap lists exactly the published pages and each one returns 200", async ({ request }) => {
  const xml = await (await request.get("/sitemap.xml")).text();
  const listed = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  expect([...listed].sort()).toEqual([...pages].sort());
  for (const path of listed) expect((await request.get(path)).status(), path).toBe(200);
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toMatch(/Sitemap: .*\/sitemap\.xml/);
});

test("every legacy Wix path redirects permanently to a page that resolves", async ({ request }) => {
  for (const r of legacyRedirects) {
    const res = await request.get(r.source, { maxRedirects: 0 });
    expect(res.status(), r.source).toBe(308);
    expect(new URL(res.headers()["location"], "http://x").pathname, r.source).toBe(r.destination);
    expect((await request.get(r.destination)).status(), r.destination).toBe(200);
  }
});

test("unknown paths and unknown slugs return 404", async ({ request }) => {
  for (const path of ["/this-page-does-not-exist", "/services/not-a-service", "/legal/not-a-page", "/contracting/not-a-page"]) {
    expect((await request.get(path)).status(), path).toBe(404);
  }
});

test("the contact API validates input, honours the honeypot and answers only POST", async ({ request }) => {
  const bad = await request.post("/api/contact", { data: {} });
  expect(bad.status()).toBe(400);
  expect((await bad.json()).errors).toBeTruthy();
  const unreadable = await request.post("/api/contact", { data: "not json", headers: { "Content-Type": "application/json" } });
  expect(unreadable.status()).toBe(400);
  const valid = { route: "other", name: "Test Person", organisation: "", email: "test@example.com", phone: "", message: "This is a test message from the suite.", website: "" };
  const trap = await request.post("/api/contact", { data: { ...valid, website: "http://spam.example" } });
  expect(trap.status()).toBe(200);
  const real = await request.post("/api/contact", { data: valid });
  expect([200, 503], "200 when email is configured, 503 when the deployment has no email key").toContain(real.status());
  expect((await request.get("/api/contact")).status()).toBe(405);
});
