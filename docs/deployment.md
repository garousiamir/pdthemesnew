# Deployment

## Hosting recommendation

PDThemes is a Next.js application with three server routes (newsletter, contact, Freemius webhook). Everything else is static HTML generated at build time.

| Option | Fits when | Notes |
| --- | --- | --- |
| **Vercel** (recommended) | You want zero-ops hosting with preview deployments and image optimisation | Verified Next.js adapter. Connect the GitHub repo, set env vars, add the `pdthemes.de` domain. Webhook idempotency store must become a shared store (Vercel KV / Upstash) because functions are stateless. |
| **Node server / Docker** (Hetzner, Fly.io, Render, Railway) | You prefer EU hosting or a fixed monthly cost | `output: "standalone"` is enabled in `next.config.ts`; the Dockerfile below builds a ~150 MB image. The in-memory webhook store works on a single instance. |
| **Static export** | Only if you drop the API routes | `next export`-style static hosting (S3, Nginx, classic web hosting) cannot run the contact, newsletter or webhook routes and loses `next/image` optimisation unless you configure a loader. Freemius checkout itself works on a static site. Not recommended for pdthemes.de because the webhook and contact form would need separate services. |
| **Ordinary PHP shared hosting** | Never | It cannot run a persistent Node process. If the domain is on such a host, point DNS at one of the options above and keep WordPress demos on the PHP host (e.g. `demo.pdthemes.de`). |

## Environment variables

See `.env.example`. Required for production:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical base URL (`https://pdthemes.de`). |
| `NEXT_PUBLIC_FREEMIUS_<SLUG>_ID` (+ `_PUBLIC_KEY`) | Per product; without them the product stays in demonstration mode. |
| `FREEMIUS_WEBHOOK_SECRET` | Product secret key for webhook verification. Server only. |
| `CONTACT_ENDPOINT` / `CONTACT_TOKEN` | Where contact form submissions are POSTed (an email relay or ticketing webhook). |
| `NEWSLETTER_ENDPOINT` / `NEWSLETTER_TOKEN` | Newsletter provider subscribe endpoint. |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Optional analytics. |

Secrets never carry the `NEXT_PUBLIC_` prefix.

## Build and run

```bash
npm ci
npm run typecheck && npm run lint
npm run build          # fails on invalid content
npm run start          # Node server on :3000 (PORT to override)
```

Standalone output (Docker / bare Node):

```bash
npm run build
cp -r public .next/standalone/ && cp -r .next/static .next/standalone/.next/
PORT=3000 HOSTNAME=0.0.0.0 node .next/standalone/server.js
```

### Dockerfile

```dockerfile
FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:22-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:22-alpine AS run
WORKDIR /app
ENV NODE_ENV=production PORT=3000 HOSTNAME=0.0.0.0
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

## Domain and SSL

1. Point `pdthemes.de` and `www.pdthemes.de` at the host (A/AAAA or CNAME as the provider instructs). Redirect `www` → apex (or the reverse) at the host; Vercel does this in the domain settings, Nginx with a `return 301`.
2. SSL: Vercel/Fly/Render issue Let's Encrypt certificates automatically. For a bare server use Caddy (automatic) or certbot with Nginx. Enable HSTS once the certificate is verified.
3. Keep `demo.pdthemes.de` and `downloads.pdthemes.de` (used by product `demoUrl` / `freeDownloadUrl`) on whatever hosts the WordPress demos and zips; they are independent of this app.

## Freemius configuration

1. Create each product in the Freemius Developer Dashboard; note product id and public key.
2. Create plans and pricing (sites ladder, annual or lifetime).
3. Put ids into the env vars and the `freemiusPlanId` / `freemiusPricingId` fields in the product files.
4. Add the webhook URL `https://pdthemes.de/api/freemius/webhook`, copy the secret key into `FREEMIUS_WEBHOOK_SECRET`, send a test event.
5. Customise the checkout (logo, colours) in the dashboard; `show_refund_badge` is enabled from the site.
6. Set `status: "live"` on the product and redeploy.

## Backups and rollback

- Source of truth is the Git repository (content included). Back it up by mirroring the repo; there is no database.
- Freemius holds customer, license and payment data; export from the dashboard as needed.
- Rollback: redeploy the previous commit (Vercel: "Promote to production" on an earlier deployment; Docker: run the previous image tag). Static output has no migrations.

## Analytics

Set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` to enable cookie-free analytics. Any other provider can be added in `src/lib/analytics/index.tsx`; if it uses cookies, add a consent mechanism and update the cookie policy.

## Launch checklist

- [ ] All env vars set; `NEXT_PUBLIC_FREEMIUS_DEMO_MODE` unset.
- [ ] Demonstration products replaced or retired; `site.testimonialsVerified` reflects reality.
- [ ] Legal pages reviewed (`reviewed: true`), imprint filled in.
- [ ] `npm run test` green against the production URL (`BASE_URL=https://pdthemes.de npm run test`).
- [ ] Sitemap submitted; see `docs/seo.md`.
- [ ] Rate limiting / bot protection for `/api/contact` at the host or CDN layer.
- [ ] Uptime monitoring on `/` and `/api/freemius/webhook` (expects 405 on GET).
