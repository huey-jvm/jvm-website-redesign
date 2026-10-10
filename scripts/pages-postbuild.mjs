import fs from "node:fs";
import path from "node:path";

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
fs.writeFileSync(path.join(out, ".nojekyll"), "");
console.log(`pages postbuild: ${copied} route data files given flat names, .nojekyll written`);
