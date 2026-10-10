import type { ReactNode } from "react";
import { showPlaceholders } from "@/lib/placeholders";
import { placeholderRegister } from "@/content/placeholders";
import { cn } from "@/lib/cn";

type Props = {
  id: string;
  what?: string;
  who?: string;
  children?: ReactNode;
  className?: string;
  inline?: boolean;
};

/**
 * Wraps a content gap. In preview it renders a visible, labelled block with the fallback beneath it.
 * In production it renders the fallback alone, or nothing.
 */
export function Placeholder({ id, what, who, children, className, inline }: Props) {
  const entry = placeholderRegister[id];
  const label = what ?? entry?.what ?? "Content pending";
  const owner = who ?? entry?.who ?? "JVM";

  if (!showPlaceholders) return children ? <>{children}</> : null;

  if (inline) {
    return (
      <span className={cn("rounded-control border-2 border-dashed border-gold-700 bg-cream px-2 py-0.5 text-body-sm text-ink-900", className)} title={`${label}. Settled by ${owner}.`}>
        <span className="font-semibold uppercase tracking-[0.1em] text-caption text-gold-700">Placeholder · {id}</span>{" "}
        {children ?? label}
      </span>
    );
  }

  return (
    <div className={cn("rounded-container border-2 border-dashed border-gold-700 bg-cream p-4", className)} role="note" aria-label={`Placeholder ${id}`}>
      <p className="text-eyebrow font-semibold uppercase text-gold-700">Placeholder · {id}</p>
      <p className="mt-1 text-body-sm text-ink-900">
        {label}. <span className="text-ink-500">Settled by {owner}.</span>
      </p>
      {children ? <div className="mt-3 text-ink-900 [&_*]:text-ink-900!">{children}</div> : null}
    </div>
  );
}
