"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/** Reset forward link navigation without overriding anchors or history restoration. */
export function PageNavigationScroll() {
  const pathname = usePathname();
  const destination = useRef<string | null>(null);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!(link instanceof HTMLAnchorElement) || link.download || (link.target && link.target !== "_self")) return;
      const url = new URL(link.href);
      destination.current = url.origin === location.origin && !url.hash && url.pathname !== location.pathname
        ? url.pathname : null;
    }
    function onHistory() { destination.current = null; }
    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onHistory);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onHistory);
    };
  }, []);

  useEffect(() => {
    if (!destination.current || destination.current !== location.pathname || location.hash) return;
    destination.current = null;
    // A streamed route may still show its loading shell when pathname changes.
    // Wait for the actual heading before running after the router's scroll pass.
    let frame = 0;
    const place = () => {
      const title = Array.from(document.querySelectorAll("main h1"))
        .find(element => element.getClientRects().length > 0);
      if (!title) return;
      observer.disconnect();
      const utility = document.querySelector(".jvm-utility");
      const utilityHeight = utility?.getBoundingClientRect().height ?? 0;
      const entryOffset = window.matchMedia("(min-width: 1024px)").matches ? 64 : 0;
      const headerHeight = document.querySelector("header")?.getBoundingClientRect().height ?? 72;
      // Hide the contact strip, then move one small scroll into the opening
      // section. Cap the offset so short/mobile heroes keep their title clear.
      const titleLimit = title.getBoundingClientRect().top + window.scrollY - headerHeight - 24;
      const top = Math.max(utilityHeight, Math.min(utilityHeight + entryOffset, titleLimit));
      window.scrollTo({ top, left: 0, behavior: "instant" });
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => { frame = requestAnimationFrame(place); });
    };
    const observer = new MutationObserver(schedule);
    observer.observe(document.getElementById("main")!, { childList: true, subtree: true });
    schedule();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); };
  }, [pathname]);

  return null;
}
