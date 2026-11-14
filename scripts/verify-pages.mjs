import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import redirects from "../content/legacy-redirects.json" with { type: "json" };

const out = path.resolve(process.argv[2] ?? "out");
const base = process.env.PAGES_BASE_PATH ?? "";
const production = process.env.NEXT_PUBLIC_NOINDEX !== "true";
const home = fs.readFileSync(path.join(out, "index.html"), "utf8");
assert(home.includes(`${base}/_next/`), "Asset URLs must match the publication path");
if (production) {
  assert(!home.includes('/jvm-website-redesign/_next/'), "Production must not use the repository prefix");
  assert(!home.includes('content="noindex, nofollow"'), "Production home must be indexable");
}
const robots = fs.readFileSync(path.join(out, "robots.txt"), "utf8");
assert.equal(/^Disallow: \/\s*$/m.test(robots), !production, "Robots policy must match publication mode");
const sitemap = fs.readFileSync(path.join(out, "sitemap.xml"), "utf8");
assert(sitemap.includes(`${process.env.NEXT_PUBLIC_SITE_URL}/about`), "Sitemap must use the publication origin");
const contact = fs.readFileSync(path.join(out, "contact/index.html"), "utf8");
assert(contact.includes("mailto:BD@jvmsolutions.net"), "Static contact must offer direct email");
assert(!contact.includes('type="submit"'), "Static contact must not show a nonworking submission form");
for (const { source, destination } of redirects) {
  const html = fs.readFileSync(path.join(out, source.slice(1), "index.html"), "utf8");
  assert(html.includes(`url=${base}${destination}/`), `Missing static redirect: ${source}`);
  assert(fs.existsSync(path.join(out, destination.slice(1), "index.html")), `Missing destination: ${destination}`);
}
assert(fs.existsSync(path.join(out, "gsa-8a-stars-iii/index.html")), "STARS legacy URL must resolve");
console.log(`Pages checks passed: ${production ? "production" : "preview"} assets, indexing, sitemap, contact and legacy redirects.`);
