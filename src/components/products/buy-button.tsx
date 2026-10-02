"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Loader2, ShoppingBag, X } from "lucide-react";
import type { Product } from "@/types";
import { Button, type ButtonLikeProps } from "@/components/ui/button";
import { checkoutConfigFor, isDemoMode } from "@/lib/freemius/config";
import { formatPrice } from "@/lib/utils";

type Props = {
  product: Product;
  tierId?: string;
  label?: string;
  variant?: ButtonLikeProps["variant"];
  size?: ButtonLikeProps["size"];
  className?: string;
  arrow?: boolean;
};

type Modal = null | { kind: "demo" } | { kind: "success" } | { kind: "error"; message: string };

/**
 * Buy Now button. With a configured Freemius product it opens the real overlay
 * checkout; otherwise it opens a clearly labelled demonstration dialog.
 */
export function BuyButton({ product, tierId, label, variant = "accent", size = "md", className, arrow }: Props) {
  const [busy, setBusy] = useState(false);
  const [modal, setModal] = useState<Modal>(null);
  const demo = isDemoMode(product);
  const tier = product.pricing.tiers.find((t) => t.id === tierId) ?? product.pricing.tiers.find((t) => t.highlighted) ?? product.pricing.tiers[0];

  async function onClick() {
    if (demo) {
      setModal({ kind: "demo" });
      return;
    }
    const config = checkoutConfigFor(product, tierId);
    if (!config) {
      setModal({ kind: "error", message: "This product is not configured for checkout yet." });
      return;
    }
    setBusy(true);
    try {
      const { openFreemiusCheckout } = await import("@/lib/freemius/checkout");
      await openFreemiusCheckout(config, {
        name: product.name,
        image: product.thumbnail.src.startsWith("http") ? product.thumbnail.src : undefined,
        onComplete: () => setModal({ kind: "success" }),
        onClose: () => setBusy(false),
        onCancel: () => setBusy(false),
      });
    } catch (err) {
      console.error("[checkout]", err);
      setModal({ kind: "error", message: "The checkout could not be opened. Please try again or contact support." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={className}
        onClick={onClick}
        disabled={busy}
        arrow={arrow}
        data-testid="buy-button"
        data-checkout-mode={demo ? "demo" : "live"}
        aria-haspopup="dialog"
      >
        {busy ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <ShoppingBag className="size-4" aria-hidden />}
        {label ?? "Buy Now"}
      </Button>
      <AnimatePresence>
        {modal && (
          <div className="fixed inset-0 z-[90] grid place-items-center p-4" role="dialog" aria-modal="true" aria-labelledby="checkout-dialog-title">
            <motion.button type="button" aria-label="Close" className="absolute inset-0 bg-ink/50 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setModal(null)} />
            <motion.div
              className="relative w-full max-w-md rounded-xl border border-stone-200 bg-paper p-6 shadow-float sm:p-8"
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 6 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              data-testid="checkout-dialog"
            >
              <button type="button" onClick={() => setModal(null)} aria-label="Close" className="absolute right-4 top-4 grid size-9 place-items-center rounded-full hover:bg-paper-2">
                <X className="size-4" />
              </button>
              {modal.kind === "demo" && (
                <>
                  <p className="eyebrow">Demonstration checkout</p>
                  <h3 id="checkout-dialog-title" className="mt-3 font-display text-2xl">
                    {product.name}
                    {tier ? ` — ${tier.name}` : ""}
                  </h3>
                  {tier && (
                    <p className="mt-1 font-mono text-sm text-stone-600">
                      {formatPrice(tier.price, product.pricing.currency)} / {tier.billingCycle === "one-time" ? "one-time" : tier.billingCycle} · {tier.sites === "unlimited" ? "unlimited sites" : `${tier.sites} site${tier.sites > 1 ? "s" : ""}`}
                    </p>
                  )}
                  <p className="mt-4 text-sm leading-relaxed text-stone-600">
                    This site is running in demonstration mode: no Freemius product id is configured for <strong>{product.name}</strong>, so no checkout is opened and no payment is possible. In production this button opens the official Freemius overlay checkout for the selected plan.
                  </p>
                  <p className="mt-3 rounded-md bg-paper-2 p-3 font-mono text-[12px] text-stone-600">
                    Set NEXT_PUBLIC_FREEMIUS_{product.slug.toUpperCase()}_ID (and plan ids) to enable it. See docs/freemius-integration.md.
                  </p>
                  <div className="mt-6 flex gap-2">
                    <Button variant="primary" onClick={() => setModal(null)}>
                      Got it
                    </Button>
                    <Button variant="secondary" href={`/products/${product.slug}#pricing`} onClick={() => setModal(null)}>
                      View pricing
                    </Button>
                  </div>
                </>
              )}
              {modal.kind === "success" && (
                <>
                  <span className="grid size-10 place-items-center rounded-full bg-moss-soft text-moss">
                    <Check className="size-5" />
                  </span>
                  <h3 id="checkout-dialog-title" className="mt-4 font-display text-2xl">
                    Thank you — your purchase is complete.
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-stone-600">
                    Your license key and download link are on their way by email. You can also manage everything in the Freemius customer portal.
                  </p>
                  <div className="mt-6 flex gap-2">
                    <Button variant="primary" href="https://users.freemius.com/" external>
                      Open customer portal
                    </Button>
                    <Button variant="secondary" href="/documentation">
                      Installation guide
                    </Button>
                  </div>
                </>
              )}
              {modal.kind === "error" && (
                <>
                  <h3 id="checkout-dialog-title" className="font-display text-2xl">
                    Checkout unavailable
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-stone-600">{modal.message}</p>
                  <div className="mt-6 flex gap-2">
                    <Button variant="primary" onClick={() => setModal(null)}>
                      Close
                    </Button>
                    <Button variant="secondary" href="/contact">
                      Contact support
                    </Button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
