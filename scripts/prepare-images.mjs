import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import sharp from 'sharp';

// Static hosts cannot run Next's image optimizer. Build real srcset files instead.
// Keep the supplied originals; filenames change when either pixels or settings change.
const root = path.resolve('public/images');
const output = path.join(root, 'optimized');
const widths = [96, 192, 256, 384, 640, 750, 828, 1080, 1200, 1440, 1920];
const qualities = [75, 90];
await fs.mkdir(output, { recursive: true });
for (const [name, bounds] of Object.entries({
  full: { left: 298, top: 505, width: 3003, height: 1391 },
  mark: { left: 298, top: 731, width: 1167, height: 1165 },
})) {
  await sharp(path.join(root, 'brand/jvm-official.png')).extract(bounds)
    .resize({ width: name === 'full' ? 720 : 384, withoutEnlargement: true })
    .webp({ lossless: true }).toFile(path.join(root, `brand/jvm-${name}.webp`));
}
async function filesUnder(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const lists = await Promise.all(entries.filter(e => e.name !== 'optimized').map(e => {
    const file = path.join(dir, e.name);
    return e.isDirectory() ? filesUnder(file) : /\.(png|jpe?g|webp)$/i.test(e.name) ? [file] : [];
  }));
  return lists.flat().sort();
}
const manifest = {};
let generated = 0;
for (const file of await filesUnder(root)) {
  const source = await fs.readFile(file);
  const metadata = await sharp(source).metadata();
  if (!metadata.width || metadata.pages > 1) continue;
  const src = '/images/' + path.relative(root, file).split(path.sep).join('/');
  const hash = createHash('sha256').update('responsive-webp-v1').update(source).digest('hex').slice(0, 16);
  const sizes = [...new Set([...widths.filter(w => w < metadata.width), Math.min(metadata.width, 1920)])];
  manifest[src] = { hash, widths: sizes };
  for (const width of sizes) for (const quality of qualities) {
    const destination = path.join(output, `${hash}-${width}-${quality}.webp`);
    try { await fs.access(destination); continue; } catch {}
    // Lossless brand edges and alpha; photographs and maps use quality-specific WebP.
    await sharp(source).rotate().resize({ width, withoutEnlargement: true })
      .webp({ quality, effort: 4, ...(src.includes('/brand/') ? { lossless: true } : {}) }).toFile(destination);
    generated++;
  }
}
await fs.writeFile('lib/image-manifest.json', JSON.stringify(manifest, null, 2) + '\n');
console.log(`Prepared ${Object.keys(manifest).length} image sources; ${generated} new responsive files.`);
