"use client";

import { useCallback, useEffect, useRef } from "react";

/**
 * Hook que retorna uma função para scroll suave até um elemento por ID.
 * Se o elemento não existir, faz scroll para o topo.
 * Respeita prefers-reduced-motion se configurado.
 */
export function useSmoothScroll() {
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  return useCallback((href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({
        behavior: prefersReducedMotion.current ? "auto" : "smooth",
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion.current ? "auto" : "smooth",
      });
    }
  }, []);
}
