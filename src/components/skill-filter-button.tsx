"use client";

import type { SkillId } from "@/data/portfolio";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { setSkillFilter, skillFilterChipId, useSkillFilter } from "@/hooks/use-skill-filter";
import { sections } from "@/lib/site";

type SkillFilterButtonProps = {
  skill: SkillId;
  label: string;
  count: number;
  /** "Used in Naji, Vitals-Deck", shown as a tooltip. */
  usedIn: string;
};

/**
 * Skill pill that filters the Projects section: applies the filter, scrolls there and
 * moves focus to the matching chip, so keyboard users land next to the filtered list.
 */
export default function SkillFilterButton({ skill, label, count, usedIn }: SkillFilterButtonProps) {
  const filter = useSkillFilter();
  const scroll = useSmoothScroll();
  const active = filter === skill;

  return (
    <button
      type="button"
      title={usedIn}
      onClick={() => {
        setSkillFilter(skill);
        scroll(`#${sections.projects}`);
        document.getElementById(skillFilterChipId(skill))?.focus({ preventScroll: true });
      }}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 dark:focus-visible:outline-violet-400 ${
        active
          ? "border-violet-500/60 bg-violet-500/10 text-violet-700 dark:text-violet-300"
          : "border-violet-500/30 bg-violet-500/5 text-foreground/85 hover:border-violet-500/60 hover:bg-violet-500/10 hover:text-violet-700 dark:hover:text-violet-300"
      }`}
    >
      {label}
      <span aria-hidden="true" className="font-mono text-violet-600/70 dark:text-violet-400/70">
        {count}
      </span>
    </button>
  );
}
