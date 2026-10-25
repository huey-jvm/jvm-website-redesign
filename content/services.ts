export const leadEyebrow = "Our core";
import { starsShown } from "./vehicles";
import { identifiers } from "./identifiers";


export type ServiceSection = {
  id: string;
  title: string;
  body: string;
  delivers?: { title: string; description: string }[];
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
        delivers: [
          { title: "Registered Nurses and clinical staff", description: "We match clinical roles to the qualifications, schedules and care setting each program requires. Placement planning considers credential readiness and continuity of coverage alongside the immediate staffing need." },
          { title: "Medical support staff", description: "Medical support professionals help keep the work around patient care organised, from appointment coordination to day-to-day administrative tasks. We scope each role around the facility’s workflows so clinical teams have dependable operational support." },
          { title: "Ancillary professionals", description: "We help organisations identify the allied health and other supporting professionals their care model needs. Role requirements, qualifications and responsibilities are defined with the customer before placement." },
          { title: "Nationwide placement for federal and commercial programs", description: "We support placement needs across federal, state and commercial healthcare programs. Planning accounts for the location, assignment requirements and onboarding steps that determine when a professional can begin work." },
        ],
      },
      {
        id: "occupational-health",
        title: "Occupational Health",
        body: "We help organisations keep their workforce safe, healthy and productive by coordinating prevention, health risk management and employee support. Services are scoped to the workplace and its occupational health requirements, with clear responsibilities for each activity.",
        delivers: [
          { title: "Injury and illness prevention programs", description: "We help organisations organise prevention activities around the demands of their workplace. The scope can include employee education, coordination of occupational health services and follow-up on identified concerns." },
          { title: "Health risk management", description: "We support the identification and coordination of workplace health risks with the customer’s occupational health team. Clear responsibilities and follow-up processes help turn identified concerns into practical next steps." },
          { title: "Regulatory compliance support", description: "We help coordinate the records, activities and follow-up needed to support an organisation’s occupational health requirements. The applicable requirements and the customer’s responsibilities are established as part of the engagement." },
          { title: "Workforce well-being programs", description: "We help coordinate workforce health education and support activities that fit the organisation’s setting. Programs are shaped around employee needs, available resources and the way people access support." },
        ],
      },
      {
        id: "program-management",
        title: "Program Management",
        body: "Our program management services ensure the efficient planning and delivery of healthcare initiatives that improve patient outcomes and streamline operations. We coordinate cross-functional teams, including medical professionals, administrative staff and external stakeholders, to implement projects that meet regulatory demands and support the organisation's mission. With strategic oversight and a focus on collaboration, we tailor programs to the needs of each patient population while adapting to industry changes and emerging challenges.",
        delivers: [
          { title: "Cross-functional team coordination", description: "We bring clinical, administrative and external stakeholders together around a shared delivery plan. Clear ownership, regular communication and tracked dependencies help teams resolve issues before they interrupt the program." },
          { title: "Regulatory alignment", description: "We help translate the program’s applicable requirements into delivery tasks, responsibilities and documentation. Changes are reviewed with the customer so the project plan reflects the standards it needs to support." },
          { title: "Strategic oversight and reporting", description: "We organise program milestones, risks and decisions into reporting that supports day-to-day management. Stakeholders can see what is progressing, what needs attention and who owns the next action." },
          { title: "Program design tailored to the patient population", description: "We shape the delivery approach around the people the program serves and the resources available to support them. Planning considers access, coordination needs and operational constraints rather than assuming one model fits every population." },
        ],
      },
      {
        id: "case-management",
        title: "Case Management",
        body: "Our case-management service connects patients with appropriate providers, resources and care plans. Experienced healthcare professionals coordinate screening, assessment, appointments and follow-up while helping patients understand their options. The approach considers individual needs and responsible use of resources together.",
        delivers: [
          { title: "Screening, assessment and risk evaluation", description: "Healthcare professionals help identify patient needs, barriers to care and the support required for the next step. Those findings inform a coordinated care plan developed within the program’s clinical protocols." },
          { title: "Appointment and treatment coordination", description: "We support communication between patients, providers and the services involved in their care. Scheduling, referrals and follow-up are coordinated so the next action and its owner are clear." },
          { title: "Patient advocacy and education", description: "We help patients understand their care plan, available resources and the steps they are being asked to take. Communication is tailored to the individual so questions and access barriers can be raised with the appropriate care team." },
          { title: "Value-based care alignment", description: "We support care coordination that considers patient needs, continuity and responsible use of resources together. The customer’s program goals guide how case-management activities are organised and reviewed." },
        ],
      },
      {
        id: "credentialing",
        title: "Credentialing",
        body: "Our streamlined credentialing service verifies each provider's education, training, licences and certifications, ensuring providers meet all requirements for quality care and network participation. By partnering with us, an organisation can trust that its providers remain compliant with state and federal regulations, reducing risk and administrative burden. Our credentialing solutions foster patient trust, simplify onboarding and help maintain operational licences, so providers and customers can focus on delivering patient-centred care.",
        delivers: [
          { title: "Primary source verification", description: "We verify provider qualifications against the relevant issuing sources as required by the engagement. The process supports a documented review of education, training, licences and certifications before a provider is cleared for the role." },
          { title: "Licensing and certification tracking", description: "We help maintain visibility into required credentials and their renewal dates. Tracking gives the customer and provider a clear view of upcoming actions and any gaps that need resolution." },
          { title: "Compliance monitoring", description: "We review credentialing records against the requirements established for the role and care setting. Identified gaps are documented and routed for follow-up so onboarding and continued participation decisions have a clear record." },
          { title: "Onboarding support", description: "We coordinate the credentialing documents and administrative steps needed to prepare a provider for an assignment. Clear checklists and status updates help the provider and customer understand what remains before work can begin." },
        ],
      },
      {
        id: "telehealth",
        title: "Telehealth",
        body: "Our telehealth service makes quality healthcare accessible wherever patients are. We connect patients directly with expert providers for secure remote care, covering diagnosis, treatment, health education and ongoing support. Whether for consultations or continuing medical guidance, our team ensures accessible, professional care without the need for a waiting room.",
        delivers: [
          { title: "Secure remote consultations", description: "We support remote appointments that connect patients with appropriate healthcare professionals. The engagement defines the technology, privacy requirements and workflows needed to deliver those consultations." },
          { title: "Diagnosis, treatment and follow-up", description: "Remote care is coordinated within the provider’s scope of practice and the program’s clinical protocols. When an in-person assessment or another service is needed, the care team guides the patient to the appropriate next step." },
          { title: "Health education and support", description: "We support clear communication about care plans, follow-up steps and available resources during remote care. Patients have an opportunity to ask questions and understand how to reach their care team for further support." },
        ],
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
        delivers: [
          { title: "Software development", description: "We scope software work around the users, workflows and operational problems the system needs to support. Requirements, delivery milestones and testing expectations are agreed with the customer so each release can be assessed against a clear purpose." },
          { title: "Systems design and integration", description: "We help plan how applications, infrastructure and data need to work together. Integration work considers existing systems, interfaces and operational dependencies so changes fit the environment they will run in." },
          { title: "IT operations and maintenance", description: "We support the ongoing work that keeps systems usable, including maintenance coordination, issue resolution and operational documentation. Responsibilities and service expectations are defined around the customer’s environment and mission priorities." },
          { title: "IT help desk and service desk support", description: "We help users report issues, obtain assistance and understand the status of their requests. Clear triage and escalation paths connect routine support with the teams responsible for more complex problems." },
          { title: "Information assurance and cybersecurity", description: "We support the security activities, documentation and operational practices specified for the engagement. The work is aligned with the customer’s environment, applicable requirements and existing security responsibilities." },
          { title: "Data tools and enabling platforms, including applied artificial intelligence", description: "We assess where data tools and enabling platforms can address a defined operational need. For applied AI work, the scope should establish the intended use, data access, evaluation criteria and human review required before adoption." },
        ],
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
        delivers: [
          { title: "Facilities management", description: "We coordinate the maintenance and operational support needed to keep facilities working for the people who use them. The engagement defines service schedules, responsibilities and how issues are reported and followed through to resolution." },
          { title: "Supply chain management", description: "We help coordinate the flow of supplies from procurement through receipt and delivery. Planning and status tracking make it easier to identify shortages, delays and dependencies before they affect the operation." },
          { title: "Integrated logistics management", description: "We connect procurement, inventory, transportation and facilities activities in one operational plan. Shared priorities and clear handoffs help teams see how a change in one part of the supply chain affects the rest." },
          { title: "Transportation management", description: "We support the planning and coordination of movements around delivery requirements, available capacity and operating constraints. Shipment status and exceptions are tracked so the customer can respond when a movement falls behind plan." },
          { title: "Carrier and claims management", description: "We help coordinate carrier communication, shipment records and follow-up when deliveries are damaged, delayed or incomplete. Organised documentation supports the customer’s review and handling of carrier claims." },
          { title: "Quality assurance", description: "We help define checks that compare delivered work and supplies with the engagement’s requirements. Findings and corrective actions are documented so recurring issues can be investigated and addressed." },
          { title: "Inventory control", description: "We support accurate stock records, organised storage and routine reconciliation between recorded and available inventory. Visibility into usage and replenishment needs helps teams plan purchases and investigate discrepancies." },
          { title: "Training", description: "We help prepare personnel to follow the procedures, systems and responsibilities defined for the operation. Training can cover day-to-day tasks, reporting expectations and the handoffs that keep work moving consistently." },
        ],
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
        delivers: [
          { title: "Daily operations support", description: "We help coordinate the recurring tasks, schedules and follow-up that keep an organisation running. Clear priorities and assigned responsibilities give the customer visibility into work that needs attention." },
          { title: "Administrative services", description: "We support the records, correspondence, scheduling and document handling that teams rely on each day. Tasks are organised around the customer’s procedures so information reaches the right people and remains easy to find." },
          { title: "Strategic planning support", description: "We help organise goals, stakeholder input and operating constraints into practical plans. Milestones, responsibilities and decision points connect the broader strategy to work that teams can carry forward." },
          { title: "Process improvement", description: "We work with the customer to map how work is currently done and identify bottlenecks or repeated effort. Proposed changes are evaluated against the operation’s needs, with clear ownership and a way to review whether the revised process helps." },
        ],
      },
    ],
    placeholders: [{ id: "P13", what: "Page copy written by JVM to the brief in docs/briefs/management-support.md", who: "JVM, writes to a brief" }],
    relatedOutcomes: ["operations", "experience"],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
