import Image from "next/image";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { ContactForm } from "@/components/site/ContactForm";
import { Placeholder } from "@/components/ui/Placeholder";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { contact } from "@/content/contact";
import { starsIII, starsShown } from "@/content/vehicles";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Contact", "Reach JVM Solutions. Choose who you are and your message goes to the right inbox. Office address, phone and email.", "/contact");

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Start a Conversation" lead="Choose who you are and your message goes straight to the right person. Or use the office details on this page." crumbs={[{ label: "Contact" }]} />
      <Section className="pt-0 md:pt-0 lg:pt-0">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7"><ContactForm /></div>
          <aside className="space-y-6 lg:col-span-5">
            <div className="rounded-container border border-ink-200 bg-white p-6">
              <h2 className="text-h4">{contact.office.label}</h2>
              <dl className="mt-4 grid grid-cols-[5.5rem_minmax(0,1fr)] gap-x-4 gap-y-2 text-body">
                <dt className="text-ink-500">Address</dt>
                <dd className="text-ink-900">
                  <span className="block">{contact.office.lines[0]}</span>
                  <span className="block">{contact.office.lines[1]}</span>
                </dd>
                <dt className="text-ink-500">Phone</dt>
                <dd><a href={contact.office.phoneHref} className="link-underline font-medium text-ink-900 after:bg-gold-700">{contact.office.phone}</a></dd>
                <dt className="text-ink-500">Hours</dt>
                <dd className="text-ink-900">Monday to Friday, 8am to 5pm Central</dd>
              </dl>
              <p className="mt-4 text-body-sm"><ExternalLink href={contact.office.mapUrl} className="font-semibold text-gold-700">Open in maps</ExternalLink></p>
            </div>

            <div className="rounded-container border border-ink-200 bg-white p-6">
              <h2 className="text-h4">Who Answers What</h2>
              <dl className="mt-4 grid grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-x-4 gap-y-3 text-body-sm">
                <dt className="text-ink-500">Contracting and capture</dt><dd><a href={`mailto:${contact.emails.bd}`} className="link-underline break-all font-medium text-ink-900 after:bg-gold-700">{contact.emails.bd}</a></dd>
                {starsShown ? <><dt className="text-ink-500">STARS III</dt><dd><a href={`mailto:${starsIII.jvmEmail}`} className="link-underline break-all font-medium text-ink-900 after:bg-gold-700">{starsIII.jvmEmail}</a></dd></> : null}
                <dt className="text-ink-500">General enquiries</dt><dd><a href={`mailto:${contact.emails.general}`} className="link-underline break-all font-medium text-ink-900 after:bg-gold-700">{contact.emails.general}</a></dd>
                <dt className="text-ink-500">Employment verification</dt><dd><a href={`mailto:${contact.emails.credentialing}?subject=Employment%20Verification`} className="link-underline break-all font-medium text-ink-900 after:bg-gold-700">{contact.emails.credentialing}</a></dd>
              </dl>
              <p className="mt-4 text-body-sm text-ink-500">Replies within {contact.responseTime}.</p>
              <div className="mt-3"><Placeholder id="P10" /></div>
            </div>

            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-container bg-ink-100">
              <Image src="/images/team/team-shirts.jpg" alt="" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
