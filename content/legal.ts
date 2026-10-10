export type LegalSection = { id: string; title: string; paragraphs: string[]; list?: string[] };
export type LegalPage = { slug: string; title: string; description: string; updated: string; draft: boolean; sections: LegalSection[] };

const company = "Johnson Venture Management Solutions, Inc. (JVM Solutions, \"we\", \"us\")";
const updated = "1 October 2026";

export const legalPages: LegalPage[] = [
  {
    slug: "privacy",
    title: "Privacy Policy",
    description: "How JVM Solutions collects, uses and protects personal information on this website.",
    updated,
    draft: true,
    sections: [
      { id: "scope", title: "Who We Are and What This Covers", paragraphs: [`${company} operates jvmsolutions.net. This policy explains what personal information we collect through this website, how we use it, and the choices you have. It applies to this website only. Our careers portal is operated by iSolved and has its own privacy terms.`] },
      { id: "collect", title: "What We Collect", paragraphs: ["We collect information you give us directly when you use the contact form or email us: your name, organisation, email address, phone number if you provide it, and the content of your message. We do not ask for anything else, and the form does not work if a hidden field intended for automated software is filled in.", "We do not use advertising cookies or tracking pixels. The website measures page views using a cookie-free analytics service that records the page visited, the referring site, the country, and the browser and device type, without identifying you."] },
      { id: "use", title: "How We Use It", paragraphs: ["We use the information you send us to answer your enquiry and route it to the right person at JVM. We send a copy of your message to the email address you provide so you have a record. We do not sell personal information and we do not share it with third parties for their own marketing."], list: ["Business development enquiries are read by our business development team.", "General enquiries are read by the JVM team.", "Employment verification requests are handled by our credentialing team."] },
      { id: "retention", title: "How Long We Keep It", paragraphs: ["Messages sent through the form are relayed to our email inboxes and are not stored on the website itself. We keep correspondence for as long as needed to respond to you and to meet our record keeping obligations as a federal contractor."] },
      { id: "sharing", title: "Service Providers", paragraphs: ["We use a small number of service providers to run this website: a hosting provider, an email delivery service for the contact form, and a cookie-free analytics service. Each processes data only on our instructions."] },
      { id: "rights", title: "Your Choices", paragraphs: [`You may ask us what personal information we hold about you, ask us to correct it, or ask us to delete it, by emailing info@jvmsolutions.net. We will respond within a reasonable time.`] },
      { id: "sms", title: "Text Messages", paragraphs: ["If you opt in to receive text messages from JVM during a recruiting process, separate terms apply. They are set out in our SMS Consent notice."] },
      { id: "changes", title: "Changes", paragraphs: [`We may update this policy from time to time. The date at the top of the page shows the current version.`] },
      { id: "contact", title: "Contact", paragraphs: ["Questions about this policy go to info@jvmsolutions.net or to our office at 7550 W I-10, Suite 800, San Antonio, TX 78229."] },
    ],
  },
  {
    slug: "terms",
    title: "Terms of Use",
    description: "The terms on which this website is provided.",
    updated,
    draft: true,
    sections: [
      { id: "acceptance", title: "Using This Website", paragraphs: [`This website is provided by ${company}. By using it you agree to these terms. If you do not agree, please do not use the site.`] },
      { id: "content", title: "Content", paragraphs: ["The information on this website is provided for general information about JVM Solutions and its services. We work to keep it accurate and current, and we correct errors when we find them. Contract, certification and registration details should be confirmed against the official government record before you rely on them in a procurement."] },
      { id: "ip", title: "Intellectual Property", paragraphs: ["The JVM Solutions name, logo and the content of this website belong to JVM Solutions or its licensors. You may view and print pages for your own reference. You may not reproduce or republish them for commercial purposes without our written permission."] },
      { id: "links", title: "Links to Other Sites", paragraphs: ["This website links to other sites, including SAM.gov, GSA, SBA and our careers portal. Those sites have their own terms and we are not responsible for their content."] },
      { id: "liability", title: "Limitation of Liability", paragraphs: ["To the extent permitted by law, JVM Solutions is not liable for any loss arising from use of this website or reliance on its content. Nothing on this website forms a contract or an offer to contract."] },
      { id: "law", title: "Governing Law", paragraphs: ["These terms are governed by the laws of the State of Texas."] },
      { id: "contact", title: "Contact", paragraphs: ["Questions about these terms go to info@jvmsolutions.net."] },
    ],
  },
  {
    slug: "accessibility",
    title: "Accessibility Statement",
    description: "Our commitment to an accessible website and how to tell us about a problem.",
    updated,
    draft: false,
    sections: [
      { id: "commitment", title: "Our Commitment", paragraphs: ["JVM Solutions wants everyone to be able to use this website. We build to the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA, and we test every page for keyboard access, screen reader compatibility, colour contrast and behaviour at every screen size."] },
      { id: "measures", title: "What We Do", paragraphs: ["Every page has a single main heading and a logical heading order. Every image carries a text description or is marked decorative. Every form field has a visible label. Every control can be reached and operated with a keyboard, and keyboard focus is always visible. Motion is reduced for visitors who ask their device to reduce it. Text can be resized without loss of content."] },
      { id: "feedback", title: "Tell Us About a Problem", paragraphs: ["If you find something on this website that you cannot use, please tell us. Email info@jvmsolutions.net with the page address and a description of the problem, or call 210-504-4707. We aim to respond within two business days and to fix the problem as quickly as we can."] },
      { id: "third-party", title: "Third-Party Content", paragraphs: ["Our careers portal is provided by iSolved and some external links lead to government sites. We cannot control the accessibility of those sites, but we will help you reach the information another way if you ask."] },
    ],
  },
  {
    slug: "sms-consent",
    title: "SMS Consent",
    description: "Terms for text messages from JVM Solutions during recruiting.",
    updated,
    draft: false,
    sections: [
      { id: "optin", title: "Opting In", paragraphs: ["JVM Solutions offers you the option to engage in SMS text conversations during the recruiting process. By participating, you understand that message frequency may vary depending on the status of your job application, and that message and data rates may apply. Please consult your carrier for further information on applicable rates and fees. Carriers are not liable for delayed or undelivered messages."] },
      { id: "data", title: "Your Information", paragraphs: ["By opting in to receive SMS text messages, you acknowledge and agree that your consent data, mobile number and personal information will be collected and stored solely for the purpose of providing you with updates and information. No mobile information will be shared with third parties or affiliates for marketing or promotional purposes. This includes SMS messages for conversations between employees and external conversations."] },
      { id: "stop", title: "Stopping Messages", paragraphs: ["Reply STOP at any time to cancel. Reply HELP for help. You can also email info@jvmsolutions.net."] },
    ],
  },
];

export const getLegalPage = (slug: string) => legalPages.find((p) => p.slug === slug);
