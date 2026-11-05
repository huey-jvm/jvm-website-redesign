"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

export function ScrollEndNavigation({ current, children }: { current: string; children: ReactNode }) {
  const trigger = useRef<HTMLSpanElement>(null);
  const [visibleFor, setVisibleFor] = useState<string | null>(null);
  useEffect(() => {
    const element = trigger.current;
    if (!element) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      setVisibleFor(element.getBoundingClientRect().top <= window.innerHeight && window.scrollY > 0 ? current : null);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    // Scroll events also catch jumps that skip over the one-pixel trigger.
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const observer = new ResizeObserver(schedule);
    observer.observe(document.getElementById("main")!);
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
    };
  }, [current]);
  return <>
    <span ref={trigger} aria-hidden="true" className="mt-10 block h-px md:mt-12" />
    {visibleFor === current && createPortal(children, document.getElementById("main")!)}
  </>;
}
