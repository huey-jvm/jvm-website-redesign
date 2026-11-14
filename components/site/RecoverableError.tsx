"use client";

import { lazy, Suspense, useSyncExternalStore } from "react";

const ErrorState = lazy(() => import("./ErrorState").then(module => ({ default: module.ErrorState })));

function subscribe(callback: () => void) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}

export function RecoverableError({ reset }: { reset: () => void }) {
  const online = useSyncExternalStore(subscribe, () => navigator.onLine, () => true);
  return <Suspense fallback={<section className="error-state"><div className="error-state-content container-content"><h1>{online ? "A brief interruption" : "Let’s reconnect"}</h1><button className="mt-8 min-h-11 underline" onClick={reset}>Try again</button></div></section>}><ErrorState kind={online ? "unavailable" : "offline"} retry={reset} /></Suspense>;
}
