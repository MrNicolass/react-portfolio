import type { MetadataRoute } from "next";
import { projects, siteUrl } from "@/data/portfolio";
import { locales } from "@/i18n/config";
import { languageAlternates, localePath, projectsPath } from "@/lib/site";

/** Every page that exists in all locales: the home, the CV and one case study per project. */
const paths = ["", "cv", ...projects.map((project) => `${projectsPath}/${project.slug}`)];

/**
 * One `<url>` per locale version, each listing every version (itself included) and
 * `x-default` as `hreflang` alternates, as search engines expect for localized sites.
 * No `lastModified`: the site has no per-page dates, and a build timestamp would be noise.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: siteUrl + localePath(locale, path),
      alternates: { languages: languageAlternates(path, siteUrl) },
    })),
  );
}
