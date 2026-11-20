"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { useActiveSection } from "@/hooks/use-active-section";
import { switchLocale } from "@/lib/locale";
import { sections, type SectionKey } from "@/lib/site";
import { BrazilFlagIcon, MenuIcon, SearchIcon, USFlagIcon, XIcon } from "./icons";
import { openCommandPalette } from "./command-palette";
import SectionLink from "./section-link";
import ThemeToggle from "./theme-toggle";

type HeaderProps = {
  locale: Locale;
  name: string;
  navigation: Dictionary["navigation"];
  theme: Dictionary["theme"];
  paletteLabel: string;
};

/** The CDS allows at most four header links; Skills and Activity stay reachable by scroll and Ctrl+K. */
const NAV: readonly SectionKey[] = ["about", "experience", "projects", "contact"];
const SPY_IDS = [sections.about, sections.experience, sections.projects, sections.skills, sections.activity, sections.contact];

/** Sections that light up a header link even though they have none of their own. */
const SPY_ALIASES: Partial<Record<string, SectionKey>> = {
  [sections.skills]: "projects",
  [sections.activity]: "projects",
};

export default function Header({ locale, name, navigation, theme, paletteLabel }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const onHome = pathname === `/${locale}`;
  const activeId = useActiveSection(SPY_IDS, onHome);
  const alternateLocale: Locale = locale === "pt-BR" ? "en" : "pt-BR";

  const activeKey: SectionKey | null = activeId
    ? (SPY_ALIASES[activeId] ??
      (Object.keys(sections) as SectionKey[]).find((key) => sections[key] === activeId) ??
      null)
    : !onHome && pathname.includes("/projetos/")
      ? "projects"
      : null;

  const currentFlag = locale === "pt-BR" ? <BrazilFlagIcon /> : <USFlagIcon />;
  const currentLabel = locale === "pt-BR" ? "PT" : "EN";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const linkClass = (key: SectionKey, mobile = false) => {
    const active = activeKey === key;
    if (mobile) {
      return `block rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-black/5 hover:text-foreground dark:hover:bg-white/10 ${
        active ? "bg-violet-500/10 text-violet-700 dark:text-violet-300" : "text-foreground/80"
      }`;
    }
    return `relative rounded-full px-3 py-2 transition-colors hover:bg-black/5 hover:text-foreground dark:hover:bg-white/10 ${
      active ? "text-foreground" : "text-foreground/65"
    }`;
  };

  return (
    <header
      className={`print-hidden fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-black/10 bg-background/80 backdrop-blur-md dark:border-white/10"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label={navigation.primary}
        className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6"
      >
        <SectionLink
          section="home"
          className="font-pixel text-xl tracking-tight transition-opacity hover:opacity-80"
        >
          {name.split(" ")[0].toLowerCase()}
          <span className="text-violet-500">.</span>
        </SectionLink>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <ul className="hidden items-center gap-0.5 text-sm font-medium md:flex">
            {NAV.map((key) => (
              <li key={key}>
                <SectionLink
                  section={key}
                  aria-current={activeKey === key ? (onHome ? "location" : "page") : undefined}
                  className={linkClass(key)}
                >
                  {navigation[key]}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 transition-opacity duration-300 ${
                      activeKey === key ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </SectionLink>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={openCommandPalette}
            aria-label={paletteLabel}
            aria-keyshortcuts="Control+K Meta+K"
            title={paletteLabel}
            className="flex h-9 items-center gap-2 rounded-full border border-black/10 px-2.5 text-xs font-medium text-foreground/60 transition-colors hover:bg-black/5 hover:text-foreground dark:border-white/15 dark:hover:bg-white/10"
          >
            <SearchIcon className="size-4" />
            <kbd className="hidden font-mono text-[11px] lg:inline">Ctrl K</kbd>
          </button>

          <button
            type="button"
            onClick={() => switchLocale(alternateLocale)}
            aria-label={navigation.changeLanguage}
            title={navigation.languageSwitcher}
            className="flex h-9 items-center gap-1.5 rounded-full border border-black/10 px-2.5 text-xs font-semibold text-foreground/70 transition-colors hover:bg-black/5 hover:text-foreground dark:border-white/15 dark:hover:bg-white/10"
          >
            {currentFlag}
            <span>{currentLabel}</span>
          </button>

          <ThemeToggle labels={theme} />

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? navigation.closeMenu : navigation.openMenu}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="flex size-9 items-center justify-center rounded-full border border-black/10 text-foreground/70 transition-colors hover:bg-black/5 hover:text-foreground md:hidden dark:border-white/15 dark:hover:bg-white/10"
          >
            {open ? <XIcon className="size-4" /> : <MenuIcon className="size-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-black/10 bg-background/95 backdrop-blur-md md:hidden dark:border-white/10"
        >
          <ul className="mx-auto flex max-w-5xl flex-col gap-1 px-4 py-3">
            {NAV.map((key) => (
              <li key={key}>
                <SectionLink
                  section={key}
                  onClick={() => setOpen(false)}
                  aria-current={activeKey === key ? (onHome ? "location" : "page") : undefined}
                  className={linkClass(key, true)}
                >
                  {navigation[key]}
                </SectionLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
