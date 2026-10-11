import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { CredentialRow } from "@/components/site/CredentialRow";
import { CTABand } from "@/components/site/CTABand";
import { Placeholder } from "@/components/ui/Placeholder";
import { credentials, certificationSummary } from "@/content/credentials";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Certifications and Set-Asides", `View ${certificationSummary} and their supporting records.`, "/contracting/certifications");

export default function CertificationsPage() {
  return (
    <>
      <PageHero eyebrow="Contracting" title="Certifications and Set-Asides" lead="Each credential below names what it means, who issued it and where to verify it. A mark that links to nothing does not belong on this page." crumbs={[{ label: "Contracting", href: "/contracting" }, { label: "Certifications and Set-Asides" }]} />
      <Section className="pt-0 md:pt-0 lg:pt-0">
        <div className="mb-8 max-w-xl"><Placeholder id="P17" /></div>
        <ul className="@container rounded-container border border-ink-200 bg-white px-6">
          {credentials.map((c) => <CredentialRow key={c.slug} credential={c} />)}
        </ul>
      </Section>
      <CTABand route="contracting" />
    </>
  );
}
