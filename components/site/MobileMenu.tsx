"use client";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, Phone, Mail } from "lucide-react";
import type { NavGroup } from "@/content/navigation";
import { contact } from "@/content/contact";
import { isolateModal } from "@/lib/modal";
import { cn } from "@/lib/cn";
import { CloseButton } from "./CloseButton";
function isCurrent(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href + "/");
}
export function MobileMenu({
  nav,
  open,
  onClose,
  pathname,
  instant,
}: {
  nav: NavGroup[];
  instant: boolean;
  open: boolean;
  onClose: () => void;
  pathname: string;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);
  const [instantDismiss, setInstantDismiss] = useState(false);
  const shown = open && (instant || entered);
  useEffect(() => {
    // A lazily mounted drawer needs a painted closed frame before its first
    // transition. Later toggles simply retarget the same persistent panel.
    let second = 0;
    const first = requestAnimationFrame(() => { second = requestAnimationFrame(() => setEntered(true)); });
    return () => { cancelAnimationFrame(first); cancelAnimationFrame(second); };
  }, []);
  const releaseRef = useRef<(() => void) | undefined>(undefined);
  const close = useCallback(() => {
    releaseRef.current?.();
    releaseRef.current = undefined;
    onClose();
  }, [onClose]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [chevronInstant, setChevronInstant] = useState(false);

  useEffect(() => {
    if (!shown) return;
    const surface = panelRef.current?.parentElement;
    if (!surface) return;
    const release = isolateModal(surface);
    releaseRef.current = release;
    const first = panelRef.current?.querySelector<HTMLElement>("button, a");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setInstantDismiss(true);
        close();
      }
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled])",
        );
        const list = Array.from(focusables).filter(
          (el) =>
            el.getClientRects().length > 0 &&
            getComputedStyle(el).visibility === "visible",
        );
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
  }, [shown, close]);

  return (
    <div
      id="mobile-menu"
      inert={!shown}
      aria-hidden={!shown}
      data-open={shown}
      data-instant={instant || (!open && instantDismiss)}
      className="mobile-drawer fixed inset-0 z-50 lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
    >
      <div
        className="mobile-drawer-backdrop absolute inset-0 bg-ink-950/40"
        onClick={() => { setInstantDismiss(false); close(); }}
        aria-hidden
      />
      <div
        ref={panelRef}
        className="mobile-drawer-panel absolute inset-y-0 left-0 flex w-[min(22rem,88vw)] flex-col border-r border-ink-200 bg-white"
      >
        <div className="flex h-15 items-center justify-between border-b border-ink-200 px-4">
          <span className="font-semibold text-h4 text-ink-950">Menu</span>
          <CloseButton
            label="Close menu"
            onClick={(e) => {
              setInstantDismiss(e.detail === 0);
              close();
            }}
          />
        </div>
        <nav aria-label="Primary" className="min-h-0 flex-1 overflow-y-auto px-2 py-3" onClick={(event) => {
          if (event.target instanceof Element && event.target.closest("a[href]")) { setInstantDismiss(event.detail === 0); close(); }
        }}>
          <ul>
            {nav.map((group) =>
              group.href ? (
                <li key={group.label}>
                  <Link
                    href={group.href}
                    scroll={group.href.includes("#")}
                    aria-current={
                      isCurrent(pathname, group.href) ? "page" : undefined
                    }
                    className={cn(
                      "flex min-h-11 items-center rounded-control px-3 text-body font-medium text-ink-950 hover:bg-cream focus-visible:bg-cream active:bg-cream",
                      isCurrent(pathname, group.href) && "bg-gold-200",
                    )}
                  >
                    {group.label}
                  </Link>
                </li>
              ) : (
                <li key={group.label}>
                  <button
                    type="button"
                    className="flex min-h-11 w-full items-center justify-between rounded-control px-3 text-left text-body font-medium text-ink-950 hover:bg-cream focus-visible:bg-cream active:bg-cream"
                    aria-expanded={expanded === group.label}
                    onClick={(e) => {
                      setChevronInstant(e.detail === 0);
                      setExpanded(expanded === group.label ? null : group.label);
                    }}
                  >
                    {group.label}
                    <ChevronDown
                      aria-hidden
                      className={cn(
                        "size-4 motion-reduce:transition-none",
                        !chevronInstant && "transition-transform duration-150 ease-hover",
                        expanded === group.label && "rotate-180",
                      )}
                    />
                  </button>
                  <ul
                    hidden={expanded !== group.label}
                    className="mb-2 ml-3 border-l-2 border-ink-200"
                  >
                    {(group.items ?? []).map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          scroll={item.href.includes("#")}
                          aria-current={
                            pathname === item.href ? "page" : undefined
                          }
                          className={cn(
                            "flex min-h-11 items-center rounded-control px-3 text-body text-ink-900 hover:bg-cream focus-visible:bg-cream active:bg-cream",
                            isCurrent(pathname, item.href) && "bg-gold-200",
                          )}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ),
            )}
          </ul>
        </nav>
        <div className="border-t border-ink-200 px-5 py-4 text-body-sm text-ink-700">
          <a
            href={contact.office.phoneHref}
            className="flex min-h-11 items-center gap-2"
          >
            <Phone aria-hidden className="size-4" />
            {contact.office.phone}
          </a>
          <a
            href={`mailto:${contact.emails.general}`}
            className="flex min-h-11 items-center gap-2"
          >
            <Mail aria-hidden className="size-4" />
            {contact.emails.general}
          </a>
        </div>
      </div>
    </div>
  );
}
