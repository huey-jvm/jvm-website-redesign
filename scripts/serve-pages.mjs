import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { gzipSync } from "node:zlib";

// Serve the actual Pages export for local/CI performance audits. Bind locally;
// emulate the static host's compression rather than running the Next server.
const root = path.resolve(process.argv[2] ?? "out");
const port = Number(process.argv[3] ?? 3200);
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".txt": "text/plain", ".xml": "application/xml", ".svg": "image/svg+xml", ".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg", ".ico": "image/x-icon", ".woff2": "font/woff2", ".pdf": "application/pdf" };
const cache = new Map();
const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url, "http://localhost");
    const file = path.resolve(root, `.${decodeURIComponent(url.pathname)}`);
    if (file !== root && !file.startsWith(root + path.sep)) { response.writeHead(403).end(); return; }
    let target = file;
    let status = 200;
    try {
      if ((await fs.stat(target)).isDirectory()) {
        if (!url.pathname.endsWith("/")) { response.writeHead(308, { Location: url.pathname + "/" + url.search }).end(); return; }
        target = path.join(target, "index.html");
      }
      await fs.access(target);
    } catch { target = path.join(root, "404.html"); status = 404; }
    if (!cache.has(target)) {
      const body = await fs.readFile(target);
      const type = types[path.extname(target)] ?? "application/octet-stream";
      const compressed = /^(text\/|application\/(json|xml))/.test(type) || type === "image/svg+xml";
      cache.set(target, { body, type, gzip: compressed ? gzipSync(body) : null });
    }
    const entry = cache.get(target);
    const zipped = entry.gzip && /\bgzip\b/.test(request.headers["accept-encoding"] ?? "");
    const body = zipped ? entry.gzip : entry.body;
    response.writeHead(status, { "Content-Type": entry.type, "Content-Length": body.length, "Vary": "Accept-Encoding", "Cache-Control": "public, max-age=600", ...(zipped ? { "Content-Encoding": "gzip" } : {}) });
    response.end(request.method === "HEAD" ? undefined : body);
  } catch { response.writeHead(500).end("Static export could not be read"); }
});
server.listen(port, "127.0.0.1", () => console.log(`Pages export ready on http://localhost:${port}`));
