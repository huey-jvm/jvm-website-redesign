import Image from "next/image";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHeader } from "@/components/site/Section";
import { TeamCard } from "@/components/site/TeamCard";
import { FactBlock } from "@/components/site/FactBlock";
import { CTABand } from "@/components/site/CTABand";
import { QuoteCard } from "@/components/site/QuoteCard";
import { Placeholder } from "@/components/ui/Placeholder";
import { statements } from "@/content/statements";
import { values } from "@/content/values";
import { team } from "@/content/team";
import { identifiers } from "@/content/identifiers";
import { contact } from "@/content/contact";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("About JVM", "Mission, vision, values and leadership of Johnson Venture Management Solutions, Inc., a San Antonio based healthcare operations and professional services company.", "/about");

export default function AboutPage() {
  const founder = team[0];
  return (
    <>
      <PageHero eyebrow="About" title="About JVM Solutions" lead="A veteran-led, San Antonio based company that brings operational discipline to federal and commercial health missions." crumbs={[{ label: "About" }]} />
      <div className="container-content">
        <div className="relative aspect-[3/2] w-full overflow-hidden rounded-container bg-ink-100 md:aspect-[21/9]">
          <Image src="/images/team/team-shirts.jpg" alt="The JVM Solutions team in matching shirts reading Success begins with the right team" fill priority sizes="100vw" className="object-cover" />
        </div>
      </div>

      <Section surface="cream">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="@container rounded-container border border-cream-border bg-white p-6 md:p-8">
            <p className="text-eyebrow font-semibold uppercase text-gold-700">Mission</p>
            <h2 className="mt-3 text-h3 md:text-h2-sm">Our Mission</h2>
            <p className="mt-4 text-lead-sm text-ink-900">{statements.mission}</p>
          </div>
          <div className="@container rounded-container border border-cream-border bg-white p-6 md:p-8">
            <p className="text-eyebrow font-semibold uppercase text-gold-700">Vision</p>
            <h2 className="mt-3 text-h3 md:text-h2-sm">Our Vision</h2>
            <p className="mt-4 text-lead-sm text-ink-900">{statements.vision}</p>
          </div>
        </div>
      </Section>

      <Section surface="cream" className="pt-0 md:pt-0 lg:pt-0">
        <SectionHeader eyebrow="Culture" title="Our Story" />
        <QuoteCard className="max-w-3xl">{statements.story}</QuoteCard>
        <Placeholder id="P3" inline what="Pending the CEO’s confirmation" who="the CEO" className="mt-4 inline-block" />
      </Section>

      <Section>
        <SectionHeader eyebrow="Values" title="Living Our Core Values" lead={values.intro} />
        <h3 className="text-h3">{values.rita.name}</h3>
        <p className="prose-measure mt-2 text-body text-ink-700">{values.rita.description}</p>
        <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.rita.items.map((v) => (
            <li key={v.title} className="rounded-container border border-ink-200 bg-white p-5">
              <h4 className="truncate text-h4" title={v.title}>{v.title}</h4>
              <p className="mt-2 text-body-sm text-ink-700">{v.line}</p>
            </li>
          ))}
        </ul>
        <div className="mt-6 rounded-container bg-cream p-6 md:p-8">
          <h3 className="text-h3">{values.roar.name}</h3>
          <p className="mt-2 text-body text-ink-700">{values.roar.description}</p>
          <dl className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3 md:grid-cols-2">
            {values.roar.items.map((v) => (
              <div key={v.title} className="grid grid-cols-[7.5rem_minmax(0,1fr)] gap-x-3">
                <dt className="font-semibold text-ink-950">{v.title}</dt>
                <dd className="text-body text-ink-700">{v.line}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section surface="light" className="pt-0 md:pt-0 lg:pt-0">
        <SectionHeader eyebrow="Leadership" title="Driving Missions Forward" />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4"><TeamCard name={founder.name} role={founder.role} note={founder.note} image={founder.image} /></div>
          <div className="space-y-4 lg:col-span-8">
            {founder.bio.map((p) => <p key={p.slice(0, 24)} className="prose-measure text-body text-ink-700">{p}</p>)}
            <div className="grid grid-cols-1 gap-6 pt-4 sm:grid-cols-2">
              <TeamCard name={team[1].name} role={team[1].role} />
            </div>
          </div>
        </div>
      </Section>

      <Section surface="cream">
        <SectionHeader eyebrow="In brief" title="The Company" />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <FactBlock title="Company" facts={[
            { label: "Legal name", value: statements.companyName },
            { label: "Headquarters", value: "San Antonio, Texas" },
            { label: "Ownership", value: "Veteran owned, woman owned" },
            { label: "Set-asides", value: identifiers.setAsides.join(", ") },
            { label: "Quality", value: "ISO 9001:2015" },
          ]} />
          <FactBlock title="Office" facts={[
            { label: "Address", value: contact.office.lines.join(", ") },
            { label: "Phone", value: contact.office.phone, copy: true, href: contact.office.phoneHref },
            { label: "Email", value: contact.emails.general, copy: true, href: `mailto:${contact.emails.general}` },
          ]} />
        </div>
        <div className="mt-6 max-w-xl"><Placeholder id="P19"><p className="text-body-sm text-ink-900">The national coverage map from the previous site is retired until real coverage data exists.</p></Placeholder></div>
      </Section>

      <CTABand />
    </>
  );
}
