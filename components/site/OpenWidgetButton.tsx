"use client";

import { Button } from "@/components/ui/Button";
import { openContactWidget } from "./widgetBus";

export function OpenWidgetButton({ tone = "light", size = "md", route, label = "Start a conversation", variant = "primary", className }: { tone?: "light" | "dark"; size?: "sm" | "md" | "lg"; route?: "contracting" | "health-system" | "careers" | "other"; label?: string; variant?: "primary" | "secondary" | "tertiary"; className?: string }) {
  return (
    <Button variant={variant} tone={tone} size={size} className={className} onClick={(e) => openContactWidget(route, e.detail === 0)}>
      {label}
    </Button>
  );
}
