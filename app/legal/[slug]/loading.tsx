"use client";

import { useParams } from "next/navigation";
import { PageSkeleton } from "@/components/site/PageSkeleton";
import privacy from "@/components/site/skeletons/privacy.json";
import terms from "@/components/site/skeletons/terms.json";
import accessibility from "@/components/site/skeletons/accessibility.json";
import sms from "@/components/site/skeletons/sms-consent.json";

const layouts = { privacy, terms, accessibility, "sms-consent": sms };

export default function Loading() {
  const { slug } = useParams<{ slug: string }>();
  const samples = layouts[slug as keyof typeof layouts] ?? privacy;
  return <PageSkeleton samples={samples} name={slug} />;
}
