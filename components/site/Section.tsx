import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type Surface = "light" | "cream" | "dark" | "ink50";

const surfaces: Record<Surface, string> = {
  light: "bg-white text-ink-900",
  cream: "bg-cream text-ink-900",
  ink50: "bg-ink-50 text-ink-900",
  dark: "surface-dark bg-ink-950 text-ink-200",
};

export function Section({ surface = "light", className, children, tight, ...rest }: ComponentPropsWithoutRef<"section"> & { surface?: Surface; tight?: boolean; children: ReactNode }) {
  return (
    <section className={cn(surfaces[surface], tight ? "py-10 md:py-12" : "py-12 md:py-16 lg:py-20", className)} {...rest}>
      <div className="container-content">{children}</div>
    </section>
  );
}

export function SectionHeader({ eyebrow, title, lead, tone = "light", align = "left", as: Tag = "h2", className }: { eyebrow?: string; title: string; lead?: string; tone?: "light" | "dark"; align?: "left" | "center"; as?: "h1" | "h2"; className?: string }) {
  return (
    <div className={cn("mb-8 md:mb-10", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? <p className={cn("mb-3 text-eyebrow font-semibold uppercase", tone === "dark" ? "text-gold-500" : "text-gold-700")}>{eyebrow}</p> : null}
      <Tag className={cn(Tag === "h1" ? "text-h1-sm md:text-h1" : "text-h2-sm md:text-h2", tone === "dark" ? "text-cream" : "text-ink-950")}>{title}</Tag>
      {lead ? <p className={cn("mt-4 text-lead-sm md:text-lead prose-measure", align === "center" && "mx-auto", tone === "dark" ? "text-ink-200" : "text-ink-700")}>{lead}</p> : null}
    </div>
  );
}
