"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { ChevronDown, Menu, Phone, Mail } from "lucide-react";
import type { NavGroup } from "@/content/navigation";
import { contact } from "@/content/contact";
import { cn } from "@/lib/cn";
import { OpenWidgetButton } from "./OpenWidgetButton";
import { CloseButton } from "./CloseButton";

function subscribeScroll(cb: () => void) {
  window.addEventListener("scroll", cb, { passive: true });
  return () => window.removeEventListener("scroll", cb);
}

function isCurrent(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");
}

function groupIsCurrent(pathname: string, group: NavGroup) {
  if (group.href) return isCurrent(pathname, group.href);
  return (group.items ?? []).some((i) => isCurrent(pathname, i.href));
}

export function Header({ nav }: { nav: NavGroup[] }) {
  const pathname = usePathname();
  const scrolled = useSyncExternalStore(subscribeScroll, () => window.scrollY > 4, () => false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [instant, setInstant] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [seenPath, setSeenPath] = useState(pathname);
  const navRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  if (seenPath !== pathname) {
    setSeenPath(pathname);
    setOpenGroup(null);
    setMobileOpen(false);
  }

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const hoverOpen = (label: string) => {
    window.clearTimeout(closeTimer.current);
    setInstant(false);
    setOpenGroup(label);
  };
  const hoverClose = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenGroup(null), 160);
  };
  const press = (label: string, e: React.MouseEvent) => {
    window.clearTimeout(closeTimer.current);
    const mouse = e.detail > 0 && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setInstant(!mouse);
    setOpenGroup(mouse || openGroup !== label ? label : null);
  };

  useEffect(() => {
    if (!openGroup) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpenGroup(null); };
    const onClick = (e: MouseEvent) => { if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenGroup(null); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("mousedown", onClick); };
  }, [openGroup]);

  return (
    <header className={cn("sticky top-0 z-40 bg-white transition-shadow duration-150 ease", scrolled ? "shadow-header" : "border-b border-ink-200")}>
      <div className="container-content flex h-15 items-center justify-between gap-4 lg:h-18">
        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-control text-ink-900 hover:bg-ink-100 focus-visible:bg-ink-100 active:bg-ink-100 lg:hidden"
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen(true)}
        >
          <Menu aria-hidden className="size-6" />
        </button>

        <Link href="/" className="inline-flex shrink-0 items-center rounded-control focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-700" aria-label="JVM Solutions, home">
          <Image src="/images/brand/jvm-logo-480.png" alt="JVM Solutions" width={480} height={222} priority className="h-10 w-auto lg:h-12" />
        </Link>

        <nav ref={navRef} aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((group) => {
              const current = groupIsCurrent(pathname, group);
              const baseItem = cn(
                "relative inline-flex h-11 items-center gap-1 rounded-control px-3 text-body font-medium text-ink-900 transition-colors duration-150 ease hover:bg-ink-50 focus-visible:bg-ink-50 active:bg-ink-100",
                "after:absolute after:inset-x-3 after:bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:bg-gold-500 after:transition-transform after:duration-150 after:ease-move hover:after:scale-x-100 focus-visible:after:scale-x-100 active:after:scale-x-100 motion-reduce:after:transition-none",
                current && "after:scale-x-100",
              );
              if (group.href) {
                return (
                  <li key={group.label}>
                    <Link href={group.href} className={baseItem} aria-current={current ? "page" : undefined}>{group.label}</Link>
                  </li>
                );
              }
              return (
                <MenuGroup
                  key={group.label}
                  group={group}
                  current={current}
                  open={openGroup === group.label}
                  instant={instant}
                  onPress={(e) => press(group.label, e)}
                  onHoverStart={() => hoverOpen(group.label)}
                  onHoverEnd={hoverClose}
                  onFocusLeave={() => { window.clearTimeout(closeTimer.current); setOpenGroup((g) => (g === group.label ? null : g)); }}
                  className={baseItem}
                  pathname={pathname}
                />
              );
            })}
          </ul>
        </nav>

        <span className="lg:hidden"><OpenWidgetButton size="sm" label="Contact us" /></span>
        <div className="hidden items-center gap-2 lg:flex">
          <a href={contact.office.phoneHref} aria-label={`Call ${contact.office.phone}`} className="header-contact hidden xl:inline-flex size-11 items-center justify-center rounded-control text-ink-700 hover:bg-cream focus-visible:bg-cream active:bg-gold-200"><Phone aria-hidden className="size-4" /></a>
          <a href={`mailto:${contact.emails.general}`} aria-label={`Email ${contact.emails.general}`} className="header-contact hidden xl:inline-flex size-11 items-center justify-center rounded-control text-ink-700 hover:bg-cream focus-visible:bg-cream active:bg-gold-200"><Mail aria-hidden className="size-4" /></a>
          <OpenWidgetButton />
        </div>
      </div>

      <MobileMenu nav={nav} open={mobileOpen} onClose={() => setMobileOpen(false)} pathname={pathname} />
    </header>
  );
}

function MenuGroup({ group, current, open, instant, onPress, onHoverStart, onHoverEnd, onFocusLeave, className, pathname }: { group: NavGroup; current: boolean; open: boolean; instant: boolean; onPress: (e: React.MouseEvent) => void; onHoverStart: () => void; onHoverEnd: () => void; onFocusLeave: () => void; className: string; pathname: string }) {
  const id = useId();
  return (
    <li
      className="relative"
      onPointerEnter={(e) => { if (e.pointerType === "mouse") onHoverStart(); }}
      onPointerLeave={(e) => { if (e.pointerType === "mouse") onHoverEnd(); }}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node | null)) onFocusLeave(); }}
    >
      <button type="button" className={className} aria-expanded={open} aria-controls={id} aria-current={current ? "true" : undefined} onClick={onPress}>
        {group.label}
        <ChevronDown aria-hidden className={cn("size-4", !instant && "transition-transform duration-150 ease", open && "rotate-180")} />
      </button>
      <div
        id={id}
        className={cn(
          "absolute left-0 top-full z-50 w-[26rem] origin-top-left pt-1",
          !instant && "transition-[opacity,transform,visibility] duration-150 ease-enter",
          open ? "visible scale-100 opacity-100" : "pointer-events-none invisible scale-95 opacity-0",
        )}
      >
        <div className="rounded-container border border-ink-200 bg-white p-2 shadow-float">
          <ul className="space-y-2">
            {(group.items ?? []).map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={cn(
                    "flex min-h-11 flex-col justify-center gap-1 rounded-control border border-transparent px-4 py-3 hover:bg-cream focus-visible:bg-cream active:bg-gold-200 focus-visible:outline-2 focus-visible:outline-gold-700",
                    pathname === item.href && "border-gold-700 bg-cream",
                  )}
                >
                  <span className="text-body font-medium text-ink-950">{item.label}</span>
                  {item.description ? <span className="text-body-sm text-ink-500">{item.description}</span> : null}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
}

function MobileMenu({ nav, open, onClose, pathname }: { nav: NavGroup[]; open: boolean; onClose: () => void; pathname: string }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = panelRef.current?.querySelector<HTMLElement>("button, a");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
        const list = Array.from(focusables);
        const firstEl = list[0], lastEl = list[list.length - 1];
        if (e.shiftKey && document.activeElement === firstEl) { e.preventDefault(); lastEl.focus(); }
        else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); firstEl.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; document.removeEventListener("keydown", onKey); };
  }, [open, onClose]);

  return (
    <div id="mobile-menu" hidden={!open} className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
      <div className="absolute inset-0 bg-ink-950/40" onClick={onClose} aria-hidden />
      <div ref={panelRef} className={cn("absolute inset-y-0 left-0 flex w-[min(22rem,88vw)] flex-col bg-white shadow-float transition-transform duration-200 ease-enter", open ? "translate-x-0" : "-translate-x-full")}>
        <div className="flex h-15 items-center justify-between border-b border-ink-200 px-4">
          <span className="font-display text-h4 text-ink-950">Menu</span>
          <CloseButton label="Close menu" onClick={onClose} />
        </div>
        <nav aria-label="Primary" className="flex-1 overflow-y-auto px-2 py-3">
          <ul>
            {nav.map((group) =>
              group.href ? (
                <li key={group.label}>
                  <Link href={group.href} aria-current={isCurrent(pathname, group.href) ? "page" : undefined} className={cn("flex min-h-11 items-center rounded-control px-3 text-body font-medium text-ink-950 hover:bg-cream focus-visible:bg-cream active:bg-cream", isCurrent(pathname, group.href) && "bg-gold-200")}>{group.label}</Link>
                </li>
              ) : (
                <li key={group.label}>
                  <button type="button" className="flex min-h-11 w-full items-center justify-between rounded-control px-3 text-left text-body font-medium text-ink-950 hover:bg-cream focus-visible:bg-cream active:bg-cream" aria-expanded={expanded === group.label} onClick={() => setExpanded(expanded === group.label ? null : group.label)}>
                    {group.label}
                    <ChevronDown aria-hidden className={cn("size-4 transition-transform duration-150", expanded === group.label && "rotate-180")} />
                  </button>
                  <ul hidden={expanded !== group.label} className="mb-2 ml-3 border-l-2 border-ink-200">
                    {(group.items ?? []).map((item) => (
                      <li key={item.href}>
                        <Link href={item.href} aria-current={pathname === item.href ? "page" : undefined} className={cn("flex min-h-11 items-center px-3 text-body text-ink-900 hover:bg-cream focus-visible:bg-cream active:bg-cream", isCurrent(pathname, item.href) && "bg-gold-200")}>{item.label}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ),
            )}
          </ul>
        </nav>
        <div className="border-t border-ink-200 px-5 py-4 text-body-sm text-ink-700">
          <a href={contact.office.phoneHref} className="flex min-h-11 items-center gap-2"><Phone aria-hidden className="size-4" />{contact.office.phone}</a>
          <a href={`mailto:${contact.emails.general}`} className="flex min-h-11 items-center gap-2"><Mail aria-hidden className="size-4" />{contact.emails.general}</a>
        </div>
      </div>
    </div>
  );
}
