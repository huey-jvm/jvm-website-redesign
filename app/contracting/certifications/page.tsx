import { PageHero } from "@/components/site/PageHero";
import { CredentialRow } from "@/components/site/CredentialRow";
import { CTABand } from "@/components/site/CTABand";
import { Placeholder } from "@/components/ui/Placeholder";
import { credentials, certificationSummary } from "@/content/credentials";
import { pageMetadata } from "@/lib/seo";
import Image from "@/components/ui/Image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata = pageMetadata("Certifications and Set-Asides", `View ${certificationSummary} and their supporting records.`, "/contracting/certifications");

export default function CertificationsPage() {
  const businessCredentials = credentials.filter(c => ["sba-8a", "edwosb", "sdvosb", "hubzone"].includes(c.slug));
  const vip = credentials.find(c => c.slug === "vip")!;
  return (
    <>
      <PageHero className="certifications-hero" eyebrow="Contracting" title="Certifications and Set-Asides" lead="Our small business certifications and procurement recognition, with supporting records for your acquisition file." crumbs={[{ label: "Contracting", href: "/contracting" }, { label: "Certifications and Set-Asides" }]}>
      <div className="mt-12 md:mt-16">
        <Placeholder id="P17" className="mb-8 max-w-xl" />
        <ul className="certification-grid grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {businessCredentials.map((c) => <CredentialRow key={c.slug} credential={c} />)}
        </ul>
        <div className="recognition-band mt-12 border-y border-gold-500/50 md:mt-16">
        <section aria-labelledby="vip-recognition-title" className="vip-recognition">
          <Image src="/assets/03-credentials/vip-graduate-hd.webp" alt="National Center Veteran Institute for Procurement Graduate" width={1522} height={1033} className="vip-recognition-mark" />
          <div>
            <p className="text-eyebrow font-semibold uppercase tracking-widest text-gold-700">Procurement recognition</p>
            <h2 id="vip-recognition-title" className="mt-3 text-h3">{vip.name}</h2>
            <p className="mt-4 max-w-2xl text-body text-ink-700">{vip.meaning}</p>
          </div>
        </section>
        <section className="recognition-quality" aria-labelledby="quality-certification-title">
          <p className="text-eyebrow font-semibold uppercase tracking-widest text-gold-700">Quality certification</p>
          <h2 id="quality-certification-title" className="mt-3 text-h3">ISO 9001:2015</h2>
          <Link href="/about/quality-compliance" className="mt-3 inline-flex min-h-11 items-center gap-3 text-body-sm font-semibold text-gold-700 underline underline-offset-4">Quality and Compliance<ArrowUpRight aria-hidden className="size-4 shrink-0" /></Link>
        </section>
        </div>
      </div>
        <CTABand embedded route="contracting" />
      </PageHero>
    </>
  );
}
