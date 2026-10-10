import type { ComponentPropsWithoutRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

export function CloseButton({ tone = "light", className, label = "Close", ...rest }: ComponentPropsWithoutRef<"button"> & { tone?: "light" | "dark"; label?: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cn(
        "group/close inline-flex size-11 items-center justify-center rounded-control transition-[color,outline-color] duration-150 ease",
        "outline-2 outline-offset-0 outline-transparent active:scale-[0.98] motion-reduce:active:scale-100",
        tone === "dark"
          ? "text-ink-300 hover:text-gold-500 hover:outline-gold-500 focus-visible:outline-gold-500 focus-visible:outline-offset-2"
          : "text-ink-500 hover:text-gold-700 hover:outline-gold-700 focus-visible:outline-gold-700 focus-visible:outline-offset-2",
        className,
      )}
      {...rest}
    >
      <X aria-hidden className="size-5 transition-transform duration-150 ease group-hover/close:rotate-90 motion-reduce:group-hover/close:rotate-0" />
    </button>
  );
}
