import { PageHero } from "@/components/site/PageHero";
import { AudienceLinks } from "@/components/site/AudienceLinks";
import { TeamGallery } from "@/components/site/TeamGallery";
import { Section } from "@/components/site/Section";
import { CTABand } from "@/components/site/CTABand";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("Work With Us", "Explore JVM services, discuss a partnership or join our team.", "/work-with-us");
export default function WorkWithUsPage() { return <><PageHero title="Your Next Step With JVM" eyebrow="Work With Us" lead="Bring us your mission, your ideas or your experience. Choose the conversation that fits." crumbs={[{label:"Work With Us"}]} /><Section><AudienceLinks /></Section><Section surface="cream"><TeamGallery /><CTABand embedded /></Section></>; }
