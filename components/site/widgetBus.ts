export type WidgetRoute = "contracting" | "health-system" | "careers" | "other";

export const WIDGET_OPEN_EVENT = "jvm:open-contact-widget";

export function openContactWidget(route?: WidgetRoute) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(WIDGET_OPEN_EVENT, { detail: { route } }));
}
