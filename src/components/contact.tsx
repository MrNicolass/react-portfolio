import { portfolio } from "@/data/portfolio";

export default function Contact() {
  return (
    <section
      id="contato"
      className="border-t border-black/10 py-24 dark:border-white/10"
    >
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
        <h2 className="text-3xl font-bold tracking-tight">Contato</h2>
        <p className="mx-auto mt-4 max-w-xl text-foreground/70">
          Estou aberto a novas oportunidades e projetos. Vamos conversar?
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href={`mailto:${portfolio.email}`}
            className="rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-80"
          >
            {portfolio.email}
          </a>
          <a
            href={portfolio.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-black/15 px-6 py-3 text-sm font-semibold transition-colors hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
          >
            GitHub
          </a>
          <a
            href={portfolio.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-black/15 px-6 py-3 text-sm font-semibold transition-colors hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}