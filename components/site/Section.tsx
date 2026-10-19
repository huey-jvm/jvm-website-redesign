import { Eyebrow } from "@/components/ui/Eyebrow";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Backdrop, presentAsset } from "./Slot";

export type Surface = "light" | "cream" | "dark" | "ink50";

const surfaces: Record<Surface, string> = {
  light: "bg-white text-ink-900",
  cream: "bg-cream text-ink-900",
  ink50: "bg-ink-50 text-ink-900",
  dark: "surface-dark bg-ink-950 text-ink-200",
};

export function Section({ surface = "light", className, children, backdrop, backdropClassName, art, contained = true, ...rest }: ComponentPropsWithoutRef<"section"> & { surface?: Surface; backdrop?: string; backdropClassName?: string; art?: ReactNode; contained?: boolean; children: ReactNode }) {
  const bg = backdrop ? presentAsset(backdrop) : undefined;
  const layered = Boolean(bg || art);
  return (
    <section className={cn(surfaces[surface], "py-12 md:py-16 lg:py-24", layered && "relative isolate", className)} data-backdrop={bg?.id} data-art={!bg && art ? "" : undefined} {...rest}>
      {bg ? <Backdrop id={bg.id} imgClassName={backdropClassName} /> : art ? <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden contrast-more:hidden">{art}</div> : null}
      <div className={cn(contained && "container-content", layered && "relative")}>{children}</div>
    </section>
  );
}

export function SectionHeader({ id, eyebrow, title, lead, tone = "light", align = "left", as: Tag = "h2", className }: { id?: string; eyebrow?: string; title: string; lead?: string; tone?: "light" | "dark"; align?: "left" | "center"; as?: "h1" | "h2"; className?: string }) {
  return (
    <div className={cn("mb-8 md:mb-10", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? <Eyebrow tone={tone} className="mb-3">{eyebrow}</Eyebrow> : null}
      <Tag id={id} className={cn(Tag === "h1" ? "text-h1-sm md:text-h1" : "text-h2-sm md:text-h2", tone === "dark" ? "text-cream" : "text-ink-950")}>{title}</Tag>
      {lead ? <p className={cn("mt-4 text-lead-sm md:text-lead prose-measure", align === "center" && "mx-auto", tone === "dark" ? "text-ink-200" : "text-ink-700")}>{lead}</p> : null}
    </div>
  );
}
