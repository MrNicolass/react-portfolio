import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";

const LOCALE_COOKIE = "NEXT_LOCALE";

/**
 * Detects the preferred locale from the Accept-Language header.
 * Parses quality weights (q-values) and picks the first supported match.
 */
function getLocaleFromHeader(request: NextRequest): Locale {
  const acceptLanguage = request.headers.get("accept-language");
  if (!acceptLanguage) return defaultLocale;

  const languages = acceptLanguage
    .split(",")
    .map((part) => {
      const [rawLocale, q] = part.trim().split(";q=");
      return {
        locale: (rawLocale ?? "").trim().toLowerCase(),
        quality: q ? parseFloat(q) : 1.0,
      };
    })
    .filter((entry) => entry.locale.length > 0);

  languages.sort((a, b) => b.quality - a.quality);

  for (const { locale } of languages) {
    if (locale.startsWith("pt")) return "pt-BR";
    if (locale.startsWith("en")) return "en";
  }

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const firstPathSegment = pathname.split("/")[1];

  if (isLocale(firstPathSegment)) {
    return NextResponse.next();
  }

  // 1. Explicit user choice (cookie set when the user switches language)
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  const targetLocale: Locale =
    cookieLocale && isLocale(cookieLocale)
      ? cookieLocale
      : getLocaleFromHeader(request);

  const url = request.nextUrl.clone();
  url.pathname = `/${targetLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
