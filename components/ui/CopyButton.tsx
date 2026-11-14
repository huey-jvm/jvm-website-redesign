"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/cn";

export function CopyButton({ value, label, tone = "light" }: { value: string; label: string; tone?: "light" | "dark" }) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  const [instant, setInstant] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(t);
  }, [copied]);

  return (
    <span className="relative inline-flex">
      <button
        type="button"
        onClick={async (e) => {
          setInstant(e.detail === 0);
          setFailed(false);
          try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
          } catch {
            setCopied(false);
            setFailed(true);
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
        <span className="grid place-items-center *:col-start-1 *:row-start-1">
          <Copy aria-hidden data-icon="copy" className={cn("size-5 motion-reduce:scale-100", !instant && "transition-[opacity,scale,filter] duration-150 ease-enter", copied ? "scale-[0.6] opacity-0 blur-[2px]" : "scale-100 opacity-100 blur-none")} />
          <Check aria-hidden data-icon="check" className={cn("size-5 motion-reduce:scale-100", !instant && "transition-[opacity,scale,filter] duration-150 ease-enter", copied ? "scale-100 opacity-100 blur-none" : "scale-[0.6] opacity-0 blur-[2px]")} />
        </span>
      </button>
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute bottom-full right-0 mb-2 w-max max-w-44 whitespace-normal rounded-control border border-ink-200 bg-white px-2.5 py-1 text-body-sm text-ink-900 shadow-float",
          "opacity-0 transition-opacity duration-100 ease-enter peer-hover:duration-125 peer-focus-visible:duration-125 peer-hover:delay-100 peer-focus-visible:delay-0 peer-hover:opacity-100 peer-focus-visible:opacity-100 peer-focus-visible:transition-none",
          (copied || failed) && "opacity-100",
        )}
      >
        {failed ? "Select and copy the text" : copied ? "Copied" : "Copy"}
      </span>
      <span role="status" className="sr-only">{failed ? `Could not copy ${label}. Select and copy the displayed text.` : copied ? `${label} copied` : ""}</span>
    </span>
  );
}
