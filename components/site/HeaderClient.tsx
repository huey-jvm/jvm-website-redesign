"use client";
import {
  lazy,
  Suspense,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import type { NavGroup } from "@/content/navigation";
import { OpenWidgetButton } from "./OpenWidgetButton";
import { cn } from "@/lib/cn";
const loadMenu = () =>
  import("./MobileMenu").then((m) => ({ default: m.MobileMenu }));
const MobileMenu = lazy(loadMenu);
function subscribeScroll(cb: () => void) {
  window.addEventListener("scroll", cb, { passive: true });
  return () => window.removeEventListener("scroll", cb);
}
function toggle(li: HTMLElement, open: boolean, instant: boolean) {
  li.dataset.open = String(open);
  li.dataset.instant = String(instant);
  li.querySelector("button")?.setAttribute("aria-expanded", String(open));
  const panel = li.querySelector<HTMLElement>("[data-menu-panel]");
  if (panel) {
    panel.inert = !open;
    panel.style.transitionDuration = instant ? "0s" : "";
  }
}
export function HeaderClient({
  nav,
  logo,
  utility,
  desktop,
}: {
  nav: NavGroup[];
  logo: ReactNode;
  utility: ReactNode;
  desktop: ReactNode;
}) {
  const pathname = usePathname();
  const scrolled = useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY > 4,
    () => false,
  );
  const navRef = useRef<HTMLElement>(null),
    menuButtonRef = useRef<HTMLButtonElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false),
    [menuMounted, setMenuMounted] = useState(false),
    [instant, setInstant] = useState(false);
  const [seenPath, setSeenPath] = useState(pathname);
  if (seenPath !== pathname) {
    setSeenPath(pathname);
    setMobileOpen(false);
  }
  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    menuButtonRef.current?.focus();
  }, []);
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const close = (instant: boolean) =>
      nav
        .querySelectorAll<HTMLElement>("[data-menu]")
        .forEach((li) => toggle(li, false, instant));
    close(true);
    nav.querySelectorAll<HTMLElement>("[data-nav-href]").forEach((el) => {
      const href = el.dataset.navHref!;
      const current = el.closest("[data-menu]")
        ? pathname === href
        : pathname === href || pathname.startsWith(href + "/");
      el.dataset.current = String(current);
      if (current) el.setAttribute("aria-current", "page");
      else el.removeAttribute("aria-current");
    });
    nav.querySelectorAll<HTMLElement>("[data-menu]").forEach((li) => {
      const current = [
        ...li.querySelectorAll<HTMLElement>("[data-nav-href]"),
      ].some(
        (el) =>
          pathname === el.dataset.navHref ||
          pathname.startsWith(el.dataset.navHref + "/"),
      );
      const button = li.querySelector("button")!;
      button.dataset.current = String(current);
    });
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const li = nav.querySelector<HTMLElement>(
        '[data-menu][data-open="true"]',
      );
      if (li) {
        e.preventDefault();
        close(true);
        if (nav.contains(document.activeElement))
          li.querySelector("button")?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!nav.contains(e.target as Node)) close(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [pathname]);
  return (
    <>
      {utility}
      <header
        className={cn(
          "sticky top-0 z-40 border-b border-ink-200 bg-white",
          scrolled && "shadow-header",
        )}
      >
        <div className="container-content flex h-15 items-center justify-between gap-4 lg:h-18">
          <button
            type="button"
            ref={menuButtonRef}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            className="inline-flex shrink-0 size-11 items-center justify-center rounded-control text-ink-900 hover:bg-ink-100 focus-visible:bg-ink-100 active:bg-ink-100 lg:hidden"
            onPointerEnter={() => {
              void loadMenu();
            }}
            onFocus={() => {
              void loadMenu();
            }}
            onClick={(e) => {
              setInstant(e.detail === 0);
              setMenuMounted(true);
              setMobileOpen(true);
            }}
          >
            <Menu aria-hidden className="size-6" />
          </button>
          {logo}
          <nav
            ref={navRef}
            aria-label="Primary"
            className="hidden lg:block"
            onClick={(e) => {
              const button = (e.target as HTMLElement).closest(
                "[data-menu-trigger]",
              );
              const li = button?.closest<HTMLElement>("[data-menu]");
              if (!li) return;
              const opening = li.dataset.open !== "true";
              navRef.current
                ?.querySelectorAll<HTMLElement>("[data-menu]")
                .forEach((other) =>
                  toggle(other, other === li && opening, e.detail === 0),
                );
            }}
            onBlur={(e) => {
              const li = (e.target as HTMLElement).closest<HTMLElement>(
                "[data-menu]",
              );
              if (li && !li.contains(e.relatedTarget as Node | null))
                toggle(li, false, true);
            }}
          >
            {desktop}
          </nav>
          <span className="hidden min-[22.5rem]:inline-flex lg:hidden">
            <OpenWidgetButton size="sm" />
          </span>
          <span className="hidden lg:inline-flex">
            <OpenWidgetButton />
          </span>
        </div>
        {menuMounted ? (
          <Suspense fallback={null}>
            <MobileMenu
              nav={nav}
              open={mobileOpen}
              instant={instant}
              onClose={closeMobile}
              pathname={pathname}
            />
          </Suspense>
        ) : null}
      </header>
    </>
  );
}
