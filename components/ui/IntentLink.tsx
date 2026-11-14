"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ComponentProps } from "react";

// A route prefetch can also preload its large hero photo. Warm routes when
// the user points to or focuses a link, after the current page gets priority.
export default function IntentLink({ href, onMouseEnter, onFocus, ...props }: Omit<ComponentProps<typeof Link>, "prefetch">) {
  const router = useRouter();
  const pathname = usePathname();
  const warm = () => {
    if (typeof href === "string" && href.startsWith("/") && !href.startsWith("//") && !href.includes("#") && href !== pathname) router.prefetch(href);
  };
  return <Link {...props} href={href} prefetch={false} onMouseEnter={event => { onMouseEnter?.(event); if (!event.defaultPrevented) warm(); }} onFocus={event => { onFocus?.(event); if (!event.defaultPrevented) warm(); }} />;
}
