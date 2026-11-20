"use client";

import { useSyncExternalStore } from "react";
import type { SkillId } from "@/data/portfolio";

/**
 * Skill filter shared by the Projects filter bar and the Skills section buttons.
 * Module state rather than `?skill=` in the URL: no `Suspense` boundary for
 * `useSearchParams`, no history entries, and the filter survives client navigation
 * (case study and back) while a full reload clears it.
 */
let current: SkillId | null = null;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function setSkillFilter(skill: SkillId | null) {
  if (skill === current) return;
  current = skill;
  for (const listener of listeners) listener();
}

export function useSkillFilter() {
  return useSyncExternalStore(
    subscribe,
    () => current,
    () => null,
  );
}

/** Id of a chip in the Projects filter bar, focused when a skill is picked elsewhere. */
export function skillFilterChipId(skill: SkillId) {
  return `project-filter-${skill}`;
}
