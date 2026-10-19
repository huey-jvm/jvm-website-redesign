import { Eyebrow } from "@/components/ui/Eyebrow";
import Image from "@/components/ui/Image";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHeader } from "@/components/site/Section";
import { Backdrop } from "@/components/site/Slot";
import { TeamCard } from "@/components/site/TeamCard";
import { FactBlock } from "@/components/site/FactBlock";
import { CTABand } from "@/components/site/CTABand";
import { QuoteCard } from "@/components/site/QuoteCard";
import { Placeholder } from "@/components/ui/Placeholder";
import { statements } from "@/content/statements";
import { values } from "@/content/values";
import { InPageNav } from "@/components/site/InPageNav";
import { team, teamShirtsPhoto } from "@/content/team";
import { credentials } from "@/content/credentials";
import { identifiers } from "@/content/identifiers";
import { contact } from "@/content/contact";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "About JVM",
  `Mission, vision, values and leadership of ${statements.companyName}, a ${contact.office.locality} based healthcare operations and professional services company.`,
  "/about",
);

export default function AboutPage() {
  const founder = team[0];
  return (
    <>
      <PageHero
        eyebrow="About"
        title="About JVM Solutions"
        lead={`A veteran-led, ${contact.office.locality} based company that brings operational discipline to federal and commercial health missions.`}
        crumbs={[{ label: "About" }]}
      />

      <div className="container-content relative mt-8 aspect-[3/2] overflow-hidden border-b-4 border-gold-500 md:aspect-[21/7]">
        <Image
          src={teamShirtsPhoto.src}
          alt={teamShirtsPhoto.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_70%]"
        />
      </div>
      <div className="h-12 md:h-16" aria-hidden />
      <div className="container-content grid grid-cols-1 gap-10 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-12">
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
            <QuoteCard className="max-w-3xl">{statements.story}</QuoteCard>
            <Placeholder
              id="P3"
              inline
              what="Pending the CEOâ€™s confirmation"
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
            <h3 className="text-h3">{values.rita.name}</h3>
            <p className="prose-measure mt-2 text-body text-ink-700">
              {values.rita.description}
            </p>

            <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
              {values.rita.items.map((v) => (
                <li
                  key={v.title}
                  className="@container rounded-container border border-ink-200 bg-white"
                >
                  <div className="p-4 @[20rem]:p-6 @[35rem]:p-8">
                    <h4 className="text-h4">
                      {v.title}
                    </h4>
                    <p className="mt-2 text-body-sm text-ink-700">{v.line}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 @container rounded-container bg-cream p-6 md:p-8">
              <h3 className="text-h3">{values.roar.name}</h3>
              <p className="mt-2 text-body text-ink-700">
                {values.roar.description}
              </p>
              <dl className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3 md:grid-cols-2">
                {values.roar.items.map((v) => (
                  <div
                    key={v.title}
                    className="grid grid-cols-1 gap-y-1 @[20rem]:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] @[20rem]:gap-x-3"
                  >
                    <dt className="font-semibold text-ink-950">{v.title}</dt>
                    <dd className="text-body text-ink-700">{v.line}</dd>
                  </div>
                ))}
              </dl>
            </div>
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
            <div className="space-y-4">
              {founder.bio.map((p) => (
                <p
                  key={p.slice(0, 24)}
                  className="prose-measure text-body text-ink-700"
                >
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {team.map((m) => (
                <TeamCard
                  key={m.slug}
                  name={m.name}
                  role={m.role}
                  note={m.note}
                  image={m.image}
                />
              ))}
            </div>
          </Section>

          <Section contained={false} id="company" className="chapter-section pt-0 md:pt-0 lg:pt-0">
            <SectionHeader eyebrow="In brief" title="The Company" />
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <FactBlock
                title="Company"
                facts={[
                  { label: "Legal name", value: statements.companyName },
                  {
                    label: "Headquarters",
                    value: `${contact.office.locality}, ${contact.office.regionName}`,
                  },
                  { label: "Ownership", value: identifiers.ownership },
                  {
                    label: "Set-asides",
                    value: identifiers.setAsides.join(", "),
                  },
                  {
                    label: "Quality",
                    value: credentials.find((c) => c.slug === "iso-9001")!.name,
                  },
                ]}
              />
              <FactBlock
                title="Office"
                facts={[
                  { label: "Address", value: contact.office.lines.join(", ") },
                  {
                    label: "Phone",
                    value: contact.office.phone,
                    copy: true,
                    href: contact.office.phoneHref,
                  },
                  {
                    label: "Email",
                    value: contact.emails.general,
                    copy: true,
                    href: `mailto:${contact.emails.general}`,
                  },
                ]}
              />
            </div>
            <div className="mt-6 max-w-xl">
              <Placeholder id="P19" />
            </div>
          </Section>
        </div>
      </div>
      <CTABand />
    </>
  );
}
