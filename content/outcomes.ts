export type Outcome = { id: string; title: string; teaser: string; body: string };

export const outcomesIntro =
  "JVM does not sell labor categories. We sell measurable, mission-critical outcomes that resonate with every stakeholder, from commanding officers and VHA executives to patient experience officers and CFOs. These five outcome pillars anchor every client engagement.";

export const outcomes: Outcome[] = [
  { id: "access", title: "Improve Access to Care", teaser: "Shorter waits, more capacity and the right care where and when it is needed.", body: "Reduce wait times, expand capacity, and ensure the right care is available when and where it is needed, across MTFs, VA facilities, and commercial networks." },
  { id: "whole-person", title: "Improve Whole-Person Health", teaser: "Physical, behavioral and preventive health delivered as one integrated service.", body: "Deliver integrated physical, behavioral, and preventive health services that address the full spectrum of patient and veteran needs." },
  { id: "operations", title: "Improve Healthcare Operations", teaser: "Smoother scheduling, staffing, supply chain and administration, with less cost, waste and friction.", body: "Streamline scheduling, staffing, supply chain, and administrative functions to reduce cost, waste, and friction across the care continuum." },
  { id: "experience", title: "Improve Patient and Veteran Experience", teaser: "Better care, communication and service, so every patient and veteran feels seen and respected.", body: "Elevate care quality, communication, and service delivery so every patient, especially those who have served, feels seen, respected, and supported." },
  { id: "readiness", title: "Improve Mission Readiness", teaser: "Military treatment facilities kept operationally and clinically ready to support the mission.", body: "Ensure military treatment facilities maintain the operational and clinical readiness required to support force health protection and expeditionary demands." },
];

export const getOutcome = (id: string) => outcomes.find((o) => o.id === id);
