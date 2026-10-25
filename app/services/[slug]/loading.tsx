"use client";

import { useParams } from "next/navigation";
import { PageSkeleton } from "@/components/site/PageSkeleton";
import healthcare from "@/components/site/skeletons/healthcare-operations.json";
import technology from "@/components/site/skeletons/health-it.json";
import logistics from "@/components/site/skeletons/logistics-facilities.json";
import management from "@/components/site/skeletons/management-support.json";

const layouts = { "healthcare-operations": healthcare, "health-it": technology, "logistics-facilities": logistics, "management-support": management };

export default function Loading() {
  const { slug } = useParams<{ slug: string }>();
  const samples = layouts[slug as keyof typeof layouts] ?? healthcare;
  return <PageSkeleton samples={samples} name={slug} />;
}
