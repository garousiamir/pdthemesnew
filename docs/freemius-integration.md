# Freemius integration

Freemius handles checkout, licensing, invoices, renewals, refunds and the customer portal. PDThemes does not reimplement any of that. This document describes what the site does and what you need to configure.

> The Freemius documentation site (`freemius.com/help`) was not reachable from the build environment. The integration follows the official `@freemius/checkout` npm package (v1.5.1), whose README and TypeScript definitions were read directly, and the webhook signature mechanism as documented publicly (HMAC-SHA256 of the raw body with the product secret key, sent in `X-Signature`). Verify both against the current documentation before going live.

## 1. Checkout

### What is implemented

- `src/lib/freemius/checkout.ts` lazily imports `@freemius/checkout`, creates one `Checkout` instance per product id (`new Checkout({ product_id, public_key, image })`) and opens it with `checkout.open({ name, plan_id, pricing_id, licenses, billing_cycle, currency, show_refund_badge, purchaseCompleted, success, cancel })`.
- `src/components/products/buy-button.tsx` is the only entry point. It:
  - opens the real overlay when the product has a `freemiusProductId`;
  - otherwise opens a labelled **demonstration dialog** that explains that no checkout is configured;
  - shows a success dialog after `purchaseCompleted` with links to the customer portal and the installation guide;
  - handles SDK load failures with an error dialog.
- Tier buttons in the pricing table pass `tierId`, which maps to `freemiusPlanId`, `freemiusPricingId`, `sites` → `licenses` (unlimited → `0`) and `billingCycle`.
- `NEXT_PUBLIC_FREEMIUS_DEMO_MODE=true` forces the demonstration dialog everywhere, even with ids set (useful for staging).

### What you configure

| Setting | Where | Env var |
| --- | --- | --- |
| Product id | Developer Dashboard → product → Settings | `NEXT_PUBLIC_FREEMIUS_<SLUG>_ID` |
| Public key | same page | `NEXT_PUBLIC_FREEMIUS_<SLUG>_PUBLIC_KEY` (optional for the SDK ≥ 1.5, kept for compatibility) |
| Plan ids / pricing ids | Developer Dashboard → Plans | `freemiusPlanId` / `freemiusPricingId` on each tier in the product file |
| Currency | Plans → pricing | `pricing.currency` in the product file (the checkout can also use `auto`) |

Only public identifiers are used in the browser. The product **secret key** is never referenced in client code.

### Sandbox testing

Freemius supports a sandbox mode via `sandbox: { ctx, token }` on `open()`. It is intentionally not wired in; add it behind an environment flag if you need to run real sandbox purchases from a staging deployment. Automated tests never reach Freemius (see `tests/e2e/checkout.spec.ts`).

## 2. Licensing and customer accounts

- The header, mobile menu, support page and the success dialog link to the Freemius customer portal (`https://users.freemius.com/`). Customers log in with their purchase email.
- Updates are delivered by the Freemius WordPress SDK bundled in each product, not by this website.
- There is no PDThemes account system, by design. The "Customer experience" section on the homepage describes the Freemius flow with illustrative previews, clearly labelled as such.

## 3. Freemium products and WordPress.org

- Products with `wordpressOrgUrl` show "Download Free", "View on WordPress.org", "Compare Free vs Pro" (a `compare` story section) and "Upgrade to Pro" (the pricing table).
- Themes distributed on WordPress.org cannot bundle the Freemius SDK with paid features; the free theme (`Lumen`) therefore has no Pro version and no Freemius ids. Freemium **plugins** use the free-core + Pro-add-on model, which is compatible with the WordPress.org guidelines when the free plugin does not depend on the Pro one. Confirm each product's distribution model against the current WordPress.org plugin and theme guidelines.

## 4. Webhooks

`POST /api/freemius/webhook` (`src/app/api/freemius/webhook/route.ts`):

1. Returns 503 until `FREEMIUS_WEBHOOK_SECRET` is set.
2. Reads the **raw** body and verifies `X-Signature` with HMAC-SHA256 and a constant-time comparison. Invalid → 401.
3. Parses and validates the JSON (`id`, `type`, …). Invalid → 400/422.
4. Deduplicates by event `id` (`MemoryEventStore`, bounded). Duplicate → 200 `{ duplicate: true }`.
5. Runs `defaultHandler` for the events listed in `handledEvents` (license and subscription lifecycle, payments, refunds). The default handler logs `{ id, type, product, created }` only — no customer data. Handler failure → 500 so Freemius retries.

Configure the URL in the Developer Dashboard → Integrations → Webhooks. For serverless hosting, implement `EventStore` with a shared store (Redis, KV, database) and swap it in the route.

## 5. Security checklist

- [ ] Secret key only in `FREEMIUS_WEBHOOK_SECRET` (server).
- [ ] `NEXT_PUBLIC_*` variables contain only ids and the public key.
- [ ] Webhook endpoint reachable over HTTPS only.
- [ ] Review Freemius' CSP/iframe requirements if you add a strict Content-Security-Policy (the overlay is an iframe from `checkout.freemius.com`).
