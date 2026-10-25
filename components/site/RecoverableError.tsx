"use client";

import { useSyncExternalStore } from "react";
import { ErrorState } from "./ErrorState";

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
  return <ErrorState kind={online ? "unavailable" : "offline"} retry={reset} />;
}
