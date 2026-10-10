import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { footerColumns, legalNav } from "@/content/navigation";
import { contact } from "@/content/contact";
import { credentials, proofStripSlugs } from "@/content/credentials";
import { statements } from "@/content/statements";
import { CredentialMark } from "./CredentialMark";
import { Placeholder } from "@/components/ui/Placeholder";

export function Footer() {
  const year = new Date().getFullYear();
  const marks = proofStripSlugs.map((s) => credentials.find((c) => c.slug === s)).filter(Boolean);
  return (
    <footer className="surface-dark bg-ink-950 text-ink-200">
      <div className="container-content py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.2fr]">
          <div>
            <Link href="/" className="inline-flex rounded-control focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500" aria-label="JVM Solutions, home">
              <Image src="/images/brand/jvm-logo-480.png" alt="JVM Solutions" width={480} height={222} className="h-14 w-auto" />
            </Link>
            <p className="mt-4 max-w-[36ch] text-body-sm text-ink-300">{statements.category}.</p>
          </div>

          {footerColumns.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h2 className="font-sans text-eyebrow font-semibold uppercase text-gold-500">{col.heading}</h2>
              <ul className="mt-4 space-y-1">
                {col.items.map((i) => (
                  <li key={i.href}>
                    <Link href={i.href} className="link-underline inline-flex min-h-9 items-center text-body-sm text-ink-200 after:bg-cream hover:text-cream">{i.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="font-sans text-eyebrow font-semibold uppercase text-gold-500">Office</h2>
            <dl className="mt-4 grid grid-cols-[4.5rem_minmax(0,1fr)] gap-x-3 gap-y-2 text-body-sm">
              <dt className="text-ink-300">Address</dt>
              <dd className="text-ink-200">
                <Placeholder id="P4" inline>
                  <span className="block">{contact.office.lines[0]}</span>
                  <span className="block">{contact.office.lines[1]}</span>
                </Placeholder>
              </dd>
              <dt className="text-ink-300">Phone</dt>
              <dd><a href={contact.office.phoneHref} className="link-underline text-ink-200 after:bg-cream hover:text-cream">{contact.office.phone}</a></dd>
              <dt className="text-ink-300">Fax</dt>
              <dd className="text-ink-200">{contact.office.fax}</dd>
              <dt className="text-ink-300">Email</dt>
              <dd><a href={`mailto:${contact.emails.general}`} className="link-underline break-all text-ink-200 after:bg-cream hover:text-cream">{contact.emails.general}</a></dd>
              <dt className="text-ink-300">Verify</dt>
              <dd><a href={`mailto:${contact.emails.credentialing}?subject=Employment%20Verification`} className="link-underline break-all text-ink-200 after:bg-cream hover:text-cream">{contact.emails.credentialing}</a><span className="block text-caption text-ink-300">Employment verification</span></dd>
            </dl>
            <ul className="mt-5 flex flex-wrap items-center gap-2" aria-label="Social">
              {contact.social.map((s) => (
                <li key={s.name}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1 rounded-pill border border-ink-800 px-4 text-body-sm font-medium text-ink-200 transition-colors duration-150 ease hover:border-gold-500 hover:text-gold-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500">
                    {s.name}
                    <ArrowUpRight aria-hidden className="size-4" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ul className="mt-12 flex flex-wrap items-center gap-3 border-t border-ink-800 pt-8" aria-label="Certifications">
          {marks.map((c) => (
            <li key={c!.slug}><CredentialMark credential={c!} size="sm" /></li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col gap-4 border-t border-ink-800 pt-6 text-caption text-ink-300 md:flex-row md:items-center md:justify-between">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legalNav.map((l) => (
              <li key={l.href}><Link href={l.href} className="link-underline inline-flex min-h-9 items-center after:bg-cream hover:text-cream">{l.label}</Link></li>
            ))}
          </ul>
          <p>© {year} {statements.companyName}</p>
        </div>
      </div>
    </footer>
  );
}
