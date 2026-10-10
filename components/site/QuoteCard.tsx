import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type Attribution = { name: string; role?: string; organisation?: string };

export function QuoteCard({ children, attribution, className }: { children: ReactNode; attribution?: Attribution; className?: string }) {
  return (
    <figure className={cn("@container rounded-container border border-cream-border bg-cream", className)}>
      <div className="p-4 @[20rem]:p-6 @[35rem]:p-8">
        <span aria-hidden className="block h-0.5 w-10 bg-gold-500" />
        <blockquote className="prose-measure mt-4 text-lead-sm text-ink-900 @[35rem]:text-lead">{children}</blockquote>
        {attribution ? (
          <figcaption className="mt-4 text-body-sm text-ink-700">
            <span className="font-semibold text-ink-950">{attribution.name}</span>
            {[attribution.role, attribution.organisation].filter(Boolean).map((part) => <span key={part}>, {part}</span>)}
          </figcaption>
        ) : null}
      </div>
    </figure>
  );
}
