import fs from "node:fs";
import path from "node:path";
import Image from "@/components/ui/Image";
import Link from "next/link";
import { ArrowUpRight, BadgeCheck } from "lucide-react";
import type { Credential } from "@/content/credentials";
import { cn } from "@/lib/cn";

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
  const external = credential.evidenceHref.startsWith("http");
  const tile = hasImage && credential.image ? (
    <span
      className={cn(
        "flex items-center justify-center rounded-control border border-ink-200 bg-white p-3 transition-[border-color] duration-150 ease-hover group-hover/mark:border-gold-700 group-focus-visible/mark:border-gold-700 group-focus-visible/mark:transition-none",
        size === "md" ? "min-h-20" : "min-h-14",
        fill ? "w-full" : size === "md" ? "min-w-28" : "min-w-20",
        !fill && credential.wide && (size === "md" ? "min-w-40" : "min-w-28"),
        className,
      )}
    >
      <Image src={credential.image} alt={credential.name} width={credential.wide ? 160 : 96} height={size === "md" ? 56 : 32} className={cn("w-auto max-w-full object-contain", size === "md" ? "h-14" : "h-8")} />
    </span>
  ) : (
    <span
      className={cn(
        "mark-tile relative flex items-center gap-3 overflow-hidden rounded-control border text-left transition-[border-color,background-color] duration-150 ease-hover group-focus-visible/mark:transition-none",
        "border-ink-200 bg-white group-hover/mark:border-gold-700 group-focus-visible/mark:border-gold-700",
        "in-[.surface-dark]:border-ink-800 in-[.surface-dark]:bg-ink-900 in-[.surface-dark]:group-hover/mark:border-gold-500 in-[.surface-dark]:group-focus-visible/mark:border-gold-500",
        size === "md" ? "min-h-20 px-4 py-3" : "min-h-14 px-3 py-2",
        fill ? "w-full" : size === "md" ? "min-w-40" : "min-w-28",
        className,
      )}
    >
      <span aria-hidden className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gold-700 opacity-0 transition-[scale,opacity] duration-150 ease-enter group-hover/mark:scale-x-100 group-hover/mark:opacity-100 group-focus-visible/mark:scale-x-100 group-focus-visible/mark:opacity-100 group-focus-visible/mark:transition-none in-[.surface-dark]:bg-gold-500 motion-reduce:scale-x-100" />
      <BadgeCheck aria-hidden className={cn("shrink-0 text-gold-700 in-[.surface-dark]:text-gold-500", size === "md" ? "size-5" : "size-4")} />
      <span className="min-w-0 flex-1">
        <span className="block font-sans text-body-sm font-semibold leading-tight text-ink-950 in-[.surface-dark]:text-cream">{credential.name}</span>
        {size === "md" ? (
          <span className="mt-1 flex items-center gap-1 text-caption text-ink-500 in-[.surface-dark]:text-ink-300">
            {external ? "View record" : "Details"}
            <ArrowUpRight aria-hidden className="size-3.5 transition-transform duration-150 ease-hover group-hover/mark:-translate-y-0.5 group-hover/mark:translate-x-0.5 group-focus-visible/mark:-translate-y-0.5 group-focus-visible/mark:translate-x-0.5 group-focus-visible/mark:transition-none motion-reduce:group-hover/mark:translate-x-0 motion-reduce:group-hover/mark:translate-y-0 motion-reduce:group-focus-visible/mark:translate-x-0 motion-reduce:group-focus-visible/mark:translate-y-0" />
          </span>
        ) : null}
      </span>
    </span>
  );

  const classes = cn("group/mark rounded-control transition-[scale] duration-150 ease-hover active:scale-[0.98] motion-reduce:active:scale-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-700 in-[.surface-dark]:focus-visible:outline-gold-500", fill ? "flex w-full" : "inline-flex");
  const label = hasImage ? `${credential.name}${external ? ", opens in a new tab" : ""}` : undefined;
  return external ? (
    <a href={credential.evidenceHref} target="_blank" rel="noopener noreferrer" className={classes} aria-label={label}>{tile}{hasImage ? null : <span className="sr-only"> (opens in a new tab)</span>}</a>
  ) : (
    <Link href={credential.evidenceHref} className={classes} aria-label={label}>{tile}</Link>
  );
}
