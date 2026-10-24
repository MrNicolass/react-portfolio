"use client";

import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import { ArrowUpRightIcon } from "./icons";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

type HeroProps = {
  name: string;
  content: Dictionary["hero"];
};

export default function Hero({ name, content }: HeroProps) {
  const scroll = useSmoothScroll();

  return (
    <section
      id="inicio"
      className="relative flex min-h-svh items-center overflow-hidden"
    >
      <div aria-hidden="true" className="absolute inset-0 hero-grid" />
      <div
        aria-hidden="true"
        className="absolute -top-32 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500/25 via-violet-500/20 to-fuchsia-500/25 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-5xl px-4 py-28 sm:px-6">
        <div
          className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-4 py-1.5 text-xs font-medium text-foreground/80 dark:border-white/15 dark:bg-white/5"
          style={{ animationDelay: "0ms" }}
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          {content.availability}
        </div>

        <p
          className="animate-fade-up mt-8 font-mono text-sm text-foreground/60"
          style={{ animationDelay: "100ms" }}
        >
          {content.greeting}
        </p>
        <h1
          className="animate-fade-up mt-3 text-5xl font-bold tracking-tight sm:text-7xl"
          style={{ animationDelay: "180ms" }}
        >
          <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
            {name}
          </span>
        </h1>
        <h2
          className="animate-fade-up mt-4 text-2xl font-semibold text-foreground/80 sm:text-3xl"
          style={{ animationDelay: "260ms" }}
        >
          {content.role}
        </h2>
        <p
          className="animate-fade-up mt-6 max-w-2xl text-lg leading-relaxed text-foreground/70"
          style={{ animationDelay: "340ms" }}
        >
          {content.tagline}
        </p>
        <div
          className="animate-fade-up mt-10 flex flex-wrap items-center gap-4"
          style={{ animationDelay: "420ms" }}
        >
          <Link
            href="#projetos"
            onClick={(event) => {
              event.preventDefault();
              scroll("#projetos");
            }}
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background shadow-lg shadow-black/10 transition-all hover:-translate-y-0.5 hover:shadow-xl dark:shadow-white/5"
          >
            {content.viewProjects}
            <ArrowUpRightIcon className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link
            href="#contato"
            onClick={(event) => {
              event.preventDefault();
              scroll("#contato");
            }}
            className="rounded-full border border-black/15 px-6 py-3 text-sm font-semibold transition-colors hover:border-black/30 hover:bg-black/5 dark:border-white/15 dark:hover:border-white/30 dark:hover:bg-white/10"
          >
            {content.contact}
          </Link>
        </div>
      </div>
    </section>
  );
}