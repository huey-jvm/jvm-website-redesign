import fs from "node:fs";
import path from "node:path";
import Image from "@/components/ui/Image";
import Link from "next/link";
import type { Credential } from "@/content/credentials";
import { cn } from "@/lib/cn";
import { withBasePath } from "@/lib/base-path";

function imageExists(src?: string) {
  if (!src) return false;
  try {
    return fs.existsSync(path.join(process.cwd(), "public", decodeURIComponent(src)));
  } catch {
    return false;
  }
}

export function CredentialMark({ credential, size = "md", className, fill = false }: { credential: Credential; size?: "sm" | "md"; className?: string; fill?: boolean }) {
  if (!credential.evidenceHref) return null;
  const hasImage = imageExists(credential.image);
  const tile = (
    <span
      className={cn(
        "flex items-center justify-center rounded-control border border-ink-200 bg-white p-3 ",
        size === "md" ? "min-h-20" : "min-h-14",
        fill ? "w-full" : size === "md" ? "min-w-28" : "min-w-20",
        !fill && credential.wide && (size === "md" ? "min-w-40" : "min-w-28"),
        className,
      )}
    >
      {hasImage && credential.image ? (
        <Image src={withBasePath(credential.image)} alt={credential.name} width={credential.wide ? 160 : 96} height={size === "md" ? 56 : 32} className={cn("w-auto max-w-full object-contain", size === "md" ? "h-14" : "h-8")} unoptimized />
      ) : (
        <span className="px-1 text-center font-sans text-body-sm font-semibold leading-tight text-ink-950">{credential.name}</span>
      )}
    </span>
  );

  const external = credential.evidenceHref.startsWith("http");
  const classes = cn("group/mark rounded-control focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-700 in-[.surface-dark]:focus-visible:outline-gold-500", fill ? "flex w-full" : "inline-flex");
  return external ? (
    <a href={credential.evidenceHref} target="_blank" rel="noopener noreferrer" className={classes} aria-label={`${credential.name}, view the record (opens in a new tab)`}>{tile}</a>
  ) : (
    <Link href={credential.evidenceHref} className={classes} aria-label={`${credential.name}, ${credential.evidenceLabel ?? "view details"}`}>{tile}</Link>
  );
}
