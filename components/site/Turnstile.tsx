"use client";
import { useEffect, useRef, type RefObject } from "react";
declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
      remove: (id?: string) => void;
    };
  }
}

let turnstileReady: Promise<void> | undefined;
function loadTurnstile() {
  return (turnstileReady ??= new Promise<void>((resolve, reject) => {
    if (window.turnstile) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      turnstileReady = undefined;
      reject(new Error("Verification unavailable"));
    };
    document.head.appendChild(script);
  }));
}

export function Turnstile({
  siteKey,
  tokenRef,
  resetRef,
}: {
  siteKey: string;
  tokenRef: RefObject<string | undefined>;
  resetRef: RefObject<(() => void) | undefined>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let cancelled = false;
    let widgetId: string | undefined;
    const reset = () => {
      tokenRef.current = undefined;
      if (widgetId) window.turnstile?.reset(widgetId);
    };
    resetRef.current = reset;
    void loadTurnstile()
      .then(() => {
        if (cancelled || !ref.current || !window.turnstile) return;
        widgetId = window.turnstile.render(ref.current, {
          sitekey: siteKey,
          callback: (token: string) => {
            tokenRef.current = token;
          },
          "expired-callback": () => {
            tokenRef.current = undefined;
          },
          appearance: "interaction-only",
        });
      })
      .catch(() => {
        tokenRef.current = undefined;
      });
    return () => {
      cancelled = true;
      tokenRef.current = undefined;
      if (widgetId) window.turnstile?.remove(widgetId);
      if (resetRef.current === reset) resetRef.current = undefined;
    };
  }, [siteKey, tokenRef, resetRef]);
  return <div ref={ref} />;
}
