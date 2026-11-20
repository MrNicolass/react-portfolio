"use client";

import { useId, type ReactNode } from "react";
import type { ProjectSlug, SkillId } from "@/data/portfolio";
import { setSkillFilter, skillFilterChipId, useSkillFilter } from "@/hooks/use-skill-filter";
import Reveal from "./reveal";

type ProjectFilterProps = {
  labels: { filter: string; all: string; filtering: string };
  /** Filterable skills (used by at least one project), most used first. */
  skills: readonly { id: SkillId; label: string; count: number }[];
  /** Cards are rendered on the server; this component only shows or hides them. */
  items: readonly { slug: ProjectSlug; skills: readonly SkillId[]; card: ReactNode }[];
};

const chipClass =
  "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 dark:focus-visible:outline-violet-400";

const chipState = {
  on: "border-violet-600 bg-violet-600 text-white dark:border-violet-500 dark:bg-violet-500",
  off: "border-black/10 bg-white/60 text-foreground/80 hover:border-violet-400/60 hover:text-foreground dark:border-white/10 dark:bg-white/5 dark:hover:border-violet-400/40",
};

function Chip({
  id,
  pressed,
  count,
  onClick,
  children,
}: {
  id?: string;
  pressed: boolean;
  count: number;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      id={id}
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`${chipClass} ${pressed ? chipState.on : chipState.off}`}
    >
      {children}
      <span aria-hidden="true" className={`font-mono ${pressed ? "text-white/75" : "text-foreground/45"}`}>
        {count}
      </span>
    </button>
  );
}

export default function ProjectFilter({ labels, skills, items }: ProjectFilterProps) {
  const filter = useSkillFilter();
  const labelId = useId();
  const visible = filter ? items.filter((item) => item.skills.includes(filter)) : items;
  const active = skills.find((skill) => skill.id === filter);

  return (
    <>
      <Reveal className="mt-10">
        <div role="group" aria-labelledby={labelId} className="flex flex-wrap items-center gap-2">
          <span id={labelId} className="mr-1 font-pixel text-xs text-foreground/50">
            {labels.filter}
          </span>
          <Chip pressed={filter === null} count={items.length} onClick={() => setSkillFilter(null)}>
            {labels.all}
          </Chip>
          {skills.map((skill) => (
            <Chip
              key={skill.id}
              id={skillFilterChipId(skill.id)}
              pressed={filter === skill.id}
              count={skill.count}
              onClick={() => setSkillFilter(filter === skill.id ? null : skill.id)}
            >
              {skill.label}
            </Chip>
          ))}
        </div>
      </Reveal>

      <p role="status" className="sr-only">
        {active ? `${labels.filtering} ${active.label} (${visible.length})` : ""}
      </p>

      <ul className="mt-8 grid gap-6 sm:grid-cols-2">
        {items.map((item, index) => (
          <li key={item.slug} hidden={!visible.includes(item)}>
            <Reveal delay={(index % 2) * 100} className="h-full">
              {item.card}
            </Reveal>
          </li>
        ))}
      </ul>
    </>
  );
}
