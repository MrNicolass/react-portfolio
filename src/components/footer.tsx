"use client";

import type { profile } from "@/data/portfolio";
import type { Dictionary } from "@/i18n/dictionaries";
import { openCommandPalette } from "./command-palette";
import { ArrowUpRightIcon, GithubIcon, LinkedinIcon } from "./icons";
import SectionLink from "./section-link";

const currentYear = new Date().getFullYear();

type FooterProps = {
  profile: typeof profile;
  content: Dictionary["footer"];
};

export default function Footer({ profile, content }: FooterProps) {
  return (
    <footer className="border-t border-black/10 py-10 dark:border-white/10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 text-sm text-foreground/60 sm:flex-row sm:px-6">
        <div className="space-y-1 text-center sm:text-left">
          <p>
            © {currentYear} {profile.name}. {content.rightsReserved}
          </p>
          <p className="text-xs text-foreground/50">{content.builtWith}</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={openCommandPalette}
            className="hidden items-center gap-1.5 text-xs transition-colors hover:text-violet-600 sm:inline-flex dark:hover:text-violet-400"
          >
            <kbd className="rounded-md border border-black/10 px-1.5 py-0.5 font-mono text-[11px] dark:border-white/15">
              Ctrl K
            </kbd>
            {content.shortcut}
          </button>
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
          <SectionLink
            section="home"
            className="inline-flex items-center gap-1 transition-colors hover:text-violet-600 dark:hover:text-violet-400"
          >
            {content.backToTop}
            <ArrowUpRightIcon className="size-3.5 -rotate-45" />
          </SectionLink>
        </div>
      </div>
    </footer>
  );
}
