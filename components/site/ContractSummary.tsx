import { BadgeCheck } from "lucide-react";
import { CopyButton } from "@/components/ui/CopyButton";
import { starsIII } from "@/content/vehicles";

export function ContractSummary() {
  return <aside className="contract-at-glance surface-dark min-w-0 rounded-container border border-ink-800 border-t-[3px] border-t-gold-500 bg-ink-950 p-5 text-cream md:p-7" aria-labelledby="contract-summary-title">
    <div className="flex items-center gap-3"><BadgeCheck aria-hidden className="size-5 shrink-0 text-gold-500" /><h3 id="contract-summary-title" className="text-body-sm font-medium text-gold-500">Contract at a glance</h3></div>
    <p className="mt-5 text-h3 font-medium text-cream">{starsIII.name}</p>
    <p className="mt-3 inline-flex items-center gap-2 rounded-pill border border-gold-500/35 bg-gold-500/10 px-3 py-1 text-caption font-medium text-gold-200"><span aria-hidden className="size-1.5 rounded-pill bg-gold-500" />Prime contractor</p>
    <div className="group/fact mt-6 rounded-control border border-ink-700 bg-ink-800 px-3 py-3">
      <p className="text-caption text-ink-200">Contract number</p>
      <div className="mt-1 flex min-w-0 items-center justify-between gap-2"><p data-figure className="text-body-sm font-medium text-cream tabular sm:text-body">{starsIII.contractNumber}</p><CopyButton value={starsIII.contractNumber} label="Contract number" tone="dark" /></div>
    </div>
  </aside>;
}
