import type { ReactNode } from "react";
import { Breadcrumb } from "./Breadcrumb";
import { cn } from "@/lib/cn";

export function PageHero({ eyebrow, title, lead, crumbs, children, surface = "light" }: { eyebrow?: string; title: string; lead?: string; crumbs?: { label: string; href?: string }[]; children?: ReactNode; surface?: "light" | "cream" }) {
  return (
    <section className={cn("pb-10 pt-8 md:pb-14 md:pt-12", surface === "cream" ? "bg-cream" : "bg-white")}>
      <div className="container-content">
        {crumbs ? <Breadcrumb items={crumbs} /> : null}
        {eyebrow ? <p className="mb-3 text-eyebrow font-semibold uppercase text-gold-700">{eyebrow}</p> : null}
        <h1 className="text-h1-sm md:text-h1">{title}</h1>
        {lead ? <p className="mt-5 max-w-[60ch] text-lead-sm text-ink-700 md:text-lead">{lead}</p> : null}
        {children}
      </div>
    </section>
  );
}
