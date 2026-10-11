import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import type { ReactNode } from "react";
import { getAsset } from "@/content/assets";
import { cn } from "@/lib/cn";

export function presentAsset(id: string) {
  const asset = getAsset(id);
  if (!asset) return undefined;
  try {
    return fs.existsSync(path.join(process.cwd(), "public", asset.path)) ? asset : undefined;
  } catch {
    return undefined;
  }
}

export function Slot({ id, className, imgClassName, sizes = "100vw", priority, children }: { id: string; className?: string; imgClassName?: string; sizes?: string; priority?: boolean; children?: ReactNode }) {
  const asset = presentAsset(id);
  if (!asset) return children ? <>{children}</> : null;
  return (
    <div className={cn("relative overflow-hidden", className)} data-slot={asset.id} aria-hidden={asset.alt ? undefined : true}>
      <Image src={asset.path} alt={asset.alt} fill sizes={sizes} priority={priority} className={cn(!imgClassName?.includes("object-contain") && "object-cover", imgClassName)} />
    </div>
  );
}

export function Backdrop({ id, imgClassName }: { id: string; imgClassName?: string }) {
  const asset = presentAsset(id);
  if (!asset) return null;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden contrast-more:hidden" data-slot={asset.id} aria-hidden>
      <Image src={asset.path} alt={asset.alt} fill sizes="100vw" className={cn("object-cover", imgClassName)} />
    </div>
  );
}

export function Banner({ id, className }: { id: string; className?: string }) {
  if (!presentAsset(id)) return null;
  return (
    <div className={cn("container-content", className)}>
      <Slot id={id} className="aspect-[21/9] w-full" sizes="(min-width: 1200px) 1200px, 100vw" />
    </div>
  );
}
