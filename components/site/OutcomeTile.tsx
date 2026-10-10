import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Outcome } from "@/content/outcomes";
import { cn } from "@/lib/cn";

export function OutcomeTile({ outcome, href }: { outcome: Outcome; href?: string }) {
  const inner = (
    <div className="p-4 @[20rem]:p-6 @[35rem]:p-8">
      <span aria-hidden className="block h-0.5 w-10 origin-left bg-gold-500 transition-transform duration-150 ease-move group-hover/card:scale-x-150 motion-reduce:group-hover/card:scale-x-100" />
      <h3 className="mt-4 text-h4 text-ink-950 group-hover/card:text-gold-700">{outcome.title}</h3>
      <p className="mt-2 text-body-sm text-ink-700">{outcome.teaser}</p>
      {href ? (
        <span className="mt-4 inline-flex items-center gap-1 text-body-sm font-semibold text-ink-900">
          Read more
          <ArrowRight aria-hidden className="size-4 transition-transform duration-150 ease group-hover/card:translate-x-1 motion-reduce:group-hover/card:translate-x-0" />
        </span>
      ) : null}
    </div>
  );
  const classes = "group/card @container flex h-full flex-col rounded-container border border-ink-200 bg-white transition-transform duration-150 ease-move hover:-translate-y-0.5 motion-reduce:hover:translate-y-0";
  return href ? (
    <Link href={href} className={cn(classes, "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-700")} aria-label={outcome.title}>{inner}</Link>
  ) : (
    <div className={classes}>{inner}</div>
  );
}
