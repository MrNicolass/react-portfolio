import { portfolio, type Project } from "@/data/portfolio";
import Reveal from "./reveal";
import SectionHeading from "./section-heading";
import { ArrowUpRightIcon, CodeIcon } from "./icons";

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-black/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/60 hover:shadow-xl hover:shadow-violet-500/10 dark:border-white/10 dark:bg-white/5 dark:hover:border-violet-400/40">
      {/* Brilho no topo ao passar o mouse */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <h3 className="text-lg font-semibold transition-colors group-hover:text-violet-600 dark:group-hover:text-violet-400">
        {project.title}
      </h3>
      <p className="mt-3 flex-1 text-sm/6 text-foreground/70">
        {project.description}
      </p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <li
            key={tech}
            className="rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-foreground/80 dark:bg-white/10 dark:text-foreground/80"
          >
            {tech}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex gap-5 text-sm font-medium">
        {project.demo && project.demo !== "#" && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-violet-600 transition-colors hover:text-violet-500 dark:text-violet-400 dark:hover:text-violet-300"
          >
            Demo
            <ArrowUpRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        )}
        {project.source && project.source !== "#" && (
          <a
            href={project.source}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-violet-600 transition-colors hover:text-violet-500 dark:text-violet-400 dark:hover:text-violet-300"
          >
            <CodeIcon className="size-3.5" />
            Código
          </a>
        )}
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="projetos" className="py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading
          index="02"
          title="Projetos"
          description="Alguns trabalhos dos quais tenho orgulho."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {portfolio.projects.map((project, i) => (
            <Reveal key={project.title} delay={i * 100} className="h-full">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}