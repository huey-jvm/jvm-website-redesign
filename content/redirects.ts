/** Every path on the Wix site, pointed at its nearest new page. Consumed by next.config.ts. */
export const legacyRedirects: { source: string; destination: string }[] = [
  { source: "/about-us", destination: "/about" },
  { source: "/services-2", destination: "/services/healthcare-operations" },
  { source: "/services-4", destination: "/services/logistics-facilities" },
  { source: "/contractvehicles", destination: "/contracting" },
  { source: "/contract-vehicles", destination: "/contracting" },
  { source: "/gsa-8a-stars-iii", destination: "/contracting/stars-iii" },
  { source: "/quality", destination: "/about/quality-compliance" },
  { source: "/job-seekers", destination: "/careers" },
  { source: "/contact-us", destination: "/contact" },
];
