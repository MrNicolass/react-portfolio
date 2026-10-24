import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale } from "./src/i18n/config";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const firstPathSegment = pathname.split("/")[1];

  if (isLocale(firstPathSegment)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
