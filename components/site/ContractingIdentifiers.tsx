import type { ReactNode } from "react";
import { CopyButton } from "@/components/ui/CopyButton";
import { identifiers, naicsDescriptions } from "@/content/identifiers";
import { statements } from "@/content/statements";
import { starsIII, starsShown } from "@/content/vehicles";

function RecordField({ label, value, children }: { label: string; value: string; children?: ReactNode }) {
  return (
    <div className="group/fact grid gap-2 py-4 sm:grid-cols-[8rem_minmax(0,1fr)] sm:items-start sm:gap-5">
      <dt className="pt-3 text-body-sm text-ink-500">{label}</dt>
      <dd className="flex min-w-0 items-start justify-between gap-2">
        <div className="min-w-0 py-2 text-body text-ink-950">{children ?? <span data-figure className="tabular">{value}</span>}</div>
        <CopyButton value={value} label={label} />
      </dd>
    </div>
  );
}

export function ContractingIdentifiers() {
  return (
    <section className="contract-identifiers rounded-container border border-ink-200 border-t-[3px] border-t-gold-500 bg-white p-5 md:p-8" aria-labelledby="identifiers-title">
      <h2 id="identifiers-title" className="text-h3">Identifiers</h2>
      <dl className="mt-6">
        <div className="group/fact">
          <dt className="text-caption text-ink-500">Legal business name</dt>
          <dd className="mt-2 flex items-start justify-between gap-3">
            <span data-figure className="pt-2 text-lead-sm font-medium text-ink-950">{statements.companyName}</span>
            <CopyButton value={statements.companyName} label="Legal name" />
          </dd>
        </div>
      </dl>
      <dl className="mt-6 grid gap-3 sm:grid-cols-2">
        {[{ label: "UEI", value: identifiers.uei }, { label: "CAGE", value: identifiers.cage }].map(item => (
          <div key={item.label} className="group/fact min-w-0 rounded-control border border-ink-200 bg-ink-50 p-4">
            <dt className="text-eyebrow font-medium text-ink-500">{item.label}</dt>
            <dd className="mt-2 flex min-w-0 items-center justify-between gap-2">
              <span data-figure className="text-lead-sm font-semibold text-ink-950 tabular">{item.value}</span>
              <CopyButton value={item.value} label={item.label} />
            </dd>
          </div>
        ))}
      </dl>
      <dl className="mt-5 divide-y divide-ink-200">
        <RecordField label="Primary NAICS" value={identifiers.naicsPrimary}>
          <span data-figure className="font-medium tabular">{identifiers.naicsPrimary}</span>
          <span className="mt-1 block text-body-sm text-ink-500">{naicsDescriptions[identifiers.naicsPrimary]}</span>
        </RecordField>
        <RecordField label="Other NAICS" value={identifiers.naicsSecondary.join(", ")}>
          <ul className="flex flex-wrap gap-2">
            {identifiers.naicsSecondary.map(code => <li key={code} data-figure className="rounded-control bg-ink-50 px-2 py-1 text-body-sm tabular">{code}</li>)}
          </ul>
        </RecordField>
        <RecordField label="Set-asides" value={identifiers.setAsides.join(", ")}>
          <ul className="flex flex-wrap gap-2">
            {identifiers.setAsides.map(value => <li key={value} className="rounded-pill border border-gold-500/40 bg-gold-200/25 px-3 py-1 text-body-sm font-medium">{value}</li>)}
          </ul>
        </RecordField>
        <RecordField label="SAM" value={identifiers.samStatus}>
          <span className="inline-flex items-center gap-2 text-body-sm font-medium"><span aria-hidden className="size-1.5 rounded-pill bg-gold-700" />{identifiers.samStatus}</span>
        </RecordField>
        {starsShown ? <RecordField label="STARS III" value={starsIII.contractNumber}>
          <span data-figure className="font-medium tabular">{starsIII.contractNumber}</span>
          <span className="mt-1 block text-body-sm text-ink-500">8(a) prime contractor</span>
        </RecordField> : null}
      </dl>
    </section>
  );
}
