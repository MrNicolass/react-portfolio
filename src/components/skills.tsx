import { projectSkills, skillLabels, type Project, type skillGroups } from "@/data/portfolio";
import type { Dictionary } from "@/i18n/dictionaries";
import { sections } from "@/lib/site";
import Reveal from "./reveal";
import SectionHeading from "./section-heading";
import SkillFilterButton from "./skill-filter-button";

type SkillsProps = {
  content: Dictionary["skills"];
  groups: typeof skillGroups;
  projects: readonly Project[];
  projectTitles: Dictionary["projects"]["items"];
};

export default function Skills({ content, groups, projects, projectTitles }: SkillsProps) {
  const usage = new Map(projectSkills(projects).map((skill) => [skill.id, skill.projects]));

  return (
    <section id={sections.skills} className="py-24 sm:py-32">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <SectionHeading index="04" title={content.title} description={content.description} />
        <Reveal>
          <p className="mt-3 flex items-center gap-2 text-sm text-foreground/60">
            <span aria-hidden="true" className="size-2 shrink-0 bg-violet-500" />
            {content.hint}
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {groups.map((group, index) => (
            <Reveal key={group.id} delay={(index % 2) * 100} className="h-full">
              <div className="h-full rounded-2xl border border-black/10 bg-white/60 p-6 dark:border-white/10 dark:bg-white/5">
                <h3 className="font-pixel text-sm text-foreground/50">
                  {content.categories[group.id]}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((skill) => {
                    const slugs = usage.get(skill);
                    return (
                      <li key={skill} className="flex">
                        {slugs ? (
                          <SkillFilterButton
                            skill={skill}
                            label={skillLabels[skill]}
                            count={slugs.length}
                            usedIn={`${content.usedIn} ${slugs
                              .map((slug) => projectTitles[slug].title)
                              .join(", ")}`}
                          />
                        ) : (
                          <span className="rounded-full border border-transparent bg-black/5 px-3 py-1 text-xs font-medium text-foreground/70 dark:bg-white/10">
                            {skillLabels[skill]}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
