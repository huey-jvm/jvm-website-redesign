import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { FactBlock } from "@/components/site/FactBlock";
import { TeamCard } from "@/components/site/TeamCard";
import { CTABand } from "@/components/site/CTABand";
import { Placeholder } from "@/components/ui/Placeholder";
import { identifiers, naicsDescriptions } from "@/content/identifiers";
import { starsIII, starsShown, pastPerformance } from "@/content/vehicles";
import { contact } from "@/content/contact";
import { team } from "@/content/team";
import { pageMetadata } from "@/lib/seo";
import { Slot } from "@/components/site/Slot";

export const metadata = pageMetadata("Contracting", starsShown ? "UEI, CAGE, NAICS, set-aside status, GSA 8(a) STARS III and how to reach JVM Solutions business development." : "UEI, CAGE, NAICS, set-aside status and how to reach JVM Solutions business development.", "/contracting");

const cards = [
  { href: "/contracting/stars-iii", title: "GSA 8(a) STARS III", body: "Our prime contract vehicle. Contract number, ordering period, scope and how to order.", withheld: !starsShown },
  { href: "/contracting/certifications", title: "Certifications and Set-Asides", body: "SBA 8(a), EDWOSB, SDVOSB, HUBZone and ISO 9001:2015, each with its evidence." },
  { href: "/contracting/past-performance", title: "Past Performance", body: "Contracts, task orders and periods of performance.", withheld: pastPerformance.length === 0 },
  { href: "/contracting/capability-statement", title: "Capability Statement", body: "A one page summary for your file." },
];

export default function ContractingPage() {
  const bd = team[0];
  return (
    <>
      <PageHero eyebrow="Contracting" title="Everything a Contracting Officer Checks" lead={starsShown ? "Identifiers, set-aside standing, our prime vehicle and a named route to business development. Each value below can be copied." : "Identifiers, set-aside standing and a named route to business development. Each value below can be copied."} crumbs={[{ label: "Contracting" }]} surface="cream" />
      <Section surface="cream" className="pt-0 md:pt-0 lg:pt-0">
        <FactBlock
          title="Identifiers"
          headingLevel="h2"
          facts={[
            { label: "Legal name", value: "Johnson Venture Management Solutions, Inc.", copy: true },
            { label: "UEI", value: identifiers.uei, copy: true },
            { label: "CAGE", value: identifiers.cage, copy: true },
            { label: "Primary NAICS", value: identifiers.naicsPrimary, copy: true, note: naicsDescriptions[identifiers.naicsPrimary] },
            { label: "Other NAICS", value: identifiers.naicsSecondary.join(", "), copy: true },
            { label: "Set-asides", value: identifiers.setAsides.join(", ") },
            { label: "SAM", value: identifiers.samStatus },
            ...(starsShown ? [{ label: "STARS III", value: starsIII.contractNumber, copy: true, note: "8(a) prime" }] : []),
          ]}
        />
      </Section>

      <Section>
        <Slot id="AS-11" className="mb-10 aspect-[21/9] w-full" sizes="(min-width: 1200px) 1200px, 100vw" />
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {cards.filter((c) => !c.withheld).map((c) => (
            <li key={c.href} className="h-full">
              <Link href={c.href} className="group/card flex h-full flex-col rounded-container border border-ink-200 bg-white p-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-700">
                <h2 className="truncate text-h3 group-hover/card:text-gold-700" title={c.title}>{c.title}</h2>
                <p className="mt-2 text-body text-ink-700">{c.body}</p>
                <span className="mt-auto inline-flex items-center gap-1 pt-4 text-body-sm font-semibold text-ink-900">Open <ArrowRight aria-hidden className="size-4 transition-transform duration-150 ease group-hover/card:translate-x-1 motion-reduce:group-hover/card:translate-x-0" /></span>
              </Link>
            </li>
          ))}
        </ul>
        {pastPerformance.length === 0 ? (
          <p className="mt-6 text-body text-ink-700">Past performance details are available on request from <a href={`mailto:${contact.emails.bd}`} className="link-underline font-semibold text-gold-700 after:bg-current">{contact.emails.bd}</a>.</p>
        ) : null}
        <Placeholder id="P6" className="mt-6 max-w-xl" />
      </Section>

      <Section surface="light" className="pt-0 md:pt-0 lg:pt-0">
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-12">
          <div className="md:col-span-4 lg:col-span-3"><TeamCard name={bd.name} role={bd.role} note={bd.note} image={bd.image} email={contact.emails.bd} /></div>
          <div className="md:col-span-8 lg:col-span-9">
            <p className="text-eyebrow font-semibold uppercase text-gold-700">Business development</p>
            <h2 className="mt-3 text-h2-sm md:text-h2">Reach Us Directly</h2>
            <p className="prose-measure mt-4 text-body text-ink-700">Contracting and capture enquiries go to <a href={`mailto:${contact.emails.bd}`} className="link-underline font-semibold text-gold-700 after:bg-current">{contact.emails.bd}</a>.{starsShown ? <> STARS III specific questions go to <a href={`mailto:${starsIII.jvmEmail}`} className="link-underline font-semibold text-gold-700 after:bg-current">{starsIII.jvmEmail}</a>.</> : null} You can expect a reply within {contact.responseTime}.</p>
            <div className="mt-4"><Placeholder id="P10" /></div>
          </div>
        </div>
      </Section>

      <CTABand title="Start a Conversation With Business Development" route="contracting" secondaryHref="/contracting/capability-statement" secondaryLabel="Capability statement" />
    </>
  );
}
