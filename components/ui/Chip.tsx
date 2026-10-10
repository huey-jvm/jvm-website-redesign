import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Chip({ children, tone = "light", className }: { children: ReactNode; tone?: "light" | "dark" | "gold"; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill px-3 py-1.5 font-sans text-body-sm font-medium leading-none",
        tone === "light" && "bg-ink-100 text-ink-900",
        tone === "dark" && "bg-ink-800 text-ink-200",
        tone === "gold" && "bg-gold-200 text-ink-950",
        className,
      )}
    >
      {children}
    </span>
  );
}
