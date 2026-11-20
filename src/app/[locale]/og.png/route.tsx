import { profile } from "@/data/portfolio";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { renderOgImage } from "@/lib/og";
import { displayUrl, siteUrl } from "@/lib/site";

/*
 * Share card of the home page (also used by the CV), served at `/{locale}/og.png`.
 * A plain route handler instead of the `opengraph-image` convention: the alt text has to
 * follow the locale, and `shareMetadata` passes it together with this URL.
 * The dot in the path keeps it out of the locale redirect in `proxy.ts`.
 */

export const dynamicParams = false;

// Route handlers only read `generateStaticParams` from their own file, so it lists every locale.
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function GET(_request: Request, { params }: RouteContext<"/[locale]/og.png">) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return new Response("Not Found", { status: 404 });
  }

  const { hero } = getDictionary(locale);

  return renderOgImage({
    eyebrow: hero.status,
    aside: displayUrl(siteUrl),
    title: profile.name,
    lead: hero.role,
    body: hero.facts.map((fact) => fact.value).join(" · "),
  });
}
