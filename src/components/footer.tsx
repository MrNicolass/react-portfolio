"use client";

import Link from "next/link";
import { portfolio } from "@/data/portfolio";
import { ArrowUpRightIcon, GithubIcon, LinkedinIcon } from "./icons";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

const currentYear = new Date().getFullYear();

export default function Footer() {
  const scroll = useSmoothScroll();

  return (
    <footer className="border-t border-black/10 py-10 dark:border-white/10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 text-sm text-foreground/60 sm:flex-row sm:px-6">
        <p>
          © {currentYear} {portfolio.name}. Todos os direitos
          reservados.
        </p>
        <div className="flex items-center gap-4">
          <a
            href={portfolio.social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="transition-colors hover:text-violet-600 dark:hover:text-violet-400"
          >
            <GithubIcon className="size-4" />
          </a>
          <a
            href={portfolio.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="transition-colors hover:text-violet-600 dark:hover:text-violet-400"
          >
            <LinkedinIcon className="size-4" />
          </a>
          <Link
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              scroll("#inicio");
            }}
            className="inline-flex items-center gap-1 transition-colors hover:text-violet-600 dark:hover:text-violet-400"
          >
            Voltar ao topo
            <ArrowUpRightIcon className="size-3.5 -rotate-45" />
          </Link>
        </div>
      </div>
    </footer>
  );
}