import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Eyebrow({ children, tone = "light", className, as: Tag = "p" }: { children: ReactNode; tone?: "light" | "dark" | "muted"; as?: "p" | "span" | "h2" | "dt"; className?: string }) {
  return (
    <Tag className={cn("font-sans text-eyebrow font-semibold uppercase", tone === "dark" ? "text-gold-500" : tone === "muted" ? "text-ink-500" : "text-gold-700", className)}>
      {children}
    </Tag>
  );
}
