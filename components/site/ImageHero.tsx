import Image from "@/components/ui/Image";
import type { ReactNode } from "react";
import { Breadcrumb } from "./Breadcrumb";
import { PageHero } from "./PageHero";
import { cn } from "@/lib/cn";

export type HeroPhoto = { src: string; alt: string; position?: string; mobileSrc?: string };
type Props = { eyebrow?: string; title: string; lead?: string; crumbs?: { label: string; href?: string }[]; children?: ReactNode; image?: HeroPhoto; size?: "page" | "display"; panorama?: boolean; fullBleed?: boolean };

export function ImageHero({ eyebrow, title, lead, crumbs, children, image, panorama = false, fullBleed = false }: Props) {
  if (!image) return <PageHero eyebrow={eyebrow} title={title} lead={lead} crumbs={crumbs}>{children}</PageHero>;
  if (fullBleed) return (
    <section className="image-hero inner-image-hero full-photo-hero surface-dark" data-hero="photo">
      <div className="absolute inset-0">
        <Image src={image.src} mobileSrc={image.mobileSrc} alt={image.alt} fill priority quality={90} sizes="100vw" className={cn("hero-image object-cover", image.position)} />
      </div>
      <div className="full-photo-shade absolute inset-0" aria-hidden="true" />
      <div className="container-content relative z-10">
        <div className="hero-copy">
          {crumbs ? <Breadcrumb items={crumbs} tone="dark" /> : null}
          <h1 className="text-cinema-sm text-cream md:text-display">{title}</h1>
          {lead ? <p className="mt-6 text-lead-sm text-cream">{lead}</p> : null}
          {children}
        </div>
      </div>
    </section>
  );
  return (
    <section className={cn("image-hero inner-image-hero bg-cream", panorama && "panorama-hero")} data-hero="photo">
      <div className="container-content inner-hero-grid grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
        <div className="hero-copy py-10 lg:py-16">
          {crumbs ? <Breadcrumb items={crumbs} /> : null}
          <h1 className="text-cinema-sm md:text-display">{title}</h1>
          {lead ? <p className="mt-6 text-lead-sm text-ink-700">{lead}</p> : null}
          {children}
        </div>
        <div className="inner-hero-photo photo-feature relative aspect-[4/3]">
          <Image src={image.src} alt={image.alt} fill priority quality={90} sizes="(min-width:1440px) 656px,(min-width:1024px) 50vw,100vw" className={cn("hero-image object-cover", image.position)} />
        </div>
      </div>
    </section>
  );
}
