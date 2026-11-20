"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { copyText } from "@/lib/clipboard";
import { switchLocale } from "@/lib/locale";
import { cvPdfPath, displayUrl, localePath, projectsPath, sections, type SectionKey } from "@/lib/site";
import { toggleTheme } from "@/lib/theme";
import {
  ArrowRightIcon,
  CodeIcon,
  CopyIcon,
  CornerDownLeftIcon,
  DownloadIcon,
  GithubIcon,
  LanguagesIcon,
  LinkedinIcon,
  MailIcon,
  MoonIcon,
  SearchIcon,
  SunIcon,
} from "./icons";

const OPEN_EVENT = "command-palette:open";

/** Opens the palette from any client component (header button, footer hint). */
export function openCommandPalette() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export type PaletteProject = {
  slug: string;
  title: string;
  kind: string;
  /** Extra search terms (tagline, stack), never shown. */
  keywords: string;
};

type CommandPaletteProps = {
  locale: Locale;
  content: Dictionary["palette"];
  navigation: Dictionary["navigation"];
  feedback: Pick<Dictionary["contact"], "copied" | "copyFailed">;
  projects: readonly PaletteProject[];
  email: string;
  social: { github: string; linkedin: string };
};

type GroupKey = keyof Dictionary["palette"]["groups"];

type Command = {
  id: string;
  group: GroupKey;
  label: string;
  hint?: string;
  icon: ReactNode;
  /** Normalized label + keywords, matched against the query. */
  search: string;
  run: () => void | Promise<void>;
  /** Commands that report a result in the footer keep the palette open. */
  keepOpen?: boolean;
};

type Status = { text: string; ok: boolean };

const GROUPS: readonly GroupKey[] = ["navigate", "projects", "actions", "links"];
const NAV_SECTIONS: readonly SectionKey[] = [
  "home",
  "about",
  "experience",
  "projects",
  "skills",
  "activity",
  "contact",
];

/** Lowercase without accents, so "experiencia" finds "Experiência". */
function normalize(text: string) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

/**
 * True when `term` starts a word of `text` (both normalized). Plain substring matching
 * made "tema" hit "sistema" in a project tagline and outrank the theme action.
 */
function matchesWordStart(text: string, term: string) {
  for (let at = text.indexOf(term); at !== -1; at = text.indexOf(term, at + 1)) {
    if (at === 0 || !/[a-z0-9]/.test(text[at - 1])) return true;
  }
  return false;
}

const iconClass = "size-4 shrink-0";

export default function CommandPalette({
  locale,
  content,
  navigation,
  feedback,
  projects,
  email,
  social,
}: CommandPaletteProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [status, setStatus] = useState<Status | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const scroll = useSmoothScroll();
  const baseId = useId();
  const listId = `${baseId}-list`;

  const home = localePath(locale);
  const onHome = pathname === home;
  const alternateLocale: Locale = locale === "pt-BR" ? "en" : "pt-BR";

  const open = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    setQuery("");
    setActive(0);
    setStatus(null);
    dialog.showModal();
    inputRef.current?.focus();
  }, []);

  const close = useCallback(() => dialogRef.current?.close(), []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const isShortcut =
        (event.ctrlKey || event.metaKey) &&
        !event.altKey &&
        !event.shiftKey &&
        event.key.toLowerCase() === "k";
      if (!isShortcut) return;
      event.preventDefault();
      if (dialogRef.current?.open) close();
      else open();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_EVENT, open);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_EVENT, open);
    };
  }, [open, close]);

  const commands = useMemo<Command[]>(() => {
    const make = (command: Omit<Command, "search"> & { keywords?: string }): Command => {
      const { keywords = "", ...rest } = command;
      return { ...rest, search: normalize(`${command.label} ${keywords}`) };
    };

    const goToSection = (key: SectionKey) => {
      const id = sections[key];
      if (onHome) {
        scroll(`#${id}`);
        history.replaceState(null, "", key === "home" ? home : `#${id}`);
      } else {
        router.push(key === "home" ? home : `${home}#${id}`);
      }
    };

    const openExternal = (href: string) => {
      window.open(href, "_blank", "noopener,noreferrer");
    };

    return [
      ...NAV_SECTIONS.map((key) =>
        make({
          id: `section-${key}`,
          group: "navigate",
          label: navigation[key],
          keywords: sections[key],
          hint: `#${sections[key]}`,
          icon: <ArrowRightIcon className={iconClass} />,
          run: () => goToSection(key),
        }),
      ),
      ...projects.map((project) =>
        make({
          id: `project-${project.slug}`,
          group: "projects",
          label: project.title,
          keywords: `${project.slug} ${project.kind} ${project.keywords}`,
          hint: project.kind,
          icon: <CodeIcon className={iconClass} />,
          run: () => router.push(localePath(locale, `${projectsPath}/${project.slug}`)),
        }),
      ),
      make({
        id: "action-theme",
        group: "actions",
        label: content.actions.toggleTheme,
        keywords: "theme tema dark light escuro claro",
        icon: (
          <>
            <MoonIcon className={`${iconClass} dark:hidden`} />
            <SunIcon className={`${iconClass} hidden dark:block`} />
          </>
        ),
        run: () => {
          toggleTheme();
        },
      }),
      make({
        id: "action-language",
        group: "actions",
        label: content.actions.switchLanguage,
        keywords: "language idioma english portugues",
        icon: <LanguagesIcon className={iconClass} />,
        run: () => switchLocale(alternateLocale),
      }),
      make({
        id: "action-copy-email",
        group: "actions",
        label: content.actions.copyEmail,
        keywords: `email e-mail ${email}`,
        hint: email,
        icon: <CopyIcon className={iconClass} />,
        keepOpen: true,
        run: async () => {
          const ok = await copyText(email);
          setStatus({ ok, text: ok ? feedback.copied : feedback.copyFailed });
        },
      }),
      make({
        id: "action-cv",
        group: "actions",
        label: content.actions.downloadCv,
        keywords: "cv curriculo resume pdf",
        hint: "PDF",
        icon: <DownloadIcon className={iconClass} />,
        run: () => {
          const link = document.createElement("a");
          link.href = cvPdfPath(locale);
          link.download = "";
          link.click();
        },
      }),
      make({
        id: "link-github",
        group: "links",
        label: "GitHub",
        hint: displayUrl(social.github),
        icon: <GithubIcon className={iconClass} />,
        run: () => openExternal(social.github),
      }),
      make({
        id: "link-linkedin",
        group: "links",
        label: "LinkedIn",
        hint: displayUrl(social.linkedin).replace(/^www\./, ""),
        icon: <LinkedinIcon className={iconClass} />,
        run: () => openExternal(social.linkedin),
      }),
      make({
        id: "link-email",
        group: "links",
        label: "E-mail",
        keywords: "email mail contato contact",
        hint: email,
        icon: <MailIcon className={iconClass} />,
        run: () => window.location.assign(`mailto:${email}`),
      }),
    ];
  }, [
    alternateLocale,
    content.actions,
    email,
    feedback,
    home,
    locale,
    navigation,
    onHome,
    projects,
    router,
    scroll,
    social,
  ]);

  const filtered = useMemo(() => {
    const terms = normalize(query).split(/\s+/).filter(Boolean);
    if (terms.length === 0) return commands;
    return commands.filter((command) =>
      terms.every((term) => matchesWordStart(command.search, term)),
    );
  }, [commands, query]);

  const current = filtered.length === 0 ? -1 : Math.min(active, filtered.length - 1);
  const optionId = (command: Command) => `${baseId}-${command.id}`;
  const activeOptionId = current >= 0 ? optionId(filtered[current]) : undefined;

  useEffect(() => {
    if (activeOptionId) {
      document.getElementById(activeOptionId)?.scrollIntoView({ block: "nearest" });
    }
  }, [activeOptionId]);

  // `filtered` is already in group order, so each option keeps its global index.
  const groups = GROUPS.map((key) => ({
    key,
    items: filtered
      .map((command, index) => ({ command, index }))
      .filter(({ command }) => command.group === key),
  })).filter((group) => group.items.length > 0);

  const execute = (command: Command) => {
    if (command.keepOpen) {
      void command.run();
      return;
    }
    close();
    void command.run();
  };

  const onKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) return;
    const count = filtered.length;

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (count === 0) return;
      const step = event.key === "ArrowDown" ? 1 : -1;
      setActive((current + step + count) % count);
      return;
    }

    if (event.key === "Enter" && current >= 0) {
      event.preventDefault();
      execute(filtered[current]);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      aria-label={content.title}
      onPointerDown={(event) => {
        // The panel fills the dialog box, so a press on the dialog itself is on the backdrop.
        if (event.target === event.currentTarget) close();
      }}
      className="palette w-[min(36rem,calc(100vw-2rem))] overflow-visible bg-transparent p-0 text-foreground"
    >
      <div className="flex max-h-[70vh] flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-2xl shadow-black/20 dark:border-white/10 dark:bg-background dark:shadow-black/60">
        <div className="flex items-center gap-3 border-b border-black/10 px-4 transition-colors focus-within:border-violet-500/60 dark:border-white/10 dark:focus-within:border-violet-400/60">
          <SearchIcon className="size-4 shrink-0 text-foreground/50" />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-label={content.title}
            aria-expanded="true"
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={activeOptionId}
            autoComplete="off"
            spellCheck={false}
            enterKeyHint="go"
            placeholder={content.placeholder}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
              setStatus(null);
            }}
            onKeyDown={onKeyDown}
            className="h-14 w-full bg-transparent text-base outline-none placeholder:text-foreground/40"
          />
          <kbd className="hidden rounded-md border border-black/10 px-1.5 py-0.5 font-mono text-[11px] text-foreground/50 sm:inline dark:border-white/15">
            Esc
          </kbd>
        </div>

        <div
          id={listId}
          role="listbox"
          aria-label={content.title}
          // Keeps the focus (and the caret) in the input when an option is clicked.
          onMouseDown={(event) => event.preventDefault()}
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-2"
        >
          {groups.map(({ key, items }) => (
            <div key={key} role="group" aria-labelledby={`${baseId}-group-${key}`}>
              <div
                id={`${baseId}-group-${key}`}
                className="px-3 pt-3 pb-1.5 font-pixel text-xs text-foreground/50"
              >
                {content.groups[key]}
              </div>
              {items.map(({ command, index }) => {
                const selected = index === current;
                return (
                  <div
                    key={command.id}
                    id={optionId(command)}
                    role="option"
                    aria-selected={selected}
                    onMouseMove={() => {
                      if (!selected) setActive(index);
                    }}
                    onClick={() => execute(command)}
                    className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                      selected
                        ? "bg-violet-500/10 text-foreground dark:bg-violet-500/20"
                        : "text-foreground/80"
                    }`}
                  >
                    <span
                      className={
                        selected ? "text-violet-600 dark:text-violet-400" : "text-foreground/50"
                      }
                    >
                      {command.icon}
                    </span>
                    <span className="min-w-0 flex-1 truncate font-medium">{command.label}</span>
                    {command.hint && (
                      <span className="hidden max-w-[45%] truncate font-mono text-xs text-foreground/50 sm:block">
                        {command.hint}
                      </span>
                    )}
                    <CornerDownLeftIcon
                      className={`size-3.5 shrink-0 text-foreground/50 ${selected ? "" : "invisible"}`}
                    />
                  </div>
                );
              })}
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="px-3 py-8 text-center text-sm text-foreground/60">{content.empty}</p>
          )}
        </div>

        {/* Always in the DOM, so screen readers announce the copy result even on mobile. */}
        <p role="status" className="sr-only">
          {status?.text}
        </p>
        {/* Keyboard hints only make sense with a keyboard; on mobile the bar shows up just for feedback. */}
        <div
          aria-hidden="true"
          className={`${status ? "flex" : "hidden sm:flex"} min-h-10 items-center border-t border-black/10 px-4 py-2.5 text-xs dark:border-white/10`}
        >
          {status ? (
            <p
              className={
                status.ok ? "text-violet-600 dark:text-violet-400" : "text-red-600 dark:text-red-400"
              }
            >
              {status.text}
            </p>
          ) : (
            <p className="text-foreground/50">{content.hint}</p>
          )}
        </div>
      </div>
    </dialog>
  );
}
