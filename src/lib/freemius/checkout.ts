"use client";

import type { Checkout } from "@freemius/checkout";
import type { CheckoutConfig } from "./config";

export type CheckoutResult = { status: "completed" | "closed" | "cancelled"; data?: unknown };

const instances = new Map<string, Checkout>();

/**
 * Opens the official Freemius overlay checkout for a configured product.
 * The SDK is loaded lazily so it never ships to pages without a Buy button.
 *
 * Reference: @freemius/checkout — `new Checkout({ product_id })` then
 * `checkout.open({ plan_id, licenses, purchaseCompleted, success, cancel })`.
 */
export async function openFreemiusCheckout(
  config: CheckoutConfig,
  opts: { name: string; image?: string; onComplete?: (data: unknown) => void; onClose?: () => void; onCancel?: () => void } = { name: "" },
) {
  const { Checkout } = await import("@freemius/checkout");
  let instance = instances.get(config.productId);
  if (!instance) {
    instance = new Checkout({
      product_id: config.productId,
      public_key: config.publicKey,
      image: opts.image,
    });
    instances.set(config.productId, instance);
  }
  const licenses = config.licenses === "unlimited" ? 0 : config.licenses;
  await instance.open({
    name: opts.name,
    plan_id: config.planId,
    pricing_id: config.pricingId,
    licenses,
    billing_cycle: config.billingCycle,
    currency: config.currency as "usd",
    show_refund_badge: true,
    purchaseCompleted: (data: unknown) => opts.onComplete?.(data),
    success: () => opts.onClose?.(),
    cancel: () => opts.onCancel?.(),
  });
}

/** Tears down cached checkout instances (used by tests and on hot reloads). */
export function destroyCheckouts() {
  for (const inst of instances.values()) inst.destroy();
  instances.clear();
}
