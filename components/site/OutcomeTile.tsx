import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Outcome } from "@/content/outcomes";
import { cn } from "@/lib/cn";
import { OutcomeArt } from "./OutcomeArt";
import { illustrationShape } from "@/content/assets";

const arrow = "size-4 transition-transform duration-150 ease-hover group-hover/card:translate-x-1 group-focus-visible/card:translate-x-1 group-focus-visible/card:transition-none motion-reduce:group-hover/card:translate-x-0 motion-reduce:group-focus-visible/card:translate-x-0";
const art = { aspectRatio: `${illustrationShape.width} / ${illustrationShape.height}` };

export function OutcomeRow({ outcome, index, href }: { outcome: Outcome; index: number; href: string }) {
  return (
    <Link
      href={href}
      aria-label={outcome.title}
      className="outcome-row group/card grid grid-cols-[minmax(0,1fr)_6rem] items-center gap-4 py-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-700 md:grid-cols-[2.5rem_minmax(0,1fr)_10rem] md:gap-6"
    >
      <span aria-hidden className="hidden self-start pt-1 text-body-sm font-semibold text-gold-700 tabular md:block">{String(index + 1).padStart(2, "0")}</span>
      <div className="min-w-0">
        <h3 title={outcome.title} className="text-h4 text-ink-950 transition-colors duration-150 ease-hover group-hover/card:text-gold-700 group-focus-visible/card:text-gold-700 group-focus-visible/card:transition-none md:text-h3">{outcome.title}</h3>
        <p className="mt-2 max-w-[60ch] text-body-sm text-ink-700 md:text-body">{outcome.body}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-body-sm font-semibold text-ink-900">
          Read more
          <ArrowRight aria-hidden className={arrow} />
        </span>
      </div>
      <div className="outcome-art overflow-hidden rounded-control border border-ink-200 bg-ink-50" style={art}>
        <OutcomeArt outcomeId={outcome.id} />
      </div>
    </Link>
  );
}

export function OutcomeTile({ outcome, href }: { outcome: Outcome; href?: string }) {
  const inner = (
    <>
      <div className="outcome-art shrink-0 border-b border-ink-200 bg-ink-50" style={art}>
        <OutcomeArt outcomeId={outcome.id} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col p-4 @[20rem]:p-6 @[35rem]:p-8">
        <h3 title={outcome.title} className="text-h4 text-ink-950 transition-colors duration-150 ease-hover group-hover/card:text-gold-700 group-focus-visible/card:text-gold-700 group-focus-visible/card:transition-none">{outcome.title}</h3>
        <p className="mt-2 text-body-sm text-ink-700">{outcome.body}</p>
        {href ? (
          <span className="mt-auto inline-flex items-center gap-1 pt-4 text-body-sm font-semibold text-ink-900">
            Read more
            <ArrowRight aria-hidden className={arrow} />
          </span>
        ) : null}
      </div>
    </>
  );
  const classes = "@container flex h-full flex-col overflow-hidden rounded-container border border-ink-200 bg-white";
  return href ? (
    <Link href={href} className={cn(classes, "group/card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-700")} aria-label={outcome.title}>{inner}</Link>
  ) : (
    <div className={classes}>{inner}</div>
  );
}
