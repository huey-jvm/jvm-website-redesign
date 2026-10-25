"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { usePathname } from "next/navigation";

type Edge = { color: string; image: string; size: string; depth: number; before: number; after: number; destinationColor: string; destinationImage: string; destinationSize: string };

/** Continue the final page surface into the footer's empty top padding. */
export function FooterTransition() {
  const pathname = usePathname();
  const [edge, setEdge] = useState<Edge | null>(null);

  useEffect(() => {
    const main = document.getElementById("main");
    const footer = document.querySelector("footer");
    if (!main || !footer) return;
    let frame = 0;
    let disposed = false;
    let observed: Element | undefined;
    const schedule = () => {
      if (!disposed && !frame) frame = requestAnimationFrame(measure);
    };
    const resize = new ResizeObserver(schedule);
    const measure = () => {
      frame = 0;
      const previous = [...main.children].reverse().find((el): el is HTMLElement =>
        el instanceof HTMLElement && el.matches("section, div") && !el.hidden && el.offsetHeight > 0,
      );
      if (!previous || previous.classList.contains("page-skeleton")) { setEdge(null); return; }
      if (previous !== observed) {
        if (observed) resize.unobserve(observed);
        resize.observe(previous);
        observed = previous;
      }
      const from = previous.getBoundingClientRect(), to = footer.getBoundingClientRect();
      const paint = getComputedStyle(previous);
      const wrapper = footer.querySelector(":scope > .container-content");
      const after = Math.min(128, (wrapper ? parseFloat(getComputedStyle(wrapper).paddingTop) : 0) - 24);
      const before = Math.max(0, Math.min(64, parseFloat(paint.paddingBottom) - 12));
      const depth = before + after;
      if (after < 12 || Math.abs(from.bottom - to.top) > 2 || Math.abs(from.width - to.width) > 2) { setEdge(null); return; }
      const transparent = paint.backgroundColor === "transparent" || (paint.backgroundColor.startsWith("rgba") && paint.backgroundColor.endsWith(", 0)"));
      const destination = getComputedStyle(footer);
      const next = { color: transparent ? getComputedStyle(document.body).backgroundColor : paint.backgroundColor, image: paint.backgroundImage, size: `${from.width}px ${from.height}px`, depth, before, after, destinationColor: destination.backgroundColor, destinationImage: destination.backgroundImage, destinationSize: `${to.width}px ${to.height}px` };
      setEdge(current => JSON.stringify(current) === JSON.stringify(next) ? current : next);
    };
    const mutations = new MutationObserver(schedule);
    mutations.observe(main, { childList: true });
    resize.observe(footer);
    window.addEventListener("resize", schedule);
    void document.fonts.ready.then(schedule);
    schedule();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resize.disconnect();
      mutations.disconnect();
      window.removeEventListener("resize", schedule);
    };
  }, [pathname]);

  return edge ? (
    <div className="section-blend" aria-hidden="true" style={{ "--blend-depth": `${edge.depth}px`, "--blend-before": `${edge.before}px`, "--blend-after": `${edge.after}px`, "--blend-scale": edge.depth, "--blend-after-scale": edge.after } as CSSProperties}>
      <div className="section-blend-destination-edge" style={{ backgroundColor: edge.destinationColor, backgroundImage: edge.destinationImage, backgroundSize: edge.destinationSize }} />
      <div className="section-blend-destination" style={{ backgroundColor: edge.destinationColor, backgroundImage: edge.destinationImage, backgroundSize: edge.destinationSize }} />
      <div className="section-blend-source">
        <div className="section-blend-source-tail" style={{ backgroundColor: edge.color, backgroundImage: edge.image, backgroundSize: edge.size }} />
        <div className="section-blend-edge" style={{ backgroundColor: edge.color, backgroundImage: edge.image, backgroundSize: edge.size }} />
      </div>
    </div>
  ) : null;
}
