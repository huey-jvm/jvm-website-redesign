"use client";
import { Suspense, lazy, useEffect, useRef, type RefObject } from "react";
import { isolateModal } from "@/lib/modal";
import { CloseButton } from "./CloseButton";
import type { WidgetRoute } from "./widgetBus";
import { cn } from "@/lib/cn";
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
    <div
      id="contact-widget-panel"
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Start a conversation"
      inert={!open}
      onTransitionEnd={(e) => {
        if (
          e.target === e.currentTarget &&
          e.propertyName === "opacity" &&
          !open
        )
          onExited();
      }}
      className={cn(
        "fixed z-50 flex flex-col bg-white shadow-float",
        "inset-x-0 bottom-0 max-h-[92dvh] rounded-t-container border-t border-ink-200",
        "md:inset-x-auto md:bottom-24 md:left-6 md:max-h-[min(44rem,calc(100dvh-8rem))] md:w-[25rem] md:rounded-container md:border",
        "origin-bottom-left motion-reduce:translate-y-0 motion-reduce:scale-100",
        !instant &&
          (open
            ? "transition-[opacity,translate,scale] duration-250 ease-enter"
            : "transition-[opacity,translate,scale,visibility] duration-150 ease-enter"),
        open
          ? "visible translate-y-0 scale-100 opacity-100"
          : "pointer-events-none invisible translate-y-2 scale-95 opacity-0 max-md:translate-y-full max-md:scale-100 max-md:motion-reduce:translate-y-0",
      )}
    >
      <div className="flex items-center justify-between border-b border-ink-200 px-5 py-3">
        <h3 className="text-h4 text-ink-950">Start a conversation</h3>
        <CloseButton label="Close" onClick={(e) => close(e.detail === 0)} />
      </div>
      <div className="overflow-y-auto px-5 py-5">
        {true ? (
          <Suspense fallback={<p role="status">Loading the contact form…</p>}>
            <ContactForm
              key={route ?? "none"}
              initialRoute={route}
              compact
              autoFocus
            />
          </Suspense>
        ) : null}
      </div>
    </div>
  );
}
