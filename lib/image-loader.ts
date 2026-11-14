import manifest from "./image-manifest.json";

type Variant = { hash: string; widths: number[] };
const images: Record<string, Variant & { portrait?: Variant }> = manifest;
export default function imageLoader({ src, width, quality = 75, portrait = false }: { src: string; width: number; quality?: number; portrait?: boolean }) {
  const image = portrait ? images[src]?.portrait : images[src];
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (image) {
    const size = image.widths.find(w => w >= width) ?? image.widths.at(-1)!;
    return `${base}/images/optimized/${image.hash}-${size}-${quality >= 83 ? 90 : 75}.webp`;
  }
  return src.startsWith("/") ? `${base}${src}` : src;
}
