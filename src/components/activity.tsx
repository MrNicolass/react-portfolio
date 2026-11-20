import type { profile } from "@/data/portfolio";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { activitySize, activityStillPath, activityThemes } from "@/lib/activity";
import { sections } from "@/lib/site";
import Homelab from "./homelab";
import { ArrowUpRightIcon, GithubIcon } from "./icons";
import Reveal from "./reveal";
import SectionHeading from "./section-heading";

type ActivityProps = {
  locale: Locale;
  content: Dictionary["activity"];
  homelab: Dictionary["homelab"];
  profile: typeof profile;
};

/**
 * GitHub contribution game from the profile README (`output` branch, regenerated daily).
 * One `<picture>` per theme, toggled by `.activity-dark/.activity-light` (globals.css):
 * `<source media>` can only follow the system scheme, not the site toggle. Inside each,
 * `<source>` swaps in the still frame under `prefers-reduced-motion`. Both images are lazy,
 * so the hidden one is never downloaded.
 */
export default function Activity({ locale, content, homelab, profile }: ActivityProps) {
  return (
    <section id={sections.activity} className="py-24 sm:py-32">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <SectionHeading index="05" title={content.title} description={content.description} />

        <Reveal className="mt-10">
          {activityThemes.map((theme) => (
            <picture key={theme} className={`activity-${theme}`}>
              <source media="(prefers-reduced-motion: reduce)" srcSet={activityStillPath(theme)} />
              <img
                src={profile.activity[theme]}
                alt={content.alt}
                width={activitySize.width}
                height={activitySize.height}
                loading="lazy"
                decoding="async"
                className="h-auto w-full"
              />
            </picture>
          ))}

          <a
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full text-sm font-medium text-violet-600 transition-colors hover:text-violet-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-500 dark:text-violet-400 dark:hover:text-violet-300 dark:focus-visible:outline-violet-400"
          >
            <GithubIcon className="size-4" />
            {content.profile}
            <ArrowUpRightIcon className="size-4" />
          </a>
        </Reveal>

        <Reveal>
          <Homelab locale={locale} content={homelab} />
        </Reveal>
      </div>
    </section>
  );
}
