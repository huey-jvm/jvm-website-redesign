import { ClipboardCheck, HeartHandshake, Mail, MapPin, Phone, Printer } from "lucide-react";
import { quality } from "@/content/quality";
import { PageHero } from "@/components/site/PageHero";
import { Section, SectionHeader } from "@/components/site/Section";
import { CTABand } from "@/components/site/CTABand";
import { Placeholder } from "@/components/ui/Placeholder";
import { CopyButton } from "@/components/ui/CopyButton";
import { Slot } from "@/components/site/Slot";
import { credentials } from "@/content/credentials";
import { contact } from "@/content/contact";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Quality and Compliance", "ISO 9001:2015 quality management, our position against the Joint Commission Health Care Staffing Services standards, and how to raise a concern.", "/about/quality-compliance");

export default function QualityPage() {
  const iso = credentials.find(c => c.slug === "iso-9001")!;
  const commission = quality.jointCommission.complaintRoute;
  return <>
    <PageHero className="quality-hero" eyebrow="About" title="Quality and Compliance" lead="JVM Solutions is committed to a higher standard of service and to the delivery of safe, quality patient care." crumbs={[{ label: "About", href: "/about" }, { label: "Quality and Compliance" }]}>
      <div className="mt-10 md:mt-14"><Slot id="AS-14" priority className="aspect-[4/3] overflow-hidden border-b-[3px] border-gold-500 md:aspect-[3/1]" sizes="(min-width:1440px) 1312px,100vw" /></div>
    </PageHero>
    <Section className="quality-standards">
      <SectionHeader eyebrow="Our standards" title="Quality in Every Engagement" />
      <div className="space-y-8">
        <section className="grid gap-5 border-t border-gold-500 pt-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-16" aria-labelledby="quality-iso-title">
          <div>
          <div className="mb-5 flex items-center gap-3"><ClipboardCheck aria-hidden className="size-6 text-gold-700" /><p className="text-eyebrow font-semibold uppercase tracking-widest text-gold-700">Quality management</p></div>
          <h3 id="quality-iso-title" className="text-h3">{iso.name}</h3>
          </div>
          <div><p className="text-body text-ink-700">{quality.isoBody}</p><Placeholder id="P15" className="mt-4" /></div>
        </section>
        <section className="grid gap-5 border-t border-ink-200 pt-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-16" aria-labelledby="quality-joint-title">
          <div>
          <div className="mb-5 flex items-center gap-3"><HeartHandshake aria-hidden className="size-6 text-gold-700" /><p className="text-eyebrow font-semibold uppercase tracking-widest text-gold-700">Healthcare delivery</p></div>
          <h3 id="quality-joint-title" className="text-h3">Joint Commission Standards</h3>
          </div>
          <div><p className="text-body text-ink-700">{quality.jointCommission.paragraph}</p><Placeholder id="P8" className="mt-4" /></div>
        </section>
      </div>
    </Section>
    <CTABand title="Questions About Our Quality System?" route="other" intro={
    <section id="raising-a-concern" className="quality-concerns" aria-label="Raising a concern">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-16">
        <SectionHeader eyebrow="Speak with us" title="Raising a Concern" className="mb-0 md:mb-0" />
        <p className="text-body text-ink-700">{quality.concern}</p>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10">
        <section className="concern-contact min-w-0 rounded-container border border-cream-border bg-white p-5 md:p-8" aria-labelledby="jvm-concern-title">
          <p className="text-eyebrow font-semibold uppercase tracking-widest text-gold-700">01 / Contact JVM first</p>
          <h3 id="jvm-concern-title" className="mt-4 text-h3">JVM Ethics and Compliance</h3>
          <p className="mt-2 text-body-sm text-ink-700">{contact.compliance.label}</p>
          <div className="mt-6 flex items-start gap-3 border-t border-ink-200 pt-5"><MapPin aria-hidden className="mt-1 size-4 shrink-0 text-gold-700" /><div><p className="text-caption text-ink-500">{contact.compliance.purpose}</p><address className="mt-2 text-body-sm not-italic text-ink-900">{contact.compliance.lines.map(line => <span key={line} className="block">{line}</span>)}</address></div></div>
          <div className="group/fact mt-5 flex items-center justify-between gap-2 border-t border-ink-200 pt-3"><a href={contact.compliance.phoneHref} className="inline-flex min-h-11 items-center gap-3 text-body font-semibold hover:text-gold-700 focus-visible:text-gold-700"><Phone aria-hidden className="size-4 shrink-0 text-gold-700" />{contact.compliance.phone}</a><CopyButton label="JVM compliance phone" value={contact.compliance.phone} /></div>
          <Placeholder id="P4" className="mt-4" />
        </section>
        <section className="concern-contact min-w-0 rounded-container border border-cream-border bg-white p-5 md:p-8" aria-labelledby="commission-concern-title">
          <p className="text-eyebrow font-semibold uppercase tracking-widest text-gold-700">02 / If your concern remains unresolved</p>
          <h3 id="commission-concern-title" className="mt-4 text-h3">{commission.label}</h3>
          <p className="mt-2 text-body-sm text-ink-700">{commission.office}</p>
          <div className="mt-6 flex items-start gap-3 border-t border-ink-200 pt-5"><MapPin aria-hidden className="mt-1 size-4 shrink-0 text-gold-700" /><address className="text-body-sm not-italic text-ink-900">{commission.lines.map(line => <span key={line} className="block">{line}</span>)}</address></div>
          <div className="mt-5 divide-y divide-ink-200 border-t border-ink-200">
            {[{ label: "Joint Commission phone", value: commission.phone, href: commission.phoneHref, Icon: Phone }, { label: "Joint Commission email", value: commission.email, href: `mailto:${commission.email}`, Icon: Mail }].map(({ label, value, href, Icon }) => <div key={label} className="group/fact flex min-w-0 items-center justify-between gap-2 py-3"><a href={href} className="flex min-h-11 min-w-0 items-center gap-3 text-body-sm font-semibold hover:text-gold-700 focus-visible:text-gold-700"><Icon aria-hidden className="size-4 shrink-0 text-gold-700" /><span className="min-w-0 break-words">{value}</span></a><CopyButton label={label} value={value} /></div>)}
            <p className="flex items-center gap-3 pt-5 text-body-sm text-ink-700"><Printer aria-hidden className="size-4 shrink-0 text-gold-700" /><span>Fax: {commission.fax}</span></p>
          </div>
        </section>
      </div>
    </section>
    } />
  </>;
}
