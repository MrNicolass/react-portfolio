import Link from "next/link";
import { projectSkills, skillLabels, type Project } from "@/data/portfolio";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { localePath, projectsPath, sections } from "@/lib/site";
import { ArrowRightIcon, ArrowUpRightIcon, GithubIcon } from "./icons";
import ProjectFilter from "./project-filter";
import ProjectImage from "./project-image";
import SectionHeading from "./section-heading";

type ProjectsProps = {
  locale: Locale;
  content: Dictionary["projects"];
  projects: readonly Project[];
};

// Two columns from `sm` inside `max-w-5xl` (976px of content, 24px gap).
const coverSizes = "(min-width: 1024px) 476px, (min-width: 640px) calc(50vw - 2.25rem), calc(100vw - 2rem)";

/** Covers close to 16:9 fill the frame; others (the README banner is 2.28:1) are shown whole. */
function fillsFrame(project: Project) {
  const { width, height } = project.cover.light;
  return Math.abs(width / height - 16 / 9) < 0.05;
}

const outlineLinkClass =
  "relative z-10 inline-flex items-center gap-1.5 rounded-full text-foreground/70 transition-colors hover:text-violet-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-500 dark:hover:text-violet-400 dark:focus-visible:outline-violet-400";

function ProjectCard({
  locale,
  project,
  content,
}: {
  locale: Locale;
  project: Project;
  content: Dictionary["projects"];
}) {
  const copy = content.items[project.slug];
  const fill = fillsFrame(project);

  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-black/10 bg-white/60 transition-all duration-300 hover:border-violet-400/60 hover:shadow-xl hover:shadow-violet-500/10 motion-safe:hover:-translate-y-1 dark:border-white/10 dark:bg-white/5 dark:hover:border-violet-400/40">
      <div
        className={`relative aspect-video overflow-hidden rounded-t-[calc(1rem-1px)] border-b border-black/5 bg-black/[0.03] dark:border-white/5 dark:bg-white/[0.03] ${
          fill ? "" : "flex items-center justify-center p-4 sm:p-5"
        }`}
      >
        <ProjectImage
          image={project.cover}
          alt={copy.imageAlt}
          sizes={coverSizes}
          className={`transition-transform duration-500 motion-safe:group-hover:scale-[1.03] ${
            fill ? "size-full object-cover" : "h-auto w-full rounded-md"
          }`}
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="flex items-center justify-between gap-3 font-pixel text-xs text-foreground/50">
          <span>
            {project.kind} · {project.year}
          </span>
          {project.featured && (
            <span className="rounded-full bg-violet-500/10 px-2 py-0.5 text-violet-700 dark:text-violet-300">
              {content.featured}
            </span>
          )}
        </p>

        <h3 className="mt-3 text-xl font-semibold tracking-tight">
          {/* Stretched link: the whole card opens the case study. */}
          <Link
            href={localePath(locale, `${projectsPath}/${project.slug}`)}
            className="outline-none after:absolute after:inset-0 after:rounded-2xl group-hover:text-violet-600 focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-violet-500 dark:group-hover:text-violet-400 dark:focus-visible:after:outline-violet-400"
          >
            {copy.title}
          </Link>
        </h3>
        <p className="mt-1 text-sm font-semibold text-violet-600 dark:text-violet-400">
          {copy.tagline}
        </p>
        <p className="mt-3 flex-1 text-sm/6 text-foreground/70">{copy.summary}</p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {project.skills.map((skill) => (
            <li
              key={skill}
              className="rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-foreground/80 dark:bg-white/10"
            >
              {skillLabels[skill]}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-x-5 gap-y-3 border-t border-black/5 pt-5 text-sm font-medium dark:border-white/5">
          <span
            aria-hidden="true"
            className="inline-flex items-center gap-1.5 text-violet-600 dark:text-violet-400"
          >
            {content.caseStudy}
            <ArrowRightIcon className="size-4 transition-transform motion-safe:group-hover:translate-x-1" />
          </span>
          <span className="flex gap-4">
            <a
              href={project.repository}
              target="_blank"
              rel="noopener noreferrer"
              className={outlineLinkClass}
            >
              <GithubIcon className="size-4" />
              {content.repository}
            </a>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className={outlineLinkClass}
              >
                <ArrowUpRightIcon className="size-4" />
                {content.live}
              </a>
            )}
          </span>
        </div>
      </div>
    </article>
  );
}

export default function Projects({ locale, content, projects }: ProjectsProps) {
  const skills = projectSkills(projects).map((skill) => ({
    id: skill.id,
    label: skillLabels[skill.id],
    count: skill.projects.length,
  }));

  return (
    <section id={sections.projects} className="py-24 sm:py-32">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <SectionHeading index="03" title={content.title} description={content.description} />
        <ProjectFilter
          labels={{ filter: content.filterLabel, all: content.filterAll, filtering: content.filtering }}
          skills={skills}
          items={projects.map((project) => ({
            slug: project.slug,
            skills: project.skills,
            card: <ProjectCard locale={locale} project={project} content={content} />,
          }))}
        />
      </div>
    </section>
  );
}
