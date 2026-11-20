import type { Metadata } from "next";
import { profile, siteUrl } from "@/data/portfolio";
import { defaultLocale, locales, type Locale } from "@/i18n/config";

/** Section anchors. IDs stay in Portuguese in both locales (see the CDS layout contract). */
export const sections = {
  home: "inicio",
  about: "sobre",
  experience: "experiencia",
  projects: "projetos",
  skills: "skills",
  activity: "atividade",
  contact: "contato",
} as const;

export type SectionKey = keyof typeof sections;

/** Path segment of the case study pages, kept stable across locales. */
export const projectsPath = "projetos";

export function localePath(locale: Locale, path = "") {
  const clean = path.replace(/^\/+/, "");
  return clean ? `/${locale}/${clean}` : `/${locale}`;
}

/**
 * `hreflang` map of a path that exists in every locale, plus `x-default`.
 * Paths are relative; pass `origin` for absolute URLs (the sitemap needs them).
 */
export function languageAlternates(path = "", origin = "") {
  const languages: Record<string, string> = {};
  for (const item of locales) {
    languages[item] = origin + localePath(item, path);
  }
  languages["x-default"] = origin + localePath(defaultLocale, path);
  return languages;
}

/** Builds `canonical` and `hreflang` alternates for a path that exists in every locale. */
export function alternatesFor(locale: Locale, path = ""): Metadata["alternates"] {
  return { canonical: localePath(locale, path), languages: languageAlternates(path) };
}

export const ogLocale: Record<Locale, string> = {
  "pt-BR": "pt_BR",
  en: "en_US",
};

/** Size of the generated share cards (the 1.91:1 ratio used by Open Graph, LinkedIn and X). */
export const ogSize = { width: 1200, height: 630 } as const;

/**
 * Share card drawn by the `og.png` route handler next to a page
 * (`/[locale]/og.png` for the home and the CV, `/[locale]/projetos/[slug]/og.png` for projects).
 */
export function ogImagePath(locale: Locale, path = "") {
  return `${localePath(locale, path)}/og.png`;
}

type ShareInput = {
  path?: string;
  title: string;
  description: string;
  image: { url: string; alt: string };
};

/**
 * `alternates`, Open Graph and Twitter fields of a page.
 * Next merges metadata shallowly: a page that sets one of these objects replaces the
 * layout's version entirely (images included), so every page sends all three through
 * this helper, always with an explicit share image.
 */
export function shareMetadata(
  locale: Locale,
  { path = "", title, description, image }: ShareInput,
): Pick<Metadata, "alternates" | "openGraph" | "twitter"> {
  return {
    alternates: alternatesFor(locale, path),
    openGraph: {
      type: "website",
      siteName: profile.name,
      locale: ogLocale[locale],
      alternateLocale: locales.filter((item) => item !== locale).map((item) => ogLocale[item]),
      title,
      description,
      url: localePath(locale, path),
      images: [{ ...image, ...ogSize, type: "image/png" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

/** Pre-rendered CV PDF in `public/cv/`, generated from the `/[locale]/cv` page. */
export function cvPdfPath(locale: Locale) {
  return `/cv/nicolas-conte-cv-${locale}.pdf`;
}

/** URL without protocol or trailing slash, for printed links ("imconte.com"). */
export function displayUrl(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export { siteUrl };
