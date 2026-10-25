import { PageHero } from "@/components/site/PageHero";
import { CredentialRow } from "@/components/site/CredentialRow";
import { CTABand } from "@/components/site/CTABand";
import { Placeholder } from "@/components/ui/Placeholder";
import { credentials, certificationSummary } from "@/content/credentials";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Certifications and Set-Asides", `View ${certificationSummary} and their supporting records.`, "/contracting/certifications");

export default function CertificationsPage() {
  return (
    <>
      <PageHero className="certifications-hero" eyebrow="Contracting" title="Certifications and Set-Asides" lead="Our small business certifications and contract vehicle, with supporting records for your acquisition file." crumbs={[{ label: "Contracting", href: "/contracting" }, { label: "Certifications and Set-Asides" }]}>
      <div className="mt-12 md:mt-16">
        <Placeholder id="P17" className="mb-8 max-w-xl" />
        <ul className="certification-grid grid grid-cols-1 gap-5 md:grid-cols-2">
          {credentials.map((c) => <CredentialRow key={c.slug} credential={c} />)}
        </ul>
      </div>
        <CTABand embedded route="contracting" />
      </PageHero>
    </>
  );
}
