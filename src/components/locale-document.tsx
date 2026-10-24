"use client";

import { useEffect } from "react";
import type { Locale } from "@/i18n/config";

export default function LocaleDocument({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
