import { TeamGallery } from "@/components/site/TeamGallery";
import Image from "@/components/ui/Image";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHeader } from "@/components/site/Section";
import { AboutLeadership } from "@/components/site/AboutLeadership";
import { AboutValues } from "@/components/site/AboutValues";
import { CompanyOverview } from "@/components/site/CompanyOverview";
import { CTABand } from "@/components/site/CTABand";
import { Placeholder } from "@/components/ui/Placeholder";
import { statements } from "@/content/statements";
import { values } from "@/content/values";
import { InPageNav } from "@/components/site/InPageNav";
import { leadershipTeamPhoto } from "@/content/team";
import { contact } from "@/content/contact";
import { pageMetadata } from "@/lib/seo";
import { purpose } from "@/content/purpose";
import { FounderQuote } from "@/components/site/FounderQuote";
import { Button } from "@/components/ui/Button";

export const metadata = pageMetadata(
  "About JVM",
  `Mission, vision, values and leadership of ${statements.companyName}, a ${contact.office.locality} based healthcare operations and professional services company.`,
  "/about",
);

export default function AboutPage() {
  return (
    <>
      <PageHero
        className="about-hero"
        eyebrow="About"
        title="About JVM Solutions"
        crumbs={[{ label: "About" }]}
      >
      <div className="mt-12 md:mt-16">
        <div className="about-introduction inner-hero-grid grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <div className="inner-hero-photo photo-feature relative aspect-[4/3]"><Image src={leadershipTeamPhoto.src} alt={leadershipTeamPhoto.alt} fill priority quality={90} sizes="(min-width:1024px) 50vw,100vw" className="object-cover" /></div>
          <div className="inner-hero-copy"><h2 className="editorial-title text-h2-sm md:text-h2">Experience You Can Put a Face To</h2><p className="mt-5 text-lead-sm text-ink-700">Our work brings people, technology and operational support together. Meet the team behind JVM’s commitment to healthcare and professional services.</p><a href="#leadership" className="mt-6 inline-flex min-h-11 items-center text-body-sm font-semibold text-gold-700 underline underline-offset-4">Meet our leadership</a></div>
        </div>
      </div>
      </PageHero>
      <div className="h-12 md:h-16" aria-hidden />
      <div className="document-layout container-content grid grid-cols-1 gap-10 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-12 lg:[&>.document-nav]:mb-16">
        <InPageNav
          sections={[
            { id: "leadership", label: "Leadership and team" },
            { id: "mission", label: "Mission and vision" },
            { id: "story", label: "Purpose and impact" },
            { id: "values", label: "Values" },
            { id: "company", label: "Company" },
          ]}
        />
        <div className="min-w-0">
          <Section
            contained={false}
            id="leadership"
            className="chapter-section pt-0 md:pt-0 lg:pt-0"
          >
            <SectionHeader
              title="Leadership and Team"
            />
            <AboutLeadership />
          </Section>
          <Section contained={false} id="mission" className="chapter-section">
            <SectionHeader title="Our Mission and Vision" />
            <div className="purpose-grid relative isolate grid gap-5 md:grid-cols-[1fr_1.15fr]">
              <article className="purpose-card">
                <h3 className="text-h3">Our Mission</h3>
                <p className="purpose-statement mt-4">{statements.mission}</p>
              </article>
              <article className="purpose-card purpose-card--vision surface-dark">
                <h3 className="text-h3">A Vision for Lasting Impact</h3>
                <p className="purpose-statement mt-4">{statements.vision}</p>
              </article>
            </div>
          </Section>

          <Section
            contained={false}
            id="story"
            className="chapter-section content-sized pt-0 md:pt-0 lg:pt-0"
          >
            <SectionHeader eyebrow="A message from our founder" title={purpose.title} />
            <FounderQuote quote={purpose.quote} />
            <div className="mt-8 max-w-[72ch] space-y-5 text-body leading-relaxed text-ink-700">
              {purpose.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <div className="mt-8"><Button href="/about/community-impact" variant="secondary">Our commitment to community</Button></div>
          </Section>

          <Section contained={false} id="values" className="chapter-section pt-0 md:pt-0 lg:pt-0">
            <SectionHeader
              title="Living Our Core Values"
              lead={values.intro}
            />
            <AboutValues />
          </Section>



          <Section contained={false} id="company" className="chapter-section pt-0 md:pt-0 lg:pt-0">
            <SectionHeader title="Company Details" />
            <CompanyOverview />
            <div className="mt-6 max-w-xl">
              <Placeholder id="P19" />
            </div>
          </Section>
        </div>
      </div>
      <CTABand intro={<TeamGallery />} />
    </>
  );
}
