import Script from "next/script";

/**
 * Optional, privacy-friendly analytics (Umami, Plausible or any script with the same shape).
 * Nothing is loaded unless both variables are set at build time:
 *   NEXT_PUBLIC_ANALYTICS_SRC     script URL, e.g. https://stats.example.com/script.js
 *   NEXT_PUBLIC_ANALYTICS_SITE_ID website id passed as `data-website-id` (Umami) / `data-domain` (Plausible)
 */
export default function Analytics() {
  const src = process.env.NEXT_PUBLIC_ANALYTICS_SRC;
  const siteId = process.env.NEXT_PUBLIC_ANALYTICS_SITE_ID;

  if (!src || !siteId) {
    return null;
  }

  return (
    <Script
      src={src}
      strategy="afterInteractive"
      data-website-id={siteId}
      data-domain={siteId}
      data-do-not-track="true"
    />
  );
}
