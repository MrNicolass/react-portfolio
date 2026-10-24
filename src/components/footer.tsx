"use client";

import Link from "next/link";
import type { profile } from "@/data/portfolio";
import type { Dictionary } from "@/i18n/dictionaries";
import { ArrowUpRightIcon, GithubIcon, LinkedinIcon } from "./icons";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

const currentYear = new Date().getFullYear();

type FooterProps = {
  profile: typeof profile;
  content: Dictionary["footer"];
};

export default function Footer({ profile, content }: FooterProps) {
  const scroll = useSmoothScroll();

  return (
    <footer className="border-t border-black/10 py-10 dark:border-white/10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 text-sm text-foreground/60 sm:flex-row sm:px-6">
        <p>
          © {currentYear} {profile.name}. {content.rightsReserved}
        </p>
        <div className="flex items-center gap-4">
          <a
            href={profile.social.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="transition-colors hover:text-violet-600 dark:hover:text-violet-400"
          >
            <GithubIcon className="size-4" />
          </a>
          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="transition-colors hover:text-violet-600 dark:hover:text-violet-400"
          >
            <LinkedinIcon className="size-4" />
          </a>
          <Link
            href="#inicio"
            onClick={(event) => {
              event.preventDefault();
              scroll("#inicio");
            }}
            className="inline-flex items-center gap-1 transition-colors hover:text-violet-600 dark:hover:text-violet-400"
          >
            {content.backToTop}
            <ArrowUpRightIcon className="size-3.5 -rotate-45" />
          </Link>
        </div>
      </div>
    </footer>
  );
}