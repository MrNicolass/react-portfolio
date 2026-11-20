import { profile } from "@/data/portfolio";

export type ActivityTheme = keyof typeof profile.activity;

export const activityThemes = Object.keys(profile.activity) as ActivityTheme[];

/** Size of the generated game SVG, so its box is reserved before it loads. */
export const activitySize = { width: 880, height: 206 } as const;

/**
 * Still frame of the contribution game (`/activity/{theme}.svg`), shown under
 * `prefers-reduced-motion`: SMIL inside an `<img>` can't be paused by the page.
 */
export function activityStillPath(theme: ActivityTheme) {
  return `/activity/${theme}.svg`;
}

const ANIMATION = /<(animate|animateTransform|animateMotion|set)\b[^>]*?(?:\/>|>[\s\S]*?<\/\1>)/g;

/** `<path d="…">` whose only child animates `d` (the score digits). Captures the `values` list. */
const ANIMATED_PATH =
  /(<path\b[^>]*?)\sd="[^"]*"([^>]*>)\s*<animate\b[^>]*?attributeName="d"[^>]*?values="([^"]*)"[^>]*\/>/g;

/**
 * Freezes the game into one frame: removing the SMIL elements leaves every element on its
 * base attributes (calendar full, kitten at the start, mini kittens hidden); the score digits
 * are the only `d` animations and jump to their last value, so the frame shows the final score.
 */
export function stillFrame(svg: string) {
  return svg
    .replace(ANIMATED_PATH, (_match, start: string, end: string, values: string) => {
      const last = values.split(";").at(-1) ?? "";
      return `${start} d="${last}"${end}`;
    })
    .replace(ANIMATION, "");
}
