import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Outcome } from "@/content/outcomes";
import { cn } from "@/lib/cn";
import { OutcomeArt } from "./OutcomeArt";
import { illustrationShape } from "@/content/assets";

export function OutcomeTile({ outcome, href }: { outcome: Outcome; href?: string }) {
  const inner = (
    <>
      <div className="shrink-0 border-b border-ink-200 bg-ink-50" style={{ aspectRatio: `${illustrationShape.width} / ${illustrationShape.height}` }}>
        <OutcomeArt outcomeId={outcome.id} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col p-4 @[20rem]:p-6 @[35rem]:p-8">
        <h3 title={outcome.title} className="truncate text-h4 text-ink-950 group-hover/card:text-gold-700 group-focus-visible/card:text-gold-700">{outcome.title}</h3>
        <p className="mt-2 line-clamp-2 text-body-sm text-ink-700">{outcome.body}</p>
        {href ? (
          <span className="mt-auto inline-flex items-center gap-1 pt-4 text-body-sm font-semibold text-ink-900">
            Read more
            <ArrowRight aria-hidden className="size-4 transition-transform duration-150 ease-hover group-hover/card:translate-x-1 group-focus-visible/card:translate-x-1 group-focus-visible/card:transition-none motion-reduce:group-hover/card:translate-x-0 motion-reduce:group-focus-visible/card:translate-x-0" />
          </span>
        ) : null}
      </div>
    </>
  );
  const classes = " @container flex h-full flex-col overflow-hidden rounded-container border border-ink-200 bg-white";
  return href ? (
    <Link href={href} className={cn(classes, "group/card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-700")} aria-label={outcome.title}>{inner}</Link>
  ) : (
    <div className={classes}>{inner}</div>
  );
}
