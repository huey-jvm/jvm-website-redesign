import Image from "@/components/ui/Image";
import { cn } from "@/lib/cn";

// Fit the supplied PNG's artwork bounds without altering its original pixels.
const canvas = { width: 3600, height: 2400 };
const bounds = {
  full: { left: 298, top: 505, width: 3003, height: 1391 },
  mark: { left: 298, top: 731, width: 1167, height: 1165 },
};

export function BrandLogo({ className, priority = false, sizes = "192px", variant = "full" }: { className?: string; priority?: boolean; sizes?: string; variant?: keyof typeof bounds }) {
  const artwork = bounds[variant];
  return <span className={cn("brand-logo relative inline-block shrink-0 overflow-hidden align-middle", variant === "mark" && "rounded-pill", className)} style={{ aspectRatio: `${artwork.width} / ${artwork.height}` }}>
    <Image src="/images/brand/jvm-official.png" alt="JVM Solutions" width={canvas.width} height={canvas.height} priority={priority} sizes={sizes} style={{ position: "absolute", width: `${canvas.width / artwork.width * 100}%`, maxWidth: "none", height: "auto", left: `${-artwork.left / artwork.width * 100}%`, top: `${-artwork.top / artwork.height * 100}%` }} />
  </span>;
}
