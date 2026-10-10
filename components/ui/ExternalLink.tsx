import type { ComponentPropsWithoutRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

export function ExternalLink({ className, children, ...rest }: ComponentPropsWithoutRef<"a">) {
  return (
    <a target="_blank" rel="noopener noreferrer" className={cn("link-underline inline-flex items-center gap-1 after:bg-current", className)} {...rest}>
      {children}
      <ArrowUpRight aria-hidden className="size-4" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
