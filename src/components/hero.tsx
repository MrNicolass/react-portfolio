import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { localePath, sections } from "@/lib/site";
import { ArrowUpRightIcon, DownloadIcon } from "./icons";
import PixelPortrait from "./pixel-portrait";
import SectionLink from "./section-link";

type HeroProps = {
  locale: Locale;
  name: string;
  handle: string;
  content: Dictionary["hero"];
};

export default function Hero({ locale, name, handle, content }: HeroProps) {
  return (
    <section id={sections.home} className="relative overflow-hidden pt-16">
      <div className="mx-auto w-full max-w-5xl px-4 pt-10 sm:px-6 sm:pt-14">
        <div
          className="animate-fade-up flex items-center justify-between gap-4 font-mono text-[11px] tracking-[0.18em] text-foreground/50 uppercase"
          style={{ animationDelay: "0ms" }}
        >
          <span className="flex items-center gap-2">
            <span aria-hidden="true" className="grid grid-cols-2 gap-px">
              <span className="size-1.5 bg-violet-500" />
              <span className="cursor-blink size-1.5 bg-violet-500" />
              <span className="size-1.5 bg-violet-500" />
              <span className="size-1.5 bg-violet-500" />
            </span>
            {content.status}
          </span>
          <span className="hidden normal-case tracking-normal sm:inline">
            github.com/{handle}
          </span>
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl px-4 pt-8 pb-20 sm:px-6 sm:pt-12 sm:pb-28">
        <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-center lg:gap-14">
          <div>
            <div
              className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-4 py-1.5 text-xs font-medium text-foreground/80 dark:border-white/15 dark:bg-white/5"
              style={{ animationDelay: "160ms" }}
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              {content.availability}
            </div>

            <p
              className="animate-fade-up mt-6 font-mono text-sm text-foreground/60"
              style={{ animationDelay: "220ms" }}
            >
              {content.greeting}
            </p>
            <h1
              className="animate-fade-up mt-2 font-pixel text-5xl leading-none tracking-tight sm:text-7xl"
              style={{ animationDelay: "260ms" }}
            >
              {name}
            </h1>
            <p
              className="animate-fade-up mt-4 text-2xl font-semibold sm:text-3xl"
              style={{ animationDelay: "300ms" }}
            >
              <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
                {content.role}
              </span>
            </p>
            <p
              className="animate-fade-up mt-5 max-w-xl text-lg leading-relaxed text-foreground/70"
              style={{ animationDelay: "340ms" }}
            >
              {content.tagline}
            </p>
            <div
              className="animate-fade-up mt-10 flex flex-wrap items-center gap-3 sm:gap-4"
              style={{ animationDelay: "420ms" }}
            >
              <SectionLink
                section="projects"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background shadow-lg shadow-black/10 transition-all hover:-translate-y-0.5 hover:shadow-xl dark:shadow-white/5"
              >
                {content.viewProjects}
                <ArrowUpRightIcon className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </SectionLink>
              <a
                href={localePath(locale, "cv")}
                className="inline-flex items-center gap-2 rounded-full border border-black/15 px-6 py-3 text-sm font-semibold transition-colors hover:border-violet-400/60 hover:bg-black/5 dark:border-white/15 dark:hover:border-violet-400/40 dark:hover:bg-white/10"
              >
                <DownloadIcon className="size-4" />
                {content.downloadCv}
              </a>
              <SectionLink
                section="contact"
                className="rounded-full px-4 py-3 text-sm font-semibold text-foreground/70 transition-colors hover:text-violet-600 dark:hover:text-violet-400"
              >
                {content.contact}
              </SectionLink>
            </div>
          </div>
          <div
            className="animate-fade-up mx-auto w-full max-w-sm lg:max-w-none"
            style={{ animationDelay: "380ms" }}
          >
            <PixelPortrait
              alt={content.portrait.alt}
              revealLabel={content.portrait.reveal}
              hint={content.portrait.hint}
            >
              <div className="border-t border-black/10 p-5 dark:border-white/10">
                <dl>
                  {content.facts.map((fact) => (
                    <div
                      key={fact.key}
                      className="flex items-baseline gap-2 py-1.5"
                    >
                      <dt className="shrink-0 text-violet-600 dark:text-violet-400">
                        .{fact.key}:
                      </dt>
                      <span
                        aria-hidden="true"
                        className="min-w-4 flex-1 translate-y-[-3px] border-b border-dotted border-foreground/25"
                      />
                      <dd className="text-right text-foreground/85">
                        {fact.value}
                      </dd>
                    </div>
                  ))}
                </dl>
                <p
                  aria-hidden="true"
                  className="mt-2 flex items-center gap-2 text-violet-500"
                >
                  <span>›</span>
                  <span className="cursor-blink inline-block h-4 w-2 bg-violet-500" />
                </p>
              </div>
            </PixelPortrait>
          </div>
        </div>
      </div>
    </section>
  );
}
