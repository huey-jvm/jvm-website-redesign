import { TitleFigures } from "@/components/ui/TitleFigures";
import { quality } from "@/content/quality";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { FactBlock } from "@/components/site/FactBlock";
import { CredentialMark } from "@/components/site/CredentialMark";
import { CTABand } from "@/components/site/CTABand";
import { Placeholder } from "@/components/ui/Placeholder";
import { Banner } from "@/components/site/Slot";
import { credentials } from "@/content/credentials";
import { contact } from "@/content/contact";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Quality and Compliance", "ISO 9001:2015 quality management, our position against the Joint Commission Health Care Staffing Services standards, and how to raise a concern.", "/about/quality-compliance");

export default function QualityPage() {
  const iso = credentials.find((c) => c.slug === "iso-9001")!;
  return (
    <>
      <PageHero eyebrow="About" title="Quality and Compliance" lead="JVM Solutions is committed to a higher standard of service and to the delivery of safe, quality patient care. This page says exactly which standards we hold and which we work to, and how to raise a concern." crumbs={[{ label: "About", href: "/about" }, { label: "Quality and Compliance" }]} />
      <Banner id="AS-14" className="pb-12 lg:pb-16" />

      <Section>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="space-y-12 lg:col-span-8">
            <section className="chapter-section">
              <div className="flex flex-wrap items-center gap-6">
                <CredentialMark credential={iso} />
                <h2 className="text-h2-sm md:text-h2"><TitleFigures>{iso.name}</TitleFigures></h2>
              </div>
              <p className="prose-measure mt-4 text-body text-ink-700">{quality.isoBody}</p>
              <div className="mt-4 max-w-xl"><Placeholder id="P15" /></div>
            </section>

            <section className="chapter-section">
              <h2 className="text-h2-sm md:text-h2">Joint Commission Standards</h2>
              <p className="prose-measure mt-4 text-body text-ink-700">{quality.jointCommission.paragraph}</p>
              <div className="mt-4 max-w-xl"><Placeholder id="P8" /></div>
            </section>

            <section className="chapter-section">
              <h2 className="text-h2-sm md:text-h2">Raising a Concern</h2>
              <p className="prose-measure mt-4 text-body text-ink-700">{quality.concern}</p>
            </section>
          </div>

          <div className="space-y-6 lg:col-span-4">
            <FactBlock title="JVM Ethics and Compliance" facts={[
              { label: "Department", value: contact.compliance.label },
              { label: contact.compliance.purpose, value: contact.compliance.lines.join(", ") },
              { label: "Phone", value: contact.compliance.phone, copy: true, href: contact.compliance.phoneHref },
            ]} />
            <Placeholder id="P4" />
            <FactBlock title={quality.jointCommission.complaintRoute.label} facts={[
              { label: "Office", value: quality.jointCommission.complaintRoute.office },
              { label: "Address", value: quality.jointCommission.complaintRoute.lines.join(", ") },
              { label: "Phone", value: quality.jointCommission.complaintRoute.phone, href: quality.jointCommission.complaintRoute.phoneHref },
              { label: "Fax", value: quality.jointCommission.complaintRoute.fax },
              { label: "Email", value: quality.jointCommission.complaintRoute.email, copy: true, href: `mailto:${quality.jointCommission.complaintRoute.email}` },
            ]} />
          </div>
        </div>
      </Section>
      <CTABand title="Questions About Our Quality System?" route="other" />
    </>
  );
}
