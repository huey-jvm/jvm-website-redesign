export const leadEyebrow = "Our core";
import { starsShown } from "./vehicles";
import { identifiers } from "./identifiers";


export type ServiceSection = {
  id: string;
  title: string;
  body: string;
  delivers?: string[];
};

export type Service = {
  slug: string;
  name: string;
  short: string;
  lead: boolean;
  summary: string;
  teaser: string;
  intro: string;
  sections: ServiceSection[];
  placeholders?: { id: string; what: string; who: string }[];
  cardImage?: string;
  cardPhoto?: string;
  bannerImage?: string;
  relatedOutcomes: string[];
};

export const services: Service[] = [
  {
    slug: "healthcare-operations",
    cardPhoto: "/images/services/healthcare.webp",
    bannerImage: "AS-06",
    name: "Healthcare Staffing and Operations",
    short: "Healthcare",
    lead: true,
    teaser: "Clinical and operational professionals, delivered as one accountable partner.",
    summary:
      "Clinical and operational professionals, occupational health, program and case management, credentialing and telehealth, delivered as one accountable partner.",
    intro:
      "Healthcare staffing and operations is the core of JVM. We supply credentialed clinical and operational professionals and the management layer around them, so a facility gains capacity, compliance and continuity in one engagement rather than a roster of names.",
    sections: [
      {
        id: "professional-services",
        title: "Professional Services",
        body: "Our experienced Registered Nurses, medical support staff and ancillary professionals support federal, state and commercial organisations that need trusted healthcare expertise. Our mission is to make sure every patient, whether in a government program or a commercial network, can rely on highly skilled and qualified healthcare providers. By partnering with agencies nationwide, we help deliver essential care to underserved communities, veterans, service members, their families, and others who depend on dependable, compassionate, high quality healthcare services.",
        delivers: ["Registered Nurses and clinical staff", "Medical support staff", "Ancillary professionals", "Nationwide placement for federal and commercial programs"],
      },
      {
        id: "occupational-health",
        title: "Occupational Health",
        body: "Our occupational health service is designed to keep a workforce safe, healthy and productive. We focus on preventing workplace injuries and illnesses, managing health risks, and supporting the overall well-being of every employee. By partnering with us, an organisation gets more than compliance with legal requirements. It invests in a safer environment, reduces downtime and helps its people thrive.",
        delivers: ["Injury and illness prevention programs", "Health risk management", "Regulatory compliance support", "Workforce well-being programs"],
      },
      {
        id: "program-management",
        title: "Program Management",
        body: "Our program management services ensure the efficient planning and delivery of healthcare initiatives that improve patient outcomes and streamline operations. We coordinate cross-functional teams, including medical professionals, administrative staff and external stakeholders, to implement projects that meet regulatory demands and support the organisation's mission. With strategic oversight and a focus on collaboration, we tailor programs to the needs of each patient population while adapting to industry changes and emerging challenges.",
        delivers: ["Cross-functional team coordination", "Regulatory alignment", "Strategic oversight and reporting", "Program design tailored to the patient population"],
      },
      {
        id: "case-management",
        title: "Case Management",
        body: "Our case management service connects patients with the right providers, resources and care plans, coordinated by experienced healthcare professionals. Through screening, assessment and risk evaluation, we ensure each client receives personalised, cost-effective care. Our collaborative process streamlines appointment scheduling, treatment coordination and ongoing support, all designed to improve outcomes while using resources wisely. By focusing on communication, education and patient advocacy, our case management drives better health, greater autonomy and satisfaction in alignment with value-based care goals.",
        delivers: ["Screening, assessment and risk evaluation", "Appointment and treatment coordination", "Patient advocacy and education", "Value-based care alignment"],
      },
      {
        id: "credentialing",
        title: "Credentialing",
        body: "Our streamlined credentialing service verifies each provider's education, training, licences and certifications, ensuring providers meet all requirements for quality care and network participation. By partnering with us, an organisation can trust that its providers remain compliant with state and federal regulations, reducing risk and administrative burden. Our credentialing solutions foster patient trust, simplify onboarding and help maintain operational licences, so providers and customers can focus on delivering patient-centred care.",
        delivers: ["Primary source verification", "Licensing and certification tracking", "Compliance monitoring", "Onboarding support"],
      },
      {
        id: "telehealth",
        title: "Telehealth",
        body: "Our telehealth service makes quality healthcare accessible wherever patients are. We connect patients directly with expert providers for secure remote care, covering diagnosis, treatment, health education and ongoing support. Whether for consultations or continuing medical guidance, our team ensures accessible, professional care without the need for a waiting room.",
        delivers: ["Secure remote consultations", "Diagnosis, treatment and follow-up", "Health education and support"],
      },
    ],
    relatedOutcomes: ["access", "whole-person", "experience"],
  },
  {
    slug: "health-it",
    cardImage: "AS-01",
    bannerImage: "AS-07",
    name: "Health IT and Technology Services",
    short: "Health IT",
    lead: false,
    teaser: "Software, systems and cybersecurity, delivered as part of the healthcare operation.",
    summary: starsShown
      ? "Software development, systems design and integration, service desk, information assurance and cybersecurity, delivered through our GSA 8(a) STARS III prime contract."
      : "Software development, systems design and integration, service desk, information assurance and cybersecurity, delivered as part of the healthcare operation.",
    intro:
      `Health IT is the technology dimension of the healthcare operation, not a separate practice. JVM delivers IT services and IT services-based solutions${starsShown ? " through GSA 8(a) STARS III" : ""}, from software development and systems design to service desk, information assurance and cybersecurity, so the systems a facility depends on perform as reliably as the people who use them.`,
    sections: [
      {
        id: "capabilities",
        title: "What We Deliver",
        body: `Our offering${starsShown ? " under STARS III" : ""} ranges from simple to complex IT services, centred on NAICS ${identifiers.naicsPrimary} and including related IT services codes. Every engagement is scoped to the mission it supports and delivered under the same accountability as our healthcare work.`,
        delivers: ["Software development", "Systems design and integration", "IT operations and maintenance", "IT help desk and service desk support", "Information assurance and cybersecurity", "Data tools and enabling platforms, including applied artificial intelligence"],
      },
      ...(starsShown
        ? [{
            id: "stars-iii",
            title: "How to Buy",
            body: "Federal agencies reach JVM through GSA 8(a) STARS III, a Best in Class governmentwide acquisition contract with streamlined ordering, directed awards up to the 8(a) competitive threshold, and 8(a) socioeconomic credit transferable to the agency.",
          }]
        : []),
    ],
    placeholders: [
      { id: "P13", what: "Page copy written by JVM to the brief in docs/briefs/health-it.md", who: "JVM, writes to a brief" },
      { id: "P7", what: "Health IT past performance, task orders and outcomes", who: "JVM, B4" },
    ],
    relatedOutcomes: ["operations", "readiness", "access"],
  },
  {
    slug: "logistics-facilities",
    cardImage: "AS-02",
    bannerImage: "AS-08",
    name: "Logistics and Facilities Management",
    short: "Logistics",
    lead: false,
    teaser: "Supply chain, transportation and facilities management for mission-critical operations.",
    summary:
      "Supply chain, integrated logistics, transportation, inventory control, quality assurance and facilities management for mission-critical operations.",
    intro:
      "JVM enhances supply chain agility, visibility and compliance for mission-critical operations, from procurement to delivery, and keeps the facilities those operations run in working.",
    sections: [
      {
        id: "what-we-deliver",
        title: "What We Deliver",
        body: "Our logistics and facilities work covers the movement of materiel and the management of the places it moves through. Each engagement is scoped against the mission it supports.",
        delivers: ["Facilities management", "Supply chain management", "Integrated logistics management", "Transportation management", "Carrier and claims management", "Quality assurance", "Inventory control", "Training"],
      },
    ],
    placeholders: [{ id: "P13", what: "A written introduction and two or three examples for Logistics and Facilities Management", who: "JVM, writes to a brief" }],
    relatedOutcomes: ["operations", "readiness"],
  },
  {
    slug: "management-support",
    cardImage: "AS-03",
    bannerImage: "AS-09",
    name: "Management and Administrative Support",
    short: "Management",
    lead: false,
    teaser: "Flexible management and administrative support, from daily operations to strategic planning.",
    summary:
      "Flexible management and administrative support, from daily operations to strategic planning, so the organisation can focus on its mission.",
    intro:
      "JVM provides flexible management and administrative support services tailored to the needs of each organisation. Our experienced team handles everything from daily operations to strategic planning, so our clients can focus on what matters most.",
    sections: [
      {
        id: "what-we-deliver",
        title: "What We Deliver",
        body: "We streamline processes, optimise efficiency and deliver the reliable support an organisation needs to perform.",
        delivers: ["Daily operations support", "Administrative services", "Strategic planning support", "Process improvement"],
      },
    ],
    placeholders: [{ id: "P13", what: "Page copy written by JVM to the brief in docs/briefs/management-support.md", who: "JVM, writes to a brief" }],
    relatedOutcomes: ["operations", "experience"],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
