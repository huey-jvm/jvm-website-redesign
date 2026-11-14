import type { RouteKey } from "@/content/contact";
export type WidgetRoute = RouteKey;

export const WIDGET_OPEN_EVENT = "jvm:open-contact-widget";

type WidgetOpenRequest = { route?: WidgetRoute; instant: boolean; opener: HTMLElement | null };
let pendingRequest: WidgetOpenRequest | undefined;

// Header hydration can finish before the widget subscribes. Keep the latest intent.
export function takeWidgetOpenRequest() {
  const request = pendingRequest;
  pendingRequest = undefined;
  return request;
}

export function openContactWidget(route?: WidgetRoute, instant = false) {
  if (typeof window === "undefined") return;
  pendingRequest = { route, instant, opener: document.activeElement instanceof HTMLElement ? document.activeElement : null };
  window.dispatchEvent(new CustomEvent(WIDGET_OPEN_EVENT, { detail: { route, instant } }));
}
