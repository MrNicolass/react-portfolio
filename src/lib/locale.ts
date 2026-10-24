import type { Locale } from "@/i18n/config";

const LOCALE_STORAGE_KEY = "locale";
const LOCALE_COOKIE = "NEXT_LOCALE";
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
