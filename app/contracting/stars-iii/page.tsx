import { Eyebrow } from "@/components/ui/Eyebrow";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { InPageNav } from "@/components/site/InPageNav";
import { FactBlock } from "@/components/site/FactBlock";
import { TeamCard } from "@/components/site/TeamCard";
import { CTABand } from "@/components/site/CTABand";
import { Placeholder } from "@/components/ui/Placeholder";
import { Button } from "@/components/ui/Button";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { starsIII, starsShown, starsConfirmed, starsOrdering } from "@/content/vehicles";
import { identifiers, naicsDescriptions } from "@/content/identifiers";
import { team } from "@/content/team";
import { contact } from "@/content/contact";
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
      <PageHero eyebrow="Contract vehicle" title="GSA 8(a) STARS III" lead="A Best in Class governmentwide acquisition contract for IT services. JVM Solutions is a prime." crumbs={[{ label: "Contracting", href: "/contracting" }, { label: "GSA 8(a) STARS III" }]} surface="cream">
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-container border border-ink-200 bg-white p-5">
            <Eyebrow tone="muted">Contract number</Eyebrow>
            <p data-figure className="mt-1 break-normal font-sans text-h3 font-medium text-ink-950 tabular">{starsIII.contractNumber}</p>
          </div>
          <div className="rounded-container border border-ink-200 bg-white p-5">
            <Eyebrow tone="muted">Ordering period</Eyebrow>
            <p data-figure className="mt-1 font-sans text-h3 font-medium text-ink-950 tabular">{starsOrdering.current}</p>
            {starsOrdering.history ? <p className="mt-1 text-body-sm text-ink-700 tabular">{starsOrdering.history}</p> : null}
            {starsConfirmed ? null : <Placeholder id="P5" className="mt-3" />}
            <p className="mt-2 text-body-sm text-ink-500">{starsIII.performanceTail}</p>
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
                <Button href={starsIII.gsaUrl} external variant="secondary" className="max-w-full whitespace-normal text-center">Visit the GSA 8(a) STARS III program page</Button>
              </div>
              <p className="mt-4 text-body-sm text-ink-700">For GSA’s own guidance, contact {starsIII.gsaContact.org} at <a href={`mailto:${starsIII.gsaContact.email}`} className="link-underline font-semibold text-gold-700 after:bg-current">{starsIII.gsaContact.email}</a> or <a href={starsIII.gsaContact.phoneHref} className="link-underline font-semibold text-gold-700 after:bg-current">{starsIII.gsaContact.phone}</a>.</p>
            </section>

            <section id="contacts" className="chapter-section scroll-mt-28">
              <h2 className="text-h2-sm md:text-h2">JVM Contacts for STARS III</h2>
              <p className="prose-measure mt-4 text-body text-ink-700">STARS III enquiries go to <a href={`mailto:${starsIII.jvmEmail}`} className="link-underline font-semibold text-gold-700 after:bg-current">{starsIII.jvmEmail}</a>.</p>
              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <TeamCard name={pm.name} role={pm.role} email={pm.contactRoute} />
                <TeamCard name={ceo.name} role={ceo.role} note={ceo.note} image={ceo.image} />
              </div>
              <p className="mt-4 text-body-sm text-ink-500">Main line <a href={contact.office.phoneHref} className="link-underline after:bg-current">{contact.office.phone}</a>. GSA program information at <ExternalLink href={starsIII.gsaUrl} className="text-gold-700">GSA’s STARS III program page</ExternalLink>.</p>
            </section>
          </div>
        </div>
      </Section>
      <CTABand title="Have a STARS III Requirement?" route="contracting" />
    </>
  );
}
