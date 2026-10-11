import type { ComponentPropsWithoutRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

export function ExternalLink({ className, children, ...rest }: ComponentPropsWithoutRef<"a">) {
  return (
    <a target="_blank" rel="noopener noreferrer" className={cn("group/link inline-flex items-center gap-1", className)} {...rest}>
      <span className="link-underline after:bg-current group-hover/link:after:opacity-100 group-focus-visible/link:after:opacity-100 group-active/link:after:opacity-100">{children}</span>
      <ArrowUpRight aria-hidden className="size-4" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
