"use client";
import { useEffect } from "react";

export function ActiveSectionTracker({ ids, label }: { ids: string[]; label: string }) {
  useEffect(() => {
    const sections = ids.map(id => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el));
    const nav = Array.from(document.querySelectorAll(".document-nav")).find(el => el.getAttribute("aria-label") === label);
    if (!nav || !sections.length) return;
    const observer = new IntersectionObserver(() => {
      const active = sections.find(el => {
        const box = el.getBoundingClientRect();
        return box.top < innerHeight * 0.55 && box.bottom > 72;
      });
      nav.querySelectorAll("a").forEach(link => {
        if (link.getAttribute("href") === `#${active?.id}`) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    }, { rootMargin: "-72px 0px -45% 0px", threshold: [0, 1] });
    sections.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, label]);
  return null;
}
