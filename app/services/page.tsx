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

        <p className="commercial-services-note mt-10 text-body text-ink-700">
          We bring the same model to commercial health systems.{" "}
          <Link href="/services/healthcare-operations#commercial" className="link-underline font-semibold text-gold-700 after:bg-current">Explore our approach</Link>.
        </p>
      </Section>
      <CTABand />
    </>
  );
}
