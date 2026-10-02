import { z } from "zod";

const schema = z.object({ email: z.string().trim().email() });

/**
 * Newsletter subscription. When NEWSLETTER_ENDPOINT is unset the route runs in
 * demo mode: it validates and returns `demo: true` without storing anything.
 * To go live, point NEWSLETTER_ENDPOINT at your provider's subscribe API and
 * set NEWSLETTER_TOKEN (sent as a Bearer token).
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) return Response.json({ ok: false, message: "Enter a valid email address." }, { status: 422 });

  const endpoint = process.env.NEWSLETTER_ENDPOINT;
  if (!endpoint) return Response.json({ ok: true, demo: true });

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(process.env.NEWSLETTER_TOKEN ? { Authorization: `Bearer ${process.env.NEWSLETTER_TOKEN}` } : {}) },
      body: JSON.stringify({ email: parsed.data.email, source: "pdthemes.de" }),
    });
    if (!res.ok) throw new Error(`Provider responded ${res.status}`);
    return Response.json({ ok: true });
  } catch (err) {
    console.error("[newsletter] provider error", err instanceof Error ? err.message : err);
    return Response.json({ ok: false, message: "We could not subscribe you right now. Please try again later." }, { status: 502 });
  }
}
