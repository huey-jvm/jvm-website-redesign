import { statements } from "@/content/statements";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHeader } from "@/components/site/Section";
import { FactBlock } from "@/components/site/FactBlock";
import { TeamCard } from "@/components/site/TeamCard";
import { CTABand } from "@/components/site/CTABand";
import { Placeholder } from "@/components/ui/Placeholder";
import { identifiers, naicsDescriptions } from "@/content/identifiers";
import { starsIII, starsShown, pastPerformance } from "@/content/vehicles";
import { contact } from "@/content/contact";
import { team } from "@/content/team";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Contracting",
  starsShown
    ? "UEI, CAGE, NAICS, set-aside status, GSA 8(a) STARS III and how to reach JVM Solutions business development."
    : "UEI, CAGE, NAICS, set-aside status and how to reach JVM Solutions business development.",
  "/contracting",
);

const cards = [
  { href: "/contracting/capability-statement", title: "Capability Statements" },
  {
    href: "/contracting/stars-iii",
    title: "GSA 8(a) STARS III",
    withheld: !starsShown,
  },
  {
    href: "/contracting/certifications",
    title: "Certifications and Set-Asides",
  },
  {
    href: "/contracting/past-performance",
    title: "Past Performance",
    withheld: pastPerformance.length === 0,
  },

];

export default function ContractingPage() {
  const bd = team[0];
  return (
    <>
      <PageHero
        eyebrow="Contracting"
        title="Everything a Contracting Officer Checks"
        lead={
          starsShown
            ? "Identifiers, set-aside standing, our prime vehicle and a named route to business development. Each value below can be copied."
            : "Identifiers, set-aside standing and a named route to business development. Each value below can be copied."
        }
        crumbs={[{ label: "Contracting" }]}
        surface="cream"
      />
      <Section surface="cream"><div className="grid items-start gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <FactBlock
          title="Identifiers"
          headingLevel="h2"
          facts={[
            { label: "Legal name", value: statements.companyName, copy: true },
            { label: "UEI", value: identifiers.uei, copy: true },
            { label: "CAGE", value: identifiers.cage, copy: true },
            {
              label: "Primary NAICS",
              value: identifiers.naicsPrimary,
              copy: true,
              note: naicsDescriptions[identifiers.naicsPrimary],
            },
            {
              label: "Other NAICS",
              value: identifiers.naicsSecondary.join(", "),
              copy: true,
            },
            {
              label: "Set-asides",
              value: identifiers.setAsides.join(", "),
              copy: true,
            },
            { label: "SAM", value: identifiers.samStatus, copy: true },
            ...(starsShown
              ? [
                  {
                    label: "STARS III",
                    value: starsIII.contractNumber,
                    copy: true,
                    note: "8(a) prime",
                  },
                ]
              : []),
          ]}
        />
        <aside className="border-t-2 border-gold-500 pt-6 lg:sticky lg:top-28">
          <p className="text-eyebrow font-semibold uppercase tracking-widest text-gold-700">Procurement resources</p>
          <h2 className="mt-4 text-h3">Build your acquisition file</h2>
          <p className="mt-3 text-body text-ink-700">Review our capabilities, verify our standing, and connect with business development.</p>
          <ul className="mt-6 divide-y divide-cream-border">
            {cards.filter((c) => !c.withheld).map((c) => <li key={c.href}><Link href={c.href} className="flex min-h-14 items-center justify-between gap-4 py-3 text-body-sm font-semibold hover:text-gold-700 focus-visible:text-gold-700">{c.title}<ArrowRight aria-hidden className="size-4 shrink-0" /></Link></li>)}
          </ul>
          <Button href={`mailto:${contact.emails.bd}`} variant="primary" className="mt-6">Contact business development</Button>
        </aside>
        </div>
      </Section>


      <Section surface="light" className="pt-0 md:pt-0 lg:pt-0">
        <SectionHeader
          eyebrow="Business development"
          title="Reach Us Directly"
        />
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-12">
          <div className="md:col-span-4 lg:col-span-3">
            <TeamCard
              name={bd.name}
              role={bd.role}
              note={bd.note}
              image={bd.image}
              email={bd.contactRoute}
            />
          </div>
          <div className="md:col-span-8 lg:col-span-9">
            <p className="prose-measure mt-4 text-body text-ink-700">
              Contracting and capture enquiries go to{" "}
              <a
                href={`mailto:${contact.emails.bd}`}
                className="link-underline font-semibold text-gold-700 after:bg-current"
              >
                {contact.emails.bd}
              </a>
              .
              {starsShown ? (
                <>
                  {" "}
                  STARS III specific questions go to{" "}
                  <a
                    href={`mailto:${starsIII.jvmEmail}`}
                    className="link-underline font-semibold text-gold-700 after:bg-current"
                  >
                    {starsIII.jvmEmail}
                  </a>
                  .
                </>
              ) : null}{" "}
              You can expect a reply within {contact.responseTime}.
            </p>
            <div className="mt-4">
              <Placeholder id="P10" nested />
            </div>
          </div>
        </div>
      </Section>

      <CTABand
        title="Start a Conversation With Business Development"
        route="contracting"
        secondaryHref="/services"
        secondaryLabel="Explore our services"
      />
    </>
  );
}
