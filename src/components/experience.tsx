import { skillLabels, type Education, type Experience } from "@/data/portfolio";
import type { Locale } from "@/i18n/config";
import { formatGrade, formatMonth, type Dictionary } from "@/i18n/dictionaries";
import { sections } from "@/lib/site";
import { BriefcaseIcon, GraduationIcon } from "./icons";
import MetricText from "./metric-text";
import Reveal from "./reveal";
import SectionHeading from "./section-heading";

type ExperienceProps = {
  locale: Locale;
  content: Dictionary["experience"];
  roles: readonly Experience[];
  schools: readonly Education[];
};

function Period({
  locale,
  start,
  end,
  present,
}: {
  locale: Locale;
  start: string;
  end: string | null;
  present: string;
}) {
  return (
    <p className="shrink-0 font-mono text-xs text-foreground/50">
      <time dateTime={start}>{formatMonth(locale, start)}</time>
      {" — "}
      {end ? <time dateTime={end}>{formatMonth(locale, end)}</time> : present}
    </p>
  );
}

export default function ExperienceSection({ locale, content, roles, schools }: ExperienceProps) {
  return (
    <section id={sections.experience} className="py-24 sm:py-32">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
        <SectionHeading index="02" title={content.title} description={content.description} />

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <ol>
            {roles.map((item, index) => {
              const copy = content.roles[item.id];
              const current = item.end === null;

              return (
                <li key={item.id} className="group relative pb-10 pl-8 last:pb-0">
                  <span
                    aria-hidden="true"
                    className="absolute top-3 bottom-0 left-[5px] w-px bg-black/10 group-last:hidden dark:bg-white/10"
                  />
                  <span
                    aria-hidden="true"
                    className={`absolute top-1.5 left-0 size-[11px] border-2 border-violet-500 ${
                      current ? "bg-violet-500" : "bg-background"
                    }`}
                  />

                  <Reveal delay={Math.min(index, 3) * 80}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="text-lg font-semibold">{copy.role}</h3>
                      <Period
                        locale={locale}
                        start={item.start}
                        end={item.end}
                        present={content.present}
                      />
                    </div>
                    <p className="mt-1 flex items-center gap-2 text-sm font-medium text-violet-600 dark:text-violet-400">
                      <BriefcaseIcon className="size-3.5 shrink-0" />
                      {item.company}
                    </p>
                    <p className="mt-3 text-foreground/70">{copy.summary}</p>
                    <ul className="mt-3 space-y-1.5 text-sm/6 text-foreground/70">
                      {copy.points.map((point) => (
                        <li key={point} className="flex gap-3">
                          <span
                            aria-hidden="true"
                            className="mt-2.5 size-1 shrink-0 bg-foreground/40"
                          />
                          <span>
                            <MetricText
                              text={point}
                              className="font-semibold text-violet-600 dark:text-violet-400"
                            />
                          </span>
                        </li>
                      ))}
                    </ul>
                    {item.skills.length > 0 && (
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {item.skills.map((skill) => (
                          <li
                            key={skill}
                            className="rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-foreground/80 dark:bg-white/10"
                          >
                            {skillLabels[skill]}
                          </li>
                        ))}
                      </ul>
                    )}
                  </Reveal>
                </li>
              );
            })}
          </ol>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <Reveal delay={150}>
              <div className="rounded-2xl border border-black/10 bg-white/60 p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
                <h3 className="flex items-center gap-2 text-sm font-semibold tracking-wider text-foreground/50 uppercase">
                  <GraduationIcon className="size-4 text-violet-500" />
                  {content.education}
                </h3>
                <ul className="mt-5 space-y-5">
                  {schools.map((school) => (
                    <li key={school.id}>
                      <p className="font-medium">{content.schools[school.id]}</p>
                      <p className="mt-0.5 text-sm text-foreground/70">{school.institution}</p>
                      <p className="mt-1 flex flex-wrap gap-x-3 font-mono text-xs text-foreground/50">
                        <span>
                          {school.start === school.end
                            ? school.start
                            : `${school.start} — ${school.end}`}
                        </span>
                        <span>
                          {content.grade} {formatGrade(locale, school.grade)}
                        </span>
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
