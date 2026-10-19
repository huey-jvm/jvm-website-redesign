import { Eyebrow } from "@/components/ui/Eyebrow";
import Image from "@/components/ui/Image";
import type { ReactNode } from "react";
import { Breadcrumb } from "./Breadcrumb";
import { PageHero } from "./PageHero";
import { cn } from "@/lib/cn";

export type HeroPhoto = { src: string; alt: string; position?: string };

type Props = {
  eyebrow?: string;
  title: string;
  lead?: string;
  crumbs?: { label: string; href?: string }[];
  children?: ReactNode;
  image?: HeroPhoto;
  size?: "page" | "display";
};

export function ImageHero({ eyebrow, title, lead, crumbs, children, image, size = "page" }: Props) {
  if (!image) {
    return <PageHero eyebrow={eyebrow} title={title} lead={lead} crumbs={crumbs}>{children}</PageHero>;
  }
  return (
    <section className="surface-dark relative isolate bg-ink-950 text-ink-200" data-hero="photo">
      <div className="hero-image relative aspect-[3/2] w-full lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-5/12">
        <Image src={image.src} alt={image.alt} fill priority sizes="(min-width: 1024px) 42vw, 100vw" className={cn("object-cover", image.position)} />
      </div>
      <div className="container-content relative">
        <div className={cn("lg:grid lg:grid-cols-12 lg:items-center", size === "display" ? "lg:py-16" : "lg:py-24")}>
          <div className="hero-copy bg-ink-950 py-12 lg:col-span-7 lg:py-0 lg:pr-12">
            {crumbs ? <Breadcrumb items={crumbs} tone="dark" /> : null}
            {eyebrow ? <Eyebrow tone="dark" className="mb-4">{eyebrow}</Eyebrow> : null}
            <h1 className={cn("text-cream", size === "display" ? "text-display-sm md:text-display" : "text-h1-sm md:text-h1")}>{title}</h1>
            {lead ? <p className="prose-measure mt-6 text-lead-sm text-ink-200 md:text-lead">{lead}</p> : null}
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
