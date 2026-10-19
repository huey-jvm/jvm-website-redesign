import { TitleFigures } from "@/components/ui/TitleFigures";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { ReactNode } from "react";
import { Breadcrumb } from "./Breadcrumb";
import { Slot, presentAsset } from "./Slot";

export function PageHero({ eyebrow, title, lead, crumbs, children, aside, backdrop }: { eyebrow?: string; title: string; lead?: string; crumbs?: { label: string; href?: string }[]; children?: ReactNode; aside?: ReactNode; surface?: "light" | "cream"; backdrop?: string }) {
  const photo = backdrop ? presentAsset(backdrop) : undefined;
  return (
    <section className="brief-hero bg-cream text-ink-900" data-hero="page">
      <div className="container-content">
        {crumbs ? <Breadcrumb items={crumbs} /> : null}
        <div className={aside || photo ? "grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center" : "brief-heading"}>
          <div>
            {eyebrow ? <Eyebrow className="mb-5">{eyebrow}</Eyebrow> : null}
            <h1 className="text-cinema-sm md:text-display"><TitleFigures>{title}</TitleFigures></h1>
            {lead ? <p className="mt-6 max-w-[62ch] text-lead-sm text-ink-700">{lead}</p> : null}
            {children}
          </div>
          {aside ? <div className="brief-aside">{aside}</div> : photo ? <Slot id={photo.id} priority className="aspect-[4/3] border-b-4 border-gold-500" sizes="(min-width: 1024px) 45vw, 100vw" /> : null}
        </div>
      </div>
    </section>
  );
}
