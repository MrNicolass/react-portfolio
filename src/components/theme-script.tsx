import ThemeFallback from "./theme-fallback";

/**
 * Applies the `dark` class before the first paint, so the page never flashes the light theme.
 * It runs as a blocking inline script at the top of <body>, before any visible content.
 * Choice order: explicit `localStorage.theme`, then `prefers-color-scheme`.
 * `ThemeFallback` covers pages whose layout is rendered on the client (404s), where the
 * inline script never runs.
 */
const script = `(function(){try{var s=localStorage.getItem("theme");var d=s?s==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d);document.documentElement.style.colorScheme=d?"dark":"light"}catch(e){}})();`;

export default function ThemeScript() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: script }} />
      <ThemeFallback />
    </>
  );
}
