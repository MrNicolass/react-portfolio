import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

/**
 * Title and description of the 404 page. Next sends 404s as an error shell and renders the
 * page in the browser with the metadata of the route that called `notFound()`, not the one
 * of `not-found.tsx`; so those routes return this too, or the tab shows the home title.
 */
export function notFoundMetadata(locale: Locale): Metadata {
  const { notFound } = getDictionary(locale);
  return { title: notFound.title, description: notFound.description };
}
