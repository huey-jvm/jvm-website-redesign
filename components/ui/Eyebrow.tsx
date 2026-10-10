import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Eyebrow({ children, tone = "light", className }: { children: ReactNode; tone?: "light" | "dark"; className?: string }) {
  return (
    <p className={cn("font-sans text-eyebrow font-semibold uppercase", tone === "dark" ? "text-gold-500" : "text-gold-700", className)}>
      {children}
    </p>
  );
}
