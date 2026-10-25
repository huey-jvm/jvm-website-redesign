"use client";

// Mounted only by scripts/preview-states.mjs; never part of a production build.
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PageSkeleton } from "@/components/site/PageSkeleton";
import { ErrorState } from "@/components/site/ErrorState";
import { Button } from "@/components/ui/Button";
import home from "@/components/site/skeletons/home.json";
import services from "@/components/site/skeletons/services.json";
import healthcare from "@/components/site/skeletons/healthcare-operations.json";
import technology from "@/components/site/skeletons/health-it.json";
import logistics from "@/components/site/skeletons/logistics-facilities.json";
import management from "@/components/site/skeletons/management-support.json";
import why from "@/components/site/skeletons/why-jvm.json";
import contracting from "@/components/site/skeletons/contracting.json";
import stars from "@/components/site/skeletons/stars-iii.json";
import certifications from "@/components/site/skeletons/certifications.json";
import capabilities from "@/components/site/skeletons/capability-statement.json";
import about from "@/components/site/skeletons/about.json";
import quality from "@/components/site/skeletons/quality-compliance.json";
import careers from "@/components/site/skeletons/careers.json";
import contact from "@/components/site/skeletons/contact.json";
import privacy from "@/components/site/skeletons/privacy.json";
import terms from "@/components/site/skeletons/terms.json";
import accessibility from "@/components/site/skeletons/accessibility.json";
import sms from "@/components/site/skeletons/sms-consent.json";

const layouts = { home, services, "healthcare-operations": healthcare, "health-it": technology, "logistics-facilities": logistics, "management-support": management, "why-jvm": why, contracting, "stars-iii": stars, certifications, "capability-statement": capabilities, about, "quality-compliance": quality, careers, contact, privacy, terms, accessibility, "sms-consent": sms };

function Preview() {
  const params = useSearchParams();
  const [failed, setFailed] = useState(false);
  if (failed) throw new Error("Test-only render failure");
  const name = (params.get("name") || "home") as keyof typeof layouts;
  if (params.get("view") === "loading") return <PageSkeleton samples={layouts[name] ?? home} name={name} />;
  if (params.get("view") === "boundary") return <div className="container-content py-16"><h1>Recovery test</h1><Button onClick={() => setFailed(true)}>Simulate interruption</Button></div>;
  return <ErrorState />;
}

export default function StatePreview() {
  return <Suspense fallback={<PageSkeleton samples={home} name="home" />}><Preview /></Suspense>;
}
