import fs from "node:fs";
import path from "node:path";
import redirects from "../content/legacy-redirects.json" with { type: "json" };
import { starsShown } from "../content/vehicles.ts";

const out = path.resolve(process.argv[2] ?? "out");
let copied = 0;

function filesUnder(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const full = path.join(dir, e.name);
    return e.isDirectory() ? filesUnder(full) : [full];
  });
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const full = path.join(dir, entry.name);
    if (entry.name.startsWith("__next.")) {
      for (const file of filesUnder(full)) {
        const dotted = path.join(dir, [entry.name, ...path.relative(full, file).split(path.sep)].join("."));
        if (!fs.existsSync(dotted)) {
          fs.copyFileSync(file, dotted);
          copied++;
        }
      }
    } else {
      walk(full);
    }
  }
}

walk(out);
const basePath = process.env.PAGES_BASE_PATH ?? "";
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.jvmsolutions.net").replace(/\/$/, "");
const escapeHtml = (value) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
for (const { source, destination } of [...redirects, ...(!starsShown ? [{ source: "/contracting/stars-iii", destination: "/contracting" }] : []), {
  source: "/gsa-8a-stars-iii", destination: starsShown ? "/contracting/stars-iii" : "/contracting",
}]) {
  const targetFile = path.join(out, source.slice(1), "index.html");
  const destinationFile = path.join(out, destination.slice(1), "index.html");
  if (!fs.existsSync(destinationFile)) throw new Error(`Missing redirect destination: ${destination}`);
  if (fs.existsSync(targetFile) && !(!starsShown && source === "/contracting/stars-iii")) throw new Error(`Redirect would overwrite an existing page: ${source}`);
  const target = `${basePath}${destination}/`;
  const canonical = `${siteUrl}${destination}/`;
  fs.mkdirSync(path.dirname(targetFile), { recursive: true });
  fs.writeFileSync(targetFile, `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0;url=${escapeHtml(target)}"><link rel="canonical" href="${escapeHtml(canonical)}"><title>Page moved | JVM Solutions</title></head><body><p>This page has moved. <a href="${escapeHtml(target)}">Continue to JVM Solutions</a>.</p><script>location.replace(${JSON.stringify(target)} + location.search + location.hash);</script></body></html>`);
}
fs.writeFileSync(path.join(out, ".nojekyll"), "");
console.log(`pages postbuild: ${copied} route data files given flat names, .nojekyll written`);
