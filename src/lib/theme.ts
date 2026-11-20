/**
 * Client-side copy of `theme-script.tsx`, for the case where that inline script never runs:
 * Next sends 404s as an empty error shell and renders the layout in the browser, and React
 * does not execute `<script>` tags it renders. The script always sets `color-scheme` inline,
 * so an empty value means it did not run; otherwise this does nothing.
 */
export function applyThemeIfMissing() {
  const root = document.documentElement;
  if (root.style.colorScheme) return;
  let dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  try {
    const stored = localStorage.getItem("theme");
    if (stored) dark = stored === "dark";
  } catch {
    /* storage unavailable */
  }
  root.classList.toggle("dark", dark);
  root.style.colorScheme = dark ? "dark" : "light";
}

/**
 * Flips the `dark` class on <html>, keeps `color-scheme` in sync (the theme script sets it
 * inline, so native controls and scrollbars would otherwise keep the old scheme) and stores
 * the explicit choice read by `theme-script.tsx`.
 */
export function toggleTheme() {
  const root = document.documentElement;
  const next = !root.classList.contains("dark");
  root.classList.toggle("dark", next);
  root.style.colorScheme = next ? "dark" : "light";
  try {
    localStorage.setItem("theme", next ? "dark" : "light");
  } catch {
    /* storage unavailable */
  }
  return next;
}
