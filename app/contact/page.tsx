import { breakableEmail } from "@/lib/email-address";
import { PageHero } from "@/components/site/PageHero";
import { OfficeMap } from "@/components/site/OfficeMap";
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
      <PageHero className="content-sized" eyebrow="Contact" title="Contact JVM Solutions" lead="Talk with our team about your goals, your next program or your career. We’ll help you take the next step." crumbs={[{ label: "Contact" }]} />
      <Section surface="cream" className="contact-workspace">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="contact-form-sheet lg:col-span-7"><h2 className="editorial-title mb-2 text-h3">Start a conversation</h2><p className="mb-7 max-w-prose text-body-sm text-ink-700">Tell us how we can help. We’ll connect you with the right team.</p><ContactForm /></div>
          <aside className="contact-sidebar grid min-w-0 gap-6 lg:col-span-5">
            <div className="rounded-container border border-ink-200 bg-white p-6">
              <h2 className="text-h4">{contact.office.label}</h2>
              <dl className="mt-4 grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-x-4 gap-y-2 text-body">
                <dt className="text-ink-500">Address</dt>
                <dd className="text-ink-900">
                  <span className="block">{contact.office.lines[0]}</span>
                  <span className="block">{contact.office.lines[1]}</span>
                </dd>
                <dt className="text-ink-500">Phone</dt>
                <dd><a href={contact.office.phoneHref} className="link-underline inline-flex min-h-11 items-center font-medium text-ink-900 after:bg-gold-700">{contact.office.phone}</a></dd>
              </dl>
              <p className="mt-4 text-body-sm"><ExternalLink href={contact.office.mapUrl} className="min-h-11 font-semibold text-gold-700">Open in maps</ExternalLink></p>
            </div>

            <div className="rounded-container border border-ink-200 bg-white p-6">
              <h2 className="text-h4">Who Answers What</h2>
              <dl className="mt-4 grid grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-x-4 gap-y-3 text-body-sm">
                <dt className="text-ink-500">Contracting and capture</dt><dd><a href={`mailto:${contact.emails.bd}`} className="link-underline inline-flex min-h-11 items-center font-medium text-ink-900 after:bg-gold-700">{breakableEmail(contact.emails.bd)}</a></dd>
                {starsShown ? <><dt className="text-ink-500">STARS III</dt><dd><a href={`mailto:${starsIII.jvmEmail}`} className="link-underline inline-flex min-h-11 items-center font-medium text-ink-900 after:bg-gold-700">{breakableEmail(starsIII.jvmEmail)}</a></dd></> : null}
                <dt className="text-ink-500">General enquiries</dt><dd><a href={`mailto:${contact.emails.general}`} className="link-underline inline-flex min-h-11 items-center font-medium text-ink-900 after:bg-gold-700">{breakableEmail(contact.emails.general)}</a></dd>
                <dt className="text-ink-500">Employment verification</dt><dd><a href={`mailto:${contact.emails.credentialing}?subject=Employment%20Verification`} className="link-underline inline-flex min-h-11 items-center font-medium text-ink-900 after:bg-gold-700">{breakableEmail(contact.emails.credentialing)}</a></dd>
              </dl>
              <p className="mt-4 text-body-sm text-ink-500">Replies within {contact.responseTime}.</p>
              <div className="mt-3"><Placeholder id="P10" nested /></div>
            </div>


            <OfficeMap src={contact.office.mapEmbedUrl} />
          </aside>
        </div>
      </Section>
    </>
  );
}
