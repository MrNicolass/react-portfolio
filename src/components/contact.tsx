import { portfolio } from "@/data/portfolio";
import Reveal from "./reveal";
import SectionHeading from "./section-heading";
import { GithubIcon, LinkedinIcon, MailIcon } from "./icons";

export default function Contact() {
  return (
    <section id="contato" className="py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-white px-6 py-16 text-center dark:border-white/10 dark:bg-white/5 sm:px-12">
            {/* Brilho decorativo de fundo */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-violet-500/20 blur-3xl dark:bg-violet-500/25"
            />

            <div className="relative">
              <SectionHeading
                index="04"
                title="Contato"
                description="Estou aberto a novas oportunidades e projetos. Vamos conversar?"
              />
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <a
                  href={`mailto:${portfolio.email}`}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-500/30"
                >
                  <MailIcon className="size-4" />
                  {portfolio.email}
                </a>
                <a
                  href={portfolio.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-black/15 px-6 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:border-violet-400/60 hover:bg-black/5 dark:border-white/15 dark:hover:border-violet-400/40 dark:hover:bg-white/10"
                >
                  <GithubIcon className="size-4" />
                  GitHub
                </a>
                <a
                  href={portfolio.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-black/15 px-6 py-3 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:border-violet-400/60 hover:bg-black/5 dark:border-white/15 dark:hover:border-violet-400/40 dark:hover:bg-white/10"
                >
                  <LinkedinIcon className="size-4" />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}