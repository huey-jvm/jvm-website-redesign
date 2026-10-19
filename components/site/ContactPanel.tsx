"use client";
import { Suspense, lazy, useEffect, useRef, type RefObject } from "react";
import { isolateModal } from "@/lib/modal";
import { CloseButton } from "./CloseButton";
import type { WidgetRoute } from "./widgetBus";
import { cn } from "@/lib/cn";
import { contact } from "@/content/contact";
const ContactForm = lazy(() =>
  import("./ContactForm").then((m) => ({ default: m.ContactForm })),
);
export function ContactPanel({
  open,
  route,
  instant,
  close,
  onExited,
  launcherRef,
  releaseRef,
}: {
  open: boolean;
  route?: WidgetRoute;
  instant: boolean;
  close: (keyboard?: boolean) => void;
  onExited: () => void;
  launcherRef: RefObject<HTMLButtonElement | null>;
  releaseRef: RefObject<(() => void) | undefined>;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;
    const release = isolateModal(
      panel,
      launcherRef.current ? [launcherRef.current] : [],
    );
    releaseRef.current = release;
    const first = panel?.querySelector<HTMLElement>("button");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close(true);
        return;
      }
      if (e.key === "Tab" && panel) {
        const list = Array.from(
          panel.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), input:not([type="hidden"]):not([tabindex="-1"]), textarea, [tabindex="0"]',
          ),
        ).filter(
          (el) =>
            el.getClientRects().length > 0 &&
            getComputedStyle(el).visibility === "visible",
        );
        if (list.length === 0) return;
        const firstEl = list[0],
          lastEl = list[list.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      if (releaseRef.current === release) {
        release();
        releaseRef.current = undefined;
      }
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close, launcherRef, releaseRef]);

  return (
    <>
      <div
        aria-hidden
        onClick={() => close(false)}
        className={cn(
          "fixed inset-0 z-40 bg-ink-950/60 transition-opacity ease-enter",
          open ? "opacity-100 duration-200" : "pointer-events-none opacity-0 duration-150",
          instant && "transition-none",
        )}
      />
      <div
        id="contact-widget-panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Start a conversation"
        inert={!open}
        onTransitionEnd={(e) => {
          if (e.target === e.currentTarget && e.propertyName === "opacity" && !open) onExited();
        }}
        className={cn(
          "fixed z-50 flex flex-col overflow-hidden border-t-4 border-gold-500 bg-white shadow-float",
          "inset-x-0 bottom-0 max-h-[92dvh] rounded-t-container",
          "md:inset-auto md:left-1/2 md:top-1/2 md:max-h-[min(46rem,calc(100dvh-4rem))] md:w-[34rem] md:-translate-x-1/2 md:rounded-container",
          "motion-reduce:scale-100",
          !instant &&
            (open
              ? "transition-[opacity,translate,scale] duration-250 ease-enter"
              : "transition-[opacity,translate,scale,visibility] duration-150 ease-enter"),
          open
            ? "visible opacity-100 max-md:translate-y-0 md:-translate-y-1/2 md:scale-100"
            : "pointer-events-none invisible opacity-0 max-md:translate-y-full md:-translate-y-[48%] md:scale-95 max-md:motion-reduce:translate-y-0",
        )}
      >
        <div className="surface-dark relative flex items-start justify-between gap-4 bg-ink-950 px-6 pb-6 pt-5 md:px-8 md:pt-7">
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-gold-500" />
          <div>
            <p className="font-sans text-eyebrow font-semibold uppercase text-gold-500">Talk to JVM</p>
            <h3 className="mt-2 text-h2-sm text-cream md:text-h2">Start a conversation</h3>
            <p className="mt-2 max-w-[38ch] text-body-sm text-ink-200">Tell us who you are and what you need. A real person reads every message and replies within {contact.responseTime}.</p>
          </div>
          <CloseButton tone="dark" label="Close" onClick={(e) => close(e.detail === 0)} className="-mr-2 -mt-1 shrink-0" />
        </div>
        <div className="overflow-y-auto px-6 py-6 md:px-8 md:py-7">
          <Suspense fallback={<p role="status" className="text-body-sm text-ink-500">Loading the contact form…</p>}>
            <ContactForm key={route ?? "none"} initialRoute={route} compact autoFocus />
          </Suspense>
        </div>
      </div>
    </>
  );
}
