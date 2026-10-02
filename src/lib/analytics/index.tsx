import Script from "next/script";

/**
 * Privacy-friendly analytics (Plausible). Renders nothing unless
 * NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set, so development and demo deployments
 * send no data anywhere. Cookie-free; no consent banner required for it.
 */
export function Analytics() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domain) return null;
  return <Script defer data-domain={domain} src="https://plausible.io/js/script.js" strategy="afterInteractive" />;
}
