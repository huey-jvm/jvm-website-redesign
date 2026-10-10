import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { FactBlock } from "@/components/site/FactBlock";
import { CredentialMark } from "@/components/site/CredentialMark";
import { CTABand } from "@/components/site/CTABand";
import { Placeholder } from "@/components/ui/Placeholder";
import { credentials } from "@/content/credentials";
import { contact } from "@/content/contact";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Quality and Compliance", "ISO 9001:2015 quality management, our position against the Joint Commission Health Care Staffing Services standards, and how to raise a concern.", "/about/quality-compliance");

export default function QualityPage() {
  const iso = credentials.find((c) => c.slug === "iso-9001")!;
  return (
    <>
      <PageHero eyebrow="About" title="Quality and Compliance" lead="JVM Solutions is committed to a higher standard of service and to the delivery of safe, quality patient care. This page says exactly which standards we hold and which we work to, and how to raise a concern." crumbs={[{ label: "About", href: "/about" }, { label: "Quality and Compliance" }]} />

      <Section className="pt-0 md:pt-0 lg:pt-0">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="space-y-12 lg:col-span-8">
            <section>
              <div className="flex flex-wrap items-center gap-6">
                <CredentialMark credential={iso} />
                <h2 className="text-h2-sm md:text-h2">ISO 9001:2015</h2>
              </div>
              <p className="prose-measure mt-4 text-body text-ink-700">JVM operates a certified quality management system. Every core process, from business development through recruiting, credentialing, contract operations and finance, is documented, measured and improved through internal audit, corrective and preventive action, and customer feedback.</p>
              <div className="mt-4 max-w-xl"><Placeholder id="P15" /></div>
            </section>

            <section>
              <h2 className="text-h2-sm md:text-h2">Joint Commission Standards</h2>
              <p className="prose-measure mt-4 text-body text-ink-700">JVM works to the Joint Commission’s Standards for Health Care Staffing Services. The Joint Commission is an independent, non-profit organisation that accredits and certifies health care organisations across the country. Its standards address organisational quality of care and the safety of the environment in which care is provided. Working to those standards shapes how we screen, credential, place and support every healthcare professional.</p>
              <div className="mt-4 max-w-xl"><Placeholder id="P8"><p className="text-body-sm text-ink-900">Default wording. If JVM holds Health Care Staffing Services certification, this section changes to say so and carries the certificate and its expiry.</p></Placeholder></div>
            </section>

            <section>
              <h2 className="text-h2-sm md:text-h2">Raising a Concern</h2>
              <p className="prose-measure mt-4 text-body text-ink-700">As an employee, patient, customer or potential customer, you have the right to raise any concern about the quality of care, the safety of care, or the safety of the environment in which care is provided, without fear of retaliation. Please contact the JVM management team first. If we cannot resolve the issue, you may contact the Joint Commission directly.</p>
            </section>
          </div>

          <div className="space-y-6 lg:col-span-4">
            <FactBlock title="JVM Ethics and Compliance" facts={[
              { label: "Department", value: contact.compliance.label },
              { label: "Address", value: contact.compliance.lines.join(", ") },
              { label: "Phone", value: contact.compliance.phone, copy: true, href: contact.compliance.phoneHref },
            ]} />
            <FactBlock title="The Joint Commission" facts={[
              { label: "Office", value: "Office of Quality and Patient Safety" },
              { label: "Address", value: "One Renaissance Boulevard, Oakbrook Terrace, IL 60181" },
              { label: "Phone", value: "1-800-994-6610", href: "tel:+18009946610" },
              { label: "Fax", value: "630-792-5636" },
              { label: "Email", value: "complaint@jointcommission.org", copy: true, href: "mailto:complaint@jointcommission.org" },
            ]} />
          </div>
        </div>
      </Section>
      <CTABand title="Questions About Our Quality System?" route="other" />
    </>
  );
}
