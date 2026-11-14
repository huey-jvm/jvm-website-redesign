import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { gzipSync } from "node:zlib";
import { createSecureServer } from "node:http2";
import { execFileSync } from "node:child_process";
import os from "node:os";

// Serve the actual Pages export for local/CI performance audits. Bind locally;
// emulate the static host's compression rather than running the Next server.
const root = path.resolve(process.argv[2] ?? "out");
const port = Number(process.argv[3] ?? 3200);
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".txt": "text/plain", ".xml": "application/xml", ".svg": "image/svg+xml", ".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg", ".ico": "image/x-icon", ".woff2": "font/woff2", ".pdf": "application/pdf" };
const cache = new Map();
const handler = async (request, response) => {
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
};
// Pages serves HTTP/2. A six-connection HTTP/1 dev server introduces asset
// queues that do not represent the production CDN. The temporary certificate
// is only for the loopback audit server, never deployed with the site.
const tls = process.env.PAGES_AUDIT_HTTP2 === "true" || process.argv.includes("--http2");
let credentials;
let certificateDirectory;
if (tls) {
  certificateDirectory = await fs.mkdtemp(path.join(os.tmpdir(), "jvm-pages-audit-"));
  const key = path.join(certificateDirectory, "key.pem");
  const cert = path.join(certificateDirectory, "cert.pem");
  execFileSync(process.env.OPENSSL_PATH ?? "openssl", ["req", "-x509", "-newkey", "rsa:2048", "-nodes", "-keyout", key, "-out", cert, "-days", "1", "-subj", "/CN=localhost", "-addext", "subjectAltName=DNS:localhost,IP:127.0.0.1"], { stdio: "ignore" });
  credentials = { key: await fs.readFile(key), cert: await fs.readFile(cert), allowHTTP1: true };
}
const server = tls ? createSecureServer(credentials, handler) : http.createServer(handler);
server.on("close", () => { if (certificateDirectory) void fs.rm(certificateDirectory, { recursive: true, force: true }); });
server.listen(port, "127.0.0.1", () => console.log(`Pages export ready on ${tls ? "https" : "http"}://localhost:${port}`));
