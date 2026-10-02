import { NextResponse } from "next/server";
import {
  MemoryEventStore,
  defaultHandler,
  handledEvents,
  verifySignature,
  webhookEventSchema,
} from "@/lib/freemius/webhook";

const store = new MemoryEventStore();

/**
 * POST /api/freemius/webhook
 * Configure this URL in the Freemius Developer Dashboard → Integrations → Webhooks.
 * Requires FREEMIUS_WEBHOOK_SECRET (the product's secret key). Never exposed to the client.
 */
export async function POST(request: Request) {
  const secret = process.env.FREEMIUS_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json(
      { ok: false, error: "Webhook not configured." },
      { status: 503 },
    );
  }

  const raw = await request.text();
  const signature = request.headers.get("x-signature");
  if (!verifySignature(raw, signature, secret)) {
    return NextResponse.json(
      { ok: false, error: "Invalid signature." },
      { status: 401 },
    );
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return NextResponse.json(
      { ok: false, error: "Malformed JSON." },
      { status: 400 },
    );
  }
  const event = webhookEventSchema.safeParse(parsed);
  if (!event.success) {
    return NextResponse.json(
      { ok: false, error: "Unexpected payload." },
      { status: 422 },
    );
  }

  if (await store.has(event.data.id)) {
    return NextResponse.json({ ok: true, duplicate: true });
  }
  await store.add(event.data.id);

  if ((handledEvents as readonly string[]).includes(event.data.type)) {
    try {
      await defaultHandler(event.data);
    } catch (err) {
      // Log without payload details; Freemius retries on non-2xx.
      console.error(
        "[freemius:webhook] handler failed",
        event.data.id,
        err instanceof Error ? err.message : "unknown",
      );
      return NextResponse.json(
        { ok: false, error: "Handler failed." },
        { status: 500 },
      );
    }
  }
  return NextResponse.json({ ok: true });
}

export function GET() {
  return NextResponse.json(
    { ok: false, error: "Method not allowed." },
    { status: 405 },
  );
}
