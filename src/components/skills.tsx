import type { skillGroups } from "@/data/portfolio";
import type { Dictionary } from "@/i18n/dictionaries";
import Reveal from "./reveal";
import SectionHeading from "./section-heading";
import { CheckIcon } from "./icons";

type SkillGroup = (typeof skillGroups)[number] & { category: string };

type SkillsProps = {
  content: Dictionary["skills"];
  groups: readonly SkillGroup[];
};

export default function Skills({ content, groups }: SkillsProps) {
  return (
    <section id="skills" className="py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading
          index="03"
          title={content.title}
          description={content.description}
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group, index) => (
            <Reveal key={group.id} delay={index * 100} className="h-full">
              <div className="h-full rounded-2xl border border-black/10 bg-white p-6 transition-colors duration-300 hover:border-violet-400/60 dark:border-white/10 dark:bg-white/5 dark:hover:border-violet-400/40">
                <h3 className="font-semibold">{group.category}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <li
                      key={skill}
                      className="inline-flex items-center gap-1.5 rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-foreground/80 dark:bg-white/10 dark:text-foreground/80"
                    >
                      <CheckIcon className="size-3 text-violet-500 dark:text-violet-400" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}