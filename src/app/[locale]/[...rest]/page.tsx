import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { notFoundMetadata } from "@/lib/not-found";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/[...rest]">): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? notFoundMetadata(locale) : {};
}

/**
 * Any path under a locale that matches no other route (`/pt-BR/qualquer-coisa`, `/en/x/y`)
 * renders `[locale]/not-found.tsx`, with the header, the theme and the right language.
 * Static segments (`cv`, `projetos`, `og.png`) always win over this catch-all.
 */
export default function CatchAll() {
  notFound();
}
