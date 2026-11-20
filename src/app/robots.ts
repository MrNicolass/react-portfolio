import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/portfolio";

/**
 * Cloudflare prepends its managed content-signals block to this file at the edge,
 * so only crawl rules live here. Share images (`og.png`) stay allowed: link preview
 * bots honor `Disallow` and would stop rendering cards.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
