"use client";

import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { MessageSquareText } from "lucide-react";
const loadForm = () => import("./ContactForm").then((m) => ({ default: m.ContactForm }));
const loadPanel = () => import("./ContactPanel").then(m => ({default:m.ContactPanel}));
const ContactPanel = lazy(loadPanel);
import { WIDGET_OPEN_EVENT, type WidgetRoute } from "./widgetBus";
import { cn } from "@/lib/cn";

const SESSION_KEY = "jvm:widget:dismissed";
export function ContactWidget() {
  const pathname = usePathname();
  const [overDark, setOverDark] = useState(false);
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState<WidgetRoute | undefined>();
  const [instant, setInstant] = useState(false);
  const [mounted, setMounted] = useState(false);
  const releaseRef = useRef<(() => void) | undefined>(undefined);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const read = () => { const rect = launcherRef.current?.getBoundingClientRect(); if (!rect) return; const surface = document.elementsFromPoint(rect.right + 4, rect.top + rect.height / 2).find((el) => !el.closest(".widget-launcher")); setOverDark(Boolean(surface?.closest(".surface-dark"))); };
    read(); window.addEventListener("scroll", read, {passive:true}); window.addEventListener("resize",read); return () => {window.removeEventListener("scroll",read);window.removeEventListener("resize",read);};
  }, [pathname]);
  const close = useCallback((keyboard = false) => {
    setInstant(keyboard);
    if (keyboard) setMounted(false);
    releaseRef.current?.();
    releaseRef.current = undefined;
    setOpen(false);
    try { sessionStorage.setItem(SESSION_KEY, "1"); } catch {}
    const opener = openerRef.current;
    (opener && opener.isConnected ? opener : launcherRef.current)?.focus();
  }, []);


  useEffect(() => {
    const onOpen = (e: Event) => {
      void loadForm(); void loadPanel();
      const detail = (e as CustomEvent<{ route?: WidgetRoute; instant?: boolean }>).detail;
      openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setRoute(detail?.route);
      setInstant(Boolean(detail?.instant));
      setMounted(true);
      setOpen(true);
    };
    window.addEventListener(WIDGET_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(WIDGET_OPEN_EVENT, onOpen);
  }, []);


  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        onPointerEnter={() => { void loadForm(); void loadPanel(); }} onFocus={() => { void loadForm(); }}
        onClick={(e) => { if (open) close(e.detail === 0); else { openerRef.current = launcherRef.current; setRoute(undefined); setInstant(e.detail === 0); setMounted(true); setOpen(true); } }}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="contact-widget-panel"
        className={cn(
          "widget-launcher group/launcher fixed z-50 flex items-center gap-3 border-2 border-transparent bg-ink-950 text-gold-500 shadow-float transition-[scale,opacity] duration-150 ease-enter",
          "hover:border-gold-500 hover:bg-gold-200 hover:text-ink-950 focus-visible:text-ink-950 focus-visible:border-gold-500 focus-visible:bg-gold-200 focus-visible:text-ink-950 focus-visible:transition-none active:bg-gold-500 active:text-ink-950",
          "focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] motion-reduce:active:scale-100",
          "inset-x-0 bottom-0 h-14 justify-center rounded-none md:inset-x-auto md:bottom-6 md:left-6 md:size-14 md:px-0 md:rounded-pill",
          open && "pointer-events-none opacity-0 md:pointer-events-auto md:opacity-100",
          overDark ? "focus-visible:outline-gold-500" : "focus-visible:outline-gold-700",
          open && "border-gold-500 bg-gold-200 text-ink-950",
        )}
      >
        <MessageSquareText aria-hidden className="size-6" />
        <span className="text-body font-semibold text-white group-hover/launcher:text-ink-950 group-focus-visible/launcher:text-ink-950 group-active/launcher:text-ink-950 group-aria-expanded/launcher:text-ink-950 md:pointer-events-none md:absolute md:left-full md:top-1/2 md:ml-3 md:-translate-y-1/2 md:whitespace-nowrap md:rounded-pill md:border md:border-ink-800 md:bg-ink-950 md:px-4 md:py-2 md:shadow-float md:group-hover/launcher:text-white md:group-focus-visible/launcher:text-white md:group-active/launcher:text-white md:group-aria-expanded/launcher:text-white md:opacity-0 md:group-hover/launcher:opacity-100 md:group-focus-visible/launcher:opacity-100 md:transition-opacity md:duration-150 md:ease-hover md:group-focus-visible/launcher:transition-none">{open ? "Close conversation" : "Start a conversation"}</span>
      </button>

      {mounted ? <Suspense fallback={null}><ContactPanel open={open} route={route} instant={instant} close={close} onExited={() => setMounted(false)} launcherRef={launcherRef} releaseRef={releaseRef} /></Suspense> : null}
    </>
  );
}
