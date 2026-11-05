import { TitleFigures } from "@/components/ui/TitleFigures";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { ReactNode } from "react";
import { Breadcrumb } from "./Breadcrumb";
import { Slot, presentAsset } from "./Slot";
import { cn } from "@/lib/cn";

export function PageHero({ eyebrow, title, lead, crumbs, children, aside, backdrop, className }: { eyebrow?: string; title: string; lead?: string; crumbs?: { label: string; href?: string }[]; children?: ReactNode; aside?: ReactNode; surface?: "light" | "cream"; backdrop?: string; className?: string }) {
  const photo = backdrop ? presentAsset(backdrop) : undefined;
  return (
    <section className={cn("brief-hero bg-cream text-ink-900", className)} data-hero="page">
      <div className="container-content">
        {crumbs ? <Breadcrumb items={crumbs} /> : null}
        <div className={aside || photo ? "grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center" : "brief-heading"}>
          <div>
            {eyebrow ? <Eyebrow className="mb-5">{eyebrow}</Eyebrow> : null}
            <h1 className="text-cinema-sm md:text-display"><TitleFigures>{title}</TitleFigures></h1>
            {lead ? <p className="mt-6 max-w-[62ch] text-lead-sm text-ink-700">{lead}</p> : null}
            {children}
          </div>
          {aside ? <div className="brief-aside">{aside}</div> : photo ? <div className="min-w-0"><Slot id={photo.id} priority className="photo-feature aspect-[4/3]" sizes="(min-width: 1024px) 45vw, 100vw" /></div> : null}
        </div>
      </div>
    </section>
  );
}
