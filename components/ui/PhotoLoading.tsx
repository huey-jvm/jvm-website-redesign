"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { SkeletonBox } from "skullet/react";

// Preserve the server-rendered image and its dimensions. Fast/cached images
// never show an overlay; surrounding content remains available immediately.
export function PhotoLoading({ children }: { children: ReactNode }) {
  const root = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const image = root.current?.querySelector("img");
    if (!image) return;
    let disposed = false;
    let settled = false;
    const finish = async () => {
      try { if (image.naturalWidth) await image.decode(); } catch { /* Do not leave failed images behind a permanent loader. */ }
      settled = true;
      if (!disposed) setReady(true);
    };
    const timer = window.setTimeout(() => {
      if (!settled) setVisible(true);
    }, 150);
    image.addEventListener("load", finish);
    image.addEventListener("error", finish);
    if (image.complete) void finish();
    return () => {
      disposed = true;
      clearTimeout(timer);
      image.removeEventListener("load", finish);
      image.removeEventListener("error", finish);
    };
  }, []);

  return <span ref={root} style={{ display: "contents" }}>
    {children}
    {visible && <span className="photo-loading" data-ready={ready} aria-hidden="true">
      <SkeletonBox width="100%" height="100%" radius={0} />
    </span>}
  </span>;
}
