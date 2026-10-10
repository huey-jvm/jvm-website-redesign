import { notFound } from "next/navigation";
import { PageHero } from "@/components/site/PageHero";
import { Section } from "@/components/site/Section";
import { CTABand } from "@/components/site/CTABand";
import { Placeholder } from "@/components/ui/Placeholder";
import { pastPerformance, confirmedSubcontractVehicles } from "@/content/vehicles";
import { contact } from "@/content/contact";
import { showPlaceholders } from "@/lib/placeholders";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("Past Performance", "Contracts, task orders, agencies and periods of performance.", "/contracting/past-performance");

export default function PastPerformancePage() {
  if (pastPerformance.length === 0 && !showPlaceholders) notFound();
  return (
    <>
      <PageHero eyebrow="Contracting" title="Past Performance" lead="Every record names the agency, JVM’s role and the period of performance, so a buyer can verify it." crumbs={[{ label: "Contracting", href: "/contracting" }, { label: "Past Performance" }]} />
      <Section className="pt-0 md:pt-0 lg:pt-0">
        {pastPerformance.length === 0 ? (
          <Placeholder id="P7">
            <p className="text-body-sm text-ink-900">This page does not ship until JVM supplies publishable records. In production the contracting overview carries one line: past performance available on request from {contact.emails.bd}.</p>
          </Placeholder>
        ) : (
          <div className="overflow-hidden rounded-container border border-ink-200">
            <table className="w-full text-body-sm">
              <thead className="bg-ink-50 text-left"><tr>
                <th scope="col" className="px-4 py-3 text-eyebrow font-semibold uppercase text-ink-500">Contract</th>
                <th scope="col" className="px-4 py-3 text-eyebrow font-semibold uppercase text-ink-500">Agency</th>
                <th scope="col" className="px-4 py-3 text-eyebrow font-semibold uppercase text-ink-500">Role</th>
                <th scope="col" className="px-4 py-3 text-right text-eyebrow font-semibold uppercase text-ink-500">Period</th>
                <th scope="col" className="px-4 py-3 text-eyebrow font-semibold uppercase text-ink-500">Scope</th>
              </tr></thead>
              <tbody>
                {pastPerformance.filter((p) => p.publishable).map((p) => (
                  <tr key={p.title} className="border-t border-ink-200">
                    <td className="px-4 py-3 font-medium text-ink-950">{p.title}</td>
                    <td className="px-4 py-3 text-ink-900">{p.agency}</td>
                    <td className="px-4 py-3 text-ink-900">{p.role}</td>
                    <td className="px-4 py-3 text-right text-ink-900 tabular">{p.period}</td>
                    <td className="px-4 py-3 text-ink-700">{p.scope}{p.cpars ? ` · CPARS ${p.cpars}` : ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {confirmedSubcontractVehicles.length ? (
          <>
            <h2 className="mt-14 text-h2-sm md:text-h2">Subcontract Vehicles</h2>
            <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              {confirmedSubcontractVehicles.map((v) => (
                <li key={v.slug} className="rounded-container border border-ink-200 bg-white p-5">
                  <h3 className="truncate text-h4" title={v.name}>{v.name}</h3>
                  <p className="mt-1 text-body-sm text-ink-700">{v.role}</p>
                  <p className="mt-1 text-body-sm text-ink-900 tabular">{v.orderingStart ? `${v.orderingStart} to ${v.currentEnd}` : `Through ${v.currentEnd}`}</p>
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </Section>
      <CTABand route="contracting" />
    </>
  );
}
