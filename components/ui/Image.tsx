import "server-only";
import type { ImgHTMLAttributes } from "react";
import { preload } from "react-dom";
import imageLoader from "@/lib/image-loader";
import manifest from "@/lib/image-manifest.json";
import { PhotoLoading } from "./PhotoLoading";

type ImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "width" | "height"> & {
  src: string; width?: number; height?: number; fill?: boolean;
  priority?: boolean; preload?: boolean; quality?: number;
  mobile?: { maxWidth: number; sizes: string; quality?: number };
};
const images: Record<string, { widths: number[]; portrait?: { widths: number[] } }> = manifest;

// Render native responsive images on the server. No browser image runtime or
// optimizer endpoint is needed, including on GitHub Pages.
export default function Image({ src, fill, priority, preload: shouldPreload, quality = 75, mobile, sizes, style, loading, fetchPriority, alt = "", ...rest }: ImageProps) {
  const image = images[src];
  const widths = image?.widths;
  const resolvedSizes = widths ? sizes ?? (rest.width ? `${rest.width}px` : "100vw") : undefined;
  const srcSet = widths?.map(width => `${imageLoader({ src, width, quality })} ${width}w`).join(", ");
  const source = imageLoader({ src, width: widths?.at(-1) ?? rest.width ?? 1920, quality });
  const mobileWidths = mobile ? widths?.filter(width => width <= mobile.maxWidth) : undefined;
  const mobileQuality = mobile?.quality ?? quality;
  const mobileSrcSet = mobileWidths?.map(width => `${imageLoader({ src, width, quality: mobileQuality })} ${width}w`).join(", ");
  const portraitSrcSet = mobile && image?.portrait?.widths.map(width => `${imageLoader({ src, width, quality: mobileQuality, portrait: true })} ${width}w`).join(", ");
  const highPriority = priority || shouldPreload;
  if (highPriority) {
    preload(source, { as: "image", imageSrcSet: srcSet, imageSizes: resolvedSizes, fetchPriority: "high", ...(mobileSrcSet ? { media: "(min-width: 1024px)" } : {}) });
    if (mobile && mobileSrcSet) preload(imageLoader({ src, width: mobileWidths!.at(-1)!, quality: mobileQuality }), { as: "image", imageSrcSet: mobileSrcSet, imageSizes: mobile.sizes, media: portraitSrcSet ? "(min-width: 480px) and (max-width: 1023px)" : "(max-width: 1023px)", fetchPriority: "high" });
    if (portraitSrcSet) preload(imageLoader({ src, width: image!.portrait!.widths.at(-1)!, quality: mobileQuality, portrait: true }), { as: "image", imageSrcSet: portraitSrcSet, imageSizes: "max(100vw, 60vh)", media: "(max-width: 479px)", fetchPriority: "high" });
  }
  const element = <img {...rest} src={source} srcSet={srcSet} sizes={resolvedSizes} data-image-src={src} alt={alt}
    loading={loading ?? (highPriority ? "eager" : "lazy")} decoding="async" fetchPriority={highPriority ? "high" : fetchPriority ?? (loading === "eager" ? undefined : "low")}
    style={fill ? { position: "absolute", inset: 0, width: "100%", height: "100%", ...style } : style} />;
  const responsive = mobile && mobileSrcSet ? <picture>{portraitSrcSet ? <source media="(max-width: 479px)" srcSet={portraitSrcSet} sizes="max(100vw, 60vh)" /> : null}<source media="(max-width: 1023px)" srcSet={mobileSrcSet} sizes={mobile.sizes} />{element}</picture> : element;
  return fill && /^\/images\/(revision|jvm|video)\//.test(src)
    ? <PhotoLoading key={src}>{responsive}</PhotoLoading> : responsive;
}
