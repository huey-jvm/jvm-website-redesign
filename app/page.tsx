import { Eyebrow } from "@/components/ui/Eyebrow";
import Image from "@/components/ui/Image";
import { formatList } from "@/lib/list";
import { ImageHero } from "@/components/site/ImageHero";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/site/Section";
import { ProofStrip } from "@/components/site/ProofStrip";
import { ContourArt } from "@/components/site/ContourArt";
import { OutcomeTile } from "@/components/site/OutcomeTile";
import { cn } from "@/lib/cn";
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
import { team, teamPhoto } from "@/content/team";
import { credentials } from "@/content/credentials";
import { CredentialMark } from "@/components/site/CredentialMark";

export const metadata: Metadata = {
  description: statements.positioning,
  alternates: { canonical: "/" },
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
        image={teamPhoto}
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <OpenWidgetButton tone="dark" size="lg" route="contracting" />
          <Button href="/contracting/capability-statement" variant="secondary" tone="dark" size="lg">Read the capability statement</Button>
        </div>
      </ImageHero>
      <ProofStrip />

      <Section surface="light" aria-labelledby="outcomes-title">
        <SectionHeader eyebrow="Five outcomes" title="What Changes for Your Mission" />

          <ul className="outcomes-row grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-6 xl:grid-cols-5 xl:gap-8">
            {outcomes.map((o, i) => (
              <li key={o.id} className={cn("h-full xl:col-span-1", i < 3 ? "lg:col-span-2" : "lg:col-span-3")}>
                <OutcomeTile outcome={o} href={`/why-jvm#${o.id}`} />
              </li>
            ))}
          </ul>

        <span id="outcomes-title" className="sr-only">Outcomes</span>
      </Section>

      <Section surface="cream">
        <SectionHeader eyebrow="Services" title="One Accountable Partner Across Four Areas" lead={`${services[0].name} leads. ${formatList(services.slice(1).map((s) => s.name))} sit alongside it under the same accountability.`} />

          <ul className="service-row grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5 xl:gap-8">
            {services.map((s) => (
              <li key={s.slug} className={cn("h-full", s.lead && "lg:col-span-2")}>
                <ServiceCard service={s} image={s.cardPhoto} slot={s.cardImage} />
              </li>
            ))}
          </ul>

      </Section>

      <Section surface="light" >
        <SectionHeader eyebrow="How we work" title="Four Differentiators That Do Not Commoditize" />

          <ol className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {differentiators.map((d) => (
              <li key={d.n} className="@container flex h-full flex-col rounded-container border border-ink-200 bg-white">
                <div className="flex flex-1 flex-col p-4 @[20rem]:p-6 @[35rem]:p-8">
                  <span className="font-sans text-h2 font-medium leading-none text-gold-700 tabular">{d.n}</span>
                  <h3 title={d.title} className="mt-6 truncate text-h4 @[20rem]:text-h3 @[35rem]:text-h2-sm text-ink-950">{d.title}</h3>
                  <p className="mt-3 line-clamp-2 text-body-sm @[20rem]:text-body text-ink-700">{d.body}</p>
                </div>
              </li>
            ))}
          </ol>

        <div className="mt-10 flex justify-end">
          <Button href="/why-jvm" variant="tertiary" icon={<ArrowRight className="size-4" />} iconTrailing>Read how we work</Button>
        </div>
      </Section>

      <Section surface="dark" backdrop="AS-04" backdropClassName="object-right opacity-60" art={<ContourArt />}>
        <div>
          <Eyebrow tone="dark">Contracting at a glance</Eyebrow>
          <h2 className="mt-3 text-h2-sm text-cream md:text-h2">Verify Us in a Minute</h2>
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
            <div className="flex flex-col rounded-container border border-ink-800 bg-ink-900 p-5 md:p-6 lg:col-span-5">
              <Eyebrow tone="dark">Prime vehicle</Eyebrow>
              <div className="mt-4"><CredentialMark credential={stars} /></div>
              <p className="mt-4 text-body text-ink-200">JVM is a {starsIII.role.toLowerCase()} on {starsIII.name}, {starsIII.summary}.</p>
              <Button href="/contracting" variant="secondary" tone="dark" className="mt-6 self-start lg:mt-auto">Go to contracting</Button>
            </div>
          ) : null}
        </div>
        {starsShown && !starsConfirmed ? <Placeholder id="P5" className="mt-4 max-w-xl" /> : null}
        {stars ? null : <Button href="/contracting" variant="secondary" tone="dark" className="mt-6">Go to contracting</Button>}
      </Section>

      <Section surface="light">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-12">
          <div className="relative aspect-square w-full overflow-hidden rounded-container bg-ink-100 md:col-span-4">
            <Image src={founder.image!} alt={`Portrait of ${founder.name}`} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover object-top" />
          </div>
          <div className="md:col-span-8">
            <Eyebrow tone="light">Leadership</Eyebrow>
            <h2 className="mt-3 text-h2-sm md:text-h2">Led From Inside the Mission</h2>
            <p className="mt-4 max-w-[65ch] text-body text-ink-700">{founder.name}, {founder.role}, {founder.summary} JVM is built on that understanding of how federal health missions actually run.</p>
            <Button href="/about" variant="tertiary" icon={<ArrowRight className="size-4" />} iconTrailing className="mt-5">Read about JVM</Button>
          </div>
        </div>
      </Section>

      <CTABand title="Ready to Talk About Your Mission?" />
    </>
  );
}
