import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { ContractingIdentifiers } from "@/components/site/ContractingIdentifiers";
import { CTABand } from "@/components/site/CTABand";
import { starsShown, pastPerformance } from "@/content/vehicles";
import { contact } from "@/content/contact";
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
  return (
    <>
      <PageHero
        className="contracting-hero"
        eyebrow="Contracting"
        title="Everything a Contracting Officer Checks"
        lead={
          starsShown
            ? "Identifiers, set-aside standing, our prime vehicle and a named route to business development. Key identifiers can be copied."
            : "Identifiers, set-aside standing and a named route to business development. Key identifiers can be copied."
        }
        crumbs={[{ label: "Contracting" }]}
        surface="cream"
      >
      <div className="contracting-content mt-12 md:mt-16">
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <ContractingIdentifiers />
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

      <CTABand embedded
        title="Start a Conversation With Business Development"
        route="contracting"
        secondaryHref="/services"
        secondaryLabel="Explore our services"
      />
      </div>
      </PageHero>


    </>
  );
}
