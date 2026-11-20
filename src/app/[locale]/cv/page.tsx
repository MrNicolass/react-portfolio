import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, DownloadIcon, LanguagesIcon } from "@/components/icons";
import MetricText from "@/components/metric-text";
import PrintButton from "@/components/print-button";
import {
  education,
  experience,
  profile,
  projects,
  skillGroups,
  skillLabels,
} from "@/data/portfolio";
import { isLocale, type Locale } from "@/i18n/config";
import { formatGrade, formatMonth, getDictionary } from "@/i18n/dictionaries";
import {
  cvPdfPath,
  displayUrl,
  localePath,
  ogImagePath,
  shareMetadata,
  siteUrl,
} from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[locale]/cv">): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const { cv, metadata } = getDictionary(locale);

  return {
    title: cv.title,
    description: cv.description,
    ...shareMetadata(locale, {
      path: "cv",
      title: `${cv.title} | ${profile.name}`,
      description: cv.description,
      image: { url: ogImagePath(locale), alt: metadata.ogAlt },
    }),
  };
}

const buttonBase =
  "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all";
const buttonSecondary = `${buttonBase} border border-black/15 hover:border-violet-400/60 hover:bg-black/5 dark:border-white/15 dark:hover:border-violet-400/40 dark:hover:bg-white/10`;
const buttonPrimary = `${buttonBase} bg-foreground text-background shadow-lg shadow-black/10 hover:-translate-y-0.5 hover:shadow-xl dark:shadow-white/5`;

/**
 * Section of the printable sheet. The sheet is always light, so no `dark:` classes in here.
 * Headings avoid wide letter-spacing: PDF text extractors (and the ATS behind job portals)
 * would read "E X P E R I E N C E".
 */
function SheetSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-6">
      <h2 className="flex break-after-avoid items-center gap-2 border-b border-black/10 pb-1.5 text-[12px] font-semibold text-violet-700 uppercase">
        <span aria-hidden="true" className="size-[7px] border-[1.5px] border-violet-600" />
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function Period({ locale, start, end, present }: {
  locale: Locale;
  start: string;
  end: string | null;
  present: string;
}) {
  return (
    <p className="shrink-0 font-mono text-[11px] text-foreground/55">
      <time dateTime={start}>{formatMonth(locale, start)}</time>
      {" — "}
      {end ? <time dateTime={end}>{formatMonth(locale, end)}</time> : present}
    </p>
  );
}

export default async function CvPage({ params }: PageProps<"/[locale]/cv">) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale);
  const { cv } = dictionary;
  const otherLocale: Locale = locale === "pt-BR" ? "en" : "pt-BR";

  const contacts = [
    { href: `mailto:${profile.email}`, label: profile.email },
    { href: siteUrl, label: displayUrl(siteUrl) },
    { href: profile.social.github, label: displayUrl(profile.social.github) },
    { href: profile.social.linkedin, label: displayUrl(profile.social.linkedin) },
  ];

  return (
    <main id="content" className="min-h-dvh py-6 sm:px-6 sm:py-10 print:p-0">
      <div className="print-hidden mx-auto flex w-full max-w-[210mm] flex-wrap items-center justify-between gap-3 px-4 sm:px-0">
        <Link
          href={localePath(locale)}
          className="inline-flex items-center gap-2 rounded-full py-2.5 pr-3 text-sm font-semibold text-foreground/70 transition-colors hover:text-violet-600 dark:hover:text-violet-400"
        >
          <ArrowLeftIcon className="size-4" />
          {cv.back}
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={localePath(otherLocale, "cv")}
            hrefLang={otherLocale}
            lang={otherLocale}
            className={buttonSecondary}
          >
            <LanguagesIcon className="size-4" />
            {cv.otherLanguage}
          </Link>
          <PrintButton label={cv.print} className={buttonSecondary} />
          <a href={cvPdfPath(locale)} download className={buttonPrimary}>
            <DownloadIcon className="size-4" />
            {cv.download}
          </a>
        </div>
      </div>

      <article className="cv-sheet mx-auto mt-6 w-full max-w-[210mm] px-6 py-8 text-[13px] leading-[1.5] shadow-xl ring-1 shadow-black/10 ring-black/5 sm:p-[14mm] dark:ring-white/10 print:mt-0 print:max-w-none print:p-0 print:shadow-none print:ring-0">
        <header className="flex flex-col gap-4 border-b-2 border-foreground pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-pixel text-3xl leading-none tracking-tight">{profile.fullName}</h1>
            <p className="mt-2.5 text-[14px] font-medium text-violet-700">{cv.headline}</p>
          </div>
          <ul className="space-y-0.5 text-[12px] text-foreground/75 sm:text-right">
            {contacts.map((contact) => (
              <li key={contact.href}>
                <a href={contact.href} className="hover:text-violet-700 hover:underline">
                  {contact.label}
                </a>
              </li>
            ))}
            <li>{dictionary.about.location}</li>
          </ul>
        </header>

        <SheetSection title={cv.summary}>
          <p className="text-foreground/80">{cv.summaryText}</p>
        </SheetSection>

        <SheetSection title={cv.experience}>
          <ol className="space-y-4">
            {experience.map((item) => {
              const copy = dictionary.experience.roles[item.id];

              return (
                <li key={item.id} className="break-inside-avoid">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <h3 className="font-semibold">
                      {copy.role}
                      <span className="font-medium text-violet-700"> · {item.company}</span>
                    </h3>
                    <Period
                      locale={locale}
                      start={item.start}
                      end={item.end}
                      present={dictionary.experience.present}
                    />
                  </div>
                  <p className="mt-0.5 text-foreground/75">{copy.summary}</p>
                  <ul className="mt-1 list-[square] space-y-0.5 pl-4 text-foreground/75 marker:text-violet-500">
                    {copy.points.map((point) => (
                      <li key={point}>
                        <MetricText text={point} className="font-semibold text-violet-700" />
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ol>
        </SheetSection>

        <SheetSection title={cv.projects}>
          <ul className="space-y-3">
            {projects.map((project) => {
              const copy = dictionary.projects.items[project.slug];

              return (
                <li key={project.slug} className="break-inside-avoid">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <h3 className="font-semibold">
                      {copy.title}
                      <span className="font-normal text-foreground/55">
                        {" "}
                        · {project.kind} · {project.year}
                      </span>
                    </h3>
                    <a
                      href={project.repository}
                      className="font-mono text-[11px] text-foreground/55 hover:text-violet-700 hover:underline"
                    >
                      {displayUrl(project.repository)}
                    </a>
                  </div>
                  <p className="mt-0.5 text-foreground/75">{copy.summary}</p>
                  <p className="mt-0.5 font-mono text-[11px] text-foreground/55">
                    {project.skills.map((skill) => skillLabels[skill]).join(" · ")}
                  </p>
                </li>
              );
            })}
          </ul>
        </SheetSection>

        <SheetSection title={cv.skills}>
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
            {skillGroups.map((group) => (
              <div key={group.id} className="contents">
                <dt className="font-semibold">{dictionary.skills.categories[group.id]}</dt>
                <dd className="text-foreground/75">
                  {group.items.map((skill) => skillLabels[skill]).join(", ")}
                </dd>
              </div>
            ))}
          </dl>
        </SheetSection>

        <div className="grid gap-x-8 sm:grid-cols-[2fr_1fr]">
          <SheetSection title={cv.education}>
            <ul className="space-y-2">
              {education.map((school) => (
                <li key={school.id} className="break-inside-avoid">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <h3 className="font-semibold">{dictionary.experience.schools[school.id]}</h3>
                    <p className="font-mono text-[11px] text-foreground/55">
                      {school.start === school.end ? school.start : `${school.start} — ${school.end}`}
                    </p>
                  </div>
                  <p className="text-foreground/75">
                    {school.institution} · {dictionary.experience.grade}{" "}
                    {formatGrade(locale, school.grade)}
                  </p>
                </li>
              ))}
            </ul>
          </SheetSection>

          <SheetSection title={cv.languages}>
            <p className="text-foreground/75">{cv.languageList}</p>
          </SheetSection>
        </div>
      </article>
    </main>
  );
}
