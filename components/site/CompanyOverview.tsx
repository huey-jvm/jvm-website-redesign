import Link from "next/link";
import Image from "@/components/ui/Image";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { CopyButton } from "@/components/ui/CopyButton";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { contact } from "@/content/contact";
import { statements } from "@/content/statements";
import { identifiers } from "@/content/identifiers";
import { credentials } from "@/content/credentials";

export function CompanyOverview() {
  return <div className="company-overview">
    <div className="company-profile">
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4"><div className="min-w-0"><p className="text-caption text-ink-500">Legal business name</p><h3 data-figure className="mt-3 max-w-3xl text-h3">{statements.companyName}</h3></div>
      <Link href="/contracting" className="inline-flex min-h-11 shrink-0 items-center gap-3 text-body-sm font-semibold text-gold-700 hover:underline focus-visible:underline underline-offset-4">Contracting details<ArrowRight aria-hidden className="size-4" /></Link></div>
      <dl className="company-facts mt-7 grid gap-6 text-body-sm sm:grid-cols-3">
        {[{ label: "Headquarters", value: `${contact.office.locality}, ${contact.office.regionName}` }, { label: "Ownership", value: identifiers.ownership }, { label: "Quality", value: credentials.find(c => c.slug === "iso-9001")!.name }].map(item => <div key={item.label} className="min-w-0"><dt className="text-caption text-ink-500">{item.label}</dt><dd className="mt-2 font-medium text-ink-950">{item.value}</dd></div>)}
      </dl>
      <div className="mt-5"><p className="text-caption text-ink-500">Set-asides</p><ul className="mt-3 flex flex-wrap gap-2">{identifiers.setAsides.map(value => <li key={value} className="rounded-pill border border-gold-500/40 bg-gold-200/20 px-3 py-1.5 text-body-sm font-medium">{value}</li>)}</ul></div>
    </div>
    <div className="company-office mt-8 grid overflow-hidden rounded-container md:grid-cols-[1.1fr_1fr]">
      <div className="office-map-preview relative min-h-60"><Image src="/images/location/texas-office-map.png" alt="Satellite map showing I-10 and surrounding streets in San Antonio" fill sizes="(min-width:1280px) 520px,(min-width:768px) 45vw,100vw" className="object-cover" /></div>
      <div className="min-w-0 p-6 md:p-8">
      <div className="flex items-center gap-3"><MapPin aria-hidden className="size-5 text-gold-700" /><h3 className="text-h4">{contact.office.label}</h3></div>
      <address className="mt-5 text-body not-italic text-ink-700">{contact.office.lines.map(line => <span key={line} className="block">{line}</span>)}</address>
      <ExternalLink href={contact.office.mapUrl} className="mt-3 min-h-11 text-body-sm font-semibold text-gold-700">View on map</ExternalLink>
      <div className="mt-3 divide-y divide-cream-border border-t border-cream-border">
        {[{ label: "Phone", value: contact.office.phone, href: contact.office.phoneHref, Icon: Phone }, { label: "Email", value: contact.emails.general, href: `mailto:${contact.emails.general}`, Icon: Mail }].map(({ label, value, href, Icon }) => <div key={label} className="group/fact flex min-w-0 items-center justify-between gap-2 py-3"><a href={href} className="flex min-h-11 min-w-0 items-center gap-3 text-body-sm font-semibold hover:text-gold-700 focus-visible:text-gold-700"><Icon aria-hidden className="size-4 shrink-0 text-gold-700" /><span className="min-w-0 break-words">{value}</span></a><CopyButton label={label} value={value} /></div>)}
      </div>
      </div>
    </div>
  </div>;
}
