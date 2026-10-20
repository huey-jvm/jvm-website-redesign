import fs from "node:fs";
import { starsIII } from "../../content/vehicles";

export const starsOff = starsIII.listed === "no";

export const pages = [
  "/", "/services", "/services/healthcare-operations", "/services/health-it", "/services/logistics-facilities", "/services/management-support",
  "/why-jvm", "/contracting", ...(starsOff ? [] : ["/contracting/stars-iii"]), "/contracting/certifications",
  "/about", "/about/quality-compliance", "/careers", "/contact",
  "/legal/privacy", "/legal/terms", "/legal/accessibility", "/legal/sms-consent",
];
export const widths = [320, 375, 768, 1024, 1280, 1440, 1920];

const envFiles = [".env", ".env.local", ".env.production", ".env.production.local"];
export const emailKeyConfigured = () =>
  Boolean(process.env.RESEND_API_KEY) || envFiles.some((f) => fs.existsSync(f) && /^RESEND_API_KEY=\S+/m.test(fs.readFileSync(f, "utf8")));
