import { portfolio } from "@/data/portfolio";
import Reveal from "./reveal";
import SectionHeading from "./section-heading";
import {
  ArrowUpRightIcon,
  CheckIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  MapPinIcon,
} from "./icons";

const highlights = [
  "Código limpo e testável",
  "Foco em performance e acessibilidade",
  "Do design à deploy",
];

export default function About() {
  return (
    <section id="sobre" className="py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading index="01" title="Sobre mim" />

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <Reveal delay={100}>
            <div className="space-y-5 text-foreground/70 sm:text-lg sm:leading-relaxed">
              {portfolio.about.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <ul className="space-y-3 pt-2">
                {highlights.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-base">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-violet-500/15 text-violet-600 dark:text-violet-400">
                      <CheckIcon className="size-3" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="rounded-2xl border border-black/10 bg-white/60 p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/50">
                Informações
              </h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex items-center gap-3 text-foreground/80">
                  <MapPinIcon className="size-4 shrink-0 text-violet-500" />
                  {portfolio.location}
                </li>
                <li>
                  <a
                    href={`mailto:${portfolio.email}`}
                    className="flex items-center gap-3 text-foreground/80 transition-colors hover:text-violet-600 dark:hover:text-violet-400"
                  >
                    <MailIcon className="size-4 shrink-0 text-violet-500" />
                    {portfolio.email}
                  </a>
                </li>
              </ul>
              <div className="mt-6 flex gap-3 border-t border-black/10 pt-5 dark:border-white/10">
                <a
                  href={portfolio.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="flex size-10 items-center justify-center rounded-full border border-black/10 text-foreground/70 transition-all hover:-translate-y-0.5 hover:border-violet-400 hover:text-violet-600 dark:border-white/15 dark:hover:text-violet-400"
                >
                  <GithubIcon className="size-4" />
                </a>
                <a
                  href={portfolio.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex size-10 items-center justify-center rounded-full border border-black/10 text-foreground/70 transition-all hover:-translate-y-0.5 hover:border-violet-400 hover:text-violet-600 dark:border-white/15 dark:hover:text-violet-400"
                >
                  <LinkedinIcon className="size-4" />
                </a>
                <a
                  href="#contato"
                  className="ml-auto inline-flex items-center gap-1 text-sm font-medium text-violet-600 transition-colors hover:text-violet-500 dark:text-violet-400 dark:hover:text-violet-300"
                >
                  Contato
                  <ArrowUpRightIcon className="size-3.5" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}