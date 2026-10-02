import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  email: z.string().trim().email("Enter a valid email address."),
  topic: z.enum(["sales", "support", "licensing", "press", "other"]),
  product: z.string().trim().max(80).optional().or(z.literal("")),
  licenseKey: z.string().trim().max(120).optional().or(z.literal("")),
  message: z.string().trim().min(20, "Please tell us a little more (at least 20 characters).").max(5000),
  consent: z.literal(true, { message: "Please agree to the privacy policy." }),
  /** Honeypot: must stay empty. */
  website: z.string().max(0).optional().or(z.literal("")),
});

/**
 * Contact form. Demo mode when CONTACT_ENDPOINT is unset: validates and
 * returns `demo: true` without sending anything. Rate limiting is left to the
 * hosting layer (see docs/deployment.md).
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) fieldErrors[String(issue.path[0] ?? "form")] = issue.message;
    return Response.json({ ok: false, message: "Please check the highlighted fields.", fieldErrors }, { status: 422 });
  }
  if (parsed.data.website) return Response.json({ ok: true }); // silently drop bots

  const endpoint = process.env.CONTACT_ENDPOINT;
  if (!endpoint) return Response.json({ ok: true, demo: true });

  try {
    const { website: _w, ...payload } = parsed.data;
    void _w;
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(process.env.CONTACT_TOKEN ? { Authorization: `Bearer ${process.env.CONTACT_TOKEN}` } : {}) },
      body: JSON.stringify({ ...payload, source: "pdthemes.de/contact", receivedAt: new Date().toISOString() }),
    });
    if (!res.ok) throw new Error(`Provider responded ${res.status}`);
    return Response.json({ ok: true });
  } catch (err) {
    console.error("[contact] delivery error", err instanceof Error ? err.message : err);
    return Response.json({ ok: false, message: "We could not send your message right now. Please email us directly." }, { status: 502 });
  }
}
