import { TitleFigures } from "@/components/ui/TitleFigures";
import { Eyebrow } from "@/components/ui/Eyebrow";
import type { ReactNode } from "react";
import { Breadcrumb } from "./Breadcrumb";
import { cn } from "@/lib/cn";

export function PageHero({ eyebrow, title, lead, crumbs, children, aside, surface = "light" }: { eyebrow?: string; title: string; lead?: string; crumbs?: { label: string; href?: string }[]; children?: ReactNode; aside?: ReactNode; surface?: "light" | "cream" }) {
  const text = (
    <>
      {crumbs ? <Breadcrumb items={crumbs} /> : null}
      {eyebrow ? <Eyebrow tone="light" className="mb-3">{eyebrow}</Eyebrow> : null}
      <h1 className="text-h1-sm md:text-h1"><TitleFigures>{title}</TitleFigures></h1>
      {lead ? <p className="mt-5 prose-measure text-lead-sm text-ink-700 md:text-lead">{lead}</p> : null}
      {children}
    </>
  );
  return (
    <section className={cn("pb-10 pt-8 md:pb-14 md:pt-12", surface === "cream" ? "bg-cream" : "bg-white")}>
      <div className="container-content">
        {aside ? (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
            <div className="lg:col-span-7">{text}</div>
            <div className="lg:col-span-5">{aside}</div>
          </div>
        ) : text}
      </div>
    </section>
  );
}
