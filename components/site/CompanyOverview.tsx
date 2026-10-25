import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { CopyButton } from "@/components/ui/CopyButton";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { contact } from "@/content/contact";
import { statements } from "@/content/statements";
import { identifiers } from "@/content/identifiers";
import { credentials } from "@/content/credentials";

export function CompanyOverview() {
  return <div className="company-overview grid items-start gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
    <div>
      <p className="text-caption text-ink-500">Legal business name</p><h3 data-figure className="mt-3 max-w-lg text-h3">{statements.companyName}</h3>
      <dl className="mt-7 divide-y divide-ink-200 text-body-sm">
        {[{ label: "Headquarters", value: `${contact.office.locality}, ${contact.office.regionName}` }, { label: "Ownership", value: identifiers.ownership }, { label: "Quality", value: credentials.find(c => c.slug === "iso-9001")!.name }].map(item => <div key={item.label} className="grid gap-2 py-4 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-4"><dt className="text-ink-500">{item.label}</dt><dd className="font-medium text-ink-950">{item.value}</dd></div>)}
      </dl>
      <div className="mt-5"><p className="text-caption text-ink-500">Set-asides</p><ul className="mt-3 flex flex-wrap gap-2">{identifiers.setAsides.map(value => <li key={value} className="rounded-pill border border-gold-500/40 bg-gold-200/20 px-3 py-1.5 text-body-sm font-medium">{value}</li>)}</ul></div>
      <Link href="/contracting" className="mt-6 inline-flex min-h-11 items-center gap-3 text-body-sm font-semibold text-gold-700 hover:underline focus-visible:underline underline-offset-4">Contracting details<ArrowRight aria-hidden className="size-4" /></Link>
    </div>
    <div className="rounded-container bg-cream p-5 md:p-7">
      <div className="flex items-center gap-3"><MapPin aria-hidden className="size-5 text-gold-700" /><h3 className="text-h4">{contact.office.label}</h3></div>
      <address className="mt-5 text-body not-italic text-ink-700">{contact.office.lines.map(line => <span key={line} className="block">{line}</span>)}</address>
      <ExternalLink href={contact.office.mapUrl} className="mt-3 min-h-11 text-body-sm font-semibold text-gold-700">View on map</ExternalLink>
      <div className="mt-3 divide-y divide-cream-border border-t border-cream-border">
        {[{ label: "Phone", value: contact.office.phone, href: contact.office.phoneHref, Icon: Phone }, { label: "Email", value: contact.emails.general, href: `mailto:${contact.emails.general}`, Icon: Mail }].map(({ label, value, href, Icon }) => <div key={label} className="group/fact flex min-w-0 items-center justify-between gap-2 py-3"><a href={href} className="flex min-h-11 min-w-0 items-center gap-3 text-body-sm font-semibold hover:text-gold-700 focus-visible:text-gold-700"><Icon aria-hidden className="size-4 shrink-0 text-gold-700" /><span className="min-w-0 break-words">{value}</span></a><CopyButton label={label} value={value} /></div>)}
      </div>
    </div>
  </div>;
}
