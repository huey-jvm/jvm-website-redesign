import { lazy } from "react";
import { PageSkeleton, type Sample } from "./PageSkeleton";

// Do not send every sibling page's captured geometry with the initial route.
export function lazySkeleton(load: () => Promise<{ default: Sample[] }>, name: string) {
  return lazy(async () => {
    const { default: samples } = await load();
    return { default: () => <PageSkeleton samples={samples} name={name} /> };
  });
}
