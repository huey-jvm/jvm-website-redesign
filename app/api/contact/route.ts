import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";
import { deliverContact, isEmailConfigured } from "@/lib/email";
import { verifyTurnstile } from "@/lib/turnstile";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ ok: false, message: "The request could not be read." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!errors[key]) errors[key] = issue.message;
    }
    return NextResponse.json({ ok: false, message: "Please check the highlighted fields.", errors }, { status: 400 });
  }

  const input = parsed.data;

  if (input.website && input.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
  const human = await verifyTurnstile(input.turnstileToken, ip);
  if (!human) {
    return NextResponse.json({ ok: false, message: "We could not confirm the request came from a person. Please try again." }, { status: 400 });
  }

  if (!isEmailConfigured()) {
    if (process.env.NODE_ENV === "production") {
      console.error("contact: RESEND_API_KEY is not set");
      return NextResponse.json({ ok: false, message: "Email delivery is not configured on this deployment yet." }, { status: 503 });
    }
    console.info("contact (simulated)", { route: input.route, name: input.name, email: input.email, at: new Date().toISOString() });
    return NextResponse.json({ ok: true, simulated: true });
  }

  try {
    await deliverContact(input);
    console.info("contact delivered", { route: input.route, at: new Date().toISOString() });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("contact failed", { route: input.route, at: new Date().toISOString(), error: err instanceof Error ? err.message : "unknown" });
    return NextResponse.json({ ok: false, message: "Your message could not be delivered just now." }, { status: 502 });
  }
}
