import { Eyebrow } from "@/components/ui/Eyebrow";
import Image from "@/components/ui/Image";
import Link from "next/link";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { breakableEmail } from "@/lib/email-address";
import { credentials, proofStripSlugs } from "@/content/credentials";
import { CredentialMark } from "./CredentialMark";
import { footerColumns, legalNav } from "@/content/navigation";
import { contact } from "@/content/contact";
import { statements } from "@/content/statements";
import { Placeholder } from "@/components/ui/Placeholder";
import { showPlaceholders } from "@/lib/placeholders";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="surface-dark bg-ink-950 text-ink-200">
      <div className="container-content py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.2fr]">
          <div>
            <Link href="/" className="inline-flex rounded-control focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500" aria-label="JVM Solutions, home">
              <Image src="/images/brand/jvm-logo-480.png" alt="JVM Solutions" width={480} height={222} className="h-auto w-40" />
            </Link>
            <p className="mt-4 max-w-[36ch] text-body-sm text-ink-300">{statements.category}.</p>
          </div>

          {footerColumns.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <Eyebrow as="h2" tone="dark">{col.heading}</Eyebrow>
              <ul className="mt-4 space-y-1">
                {col.items.map((i) => (
                  <li key={i.href}>
                    <Link href={i.href} className="link-underline inline-flex min-h-11 items-center text-body-sm text-ink-200 after:bg-cream hover:text-cream focus-visible:text-cream">{i.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="@container">
            <Eyebrow as="h2" tone="dark">Office</Eyebrow>
            <dl className="mt-4 grid grid-cols-1 items-baseline @[13rem]:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-x-3 gap-y-2 text-body-sm">
              <dt className="text-ink-300">Address</dt>
              <dd className="text-ink-200">
                <span className="block">{contact.office.lines[0]}</span>
                <span className="block">{contact.office.lines[1]}</span>
              </dd>
              <dt className="text-ink-300">Phone</dt>
              <dd><a href={contact.office.phoneHref} className="link-underline inline-flex min-h-11 items-center text-ink-200 after:bg-cream hover:text-cream focus-visible:text-cream">{contact.office.phone}</a></dd>
              <dt className="text-ink-300">Email</dt>
              <dd><a href={`mailto:${contact.emails.general}`} className="link-underline inline-flex min-h-11 items-center text-ink-200 after:bg-cream hover:text-cream focus-visible:text-cream">{breakableEmail(contact.emails.general)}</a></dd>
              <dt className="text-ink-300">Verify</dt>
              <dd><a href={`mailto:${contact.emails.credentialing}?subject=Employment%20Verification`} className="link-underline inline-flex min-h-11 items-center text-ink-200 after:bg-cream hover:text-cream focus-visible:text-cream">{breakableEmail(contact.emails.credentialing)}</a><span className="block text-caption text-ink-300">Employment verification</span></dd>
            </dl>
            <ul className="mt-5 flex flex-wrap items-center gap-2" aria-label="Social">
              {contact.social.map((s) => (
                <li key={s.name}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${s.name} (opens in a new tab)`} className="inline-flex size-11 items-center justify-center rounded-control text-ink-300 hover:text-cream focus-visible:text-cream focus-visible:outline-gold-500">
                    <SocialIcon name={s.name} />
                  </a>
                </li>
              ))}
              {showPlaceholders && contact.social.some((s) => s.pendingCheck) ? <li><Placeholder id="P9" inline /></li> : null}
            </ul>
          </div>
        </div>

        <ul aria-label="Certifications" className="mt-8 flex flex-wrap items-center gap-3 border-t border-ink-800 pt-8">{proofStripSlugs.map((slug) => credentials.find((c) => c.slug === slug)!).map((c) => <li key={c.slug}><CredentialMark credential={c} size="sm" /></li>)}</ul>
        <div className="mt-8 flex flex-col gap-4 border-t border-ink-800 pt-6 text-caption text-ink-300 md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legalNav.map((l) => (
              <li key={l.href}><Link href={l.href} className="link-underline inline-flex min-h-11 items-center after:bg-cream hover:text-cream focus-visible:text-cream">{l.label}</Link></li>
            ))}
          </ul>
          <p>© {year} {statements.companyName}</p>
        </div>
      </div>
    </footer>
  );
}
