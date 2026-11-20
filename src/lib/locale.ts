import type { Locale } from "@/i18n/config";

const LOCALE_STORAGE_KEY = "locale";
/** Cookie read by `src/proxy.ts` to honor an explicit language choice. */
export const LOCALE_COOKIE = "NEXT_LOCALE";
const COOKIE_MAX_AGE = 31536000; // 1 year

/**
 * Saves the explicit user locale preference.
 * Writes to localStorage (client) and sets the NEXT_LOCALE cookie so the
 * proxy (server) can honor the choice on the next visit to "/".
 */
export function setStoredLocale(locale: Locale): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    /* storage unavailable */
  }

  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
}

/** Same path in the other locale, keeping the rest of the URL and the hash. */
export function switchLocalePath(pathname: string, target: Locale, hash = "") {
  const segments = pathname.split("/");
  segments[1] = target;
  return `${segments.join("/") || `/${target}`}${hash}`;
}

/**
 * Stores the choice and opens the current page in `target` with a full page load.
 * `[locale]` owns the root layout, so a client-side push to the other locale re-renders
 * <html>: the `dark` class was lost that way, and the inline theme script that would set it
 * again never runs on client renders ("Encountered a script tag" warning).
 */
export function switchLocale(target: Locale) {
  setStoredLocale(target);
  window.location.assign(switchLocalePath(window.location.pathname, target, window.location.hash));
}
