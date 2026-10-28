"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

export function ScrollEndNavigation({ current, children }: { current: string; children: ReactNode }) {
  const trigger = useRef<HTMLSpanElement>(null);
  const [visibleFor, setVisibleFor] = useState<string | null>(null);
  useEffect(() => {
    const element = trigger.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      setVisibleFor(entry.boundingClientRect.top <= window.innerHeight && window.scrollY > 0 ? current : null);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [current]);
  return <>
    <span ref={trigger} aria-hidden="true" className="mt-10 block h-px md:mt-12" />
    {visibleFor === current && createPortal(children, document.getElementById("main")!)}
  </>;
}
