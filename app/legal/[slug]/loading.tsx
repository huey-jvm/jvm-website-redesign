"use client";

import { useParams } from "next/navigation";
import { Suspense } from "react";
import { lazySkeleton } from "@/components/site/lazy-skeleton";

const layouts = {
  privacy: lazySkeleton(() => import("@/components/site/skeletons/privacy.json"), "privacy"),
  terms: lazySkeleton(() => import("@/components/site/skeletons/terms.json"), "terms"),
  accessibility: lazySkeleton(() => import("@/components/site/skeletons/accessibility.json"), "accessibility"),
  "sms-consent": lazySkeleton(() => import("@/components/site/skeletons/sms-consent.json"), "sms-consent"),
};

export default function Loading() {
  const { slug } = useParams<{ slug: string }>();
  const Skeleton = layouts[slug as keyof typeof layouts] ?? layouts.privacy;
  return <Suspense fallback={<div className="route-loading bg-cream" role="status" aria-label="Loading page" aria-busy="true" />}><Skeleton /></Suspense>;
}
