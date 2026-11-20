import type { Metadata } from "next";
import Link from "next/link";
import { locale as localeParam } from "next/root-params";
import Header from "@/components/header";
import { ArrowLeftIcon, ArrowUpRightIcon } from "@/components/icons";
import PixelBand from "@/components/pixel-band";
import { profile } from "@/data/portfolio";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { notFoundMetadata } from "@/lib/not-found";
import { localePath, sections } from "@/lib/site";

/**
 * `not-found` gets no props, so the language comes from the root param. Every `notFound()`
 * under `[locale]` lands here, including unknown paths (caught by `[...rest]`).
 */
async function currentLocale(): Promise<Locale> {
  const value = await localeParam();
  return isLocale(value) ? value : defaultLocale;
}

// Used in the server HTML; the browser then applies the metadata of the route that called
// `notFound()` (see `notFoundMetadata`). Next adds `noindex` to 404 responses by itself.
export async function generateMetadata(): Promise<Metadata> {
  return notFoundMetadata(await currentLocale());
}

export default async function NotFound() {
  const locale = await currentLocale();
  const dictionary = getDictionary(locale);
  const { notFound } = dictionary;

  return (
    <>
      <Header
        locale={locale}
        name={profile.name}
        navigation={dictionary.navigation}
        theme={dictionary.theme}
        paletteLabel={dictionary.palette.open}
      />
      <main id="content" className="pt-16">
        <div className="animate-fade-up mt-10 sm:mt-14">
          <PixelBand />
        </div>

        <div className="mx-auto w-full max-w-5xl px-4 pt-10 pb-24 sm:px-6 sm:pb-32">
          <p
            className="animate-fade-up font-pixel text-6xl leading-none text-violet-600 sm:text-8xl dark:text-violet-400"
            style={{ animationDelay: "80ms" }}
          >
            404
          </p>
          <h1
            className="animate-fade-up mt-6 text-3xl font-bold tracking-tight sm:text-4xl"
            style={{ animationDelay: "160ms" }}
          >
            {notFound.title}
          </h1>
          <p
            className="animate-fade-up mt-4 max-w-xl text-lg leading-relaxed text-foreground/70"
            style={{ animationDelay: "220ms" }}
          >
            {notFound.description}
          </p>

          <div
            className="animate-fade-up mt-10 flex flex-wrap items-center gap-3 sm:gap-4"
            style={{ animationDelay: "280ms" }}
          >
            <Link
              href={localePath(locale)}
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background shadow-lg shadow-black/10 transition-all hover:-translate-y-0.5 hover:shadow-xl dark:shadow-white/5"
            >
              <ArrowLeftIcon className="size-4 transition-transform group-hover:-translate-x-0.5" />
              {notFound.home}
            </Link>
            <Link
              href={`${localePath(locale)}#${sections.projects}`}
              className="inline-flex items-center gap-2 rounded-full border border-black/15 px-6 py-3 text-sm font-semibold transition-colors hover:border-violet-400/60 hover:bg-black/5 dark:border-white/15 dark:hover:border-violet-400/40 dark:hover:bg-white/10"
            >
              {notFound.projects}
              <ArrowUpRightIcon className="size-4" />
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
