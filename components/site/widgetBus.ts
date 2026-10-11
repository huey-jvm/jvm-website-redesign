import type { RouteKey } from "@/content/contact";
export type WidgetRoute = RouteKey;

export const WIDGET_OPEN_EVENT = "jvm:open-contact-widget";

export function openContactWidget(route?: WidgetRoute, instant = false) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(WIDGET_OPEN_EVENT, { detail: { route, instant } }));
}
