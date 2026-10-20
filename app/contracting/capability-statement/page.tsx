import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { CapabilityLibrary } from "@/components/site/CapabilityLibrary";
import { CTABand } from "@/components/site/CTABand";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("Capability Statements", "Download JVM capability statements by service area.", "/contracting/capability-statement");
export default function CapabilityPage() {
  return <><PageHero eyebrow="Contracting" title="Capability Statements" lead="Choose a service area and download its capability statement." crumbs={[{label:"Contracting",href:"/contracting"},{label:"Capability Statements"}]} /><Section surface="cream"><CapabilityLibrary /></Section><CTABand route="contracting" /></>;
}
