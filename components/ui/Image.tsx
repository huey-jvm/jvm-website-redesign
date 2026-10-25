import "server-only";
import type { ImgHTMLAttributes } from "react";
import { preload } from "react-dom";
import imageLoader from "@/lib/image-loader";
import manifest from "@/lib/image-manifest.json";

type ImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "width" | "height"> & {
  src: string; width?: number; height?: number; fill?: boolean;
  priority?: boolean; preload?: boolean; quality?: number;
};
const images: Record<string, { widths: number[] }> = manifest;

// Render native responsive images on the server. No browser image runtime or
// optimizer endpoint is needed, including on GitHub Pages.
export default function Image({ src, fill, priority, preload: shouldPreload, quality = 75, sizes, style, loading, fetchPriority, alt = "", ...rest }: ImageProps) {
  const image = images[src];
  const widths = image?.widths;
  const resolvedSizes = widths ? sizes ?? (rest.width ? `${rest.width}px` : "100vw") : undefined;
  const srcSet = widths?.map(width => `${imageLoader({ src, width, quality })} ${width}w`).join(", ");
  const source = imageLoader({ src, width: widths?.at(-1) ?? rest.width ?? 1920, quality });
  const highPriority = priority || shouldPreload;
  if (highPriority) preload(source, { as: "image", imageSrcSet: srcSet, imageSizes: resolvedSizes, fetchPriority: "high" });
  return <img {...rest} src={source} srcSet={srcSet} sizes={resolvedSizes} data-image-src={src} alt={alt}
    loading={loading ?? (highPriority ? "eager" : "lazy")} decoding="async" fetchPriority={highPriority ? "high" : fetchPriority}
    style={fill ? { position: "absolute", inset: 0, width: "100%", height: "100%", ...style } : style} />;
}
