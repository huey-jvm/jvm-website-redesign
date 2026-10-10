import type { ReactNode } from "react";
import { CopyButton } from "@/components/ui/CopyButton";
import { cn } from "@/lib/cn";

export type Fact = { label: string; value: string; copy?: boolean; note?: ReactNode; href?: string };

export function FactBlock({ facts, tone = "light", className, title, headingLevel: Tag = "h3" }: { facts: Fact[]; tone?: "light" | "dark"; className?: string; title?: string; headingLevel?: "h2" | "h3" }) {
  return (
    <div className={cn("rounded-container border p-5 md:p-6", tone === "dark" ? "border-ink-800 bg-ink-900" : "border-ink-200 bg-white", className)}>
      {title ? <Tag className={cn("mb-4 truncate text-h4", tone === "dark" ? "text-cream" : "text-ink-950")} title={title}>{title}</Tag> : null}
      <dl className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] gap-x-4 gap-y-3 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        {facts.map((f) => (
          <div key={f.label} className="group/fact contents">
            <dt className={cn("text-body-sm", tone === "dark" ? "text-ink-300" : "text-ink-500")}>{f.label}</dt>
            <dd className={cn("flex min-w-0 items-start justify-between gap-2 text-body font-medium tabular break-words", tone === "dark" ? "text-cream" : "text-ink-950")}>
              <span className="min-w-0 break-words" data-figure>{f.href ? <a href={f.href} className={cn("link-underline after:bg-current", tone === "dark" ? "hover:text-gold-500" : "hover:text-gold-700")}>{f.value}</a> : f.value}{f.note ? <span className={cn("ml-2 text-body-sm font-normal", tone === "dark" ? "text-ink-300" : "text-ink-500")}>{f.note}</span> : null}</span>
              {f.copy ? <CopyButton value={f.value} label={f.label} tone={tone} /> : null}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
