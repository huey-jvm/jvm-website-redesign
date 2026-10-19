import Image from "@/components/ui/Image";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { statements } from "@/content/statements";
import { identifiers } from "@/content/identifiers";
import { starsIII, starsShown } from "@/content/vehicles";
import { formatList } from "@/lib/list";
import type { HeroPhoto } from "./ImageHero";
import type { ReactNode } from "react";

export function CinematicHero({ image, children }: { image: HeroPhoto; children?: ReactNode }) {
  const facts = [
    { label: "The missions we serve", value: formatList([...statements.audience]) },
    { label: "Our standing", value: identifiers.setAsides.join(", ") },
    ...(starsShown ? [{ label: "Prime contract vehicle", value: starsIII.name }] : []),
  ];
  return (
    <section className="mission-hero surface-dark bg-ink-950 text-ink-200" data-hero="photo">
      <div className="container-content mission-hero-grid">
        <div className="hero-copy py-12 lg:py-20">
          <Eyebrow tone="dark" className="mb-8">{statements.category}</Eyebrow>
          <h1 className="mission-title text-cream">{statements.tagline}</h1>
          <p className="mt-7 max-w-[47ch] text-lead-sm text-ink-200">{statements.positioning}</p>
          {children}
        </div>
        <figure className="mission-photo">
          <div className="relative min-h-72 flex-1 overflow-hidden">
            <Image src={image.src} alt={image.alt} fill priority quality={90} sizes="(min-width: 1024px) 45vw, 100vw" className="hero-image object-cover object-[65%_center]" />
          </div>
          <figcaption className="flex items-center justify-between gap-4 bg-gold-500 px-5 py-4 text-caption font-semibold uppercase tracking-widest text-ink-950"><span>People at the heart of the mission</span><span aria-hidden>JVM / 01</span></figcaption>
        </figure>
      </div>
      <div className="container-content">
        <dl className="mission-facts grid gap-6 border-t border-ink-800 py-7 md:grid-cols-3">
          {facts.map((f) => <div key={f.label}><dt className="mb-2 text-eyebrow font-semibold uppercase text-gold-500">{f.label}</dt><dd className="max-w-[40ch] text-body-sm text-cream">{f.value}</dd></div>)}
        </dl>
      </div>
    </section>
  );
}
