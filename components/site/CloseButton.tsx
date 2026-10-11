import type { ComponentPropsWithoutRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

export function CloseButton({ tone = "light", className, label = "Close", ...rest }: ComponentPropsWithoutRef<"button"> & { tone?: "light" | "dark"; label?: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cn(
        "group/close inline-flex size-11 items-center justify-center rounded-control transition-[color,outline-color,scale] focus-visible:transition-none duration-150 ease-hover",
        "outline-2 outline-offset-0 outline-transparent active:scale-[0.98] motion-reduce:active:scale-100",
        tone === "dark"
          ? "text-ink-300 hover:text-gold-500 focus-visible:text-gold-500 hover:outline-gold-500 active:text-gold-500 active:outline-gold-500 focus-visible:outline-gold-500 focus-visible:outline-offset-2"
          : "text-ink-500 hover:text-gold-700 focus-visible:text-gold-700 hover:outline-gold-700 active:text-gold-700 active:outline-gold-700 focus-visible:outline-gold-700 focus-visible:outline-offset-2",
        className,
      )}
      {...rest}
    >
      <X aria-hidden className="size-5 transition-transform duration-150 ease-hover group-hover/close:rotate-90 group-focus-visible/close:rotate-90 group-focus-visible/close:transition-none motion-reduce:group-hover/close:rotate-0 motion-reduce:group-focus-visible/close:rotate-0" />
    </button>
  );
}
