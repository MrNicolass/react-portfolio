import { getProject, profile, projects, skillLabels } from "@/data/portfolio";
import { isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { renderOgImage } from "@/lib/og";

/* Share card of a case study, served at `/{locale}/projetos/{slug}/og.png`. */

export const dynamicParams = false;

// Route handlers only read `generateStaticParams` from their own file, so it lists every pair.
export function generateStaticParams() {
  return locales.flatMap((locale) => projects.map((project) => ({ locale, slug: project.slug })));
}

export async function GET(
  _request: Request,
  { params }: RouteContext<"/[locale]/projetos/[slug]/og.png">,
) {
  const { locale, slug } = await params;
  const project = getProject(slug);

  if (!isLocale(locale) || !project) {
    return new Response("Not Found", { status: 404 });
  }

  const dictionary = getDictionary(locale);
  const copy = dictionary.projects.items[project.slug];

  return renderOgImage({
    eyebrow: `${profile.name} · ${dictionary.navigation.projects}`.toLocaleUpperCase(locale),
    aside: `${project.kind} · ${project.year}`,
    title: copy.title,
    lead: copy.tagline,
    body: project.skills
      .slice(0, 4)
      .map((skill) => skillLabels[skill])
      .join(" · "),
    size: "md",
  });
}
