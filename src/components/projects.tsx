import { portfolio, type Project } from "@/data/portfolio";

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex flex-col rounded-2xl border border-black/10 bg-white p-6 transition-shadow hover:shadow-lg dark:border-white/10 dark:bg-neutral-900">
      <h3 className="text-lg font-semibold">{project.title}</h3>
      <p className="mt-3 flex-1 text-sm/6 text-foreground/70">
        {project.description}
      </p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <li
            key={tech}
            className="rounded-full bg-black/5 px-3 py-1 text-xs font-medium dark:bg-white/10"
          >
            {tech}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex gap-4 text-sm font-medium">
        {project.demo && project.demo !== "#" && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Demo →
          </a>
        )}
        {project.source && project.source !== "#" && (
          <a
            href={project.source}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Código →
          </a>
        )}
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section
      id="projetos"
      className="border-t border-black/10 py-24 dark:border-white/10"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 className="text-3xl font-bold tracking-tight">Projetos</h2>
        <p className="mt-4 max-w-2xl text-foreground/70">
          Alguns trabalhos dos quais tenho orgulho.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {portfolio.projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}