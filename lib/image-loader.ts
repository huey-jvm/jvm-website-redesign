import manifest from "./image-manifest.json";

const images: Record<string, { hash: string; widths: number[] }> = manifest;
export default function imageLoader({ src, width, quality = 75 }: { src: string; width: number; quality?: number }) {
  const image = images[src];
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (image) {
    const size = image.widths.find(w => w >= width) ?? image.widths.at(-1)!;
    return `${base}/images/optimized/${image.hash}-${size}-${quality >= 83 ? 90 : 75}.webp`;
  }
  return src.startsWith("/") ? `${base}${src}` : src;
}
