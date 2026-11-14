"use client";

import { useParams } from "next/navigation";
import { Suspense } from "react";
import { lazySkeleton } from "@/components/site/lazy-skeleton";

const layouts = {
  "healthcare-operations": lazySkeleton(() => import("@/components/site/skeletons/healthcare-operations.json"), "healthcare-operations"),
  "health-it": lazySkeleton(() => import("@/components/site/skeletons/health-it.json"), "health-it"),
  "logistics-facilities": lazySkeleton(() => import("@/components/site/skeletons/logistics-facilities.json"), "logistics-facilities"),
  "management-support": lazySkeleton(() => import("@/components/site/skeletons/management-support.json"), "management-support"),
};

export default function Loading() {
  const { slug } = useParams<{ slug: string }>();
  const Skeleton = layouts[slug as keyof typeof layouts] ?? layouts["healthcare-operations"];
  return <Suspense fallback={<div className="route-loading bg-cream" role="status" aria-label="Loading page" aria-busy="true" />}><Skeleton /></Suspense>;
}
