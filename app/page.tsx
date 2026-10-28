import { Eyebrow } from "@/components/ui/Eyebrow";
import Link from "next/link";
import Image from "@/components/ui/Image";
import { formatList } from "@/lib/list";
import { CinematicHero } from "@/components/site/CinematicHero";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeader } from "@/components/site/Section";
import { AudienceLinks } from "@/components/site/AudienceLinks";

import { OutcomeRow } from "@/components/site/OutcomeTile";
import { cn } from "@/lib/cn";
import { ServiceCard } from "@/components/site/ServiceCard";
import { CTABand } from "@/components/site/CTABand";
import { Button } from "@/components/ui/Button";
import { statements } from "@/content/statements";
import { outcomes } from "@/content/outcomes";
import { services } from "@/content/services";
import { differentiators } from "@/content/differentiators";
import { team, leadershipTeamPhoto } from "@/content/team";

export const metadata: Metadata = {
  description: statements.positioning,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const founder = team[0];
  return (
    <>
      <CinematicHero image={leadershipTeamPhoto}>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button href="/services" tone="dark" size="md" variant="primary">Explore Our Services</Button>
          <Button href="/about" variant="secondary" tone="dark" size="md">Meet JVM</Button>
        </div>
      </CinematicHero>

      <Section surface="cream" aria-labelledby="outcomes-title">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-36">
              <SectionHeader id="outcomes-title" eyebrow="Five outcomes" title="Helping Your Mission Move Forward" lead="From access to care to operational readiness, explore the outcomes that guide our work." className="mb-0 md:mb-0" />
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
          <SectionHeader eyebrow="How we work" title="How We Support Your Mission" className="mb-0 md:mb-0" />
          <Button href="/why-jvm" variant="tertiary" icon={<ArrowRight className="size-4" />} iconTrailing className="self-start md:self-auto">Read how we work</Button>
        </div>
        <ol className="differentiators mt-10 grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:mt-12 lg:grid-cols-4">
          {differentiators.map((d) => (
            <li key={d.n} className="flex flex-col border-l border-ink-200 pl-6">
              <span className="font-sans text-h1-sm font-medium leading-none text-gold-700 tabular">{String(d.n).padStart(2, "0")}</span>
              <h3 className="mt-6 text-h3 text-ink-950">{d.title}</h3>
              <p className="mt-3 text-body text-ink-700">{d.body}</p>
              {d.n === 3 && <Link href="/about/quality-compliance" className="mt-4 inline-flex min-h-11 items-center text-body-sm font-semibold underline decoration-gold-500 underline-offset-4">Quality and Compliance</Link>}
            </li>
          ))}
        </ol>
      </Section>


      <Section surface="cream"><AudienceLinks /></Section>
      <Section surface="cream" className="leadership-feature">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-20">
          <div>
            <Eyebrow tone="light">Leadership / Mission experience</Eyebrow>
            <h2 className="mt-4 max-w-[18ch] text-h1-sm md:text-h1">Led From Inside the Mission</h2>
            <p className="mt-6 max-w-[60ch] text-lead-sm text-ink-900">{founder.name}, {founder.role}, {founder.summary}</p>
            <p className="mt-4 max-w-[60ch] text-body text-ink-700">JVM is built on that understanding of how federal health missions actually run.</p>
            <ul aria-label="Leadership experience" className="mt-8 flex flex-wrap gap-3 text-body-sm font-medium text-ink-900">
              <li className="rounded-pill border border-gold-500/45 bg-gold-200/40 px-4 py-2">U.S. Air Force veteran</li>
              <li className="rounded-pill border border-ink-300/60 bg-white/60 px-4 py-2">18 years of DoD experience</li>
            </ul>
            <Button href="/about#leadership" variant="tertiary" icon={<ArrowRight className="size-4" />} iconTrailing className="ml-3 mt-6">Meet our leadership</Button>
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
        <CTABand embedded title="Ready to Talk About Your Mission?" />
      </Section>
    </>
  );
}
