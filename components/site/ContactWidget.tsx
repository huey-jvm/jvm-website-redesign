"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { MessageSquareText } from "lucide-react";
import { ContactForm } from "./ContactForm";
import { CloseButton } from "./CloseButton";
import { WIDGET_OPEN_EVENT, type WidgetRoute } from "./widgetBus";
import { cn } from "@/lib/cn";

const SESSION_KEY = "jvm:widget:dismissed";
const RM_QUERY = "(prefers-reduced-motion: reduce)";
function subscribeReducedMotion(cb: () => void) {
  const mq = window.matchMedia(RM_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
function readReducedMotion() { return window.matchMedia(RM_QUERY).matches; }

export function ContactWidget() {
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState<WidgetRoute | undefined>();
  const reduceMotion = useSyncExternalStore(subscribeReducedMotion, readReducedMotion, () => false);
  const pathname = usePathname();
  const [pastHero, setPastHero] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    try { sessionStorage.setItem(SESSION_KEY, "1"); } catch {}
    const opener = openerRef.current;
    (opener && opener.isConnected ? opener : launcherRef.current)?.focus();
  }, []);

  useEffect(() => {
    const hero = document.querySelector("main > :first-child");
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting && entry.boundingClientRect.bottom < (entry.rootBounds?.top ?? 0) + 1),
      { rootMargin: "-72px 0px 0px 0px" },
    );
    observer.observe(hero);
    return () => {
      observer.disconnect();
      setPastHero(false);
    };
  }, [pathname]);

  useEffect(() => {
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent<{ route?: WidgetRoute }>).detail;
      openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setRoute(detail?.route);
      setOpen(true);
    };
    window.addEventListener(WIDGET_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(WIDGET_OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const first = panel?.querySelector<HTMLElement>("input, button, a, textarea");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); close(); return; }
      if (e.key === "Tab" && panel) {
        const list = Array.from(panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([type="hidden"]):not([tabindex="-1"]), textarea, [tabindex="0"]')).filter((el) => el.offsetParent !== null || el.classList.contains("sr-only"));
        if (list.length === 0) return;
        const firstEl = list[0], lastEl = list[list.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) { e.preventDefault(); lastEl.focus(); }
        else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); firstEl.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        onClick={() => { if (open) close(); else { openerRef.current = launcherRef.current; setRoute(undefined); setOpen(true); } }}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="contact-widget-panel"
        className={cn(
          "widget-launcher group/launcher fixed z-50 flex items-center gap-3 border-2 border-transparent bg-ink-950 text-gold-500 shadow-float transition-[transform,opacity] duration-150 ease-enter",
          "hover:border-gold-500 hover:bg-gold-200 hover:text-ink-950 focus-visible:border-gold-500 focus-visible:bg-gold-200 focus-visible:text-ink-950 focus-visible:transition-none active:bg-gold-500 active:text-ink-950",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 active:scale-[0.98] motion-reduce:active:scale-100",
          "inset-x-0 bottom-0 h-14 justify-center rounded-none md:inset-x-auto md:bottom-6 md:left-6 md:h-14 md:min-w-14 md:rounded-pill md:px-4 lg:px-5",
          open && "pointer-events-none opacity-0 md:pointer-events-auto md:opacity-100",
          open && "border-gold-500 bg-gold-200 text-ink-950",
          !pastHero && "invisible translate-y-2 opacity-0",
        )}
      >
        <MessageSquareText aria-hidden className="size-6" />
        <span className="text-body font-semibold text-white group-hover/launcher:text-ink-950 group-focus-visible/launcher:text-ink-950 group-active/launcher:text-ink-950 group-aria-expanded/launcher:text-ink-950">{open ? "Close conversation" : "Start a conversation"}</span>
      </button>

      <div
        id="contact-widget-panel"
        ref={panelRef}
        role="dialog"
        aria-modal="false"
        aria-label="Start a conversation"
        hidden={!open}
        className={cn(
          "fixed z-50 flex flex-col bg-white shadow-float",
          "inset-x-0 bottom-0 max-h-[92dvh] rounded-t-container border-t border-ink-200",
          "md:inset-x-auto md:bottom-24 md:left-6 md:max-h-[min(44rem,calc(100dvh-8rem))] md:w-[25rem] md:rounded-container md:border",
          !reduceMotion && "origin-bottom-left transition-[opacity,transform] duration-250 ease-enter",
          open ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-2 scale-95 opacity-0",
        )}
      >
        <div className="flex items-center justify-between border-b border-ink-200 px-5 py-3">
          <h2 className="text-h4 text-ink-950">Start a conversation</h2>
          <CloseButton label="Close" onClick={close} />
        </div>
        <div className="overflow-y-auto px-5 py-5">
          {open ? <ContactForm key={route ?? "none"} initialRoute={route} compact autoFocus /> : null}
        </div>
      </div>
    </>
  );
}
