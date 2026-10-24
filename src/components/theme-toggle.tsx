"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { Dictionary } from "@/i18n/dictionaries";
import { MoonIcon, SunIcon } from "./icons";

/** Observa mudanças na classe `dark` do <html>. */
function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function getSnapshot() {
  return document.documentElement.classList.contains("dark");
}

function getServerSnapshot() {
  return false;
}

export default function ThemeToggle({
  labels,
}: {
  labels: Dictionary["theme"];
}) {
  const dark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback(() => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* storage unavailable */
    }
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? labels.enableLight : labels.enableDark}
      title={dark ? labels.light : labels.dark}
      className="flex size-9 items-center justify-center rounded-full border border-black/10 text-foreground/70 transition-colors hover:bg-black/5 hover:text-foreground dark:border-white/15 dark:hover:bg-white/10 dark:hover:text-foreground"
    >
      {dark ? <SunIcon className="size-4" /> : <MoonIcon className="size-4" />}
    </button>
  );
}
