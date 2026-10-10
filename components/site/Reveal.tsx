"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function Reveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = ref.current;
    const grid = wrapper?.firstElementChild;
    if (!wrapper || !grid || typeof IntersectionObserver === "undefined") return;
    grid.querySelectorAll<HTMLElement>(":scope > li").forEach((item, i) => item.style.setProperty("--i", String(Math.min(i, 7))));
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          wrapper.setAttribute("data-reveal", "in");
          observer.disconnect();
        } else {
          wrapper.setAttribute("data-reveal", "armed");
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(grid);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} data-reveal="" className="contents">{children}</div>;
}
