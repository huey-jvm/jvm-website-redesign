import Image from "next/image";
import type { ReactNode } from "react";
import { Breadcrumb } from "./Breadcrumb";
import { PageHero } from "./PageHero";
import { Slot, presentAsset } from "./Slot";
import { cn } from "@/lib/cn";

export type HeroPhoto = { src: string; alt: string; position?: string };

type Props = {
  eyebrow?: string;
  title: string;
  lead?: string;
  crumbs?: { label: string; href?: string }[];
  children?: ReactNode;
  image?: HeroPhoto;
  slot?: string;
  size?: "page" | "display";
};

export function ImageHero({ eyebrow, title, lead, crumbs, children, image, slot, size = "page" }: Props) {
  const asset = slot ? presentAsset(slot) : undefined;
  if (!image && !asset) {
    return <PageHero eyebrow={eyebrow} title={title} lead={lead} crumbs={crumbs}>{children}</PageHero>;
  }
  return (
    <section className="surface-dark relative isolate overflow-clip bg-ink-950 text-ink-200" data-hero={asset?.id ?? "photo"}>
      <div className={cn("hero-image pointer-events-none absolute inset-x-0 top-0 lg:h-full", size === "display" ? "h-64" : "h-56")}>
        {image ? (
          <Image src={image.src} alt={image.alt} fill priority sizes="100vw" className={cn("object-cover", image.position)} />
        ) : (
          <Slot id={asset!.id} className="h-full w-full" sizes="100vw" priority imgClassName="object-[65%_center]" />
        )}
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-ink-950/40" />
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden bg-linear-to-r from-ink-950 from-42% via-ink-950/90 via-58% to-ink-950/10 lg:block" />
      <div className={cn("container-content relative flex flex-col justify-end lg:grid lg:grid-cols-12 lg:items-center lg:py-20", size === "display" ? "pt-64 lg:min-h-[42rem]" : "pt-56 lg:min-h-[34rem]")}>
        <div className="relative -mx-4 bg-ink-950 px-4 pb-12 pt-2 before:absolute before:inset-x-0 before:bottom-full before:h-16 before:bg-linear-to-t before:from-ink-950 before:to-ink-950/0 lg:col-span-6 lg:mx-0 lg:bg-transparent lg:px-0 lg:pb-0 lg:pt-0 lg:before:hidden">
          {crumbs ? <Breadcrumb items={crumbs} tone="dark" /> : null}
          {eyebrow ? <p className="mb-3 text-eyebrow font-semibold uppercase text-gold-500">{eyebrow}</p> : null}
          <h1 className={cn("text-cream", size === "display" ? "text-display-sm md:text-display" : "text-h1-sm md:text-h1")}>{title}</h1>
          {lead ? <p className={cn("mt-5 max-w-[60ch] text-ink-200", size === "display" ? "text-lead-sm md:text-lead" : "text-lead-sm md:text-lead")}>{lead}</p> : null}
          {children}
        </div>
      </div>
    </section>
  );
}
