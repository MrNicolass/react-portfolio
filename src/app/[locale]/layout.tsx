import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { GeistMono } from "geist/font/mono";
import { GeistPixelSquare } from "geist/font/pixel";
import { GeistSans } from "geist/font/sans";
import Analytics from "@/components/analytics";
import CommandPalette from "@/components/command-palette";
import ScrollProgress from "@/components/scroll-progress";
import ThemeScript from "@/components/theme-script";
import { profile, projects, skillLabels } from "@/data/portfolio";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, locales } from "@/i18n/config";
import { ogImagePath, shareMetadata, siteUrl } from "@/lib/site";
import "./globals.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const dictionary = getDictionary(locale);

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: dictionary.metadata.title,
      template: `%s | ${profile.name}`,
    },
    description: dictionary.metadata.description,
    keywords: [...dictionary.metadata.keywords],
    authors: [{ name: profile.fullName, url: siteUrl }],
    creator: profile.fullName,
    ...shareMetadata(locale, {
      title: dictionary.metadata.title,
      description: dictionary.metadata.description,
      image: { url: ogImagePath(locale), alt: dictionary.metadata.ogAlt },
    }),
    icons: {
      icon: [
        { url: "/icon-light.svg", media: "(prefers-color-scheme: light)" },
        { url: "/icon-dark.svg", media: "(prefers-color-scheme: dark)" },
      ],
    },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale);
  const paletteProjects = projects.map((project) => {
    const copy = dictionary.projects.items[project.slug];
    return {
      slug: project.slug,
      title: copy.title,
      kind: project.kind,
      keywords: `${copy.tagline} ${project.skills.map((skill) => skillLabels[skill]).join(" ")}`,
    };
  });

  return (
    <html
      lang={locale}
      className={`${GeistSans.variable} ${GeistMono.variable} ${GeistPixelSquare.variable} scroll-smooth`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="antialiased">
        <ThemeScript />
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-violet-600 focus:px-4 focus:py-2 focus:text-white"
        >
          {dictionary.skipLink}
        </a>
        <ScrollProgress />
        {children}
        <CommandPalette
          locale={locale}
          content={dictionary.palette}
          navigation={dictionary.navigation}
          feedback={dictionary.contact}
          projects={paletteProjects}
          email={profile.email}
          social={profile.social}
        />
        <Analytics />
      </body>
    </html>
  );
}
