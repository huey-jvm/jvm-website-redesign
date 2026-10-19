import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..");
const read = (file) => readFileSync(join(root, "hairline", file), "utf8");
const figures = ["consolidate"];
const out = [read("kernel.js"), read("mount.js"), ...figures.map((name) => read(`${name}.js`))].join("\n;\n");
mkdirSync(join(root, "public", "hairline"), { recursive: true });
writeFileSync(join(root, "public", "hairline", "figures.js"), `(() => {\n${out}\n})();\n`);
console.log(`public/hairline/figures.js, ${figures.length} figure, ${Buffer.byteLength(out)} bytes`);
