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
    <section className="mission-hero mission-hero-editorial surface-dark bg-ink-950 text-ink-200" data-hero="photo">
      <div className="mission-stage">
        <div className="mission-backdrop">
          <Image src={image.src} alt={image.alt} fill priority quality={90} sizes="100vw" className="hero-image object-cover" />
        </div>
        <div className="mission-shade" aria-hidden="true" />
        <div className="container-content mission-hero-grid">
          <div className="hero-copy">
            <Eyebrow tone="dark" className="mission-brand">{statements.shortName}</Eyebrow>
            <h1 className="mission-title text-cream">People first.<br /><span className="mission-emphasis">Mission always.</span></h1>
            <p className="mt-6 max-w-[43ch] text-lead-sm text-ink-200">Healthcare teams, technology and operational expertise. Together for the people behind every mission.</p>
            {children}
            <a href="#outcomes-title" className="mission-scroll">What makes us different</a>
          </div>
        </div>
      </div>
      <div className="container-content">
        <dl className="mission-facts grid gap-6 border-t border-ink-800 py-7 md:grid-cols-3">
          {facts.map((f) => <div key={f.label}><dt className="mb-2 text-eyebrow font-semibold uppercase text-gold-500">{f.label}</dt><dd className="max-w-[40ch] text-body-sm text-cream">{f.value}</dd></div>)}
        </dl>
      </div>
    </section>
  );
}
