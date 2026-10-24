"use client";

import { useEffect, useRef } from "react";

/**
 * Hook que executa um callback de scroll no máximo uma vez por frame (~60fps).
 * Usa requestAnimationFrame para evitar re-renders desnecessários.
 */
export function useScrollThrottle(callback: (progress: number) => void) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    let rafId = 0;
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(() => {
          const doc = document.documentElement;
          const max = doc.scrollHeight - doc.clientHeight;
          const progress =
            max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0;
          callbackRef.current(progress);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);
}
