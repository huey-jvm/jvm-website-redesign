"use client";

import { lazy, Suspense, useEffect, useRef, useState } from "react";

const SkeletonBox = lazy(() => import("skullet/react").then(module => ({ default: module.SkeletonBox })));

export function OfficeMap({ src }: { src: string }) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [view, setView] = useState<"m" | "k">("m");
  const loaded = useRef(false);
  const [show, setShow] = useState(false);
  const finish = () => { loaded.current = true; setShow(false); };
  useEffect(() => {
    const target = root.current;
    if (!target) return;
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        setActive(true);
        observer.disconnect();
      }
    }, { rootMargin: "200px" });
    observer.observe(target);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!active) return;
    const timer = setTimeout(() => { if (!loaded.current) setShow(true); }, 150);
    // Third-party embeds can be blocked; never leave an endless loading state.
    const limit = setTimeout(() => setShow(false), 12000);
    return () => { clearTimeout(timer); clearTimeout(limit); };
  }, [view, active]);
  return <div ref={root} className="office-map-preview min-w-0">
    <div role="group" aria-label="Map view" className="flex gap-1 border-b border-cream-border bg-cream p-2">
      {([{ value: "m", label: "Map" }, { value: "k", label: "Satellite" }] as const).map(option => <button key={option.value} type="button" aria-pressed={view === option.value} onClick={() => { if(view === option.value) return; loaded.current = false; setShow(false); setView(option.value); }} className={`min-h-11 rounded-control px-4 text-body-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-700 ${view === option.value ? "bg-ink-950 text-white" : "text-ink-900 hover:bg-gold-200 focus-visible:bg-gold-200"}`}>{option.label}</button>)}
    </div>
    <div className="relative min-h-80">
    {active ? <iframe key={view} title="Map to JVM Solutions Texas Office" src={`${src}&t=${view}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" tabIndex={-1} inert aria-hidden="true" onLoad={finish} onError={finish} className="pointer-events-none absolute inset-0 h-full w-full select-none border-0" /> : null}
    {show && <span className="photo-loading" aria-hidden="true"><Suspense fallback={null}><SkeletonBox width="100%" height="100%" radius={0} /></Suspense></span>}
    </div>
  </div>;
}
