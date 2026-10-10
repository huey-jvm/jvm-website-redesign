import Link from "next/link";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { ServiceCard } from "@/components/site/ServiceCard";
import { CTABand } from "@/components/site/CTABand";
import { services } from "@/content/services";
import { statements } from "@/content/statements";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Services", "Healthcare operations, Health IT, logistics and facilities, and management support, delivered by one accountable partner.", "/services");

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow={statements.category} title="Services" lead="Healthcare operations is the core of the company. Three more areas sit beside it, each delivered under the same accountability and the same quality system." crumbs={[{ label: "Services" }]} />
      <Section surface="cream" className="pt-0 md:pt-0 lg:pt-0">
        <ul className="grid grid-cols-1 gap-6 pt-12 md:grid-cols-2">
          {services.map((s) => (
            <li key={s.slug} className="h-full"><ServiceCard service={s} headingLevel="h2" /></li>
          ))}
        </ul>
        <p className="mt-10 max-w-[65ch] text-body text-ink-700">
          Commercial health systems are served under the same model, in the vocabulary of their own operations. See{" "}
          <Link href="/services/healthcare-operations#commercial" className="link-underline font-semibold text-gold-700 after:bg-current">how we work with commercial health systems</Link>.
        </p>
      </Section>
      <CTABand />
    </>
  );
}
