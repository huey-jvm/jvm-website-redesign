"use client";

import { SkeletonBox } from "skullet/react";

export default function Loading() {
  return <section className="route-loading bg-cream" role="status" aria-label="Loading page" aria-busy="true">
    <div className="container-content" aria-hidden="true">
      <SkeletonBox width="8rem" height="1rem" />
      <div className="mt-8"><SkeletonBox width="min(70%, 38rem)" height="3.5rem" /></div>
      <div className="mt-12 grid items-center gap-10 lg:grid-cols-2">
        <div className="aspect-[4/3]"><SkeletonBox width="100%" height="100%" /></div>
        <div className="space-y-5">
          <SkeletonBox width="75%" height="2rem" />
          <SkeletonBox width="100%" height="1rem" />
          <SkeletonBox width="92%" height="1rem" />
          <SkeletonBox width="65%" height="1rem" />
        </div>
      </div>
    </div>
  </section>;
}
