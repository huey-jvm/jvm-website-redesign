"use client";
import { Eyebrow } from "@/components/ui/Eyebrow";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export type NavSection = { id: string; label: string };

export function InPageNav({ sections, label = "On this page" }: { sections: NavSection[]; label?: string }) {
  const [active, setActive] = useState<string | undefined>();

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter((el): el is HTMLElement => Boolean(el));
    if (els.length === 0) return;
    const observer = new IntersectionObserver(
      () => {
        const visible = els.filter((el) => {
          const rect = el.getBoundingClientRect();
          return rect.top < window.innerHeight * 0.55 && rect.bottom > 72;
        });
        setActive(visible[0]?.id);
      },
      { rootMargin: "-72px 0px -45% 0px", threshold: [0, 1] },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav aria-label={label} className="document-nav sticky top-15 z-30 -mx-4 bg-white px-4 py-2 lg:top-28 lg:mx-0 lg:self-start lg:bg-transparent lg:px-0 lg:py-0">
      <Eyebrow tone="light" className="mb-3 hidden     lg:block">{label}</Eyebrow>
      <ul className="-mx-4 flex gap-2 overflow-x-auto px-4 py-2 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 lg:pb-0">
        {sections.map((s) => {
          const current = s.id === active;
          return (
            <li key={s.id} className="shrink-0">
              <a
                href={`#${s.id}`}
                aria-current={current ? "location" : undefined}
                className={cn(
                  "flex min-h-11 items-center whitespace-nowrap rounded-pill px-3 py-1.5 text-body-sm font-medium transition-colors duration-150 ease-hover focus-visible:transition-none lg:whitespace-normal lg:rounded-none lg:border-l-2 lg:px-3 lg:py-2",
                  current
                    ? "bg-gold-200 text-ink-950 lg:border-gold-500 lg:bg-transparent"
                    : "bg-ink-100 text-ink-700 hover:text-ink-950 focus-visible:text-ink-950 lg:border-ink-200 lg:bg-transparent lg:hover:border-ink-400 lg:focus-visible:border-ink-400",
                )}
              >
                {s.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
