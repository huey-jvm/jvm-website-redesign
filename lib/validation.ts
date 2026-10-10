import { z } from "zod";
import { routeKeys } from "@/content/contact";

export const contactSchema = z.object({
  route: z.enum(routeKeys),
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  organisation: z.string().trim().max(160).optional().or(z.literal("")),
  email: z.string().trim().email("Please enter a valid email address.").max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Please tell us a little more, at least ten characters.").max(4000),
  website: z.string().max(500).optional().or(z.literal("")),
  turnstileToken: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
