export function isTurnstileConfigured() {
  return Boolean(process.env.TURNSTILE_SECRET_KEY);
}

export async function verifyTurnstile(token: string | undefined, ip: string | null) {
  if (!isTurnstileConfigured()) return true;
  if (!token) return false;
  const body = new URLSearchParams({ secret: process.env.TURNSTILE_SECRET_KEY as string, response: token });
  if (ip) body.set("remoteip", ip);
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body });
  const data = (await res.json()) as { success?: boolean };
  return Boolean(data.success);
}
