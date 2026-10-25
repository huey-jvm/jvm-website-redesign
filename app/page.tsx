import { Eyebrow } from "@/components/ui/Eyebrow";
import Image from "@/components/ui/Image";
import { formatList } from "@/lib/list";
import { CinematicHero } from "@/components/site/CinematicHero";
import type { Metadata } from "next";
import { ArrowRight, BadgeCheck } from "lucide-react";
import { Section, SectionHeader } from "@/components/site/Section";
import { ProofStrip } from "@/components/site/ProofStrip";

import { OutcomeRow } from "@/components/site/OutcomeTile";
import { cn } from "@/lib/cn";
import { ServiceCard } from "@/components/site/ServiceCard";
import { FactBlock } from "@/components/site/FactBlock";
import { CTABand } from "@/components/site/CTABand";
import { Button } from "@/components/ui/Button";
import { Placeholder } from "@/components/ui/Placeholder";
import { statements } from "@/content/statements";
import { outcomes } from "@/content/outcomes";
import { services } from "@/content/services";
import { differentiators } from "@/content/differentiators";
import { identifiers, naicsDescriptions } from "@/content/identifiers";
import { starsIII, starsShown, starsConfirmed, starsOrdering } from "@/content/vehicles";
import { team, leadershipTeamPhoto } from "@/content/team";
import { credentials } from "@/content/credentials";

export const metadata: Metadata = {
  description: statements.positioning,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const founder = team[0];
  const stars = credentials.find((c) => c.slug === "stars-iii");
  return (
    <>
      <CinematicHero image={leadershipTeamPhoto}>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button href="/contracting" tone="dark" size="md" variant="primary">Verify our credentials</Button>
          <Button href="/services" variant="secondary" tone="dark" size="md">Explore our services</Button>
        </div>
      </CinematicHero>
      <ProofStrip />

      <Section surface="cream" aria-labelledby="outcomes-title">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-36">
              <SectionHeader id="outcomes-title" eyebrow="Five outcomes" title="What Changes for Your Mission" lead="JVM sells measurable outcomes, not labor categories. These five anchor every engagement." className="mb-0 md:mb-0" />
            </div>
          </div>
          <ol className="outcomes-row border-t-2 border-gold-500 lg:col-span-8">
            {outcomes.map((o, i) => (
              <li key={o.id} className="border-b border-cream-border">
                <OutcomeRow outcome={o} index={i} href={`/why-jvm#${o.id}`} />
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section surface="dark">
        <SectionHeader tone="dark" eyebrow="Services" title="One Accountable Partner Across Four Areas" lead={`${services[0].name} leads. ${formatList(services.slice(1).map((s) => s.name))} sit alongside it under the same accountability.`} />
        <ul className="service-row grid grid-cols-1 gap-4 lg:grid-cols-12 lg:grid-rows-3 lg:gap-6">
          {services.map((s) => (
            <li key={s.slug} className={cn("h-full", s.lead ? "lg:col-span-7 lg:row-span-3" : "lg:col-span-5")}>
              <ServiceCard service={s} image={s.cardPhoto} slot={s.cardImage} layout={s.lead ? "feature" : "row"} />
            </li>
          ))}
        </ul>
      </Section>

      <Section surface="light">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeader eyebrow="How we work" title="Four Differentiators That Do Not Commoditize" className="mb-0 md:mb-0" />
          <Button href="/why-jvm" variant="tertiary" icon={<ArrowRight className="size-4" />} iconTrailing className="self-start md:self-auto">Read how we work</Button>
        </div>
        <ol className="differentiators mt-10 grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:mt-12 lg:grid-cols-4">
          {differentiators.map((d) => (
            <li key={d.n} className="flex flex-col border-l border-ink-200 pl-6">
              <span className="font-sans text-h1-sm font-medium leading-none text-gold-700 tabular">{String(d.n).padStart(2, "0")}</span>
              <h3 className="mt-6 text-h3 text-ink-950">{d.title}</h3>
              <p className="mt-3 text-body text-ink-700">{d.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section surface="dark">
        <div>
          <Eyebrow tone="dark">Contracting at a glance</Eyebrow>
          <h2 className="mt-3 text-h1-sm text-cream md:text-h1">Verify Us in a Minute</h2>
          <p className="mt-3 max-w-[60ch] text-body text-ink-200">Everything a contracting officer checks, in one place. Each identifier can be copied, and the full record is on the contracting pages.</p>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch lg:gap-8">
          <FactBlock
            tone="dark"
            className={cn("h-full", stars ? "lg:col-span-7" : "lg:col-span-12")}
            facts={[
              { label: "UEI", value: identifiers.uei, copy: true },
              { label: "CAGE", value: identifiers.cage, copy: true },
              { label: "Primary NAICS", value: identifiers.naicsPrimary, copy: true, note: naicsDescriptions[identifiers.naicsPrimary] },
              { label: "Set-asides", value: identifiers.setAsides.join(", ") },
              ...(starsShown
                ? [
                    { label: "STARS III", value: starsIII.contractNumber, copy: true, note: "8(a) prime" },
                    { label: "Ordering period", value: starsOrdering.current },
                  ]
                : []),
            ]}
          />
          {stars ? (
            <div className="prime-vehicle flex flex-col rounded-container p-6 md:p-8 lg:col-span-5">
              <div className="flex items-center justify-between gap-4">
                <Eyebrow tone="dark">Prime vehicle</Eyebrow>
                <BadgeCheck aria-hidden className="size-9 shrink-0 text-gold-500" strokeWidth={1.25} />
              </div>
              <div className="py-8 lg:py-10">
                <p className="mb-3 text-body-sm font-medium text-gold-200">JVM is a prime contractor</p>
                <h3 className="text-h1-sm font-medium tracking-tight text-cream md:text-h1">GSA 8(a)<br />STARS III</h3>
                <p className="mt-5 max-w-[36ch] text-body text-ink-200">A Best in Class governmentwide acquisition contract for IT services.</p>
              </div>
              <Button href={stars.evidenceHref ?? "/contracting"} variant="secondary" tone="dark" icon={<ArrowRight className="size-4" />} iconTrailing className="mt-auto self-start">Explore STARS III</Button>
            </div>
          ) : null}
        </div>
        {starsShown && !starsConfirmed ? <Placeholder id="P5" className="mt-4 max-w-xl" /> : null}
        {stars ? null : <Button href="/contracting" variant="secondary" tone="dark" className="mt-6">Go to contracting</Button>}
      </Section>

      <Section surface="cream" className="leadership-feature">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-20">
          <div>
            <Eyebrow tone="light">Leadership / Mission experience</Eyebrow>
            <h2 className="mt-4 max-w-[18ch] text-h1-sm md:text-h1">Led From Inside the Mission</h2>
            <p className="mt-6 max-w-[60ch] text-lead-sm text-ink-900">{founder.name}, {founder.role}, {founder.summary}</p>
            <p className="mt-4 max-w-[60ch] text-body text-ink-700">JVM is built on that understanding of how federal health missions actually run.</p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-y border-ink-200 py-5 text-body-sm font-semibold text-ink-900">
              <span>Air Force veteran</span>
              <span>18 years in the DoD environment</span>
            </div>
            <Button href="/about#leadership" variant="tertiary" icon={<ArrowRight className="size-4" />} iconTrailing className="mt-6">Meet our leadership</Button>
          </div>
          <figure className="mx-auto w-full max-w-[22rem] border-t-4 border-gold-500 bg-ink-950 p-5">
            <div className="relative aspect-square overflow-hidden bg-ink-100">
              <Image src={founder.image!} alt={`Portrait of ${founder.name}`} fill quality={90} sizes="(min-width: 400px) 312px, 85vw" className="object-cover" />
            </div>
            <figcaption className="pt-5">
              <p className="text-h3 text-cream">{founder.name}</p>
              <p className="mt-1 text-body-sm text-gold-500">{founder.role}</p>
            </figcaption>
          </figure>
        </div>
      </Section>

      <CTABand title="Ready to Talk About Your Mission?" />
    </>
  );
}
