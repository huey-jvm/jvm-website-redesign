"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/cn";

export function CopyButton({ value, label, tone = "light" }: { value: string; label: string; tone?: "light" | "dark" }) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(t);
  }, [copied]);

  return (
    <span className="relative inline-flex">
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
          } catch {
            setCopied(false);
          }
        }}
        aria-label={copied ? `${label} copied` : `Copy ${label}`}
        className={cn(
          "peer inline-flex size-11 items-center justify-center rounded-control transition-[opacity,color,background-color] duration-150 ease-hover",
          "opacity-0 group-hover/fact:opacity-100 group-focus-within/fact:opacity-100 focus-visible:opacity-100 [@media(hover:none)]:opacity-100",
          "active:scale-[0.98] motion-reduce:active:scale-100",
          tone === "dark"
            ? "text-ink-300 hover:bg-ink-800 focus-visible:bg-ink-800 hover:text-gold-500 focus-visible:text-gold-500 active:bg-ink-800 active:text-gold-500 focus-visible:outline-gold-500 focus-visible:transition-none"
            : "text-ink-500 hover:bg-ink-100 focus-visible:bg-ink-100 hover:text-gold-700 focus-visible:text-gold-700 active:bg-ink-100 active:text-gold-700 focus-visible:outline-gold-700 focus-visible:transition-none",
        )}
      >
        {copied ? <Check aria-hidden className="size-5" /> : <Copy aria-hidden className="size-5" />}
      </button>
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-control border border-ink-200 bg-white px-2.5 py-1 text-body-sm text-ink-900 shadow-float",
          "opacity-0 transition-opacity duration-100 ease-enter peer-hover:duration-125 peer-focus-visible:duration-125 peer-hover:delay-100 peer-focus-visible:delay-0 peer-hover:opacity-100 peer-focus-visible:opacity-100 peer-focus-visible:transition-none",
          copied && "opacity-100",
        )}
      >
        {copied ? "Copied" : "Copy"}
      </span>
      <span role="status" className="sr-only">{copied ? `${label} copied` : ""}</span>
    </span>
  );
}
