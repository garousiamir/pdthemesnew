import { createHmac, timingSafeEqual } from "node:crypto";
import { z } from "zod";

/**
 * Freemius webhook helpers.
 *
 * Verification: Freemius signs each delivery with HMAC-SHA256 over the RAW
 * request body using the product's secret key and sends the hex digest in the
 * `X-Signature` header. We recompute it over the raw bytes (never over
 * re-serialised JSON) and compare in constant time.
 *
 * Idempotency: every event carries an `id`. We keep a bounded in-memory set
 * of processed ids for the lifetime of the server process and expose an
 * `EventStore` interface so a persistent store (KV, database) can replace it
 * without touching the route. See docs/freemius-integration.md.
 */

export const webhookEventSchema = z
  .object({
    id: z.union([z.string(), z.number()]).transform(String),
    type: z.string().min(1),
    created: z.union([z.string(), z.number()]).optional(),
    plugin_id: z.union([z.string(), z.number()]).optional(),
    objects: z.record(z.string(), z.unknown()).optional(),
    data: z.record(z.string(), z.unknown()).optional(),
  })
  .passthrough();

export type WebhookEvent = z.infer<typeof webhookEventSchema>;

export function verifySignature(rawBody: string, signature: string | null, secret: string): boolean {
  if (!signature) return false;
  const expected = createHmac("sha256", secret).update(rawBody, "utf8").digest("hex");
  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(signature.trim().toLowerCase(), "utf8");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export interface EventStore {
  has(id: string): Promise<boolean>;
  add(id: string): Promise<void>;
}

/** Process-local store; sufficient for a single Node instance, not for serverless fan-out. */
export class MemoryEventStore implements EventStore {
  private ids = new Set<string>();
  constructor(private limit = 5000) {}
  async has(id: string) {
    return this.ids.has(id);
  }
  async add(id: string) {
    this.ids.add(id);
    if (this.ids.size > this.limit) {
      const first = this.ids.values().next().value;
      if (first) this.ids.delete(first);
    }
  }
}

/** Events the site reacts to. Everything else is acknowledged and ignored. */
export const handledEvents = ["license.created", "license.activated", "license.deactivated", "license.expired", "license.cancelled", "license.extended", "subscription.cancelled", "subscription.renewed", "payment.refund", "payment.created"] as const;

export type Handler = (event: WebhookEvent) => Promise<void>;

/**
 * Default handler: structured log without customer data. Replace or extend
 * (for example, to invalidate a cache or notify a support inbox).
 */
export const defaultHandler: Handler = async (event) => {
  const safe = { id: event.id, type: event.type, product: event.plugin_id, created: event.created };
  console.info("[freemius:webhook]", JSON.stringify(safe));
};
