import { Resend } from "resend";
import { contact, type RouteKey } from "@/content/contact";
import { statements } from "@/content/statements";
import type { ContactInput } from "./validation";

const from = process.env.CONTACT_FROM ?? "JVM Solutions <no-reply@jvmsolutions.net>";

export function isEmailConfigured() {
  return Boolean(process.env.RESEND_API_KEY);
}

export async function deliverContact(input: ContactInput) {
  const route = contact.routes[input.route as RouteKey];
  const resend = new Resend(process.env.RESEND_API_KEY);
  const text = [
    `Route: ${route.label}`,
    `Name: ${input.name}`,
    `Organisation: ${input.organisation || "(not given)"}`,
    `Email: ${input.email}`,
    `Phone: ${input.phone || "(not given)"}`,
    "",
    input.message,
  ].join("\n");

  const toInbox = resend.emails.send({
    from,
    to: route.to,
    replyTo: input.email,
    subject: `Website enquiry from ${input.name} (${route.label})`,
    text,
  });

  const toSender = resend.emails.send({
    from,
    to: input.email,
    subject: `We received your message, ${statements.shortName}`,
    text: [
      `Thank you for contacting ${statements.companyName}.`,
      "",
      `Your message has reached ${route.reads} and you can expect a reply within ${contact.responseTime}.`,
      "",
      "A copy of what you sent:",
      "",
      input.message,
      "",
      `If it is urgent, call ${contact.office.phone} or email ${route.to} directly.`,
    ].join("\n"),
  });

  const [inboxResult, senderResult] = await Promise.all([toInbox, toSender]);
  if (inboxResult.error) throw new Error(inboxResult.error.message);
  if (senderResult.error) console.warn("Confirmation email failed", senderResult.error.message);
  return { route };
}
