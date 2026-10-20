import { CapabilityLibrary } from "@/components/site/CapabilityLibrary";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { FactBlock } from "@/components/site/FactBlock";
import { CTABand } from "@/components/site/CTABand";
import { Placeholder } from "@/components/ui/Placeholder";
import { Button } from "@/components/ui/Button";
import { credentials } from "@/content/credentials";
import { identifiers } from "@/content/identifiers";
import { differentiators } from "@/content/differentiators";
import { starsIII, starsShown } from "@/content/vehicles";
import { services } from "@/content/services";
import { statements } from "@/content/statements";
import { contact } from "@/content/contact";
import { pageMetadata } from "@/lib/seo";


export const metadata = pageMetadata("Capability Statement", "Download JVM capability statements for healthcare, IT, logistics, facilities and administrative services.", "/contracting/capability-statement");


export default function CapabilityPage() {
  return (
    <>
      <PageHero eyebrow="Contracting / Resource library" title="Capability Statements" lead="Five focused statements. Choose the capabilities your mission needs, then view or download the original JVM document." crumbs={[{ label: "Contracting", href: "/contracting" }, { label: "Capability Statements" }]} />
      <Section surface="cream" id="documents"><CapabilityLibrary /></Section>
      <Section>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-7">
            <div>
              <h2 className="text-h3">Company</h2>
              <p className="prose-measure mt-2 text-body text-ink-700">{statements.companyName} is an {statements.category.toLowerCase()} company based in {contact.office.locality}, {contact.office.regionName}. {statements.positioning}</p>
            </div>
            <div>
              <h2 className="text-h3">Core Competencies</h2>
              <ul className="mt-3 grid grid-cols-1 gap-x-8 gap-y-2 text-body text-ink-900 md:grid-cols-2">
                {services.map((s) => <li key={s.slug} className="flex items-start gap-2"><span aria-hidden className="mt-2.5 h-0.5 w-4 shrink-0 bg-gold-500" />{s.name}</li>)}
              </ul>
            </div>
            <div>
              <h2 className="text-h3">Differentiators</h2>
              <ul className="mt-3 grid grid-cols-1 gap-x-8 gap-y-2 text-body text-ink-900 md:grid-cols-2">
                {differentiators.map((d) => <li key={d.n} className="flex items-start gap-2"><span aria-hidden className="mt-2.5 h-0.5 w-4 shrink-0 bg-gold-500" />{d.title}</li>)}
              </ul>
            </div>
            <div>
              <h2 className="text-h3">Past Performance</h2>
              <p className="mt-2 text-body-sm text-ink-900">Available on request from business development.</p><Button href={`mailto:${contact.emails.bd}?subject=Past%20performance`} variant="secondary" size="sm" className="mt-3">Request past performance</Button><Placeholder id="P7" className="mt-3" />
            </div>
          </div>
          <div className="lg:col-span-5">
            <FactBlock title="Identifiers" headingLevel="h2" facts={[
              { label: "UEI", value: identifiers.uei, copy: true },
              { label: "CAGE", value: identifiers.cage, copy: true },
              { label: "Primary NAICS", value: identifiers.naicsPrimary, copy: true },
              { label: "Other NAICS", value: identifiers.naicsSecondary.join(", ") },
              { label: "Set-asides", value: identifiers.setAsides.join(", ") },
              ...(starsShown ? [{ label: "STARS III", value: starsIII.contractNumber, copy: true }] : []),
              { label: "Quality", value: credentials.find((c) => c.slug === "iso-9001")!.name },
              { label: "Contact", value: contact.emails.bd, copy: true, href: `mailto:${contact.emails.bd}` },
              { label: "Phone", value: contact.office.phone, copy: true, href: contact.office.phoneHref },
            ]} />
          </div>
        </div>
      </Section>
      <CTABand route="contracting" />
    </>
  );
}
