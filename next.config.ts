import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/** Origin of the optional analytics script (see `src/components/analytics.tsx`), allowed by the CSP. */
function analyticsOrigin(): string {
  const src = process.env.NEXT_PUBLIC_ANALYTICS_SRC;
  if (!src) return "";
  try {
    return ` ${new URL(src).origin}`;
  } catch {
    return "";
  }
}

const analytics = analyticsOrigin();

/*
 * Cloudflare Web Analytics: the edge injects `static.cloudflareinsights.com/beacon.min.js` into every
 * HTML page, and the beacon reports to `cloudflareinsights.com`. Not visible in local builds.
 */
const cloudflareScript = " https://static.cloudflareinsights.com";
const cloudflareConnect = " https://cloudflareinsights.com";

/*
 * Pages are statically rendered, so a nonce-based policy is not possible: Next inlines its flight
 * data and the theme script without a nonce. `'unsafe-inline'` stays for scripts; everything else
 * (framing, plugins, <base>, form targets, connections, images) is locked to known origins.
 * `/cdn-cgi/` (Cloudflare e-mail obfuscation) is same-origin, so `'self'` covers it.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}${cloudflareScript}${analytics}`,
  "style-src 'self' 'unsafe-inline'",
  // The Activity section loads the contribution game straight from GitHub.
  "img-src 'self' data: blob: https://raw.githubusercontent.com",
  "font-src 'self'",
  `connect-src 'self'${cloudflareConnect}${analytics}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const securityHeaders = [
  // One year, this host only: subdomains of imconte.com are separate services.
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  // Validation builds use NEXT_DIST_DIR=.next-preview, so they never touch the
  // `.next` folder served by the production service.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  // Project notes live outside the repository; don't let `next dev` write AGENTS.md/CLAUDE.md.
  agentRules: false,
  poweredByHeader: false,
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        // `/activity/*.svg` sends its own sandboxed policy (see its route handler).
        source: "/((?!activity/).*)",
        headers: [{ key: "Content-Security-Policy", value: contentSecurityPolicy }],
      },
    ];
  },
};

export default nextConfig;
