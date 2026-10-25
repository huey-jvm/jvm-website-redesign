import { TeamGallery } from "@/components/site/TeamGallery";
import { Eyebrow } from "@/components/ui/Eyebrow";
import Image from "@/components/ui/Image";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHeader } from "@/components/site/Section";
import { Backdrop } from "@/components/site/Slot";
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
        lead={`A veteran-led, ${contact.office.locality} based company that brings operational discipline to federal and commercial health missions.`}
        crumbs={[{ label: "About" }]}
      >
      <div className="mt-12 md:mt-16">
        <div className="about-introduction grid items-center gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
          <div className="relative aspect-[4/3] overflow-hidden border-b-4 border-gold-500"><Image src={leadershipTeamPhoto.src} alt={leadershipTeamPhoto.alt} fill priority quality={90} sizes="(min-width:1024px) 55vw,100vw" className="object-cover" /></div>
          <div><Eyebrow>People behind the mission</Eyebrow><h2 className="mt-4 text-h2-sm md:text-h2">Experience You Can Put a Face To</h2><p className="mt-5 text-body text-ink-700">Our work brings people, technology and operational support together. Meet the team behind JVM’s commitment to healthcare and professional services.</p><a href="#leadership" className="mt-6 inline-flex min-h-11 items-center text-body-sm font-semibold text-gold-700 underline underline-offset-4">Meet our leadership</a></div>
        </div>
      </div>
      </PageHero>
      <div className="h-12 md:h-16" aria-hidden />
      <div className="document-layout container-content grid grid-cols-1 gap-10 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-12">
        <InPageNav
          sections={[
            { id: "mission", label: "Mission and vision" },
            { id: "story", label: "Story" },
            { id: "values", label: "Values" },
            { id: "leadership", label: "Leadership" },
            { id: "company", label: "Company" },
          ]}
        />
        <div className="min-w-0">
          <Section contained={false} id="mission" className="chapter-section">
            <div data-backdrop="AS-13" className="relative isolate overflow-hidden rounded-container bg-cream p-4 md:p-6 lg:p-8">
            <Backdrop id="AS-13" />
            <div className="relative grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="@container rounded-container border border-cream-border bg-white">
                <div className="p-4 @[20rem]:p-6 @[35rem]:p-8">
                  <Eyebrow tone="light">Mission</Eyebrow>
                  <h2 className="mt-3 text-h4 @[20rem]:text-h3 @[35rem]:text-h2-sm">
                    Our Mission
                  </h2>
                  <p className="prose-measure mt-4 text-body text-ink-900">
                    {statements.mission}
                  </p>
                </div>
              </div>
              <div className="@container rounded-container border border-cream-border bg-white">
                <div className="p-4 @[20rem]:p-6 @[35rem]:p-8">
                  <Eyebrow tone="light">Vision</Eyebrow>
                  <h2 className="mt-3 text-h4 @[20rem]:text-h3 @[35rem]:text-h2-sm">
                    Our Vision
                  </h2>
                  <p className="prose-measure mt-4 text-body text-ink-900">
                    {statements.vision}
                  </p>
                </div>
              </div>
            </div>
            </div>
          </Section>

          <Section
            contained={false}
            id="story"
            className="chapter-section pt-0 md:pt-0 lg:pt-0"
          >
            <SectionHeader eyebrow="Culture" title="Our Story" />
            <blockquote className="about-story relative max-w-3xl pl-8 text-lead font-medium leading-relaxed text-ink-900 md:pl-12 md:text-h2-sm"><span aria-hidden className="absolute -top-5 left-0 font-serif text-[5rem] leading-none text-gold-500">“</span><p>{statements.story}</p></blockquote>
            <Placeholder
              id="P3"
              inline
              what="Pending the CEO’s confirmation"
              who="the CEO"
              className="mt-4 inline-block"
            />
          </Section>

          <Section contained={false} id="values" className="chapter-section pt-0 md:pt-0 lg:pt-0">
            <SectionHeader
              eyebrow="Values"
              title="Living Our Core Values"
              lead={values.intro}
            />
            <AboutValues />
          </Section>

          <Section
            contained={false}
            id="leadership"
            className="chapter-section pt-0 md:pt-0 lg:pt-0"
          >
            <SectionHeader
              eyebrow="Leadership"
              title="Driving Missions Forward"
            />
            <AboutLeadership />
          </Section>

          <Section contained={false} id="company" className="chapter-section pt-0 md:pt-0 lg:pt-0">
            <SectionHeader eyebrow="In brief" title="The Company" />
            <CompanyOverview />
            <div className="mt-6 max-w-xl">
              <Placeholder id="P19" />
            </div>
          </Section>
        </div>
      </div>
      <Section surface="cream"><TeamGallery /></Section>
      <CTABand />
    </>
  );
}
