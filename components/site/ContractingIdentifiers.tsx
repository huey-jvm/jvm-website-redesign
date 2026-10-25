import type { ReactNode } from "react";
import { ArrowRight, BadgeCheck, Landmark } from "lucide-react";
import Link from "next/link";
import { CopyButton } from "@/components/ui/CopyButton";
import { identifiers, naicsDescriptions } from "@/content/identifiers";
import { statements } from "@/content/statements";
import { starsIII, starsShown } from "@/content/vehicles";

function RecordField({ label, value, children, copy = true }: { label: string; value: string; children?: ReactNode; copy?: boolean }) {
  return <div className="group/fact grid gap-2 py-4 sm:grid-cols-[7rem_minmax(0,1fr)] sm:items-start sm:gap-5">
    <dt className="text-caption font-medium text-ink-500 sm:pt-2">{label}</dt>
    <dd className="flex min-w-0 items-start justify-between gap-2">
      <div className="min-w-0 py-1 text-body text-ink-950">{children ?? <span data-figure className="tabular">{value}</span>}</div>
      {copy ? <CopyButton value={value} label={label} /> : null}
    </dd>
  </div>;
}

export function ContractingIdentifiers() {
  return <section className="contract-identifiers min-w-0 overflow-hidden rounded-container border border-ink-200 bg-white" aria-labelledby="identifiers-title">
    <div className="surface-dark border-b-[3px] border-gold-500 bg-ink-950 p-5 text-cream md:p-7">
      <div className="flex items-center gap-3"><Landmark aria-hidden className="size-5 shrink-0 text-gold-500" /><h2 id="identifiers-title" className="text-h4 text-cream">Identifiers</h2></div>
      <dl className="mt-6"><div className="group/fact"><dt className="text-caption text-ink-200">Legal business name</dt><dd className="mt-2 flex items-start justify-between gap-3"><span data-figure className="pt-2 text-lead-sm font-medium text-cream">{statements.companyName}</span><CopyButton value={statements.companyName} label="Legal name" tone="dark" /></dd></div></dl>
    </div>
    <div className="p-5 md:p-7">
      <dl className="grid gap-5 border-b border-ink-200 pb-5 sm:grid-cols-2 sm:gap-8">
        {[{ label: "UEI", value: identifiers.uei }, { label: "CAGE", value: identifiers.cage }].map(item => <div key={item.label} className="group/fact min-w-0">
          <dt className="text-eyebrow font-medium text-ink-500">{item.label}</dt>
          <dd className="mt-2 flex min-w-0 items-center justify-between gap-2"><span data-figure className="text-lead-sm font-semibold text-ink-950 tabular">{item.value}</span><CopyButton value={item.value} label={item.label} /></dd>
        </div>)}
      </dl>
      <dl className="divide-y divide-ink-200">
        <RecordField label="Primary NAICS" value={identifiers.naicsPrimary}>
          <span data-figure className="font-medium tabular">{identifiers.naicsPrimary}</span><span className="mt-1 block text-body-sm text-ink-500">{naicsDescriptions[identifiers.naicsPrimary]}</span>
        </RecordField>
        <RecordField label="Other NAICS" value={identifiers.naicsSecondary.join(", ")}>
          <ul className="flex flex-wrap gap-2">{identifiers.naicsSecondary.map(code => <li key={code} data-figure className="rounded-control border border-ink-200 px-2 py-1 text-body-sm tabular">{code}</li>)}</ul>
        </RecordField>
        <RecordField label="Set-asides" value={identifiers.setAsides.join(", ")}>
          <ul className="flex flex-wrap gap-2">{identifiers.setAsides.map(value => <li key={value} className="rounded-pill border border-gold-500/40 bg-gold-200/25 px-3 py-1 text-body-sm font-medium">{value}</li>)}</ul>
        </RecordField>
        <RecordField label="SAM" value={identifiers.samStatus} copy={false}>
          <span className="inline-flex items-center gap-2 text-body-sm font-medium"><span aria-hidden className="size-1.5 rounded-pill bg-gold-700" />{identifiers.samStatus}</span>
        </RecordField>
      </dl>
      {starsShown ? <section className="mt-1 border-t border-ink-200 pt-5" aria-labelledby="identifier-vehicle-title">
        <div className="flex items-start gap-3"><BadgeCheck aria-hidden className="mt-0.5 size-5 shrink-0 text-gold-700" /><div><h3 id="identifier-vehicle-title" className="text-body font-semibold">{starsIII.name}</h3><p className="mt-1 text-body-sm text-ink-500">8(a) prime contractor</p></div></div>
        <dl className="surface-dark mt-4 rounded-control bg-ink-950 p-4 text-cream"><div className="group/fact">
          <dt className="text-caption text-ink-200">Contract number</dt>
          <dd className="mt-1 flex min-w-0 items-center justify-between gap-2"><span data-figure className="font-medium text-cream tabular">{starsIII.contractNumber}</span><CopyButton value={starsIII.contractNumber} label="STARS III" tone="dark" /></dd>
        </div></dl>
        <Link href="/contracting/stars-iii" className="mt-2 inline-flex min-h-11 items-center gap-3 text-body-sm font-semibold text-gold-700 underline-offset-4 hover:underline focus-visible:underline">View contract details<ArrowRight aria-hidden className="size-4" /></Link>
      </section> : null}
    </div>
  </section>;
}
