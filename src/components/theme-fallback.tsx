"use client";

import { useLayoutEffect } from "react";
import { applyThemeIfMissing } from "@/lib/theme";

/** Applies the theme before the first paint when the layout was rendered on the client (404s). */
export default function ThemeFallback() {
  useLayoutEffect(applyThemeIfMissing, []);
  return null;
}
