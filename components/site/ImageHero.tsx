import { Eyebrow } from "@/components/ui/Eyebrow";
import Image from "@/components/ui/Image";
import type { ReactNode } from "react";
import { Breadcrumb } from "./Breadcrumb";
import { PageHero } from "./PageHero";
import { cn } from "@/lib/cn";

export type HeroPhoto = { src: string; alt: string; position?: string };
type Props = { eyebrow?: string; title: string; lead?: string; crumbs?: { label: string; href?: string }[]; children?: ReactNode; image?: HeroPhoto; size?: "page" | "display" };

export function ImageHero({ eyebrow, title, lead, crumbs, children, image }: Props) {
  if (!image) return <PageHero eyebrow={eyebrow} title={title} lead={lead} crumbs={crumbs}>{children}</PageHero>;
  return (
    <section className="image-hero bg-cream" data-hero="photo">
      <div className="container-content grid lg:grid-cols-2">
        <div className="hero-copy py-10 lg:py-16 lg:pr-14">
          {crumbs ? <Breadcrumb items={crumbs} /> : null}
          {eyebrow ? <Eyebrow className="mb-5">{eyebrow}</Eyebrow> : null}
          <h1 className="text-cinema-sm md:text-display">{title}</h1>
          {lead ? <p className="mt-6 text-lead-sm text-ink-700">{lead}</p> : null}
          {children}
        </div>
        <div className="relative min-h-80 border-b-4 border-gold-500 lg:my-10">
          <Image src={image.src} alt={image.alt} fill priority sizes="(min-width: 1024px) 90vw, 900px" className={cn("hero-image object-cover", image.position)} />
        </div>
      </div>
    </section>
  );
}
