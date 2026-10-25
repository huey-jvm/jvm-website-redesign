import { Eyebrow } from "@/components/ui/Eyebrow";
import { ArrowUpRight, BadgeCheck, Landmark } from "lucide-react";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { InPageNav } from "@/components/site/InPageNav";
import { FactBlock } from "@/components/site/FactBlock";
import { TeamContact } from "@/components/site/TeamContact";
import { CTABand } from "@/components/site/CTABand";
import { Placeholder } from "@/components/ui/Placeholder";
import { Button } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { starsIII, starsShown, starsConfirmed, starsOrdering } from "@/content/vehicles";
import { identifiers, naicsDescriptions } from "@/content/identifiers";
import { team } from "@/content/team";
import { pageMetadata } from "@/lib/seo";

export const metadata = starsShown ? pageMetadata("GSA 8(a) STARS III", `JVM Solutions is a prime on GSA 8(a) STARS III, contract ${starsIII.contractNumber}. Scope, NAICS codes, ordering period and how to order.`, "/contracting/stars-iii") : {};

const nav = [
  { id: "about", label: "About the vehicle" },
  { id: "scope", label: "Scope" },
  { id: "naics", label: "NAICS codes" },
  { id: "ordering", label: "How to order" },
  { id: "contacts", label: "Contacts" },
];

export default function StarsPage() {
  if (!starsShown) notFound();
  const pm = team[1];
  const ceo = team[0];
  return (
    <>
      <PageHero className="stars-hero" eyebrow="Contract vehicle" title="GSA 8(a) STARS III" lead="A Best in Class governmentwide acquisition contract for IT services. JVM Solutions is a prime." crumbs={[{ label: "Contracting", href: "/contracting" }, { label: "GSA 8(a) STARS III" }]} surface="cream">
        <div className="stars-contract-summary surface-dark mt-10 grid grid-cols-1 gap-6 rounded-container border-t-[3px] border-gold-500 bg-ink-950 p-5 text-cream md:mt-12 md:grid-cols-2 md:gap-8 md:p-8">
          <div className="group/fact min-w-0">
            <div className="flex items-center gap-3"><BadgeCheck aria-hidden className="size-5 shrink-0 text-gold-500" /><Eyebrow tone="dark">Contract number</Eyebrow></div>
            <div className="mt-4 flex min-w-0 items-center justify-between gap-3"><p data-figure className="break-normal font-sans text-h3 font-medium text-cream tabular md:text-h2">{starsIII.contractNumber}</p><CopyButton value={starsIII.contractNumber} label="Contract number" tone="dark" /></div>
            <p className="mt-2 text-body-sm text-ink-200">JVM Solutions · Prime contractor</p>
          </div>
          <div className="min-w-0 border-t border-ink-700 pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-8">
            <Eyebrow tone="dark">Ordering period</Eyebrow>
            <p data-figure className="mt-4 font-sans text-h4 font-medium text-cream tabular md:text-h3">{starsOrdering.current}</p>
            {starsOrdering.history ? <p className="mt-2 text-body-sm text-ink-200 tabular">{starsOrdering.history}</p> : null}
            {starsConfirmed ? null : <Placeholder id="P5" className="mt-3" />}
            <p className="mt-3 max-w-[48ch] text-body-sm text-ink-200">{starsIII.performanceTail}</p>
          </div>
        </div>
      </PageHero>

      <Section>
        <div className="document-layout grid grid-cols-1 gap-10 pt-12 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16">
          <InPageNav sections={nav} />
          <div className="min-w-0 space-y-14">
            <section id="about" className="chapter-section scroll-mt-28">
              <h2 className="text-h2-sm md:text-h2">About the Vehicle</h2>
              <p className="prose-measure mt-4 text-body text-ink-700">{starsIII.description}</p>
              <FactBlock className="mt-6" facts={[
                { label: "Ceiling", value: starsIII.ceiling },
                { label: "Access fee", value: starsIII.accessFee },
                { label: "Contract types", value: starsIII.contractTypes.join(", ") },
                { label: "UEI", value: identifiers.uei, copy: true },
                { label: "CAGE", value: identifiers.cage, copy: true },
              ]} />
            </section>

            <section id="scope" className="chapter-section scroll-mt-28">
              <h2 className="text-h2-sm md:text-h2">Scope</h2>
              <p className="prose-measure mt-4 text-body text-ink-700">Federal agencies reach JVM through an established vehicle rather than open market methods, which saves time and money and gives access to proven service and technical capabilities. The offering ranges from simple to complex IT services and services-based solutions.</p>
              <ul className="mt-5 grid grid-cols-1 gap-x-8 gap-y-2 text-body text-ink-900 md:grid-cols-2">
                {starsIII.scope.map((s) => <li key={s} className="flex items-start gap-2"><span aria-hidden className="mt-2.5 h-0.5 w-4 shrink-0 bg-gold-500" />{s}</li>)}
              </ul>
            </section>

            <section id="naics" className="chapter-section scroll-mt-28">
              <h2 className="text-h2-sm md:text-h2">NAICS Codes</h2>
              <p className="prose-measure mt-4 text-body text-ink-700">The vehicle is centred on NAICS {identifiers.naicsPrimary} and may include other codes that are predominantly IT services.</p>
              <div className="@container mt-5"><div className="hidden overflow-hidden rounded-container border border-ink-200 @[35rem]:block">
                <table className="w-full text-body-sm">
                  <thead className="bg-ink-50 text-left">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-eyebrow font-semibold uppercase text-ink-500">Role</th>
                      <th scope="col" className="px-4 py-3 text-right text-eyebrow font-semibold uppercase text-ink-500">Code</th>
                      <th scope="col" className="px-4 py-3 text-eyebrow font-semibold uppercase text-ink-500">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[identifiers.naicsPrimary, ...identifiers.naicsSecondary].map((code, i) => (
                      <tr key={code} className="border-t border-ink-200">
                        <td className="px-4 py-3 text-ink-700">{i === 0 ? "Primary" : "Included"}</td>
                        <td data-figure className="px-4 py-3 text-right font-medium text-ink-950 tabular">{code}</td>
                        <td className="px-4 py-3 text-ink-900">{naicsDescriptions[code]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div><ul className="space-y-3 @[35rem]:hidden">{[identifiers.naicsPrimary, ...identifiers.naicsSecondary].map((code,i) => <li key={code} className="rounded-container border border-ink-200 bg-white p-4"><dl className="grid grid-cols-1 gap-2 text-body-sm"><dt className="text-ink-500">Role</dt><dd>{i === 0 ? "Primary" : "Included"}</dd><dt className="text-ink-500">Code</dt><dd data-figure className="font-sans font-medium tabular">{code}</dd><dt className="text-ink-500">Description</dt><dd>{naicsDescriptions[code]}</dd></dl></li>)}</ul></div>
            </section>

            <section id="ordering" className="chapter-section scroll-mt-28">
              <h2 className="text-h2-sm md:text-h2">How to Order</h2>
              <ul className="mt-5 space-y-2 text-body text-ink-900">
                {starsIII.benefits.map((b) => <li key={b} className="flex items-start gap-2"><span aria-hidden className="mt-2.5 h-0.5 w-4 shrink-0 bg-gold-500" />{b}</li>)}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href={starsIII.gsaUrl} external variant="primary" icon={<ArrowUpRight className="size-4 shrink-0" />} iconTrailing className="gsa-program-link max-w-full border border-gold-500/50 whitespace-normal text-center"><span className="inline-flex items-center gap-3"><Landmark aria-hidden className="size-5 shrink-0 text-gold-500" />Visit GSA’s STARS III program</span></Button>
              </div>
              <p className="mt-4 text-body-sm text-ink-700">For GSA’s own guidance, contact {starsIII.gsaContact.org} at <a href={`mailto:${starsIII.gsaContact.email}`} className="link-underline font-semibold text-gold-700 after:bg-current">{starsIII.gsaContact.email}</a> or <a href={starsIII.gsaContact.phoneHref} className="link-underline font-semibold text-gold-700 after:bg-current">{starsIII.gsaContact.phone}</a>.</p>
            </section>

            <section id="contacts" className="chapter-section scroll-mt-28">
              <h2 className="text-h2-sm md:text-h2">JVM Contacts for STARS III</h2>
              <p className="prose-measure mt-4 text-body text-ink-700">STARS III enquiries go to <a href={`mailto:${starsIII.jvmEmail}`} className="link-underline font-semibold text-gold-700 after:bg-current">{starsIII.jvmEmail}</a>.</p>
              <div className="mt-6 grid grid-cols-1 gap-5 xl:grid-cols-2">
                <TeamContact name={pm.name} role={pm.role} image={pm.image} email={pm.contactRoute} />
                <TeamContact name={ceo.name} role={ceo.role} note={ceo.note} image={ceo.image} />
              </div>
              <div className="stars-contact-resources mt-4 flex justify-end">
                <ExternalLink href={starsIII.gsaUrl} className="min-h-11 text-body-sm font-semibold text-gold-700">GSA program details</ExternalLink>
              </div>
            </section>
          </div>
        </div>
        <CTABand embedded title="Have a STARS III Requirement?" route="contracting" />
      </Section>
    </>
  );
}
