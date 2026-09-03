"use client";

import { useEffect } from "react";

/**
 * Inicializa o tema com base no localStorage ou prefers-color-scheme.
 * Substitui o dangerouslySetInnerHTML do layout.tsx por uma abordagem
 * mais segura e idiomática em React.
 */
export default function ThemeInitializer() {
  useEffect(() => {
    try {
      const stored = localStorage.getItem("theme");
      const isDark =
        stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (isDark) document.documentElement.classList.add("dark");
    } catch {
      /* storage indisponível */
    }
  }, []);

  return null;
}
