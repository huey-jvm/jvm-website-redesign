"use client";

import { useEffect, useRef } from "react";
import { withBasePath } from "@/lib/base-path";
import { cn } from "@/lib/cn";

type Handle = { set: (v: number) => void; destroy: () => void };
type HairlineWindow = Window & { hairlineMount?: (stage: HTMLElement, name: string, out: HTMLElement | null) => Handle | null };

let loading: Promise<void> | undefined;
function load() {
  loading ??= new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = withBasePath("/hairline/figures.js");
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => { loading = undefined; reject(new Error("hairline figures failed to load")); };
    document.head.append(script);
  });
  return loading;
}

export function HairlineFigure({ name, label, className, media }: { name: string; label: string; className?: string; media?: string }) {
  const stage = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (media && !window.matchMedia(media).matches) return;
    let live = true;
    let handle: Handle | null = null;
    load()
      .then(() => {
        const mount = (window as HairlineWindow).hairlineMount;
        if (live && stage.current && mount) handle = mount(stage.current, name, null);
      })
      .catch(() => {});
    return () => {
      live = false;
      handle?.destroy();
    };
  }, [name, media]);
  return (
    <div className={cn("hairline-frame relative", className)}>
      <div ref={stage} role="img" aria-label={label} className="hairline-stage aspect-[5/4] w-full" />
    </div>
  );
}
