import type { Product } from "@/types";

/**
 * Freemius configuration. Only PUBLIC identifiers are ever read on the client:
 * product ids, plan ids, pricing ids and the product public key. The secret
 * key is used exclusively by the webhook route on the server.
 *
 * See docs/freemius-integration.md for where each value comes from.
 */
export type CheckoutConfig = {
  productId: string;
  publicKey?: string;
  planId?: string;
  pricingId?: string;
  licenses?: number | "unlimited";
  billingCycle?: "annual" | "monthly" | "lifetime";
  currency: string;
};

/** True when the product has a Freemius product id configured. */
export function isCheckoutConfigured(p: Product): boolean {
  return Boolean(p.freemiusProductId);
}

/** Global demo switch; also true automatically when no product is configured. */
export function isDemoMode(p?: Product): boolean {
  if (process.env.NEXT_PUBLIC_FREEMIUS_DEMO_MODE === "true") return true;
  if (p) return !isCheckoutConfigured(p);
  return false;
}

export function checkoutConfigFor(p: Product, tierId?: string): CheckoutConfig | null {
  if (!p.freemiusProductId) return null;
  const tier = p.pricing.tiers.find((t) => t.id === tierId) ?? p.pricing.tiers.find((t) => t.highlighted) ?? p.pricing.tiers[0];
  return {
    productId: p.freemiusProductId,
    publicKey: p.freemiusPublicKey,
    planId: tier?.freemiusPlanId ?? p.freemiusPlanIds[0],
    pricingId: tier?.freemiusPricingId,
    licenses: tier?.sites,
    billingCycle: tier?.billingCycle === "one-time" ? "lifetime" : tier?.billingCycle === "monthly" ? "monthly" : "annual",
    currency: p.pricing.currency.toLowerCase(),
  };
}
