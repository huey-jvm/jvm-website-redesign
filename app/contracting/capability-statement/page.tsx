import { Download } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { FactBlock } from "@/components/site/FactBlock";
import { CTABand } from "@/components/site/CTABand";
import { Placeholder } from "@/components/ui/Placeholder";
import { Button } from "@/components/ui/Button";
import { identifiers } from "@/content/identifiers";
import { starsIII, starsShown } from "@/content/vehicles";
import { services } from "@/content/services";
import { statements } from "@/content/statements";
import { contact } from "@/content/contact";
import { pageMetadata } from "@/lib/seo";
import { Slot, presentAsset } from "@/components/site/Slot";

export const metadata = pageMetadata("Capability Statement", "A one page summary of JVM Solutions for your file: identifiers, core competencies, differentiators and contact.", "/contracting/capability-statement");

const pdfPath: string | undefined = undefined;

export default function CapabilityPage() {
  return (
    <>
      <PageHero eyebrow="Contracting" title="Capability Statement" lead="The one page summary a contracting officer keeps on file. The same facts are on this page, so nothing here depends on the download." crumbs={[{ label: "Contracting", href: "/contracting" }, { label: "Capability Statement" }]} aside={presentAsset("AS-12") ? <Slot id="AS-12" className="aspect-[3/2] w-full" sizes="(min-width: 1024px) 40vw, 100vw" /> : undefined}>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          {pdfPath ? (
            <Button href={pdfPath} variant="primary" icon={<Download className="size-4" />}>Download the PDF</Button>
          ) : (
            <Placeholder id="P14" className="max-w-xl">
              <Button variant="primary" disabled icon={<Download className="size-4" />}>Download the PDF</Button>
            </Placeholder>
          )}
        </div>
      </PageHero>
      <Section className="pt-0 md:pt-0 lg:pt-0">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-7">
            <div>
              <h2 className="text-h3">Company</h2>
              <p className="prose-measure mt-2 text-body text-ink-700">{statements.companyName} is an {statements.category.toLowerCase()} company based in San Antonio, Texas. {statements.positioning}</p>
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
                {["Mission Understanding", "Integrated Expertise", "Operational Excellence", "Trusted Partnership"].map((d) => <li key={d} className="flex items-start gap-2"><span aria-hidden className="mt-2.5 h-0.5 w-4 shrink-0 bg-gold-500" />{d}</li>)}
              </ul>
            </div>
            <div>
              <h2 className="text-h3">Past Performance</h2>
              <Placeholder id="P7" className="mt-3">
                <p className="text-body-sm text-ink-900">Available on request from {contact.emails.bd}.</p>
              </Placeholder>
            </div>
          </div>
          <div className="lg:col-span-5">
            <FactBlock title="Identifiers" facts={[
              { label: "UEI", value: identifiers.uei, copy: true },
              { label: "CAGE", value: identifiers.cage, copy: true },
              { label: "Primary NAICS", value: identifiers.naicsPrimary, copy: true },
              { label: "Other NAICS", value: identifiers.naicsSecondary.join(", ") },
              { label: "Set-asides", value: identifiers.setAsides.join(", ") },
              ...(starsShown ? [{ label: "STARS III", value: starsIII.contractNumber, copy: true }] : []),
              { label: "Quality", value: "ISO 9001:2015" },
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
