import { formatList } from "@/lib/list";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { NextServicePage } from "@/components/site/NextServicePage";
import { PageHero } from "@/components/site/PageHero";
import { ServiceDirectory } from "@/components/site/ServiceDirectory";
import { CTABand } from "@/components/site/CTABand";
import { services } from "@/content/services";
import { statements } from "@/content/statements";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Services", `${formatList(services.map(s => s.name))}, delivered by one accountable partner.`, "/services");

export default function ServicesPage() {
  return (
    <>
      <PageHero className="services-hero" eyebrow={statements.category} title="Services" lead="Healthcare, IT, logistics and facilities management. Explore the expertise that fits your operational needs." crumbs={[{ label: "Services" }]}>
      <div className="mt-12 md:mt-16">

          <ServiceDirectory />
          <div className="services-resources mt-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-3 lg:shrink-0">
              <Button size="sm" href="/contracting/capability-statement">View Capability Statements</Button>
              <Button size="sm" href="/services/management-support">Explore Administrative Support</Button>
            </div>
            <p className="commercial-services-note max-w-[48ch] text-body-sm text-ink-700 lg:text-right">
              We bring the same model to commercial health systems.{" "}
              <Link href="/services/healthcare-operations#commercial" className="link-underline font-semibold text-gold-700 after:bg-current">Explore our approach</Link>.
            </p>
          </div>
        <CTABand embedded />
        <NextServicePage current="/services" />
      </div>
      </PageHero>
    </>
  );
}
