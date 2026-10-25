import { PageHero } from "@/components/site/PageHero";
import { CapabilityLibrary } from "@/components/site/CapabilityLibrary";
import { CTABand } from "@/components/site/CTABand";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("Capability Statements", "View JVM capability statements by service area.", "/contracting/capability-statement");
export default function CapabilityPage() {
  return (
    <>
      <PageHero className="capability-hero" eyebrow="Contracting" title="Capability Statements" lead="A concise overview of our services, expertise and qualifications." crumbs={[{ label: "Contracting", href: "/contracting" }, { label: "Capability Statements" }]}>
        <div className="mt-12 md:mt-16"><CapabilityLibrary /></div>
      </PageHero>
      <CTABand route="contracting" />
    </>
  );
}
