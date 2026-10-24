export type Project = {
  tech: readonly string[];
  demo?: string;
  source?: string;
};

export const profile = {
  name: "Nicolas Conte",
  email: "nicolascontegt@gmail.com",
  social: {
    github: "https://github.com/MrNicolass",
    linkedin: "https://www.linkedin.com/in/nicolasgconteti/",
  },
} as const;

export const skillGroups = [
  {
    id: "frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML5", "CSS3"],
  },
  {
    id: "backend",
    items: ["Java", "Spring Boot", "Quarkus", "Node.js", "REST APIs", "PostgreSQL"],
  },
  {
    id: "tools",
    items: ["Git", "GitHub", "GitLab", "Docker", "Vercel"],
  },
] as const;

export const projectLinks: readonly Project[] = [
  {
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    demo: "#",
    source: "#",
  },
  {
    tech: ["React", "Node.js"],
    demo: "#",
    source: "#",
  },
  {
    tech: ["TypeScript", "PostgreSQL"],
    demo: "#",
    source: "#",
  },
];