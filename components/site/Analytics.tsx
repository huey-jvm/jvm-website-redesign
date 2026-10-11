"use client";

import { lazy, Suspense, useEffect, useState } from "react";

const Analytics = lazy(() =>
  import("@vercel/analytics/next").then((m) => ({ default: m.Analytics })),
);

export function SiteAnalytics() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(() => setReady(true), {timeout:2000});
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(() => setReady(true), 0);
    return () => window.clearTimeout(id);
  }, []);
  return ready ? (
    <Suspense fallback={null}>
      <Analytics />
    </Suspense>
  ) : null;
}
