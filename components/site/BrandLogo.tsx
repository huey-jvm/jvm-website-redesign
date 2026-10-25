import Image from "@/components/ui/Image";
import { cn } from "@/lib/cn";

// Lossless crops of the supplied artwork, with the original PNG retained.
const bounds = {
  full: { width: 720, height: 334 },
  mark: { width: 384, height: 383 },
};

export function BrandLogo({ className, priority = false, sizes = "192px", variant = "full" }: { className?: string; priority?: boolean; sizes?: string; variant?: keyof typeof bounds }) {
  const artwork = bounds[variant];
  return <span className={cn("brand-logo relative inline-block shrink-0 overflow-hidden align-middle", variant === "mark" && "rounded-pill", className)} style={{ aspectRatio: `${artwork.width} / ${artwork.height}` }}>
    <Image src={`/images/brand/jvm-${variant}.webp`} alt="JVM Solutions" width={artwork.width} height={artwork.height} priority={priority} sizes={sizes} className="h-auto w-full" />
  </span>;
}
