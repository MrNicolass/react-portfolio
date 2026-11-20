import type { StaticImageData } from "next/image";
import imconteCoverDark from "@/assets/projects/imconte-cover-dark.webp";
import imconteCoverLight from "@/assets/projects/imconte-cover-light.webp";
import najiBar from "@/assets/projects/naji-bar.png";
import najiCoverDark from "@/assets/projects/naji-cover-dark.webp";
import najiCoverLight from "@/assets/projects/naji-cover-light.webp";
import profileReadmeDark from "@/assets/projects/profile-readme-cover-dark.webp";
import profileReadmeLight from "@/assets/projects/profile-readme-cover-light.webp";
import vitalsDeckCover from "@/assets/projects/vitals-deck-cover.webp";
import vitalsDeckPhoto from "@/assets/projects/vitals-deck-photo.webp";
import vitalsDeckScreen from "@/assets/projects/vitals-deck-screen.png";

export const siteUrl = "https://imconte.com";

export const profile = {
  name: "Nicolas Conte",
  fullName: "Nicolas Gustavo Conte",
  email: "nicolascontegt@gmail.com",
  handle: "MrNicolass",
  social: {
    github: "https://github.com/MrNicolass",
    linkedin: "https://www.linkedin.com/in/nicolasgconteti/",
  },
  activity: {
    dark: "https://raw.githubusercontent.com/MrNicolass/MrNicolass/output/wonderland-run-dark.svg",
    light:
      "https://raw.githubusercontent.com/MrNicolass/MrNicolass/output/wonderland-run-light.svg",
  },
} as const;

/** Skill identifiers. Projects reference these ids, so the Skills section can filter projects. */
export type SkillId =
  | "react"
  | "nextjs"
  | "typescript"
  | "javascript"
  | "tailwind"
  | "angular"
  | "java"
  | "spring"
  | "quarkus"
  | "python"
  | "node"
  | "rest"
  | "sql"
  | "postgresql"
  | "oracle"
  | "sqlserver"
  | "firebird"
  | "mysql"
  | "pyside"
  | "llm"
  | "iot"
  | "linux"
  | "docker"
  | "systemd"
  | "githubactions"
  | "git"
  | "testing";

export const skillLabels: Record<SkillId, string> = {
  react: "React",
  nextjs: "Next.js",
  typescript: "TypeScript",
  javascript: "JavaScript",
  tailwind: "Tailwind CSS",
  angular: "Angular",
  java: "Java",
  spring: "Spring Boot",
  quarkus: "Quarkus",
  python: "Python",
  node: "Node.js",
  rest: "REST APIs",
  sql: "SQL",
  postgresql: "PostgreSQL",
  oracle: "Oracle",
  sqlserver: "SQL Server",
  firebird: "Firebird",
  mysql: "MySQL",
  pyside: "PySide6 / Qt",
  llm: "llama.cpp",
  iot: "IoT · LwM2M",
  linux: "Linux",
  docker: "Docker",
  systemd: "systemd",
  githubactions: "GitHub Actions",
  git: "Git",
  testing: "Selenium · Mockito · pytest",
};

export type SkillGroupId = "frontend" | "backend" | "data" | "infra";

export const skillGroups: readonly { id: SkillGroupId; items: readonly SkillId[] }[] = [
  {
    id: "frontend",
    items: ["react", "nextjs", "typescript", "javascript", "tailwind", "angular"],
  },
  {
    id: "backend",
    items: ["java", "spring", "quarkus", "python", "node", "rest", "testing"],
  },
  {
    id: "data",
    items: ["sql", "postgresql", "oracle", "sqlserver", "firebird", "mysql"],
  },
  {
    id: "infra",
    items: ["linux", "docker", "systemd", "githubactions", "git", "iot", "llm", "pyside"],
  },
];

export type ProjectSlug = "naji" | "vitals-deck" | "imconte" | "profile-readme";

export type ProjectImage = {
  /** Shown in light theme, or in both themes when `dark` is absent. */
  light: StaticImageData;
  dark?: StaticImageData;
};

export type Project = {
  slug: ProjectSlug;
  year: string;
  /** Short technical label, kept in English in both locales. */
  kind: string;
  skills: readonly SkillId[];
  repository: string;
  live?: string;
  featured: boolean;
  cover: ProjectImage;
  gallery: readonly ProjectImage[];
  /**
   * Small facts shown as "label ... value" in the case study sidebar. Values are rendered
   * as-is in every locale, so they must be language-neutral; labels come from `copy.stats[id]`.
   */
  stats: readonly { value: string; id: string }[];
};

export const projects: readonly Project[] = [
  {
    slug: "naji",
    year: "2026",
    kind: "Desktop app · Voice AI",
    skills: ["python", "pyside", "llm", "testing", "linux"],
    repository: "https://github.com/MrNicolass/naji",
    featured: true,
    cover: { light: najiCoverLight, dark: najiCoverDark },
    gallery: [{ light: najiBar }],
    stats: [
      { id: "tools", value: "16+" },
      { id: "platforms", value: "Win · Linux" },
      { id: "locales", value: "PT · EN" },
    ],
  },
  {
    slug: "vitals-deck",
    year: "2026",
    kind: "Hardware · Homelab",
    skills: ["python", "linux", "systemd", "testing"],
    repository: "https://github.com/MrNicolass/Vitals-Deck",
    featured: true,
    cover: { light: vitalsDeckCover },
    gallery: [{ light: vitalsDeckPhoto }, { light: vitalsDeckScreen }],
    stats: [
      { id: "tests", value: "195" },
      { id: "throughput", value: "~140 KB/s" },
      { id: "display", value: "320×480" },
    ],
  },
  {
    slug: "imconte",
    year: "2026",
    kind: "Web · Next.js",
    skills: ["react", "nextjs", "typescript", "tailwind", "systemd"],
    repository: "https://github.com/MrNicolass/react-portfolio",
    live: "https://imconte.com",
    featured: false,
    cover: { light: imconteCoverLight, dark: imconteCoverDark },
    gallery: [],
    stats: [
      { id: "framework", value: "Next 16" },
      { id: "locales", value: "PT · EN" },
      { id: "hosting", value: "Homelab" },
    ],
  },
  {
    slug: "profile-readme",
    year: "2026",
    kind: "Generative art · CI",
    skills: ["python", "githubactions", "git"],
    repository: "https://github.com/MrNicolass/MrNicolass",
    live: "https://github.com/MrNicolass",
    featured: false,
    cover: { light: profileReadmeLight, dark: profileReadmeDark },
    gallery: [],
    stats: [
      { id: "panels", value: "30 SVG" },
      { id: "schedule", value: "24 h" },
      { id: "dependencies", value: "0 JS" },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

/**
 * Skills used by at least one project, with the projects that use them; most used first,
 * ties keep the order of first appearance in `projects`. Drives the project filter, so a
 * filter never ends up empty: skills without a public project are not filterable.
 */
export function projectSkills(list: readonly Project[] = projects) {
  const usage = new Map<SkillId, ProjectSlug[]>();
  for (const project of list) {
    for (const skill of project.skills) {
      usage.set(skill, [...(usage.get(skill) ?? []), project.slug]);
    }
  }
  return [...usage]
    .map(([id, slugs]) => ({ id, projects: slugs }))
    .sort((a, b) => b.projects.length - a.projects.length);
}

export type ExperienceId =
  | "weg-rd"
  | "geovendas-dba"
  | "geovendas-support"
  | "clinicorp"
  | "algar-weg"
  | "hospital";

export type Experience = {
  id: ExperienceId;
  company: string;
  start: string;
  /** ISO month or `null` while the role is current. */
  end: string | null;
  skills: readonly SkillId[];
};

/** Most recent first. Dates are ISO months so they can be formatted per locale. */
export const experience: readonly Experience[] = [
  {
    id: "weg-rd",
    company: "WEG",
    start: "2025-02",
    end: null,
    skills: ["react", "java", "testing", "iot"],
  },
  {
    id: "geovendas-dba",
    company: "Geovendas",
    start: "2024-06",
    end: "2025-02",
    skills: ["sql", "postgresql", "python"],
  },
  {
    id: "geovendas-support",
    company: "Geovendas",
    start: "2023-09",
    end: "2024-06",
    skills: ["sql", "postgresql", "oracle", "sqlserver", "firebird"],
  },
  {
    id: "clinicorp",
    company: "Clinicorp",
    start: "2022-12",
    end: "2023-08",
    skills: ["mysql", "firebird", "python"],
  },
  {
    id: "algar-weg",
    company: "Algar Tech · WEG",
    start: "2022-05",
    end: "2022-12",
    skills: [],
  },
  {
    id: "hospital",
    company: "Hospital Jaraguá",
    start: "2021-08",
    end: "2022-05",
    skills: [],
  },
];

export type EducationId = "catolica" | "senai-dev" | "senai-network";

export type Education = {
  id: EducationId;
  institution: string;
  start: string;
  end: string;
  /** Final grade on a 0–10 scale; formatted per locale when rendered. */
  grade: number;
};

/** Most recent first. */
export const education: readonly Education[] = [
  {
    id: "catolica",
    institution: "Católica de Santa Catarina",
    start: "2022",
    end: "2026",
    grade: 9.09,
  },
  { id: "senai-dev", institution: "SENAI/SC", start: "2019", end: "2020", grade: 8 },
  { id: "senai-network", institution: "SENAI/SC", start: "2018", end: "2018", grade: 9 },
];
