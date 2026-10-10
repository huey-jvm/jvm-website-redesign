import Image from "next/image";
import Link from "next/link";
import { ImageHero } from "@/components/site/ImageHero";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { Section, SectionHeader } from "@/components/site/Section";
import { ProofStrip } from "@/components/site/ProofStrip";
import { OutcomeTile } from "@/components/site/OutcomeTile";
import { ServiceCard } from "@/components/site/ServiceCard";
import { FactBlock } from "@/components/site/FactBlock";
import { CTABand } from "@/components/site/CTABand";
import { OpenWidgetButton } from "@/components/site/OpenWidgetButton";
import { Button } from "@/components/ui/Button";
import { Placeholder } from "@/components/ui/Placeholder";
import { statements } from "@/content/statements";
import { outcomes } from "@/content/outcomes";
import { services } from "@/content/services";
import { differentiators } from "@/content/differentiators";
import { identifiers, naicsDescriptions } from "@/content/identifiers";
import { starsIII, starsShown, starsConfirmed, starsOrdering } from "@/content/vehicles";
import { team } from "@/content/team";
import { credentials } from "@/content/credentials";
import { CredentialMark } from "@/components/site/CredentialMark";

export const metadata: Metadata = {
  description: statements.positioning,
  alternates: { canonical: "/" },
};

const serviceImages: Record<string, string | undefined> = {
  "healthcare-operations": "/images/team/team-walking.jpg",
};

export default function HomePage() {
  const founder = team[0];
  const stars = credentials.find((c) => c.slug === "stars-iii");
  return (
    <>
      <ImageHero
        size="display"
        eyebrow={statements.category}
        title={statements.tagline}
        lead={statements.positioning}
        image={{ src: "/images/team/team-walking.jpg", alt: "The JVM Solutions team walking together outside their office", position: "object-[70%_center]" }}
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <OpenWidgetButton tone="dark" size="lg" route="contracting" />
          <Button href="/contracting/capability-statement" variant="secondary" tone="dark" size="lg">Capability statement</Button>
        </div>
      </ImageHero>

      <ProofStrip />

      <Section surface="light" aria-labelledby="outcomes-title">
        <SectionHeader eyebrow="Five outcomes we sell" title="What Changes for Your Mission" lead="We do not sell labor categories. These five outcomes anchor every engagement." />
        <Reveal>
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {outcomes.map((o) => (
              <li key={o.id} className="h-full"><OutcomeTile outcome={o} href={`/why-jvm#${o.id}`} /></li>
            ))}
          </ul>
        </Reveal>
        <span id="outcomes-title" className="sr-only">Outcomes</span>
      </Section>

      <Section surface="cream">
        <SectionHeader eyebrow="Services" title="One Accountable Partner Across Four Areas" lead="Healthcare staffing and operations leads. Health IT and technology services, logistics and facilities management, and management and administrative support sit alongside it under the same accountability." />
        <Reveal>
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {services.map((s) => (
              <li key={s.slug} className={s.lead ? "h-full md:col-span-3" : "h-full"}>
                <ServiceCard service={s} image={serviceImages[s.slug]} slot={s.cardImage} horizontal={s.lead} />
              </li>
            ))}
          </ul>
        </Reveal>
      </Section>

      <Section surface="light">
        <SectionHeader eyebrow="How we work" title="Four Differentiators That Do Not Commoditize" />
        <Reveal>
          <ol className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {differentiators.map((d) => (
              <li key={d.n} className="@container rounded-container border border-ink-200 bg-white p-4 @[20rem]:p-6">
                <span className="font-display text-h2 leading-none text-gold-500 tabular">{d.n}</span>
                <h3 className="mt-3 text-h4 text-ink-950">{d.title}</h3>
                <p className="mt-2 text-body-sm text-ink-700">{d.teaser}</p>
              </li>
            ))}
          </ol>
        </Reveal>
        <div className="mt-8">
          <Button href="/why-jvm" variant="tertiary" icon={<ArrowRight className="size-4" />} iconTrailing>Read how we work</Button>
        </div>
      </Section>

      <Section surface="dark" backdrop="AS-04" backdropClassName="object-right opacity-60">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-eyebrow font-semibold uppercase text-gold-500">Contracting at a glance</p>
            <h2 className="mt-3 text-h2-sm text-cream md:text-h2">Verify Us in a Minute</h2>
            <p className="mt-3 max-w-[60ch] text-body text-ink-200">Everything a contracting officer checks, in one place. Each identifier can be copied, and the full record is on the contracting pages.</p>
            <FactBlock
              tone="dark"
              className="mt-6"
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
            {starsShown && !starsConfirmed ? <Placeholder id="P5" className="mt-4" /> : null}
            {stars ? null : <Button href="/contracting" variant="secondary" tone="dark" className="mt-6">Go to contracting</Button>}
          </div>
          {stars ? (
            <div className="flex flex-col items-start gap-6 lg:col-span-5 lg:pt-12">
              <CredentialMark credential={stars} />
              <p className="text-body text-ink-200">JVM is a prime on GSA 8(a) STARS III, a Best in Class governmentwide acquisition contract for IT services.</p>
              <Button href="/contracting" variant="secondary" tone="dark">Go to contracting</Button>
            </div>
          ) : null}
        </div>
      </Section>

      <Section surface="light">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-12">
          <div className="relative aspect-square w-full max-w-[14rem] overflow-hidden rounded-container bg-ink-100 md:col-span-3">
            <Image src={founder.image!} alt={`Portrait of ${founder.name}`} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover object-top" />
          </div>
          <div className="md:col-span-9">
            <p className="text-eyebrow font-semibold uppercase text-gold-700">Leadership</p>
            <h2 className="mt-3 text-h2-sm md:text-h2">Led From Inside the Mission</h2>
            <p className="mt-4 max-w-[65ch] text-body text-ink-700">{founder.name}, {founder.role}, is a United States Air Force veteran with 18 years inside the Department of Defense environment as a contracting officer, logistician, project manager and acquisition liaison. JVM is built on that understanding of how federal health missions actually run.</p>
            <Link href="/about" className="link-underline mt-5 inline-flex items-center gap-1 text-body font-semibold text-ink-900 after:bg-gold-700">About JVM <ArrowRight aria-hidden className="size-4" /></Link>
          </div>
        </div>
      </Section>

      <CTABand title="Ready to Talk About Your Mission?" body="Tell us who you are and we will route your message to the right person." secondaryHref="/contracting/capability-statement" secondaryLabel="Capability statement" />
    </>
  );
}
