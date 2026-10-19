import { formatList } from "@/lib/list";
import Link from "next/link";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { ServiceDirectory } from "@/components/site/ServiceDirectory";
import { CTABand } from "@/components/site/CTABand";
import { services } from "@/content/services";
import { statements } from "@/content/statements";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Services", `${formatList(services.map(s => s.name))}, delivered by one accountable partner.`, "/services");

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow={statements.category} title="Services" lead={`${services[0].name} is the core of the company. Three more areas sit beside it, each delivered under the same accountability.`} crumbs={[{ label: "Services" }]} />
      <Section surface="cream">

          <ServiceDirectory />

        <p className="mt-10 max-w-[65ch] text-body text-ink-700">
          Commercial health systems are served under the same model, in the vocabulary of their own operations. See{" "}
          <Link href="/services/healthcare-operations#commercial" className="link-underline font-semibold text-gold-700 after:bg-current">how we work with commercial health systems</Link>.
        </p>
      </Section>
      <CTABand />
    </>
  );
}
