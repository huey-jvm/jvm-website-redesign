"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { CloseButton } from "./CloseButton";

export type Announcement = { id: string; title: string; body?: string; href?: string; linkLabel?: string; start?: string; end?: string };

const listeners = new Set<() => void>();
function subscribe(cb: () => void) { listeners.add(cb); return () => { listeners.delete(cb); }; }
function keyFor(id: string) { return `jvm:announcement:${id}`; }
function readDismissed(id: string) {
  try { return localStorage.getItem(keyFor(id)) === "dismissed"; } catch { return false; }
}
function dismiss(id: string) {
  try { localStorage.setItem(keyFor(id), "dismissed"); } catch {}
  listeners.forEach((l) => l());
}
function inWindow(a: Announcement) {
  const now = Date.now();
  if (a.start && new Date(a.start).getTime() > now) return false;
  if (a.end && new Date(a.end).getTime() < now) return false;
  return true;
}

export function AnnouncementBanner({ announcement }: { announcement?: Announcement }) {
  const dismissed = useSyncExternalStore(
    subscribe,
    () => (announcement ? readDismissed(announcement.id) : true),
    () => true,
  );

  if (!announcement || dismissed || !inWindow(announcement)) return null;

  return (
    <div role="region" aria-label="Announcement" className="border-b border-cream-border bg-cream">
      <div className="container-content flex items-center justify-between gap-4 py-2">
        <p className="min-w-0 text-body text-ink-900">
          <span className="font-semibold">{announcement.title}</span>
          {announcement.body ? <span className="text-ink-700"> {announcement.body}</span> : null}
          {announcement.href ? (
            <>
              {" "}
              <Link href={announcement.href} className="link-underline font-semibold text-gold-700 after:bg-current">{announcement.linkLabel ?? "Read more"}</Link>
            </>
          ) : null}
        </p>
        <CloseButton
          label="Dismiss announcement"
          onClick={() => dismiss(announcement.id)}
        />
      </div>
    </div>
  );
}
