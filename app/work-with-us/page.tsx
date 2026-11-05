import { PageHero } from "@/components/site/PageHero";
import { AudienceLinks } from "@/components/site/AudienceLinks";
import { TeamGallery } from "@/components/site/TeamGallery";
import { Section } from "@/components/site/Section";
import { CTABand } from "@/components/site/CTABand";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("Partner With Us", "Explore JVM services, discuss a partnership or join our team.", "/work-with-us");
export default function WorkWithUsPage() { return <><PageHero className="content-sized" title="Your Next Step With JVM" eyebrow="Partner With Us" lead="Bring us your mission, your ideas or your experience. Choose the conversation that fits." crumbs={[{label:"Partner With Us"}]} /><Section surface="dark" className="partnership-section"><AudienceLinks /></Section><Section surface="cream"><TeamGallery /><CTABand embedded /></Section></>; }
