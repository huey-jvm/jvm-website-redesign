import { Button } from "@/components/ui/Button";
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
      <Section surface="light"><div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center"><div><h2 className="text-h2-sm md:text-h2">Capabilities, Ready to Share</h2><p className="mt-3 text-body text-ink-700">Explore five downloadable statements across healthcare, technology, logistics, facilities and administration.</p></div><Button href="/contracting/capability-statement">View capability statements</Button></div></Section>
      <CTABand />
    </>
  );
}
