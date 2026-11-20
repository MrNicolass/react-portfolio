import type { profile } from "@/data/portfolio";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { localePath, sections } from "@/lib/site";
import CopyEmailButton from "./copy-email-button";
import { DownloadIcon, GithubIcon, LinkedinIcon, MailIcon } from "./icons";
import Reveal from "./reveal";
import SectionHeading from "./section-heading";

type ContactProps = {
  locale: Locale;
  profile: typeof profile;
  content: Dictionary["contact"];
};

const outlineButton =
  "inline-flex items-center gap-2 rounded-full border border-black/15 px-5 py-2.5 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:border-violet-400/60 hover:bg-black/5 dark:border-white/15 dark:hover:border-violet-400/40 dark:hover:bg-white/10";

export default function Contact({ locale, profile, content }: ContactProps) {
  return (
    <section id={sections.contact} className="py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-white px-6 py-16 text-center dark:border-white/10 dark:bg-white/5 sm:px-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-violet-500/20 blur-3xl dark:bg-violet-500/25"
            />

            <div className="relative">
              <SectionHeading index="06" title={content.title} description={content.description} />

              {/* E-mail is the main action; the copy button shares its pill. */}
              <div className="mt-10 flex justify-center">
                <div className="inline-flex max-w-full items-stretch rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-500/30">
                  <a
                    href={`mailto:${profile.email}`}
                    className="inline-flex min-w-0 items-center gap-2 rounded-l-full py-3 pr-3 pl-4 transition-colors hover:bg-white/10 sm:pr-4 sm:pl-6"
                  >
                    <MailIcon className="size-4 shrink-0 max-[359px]:hidden" />
                    <span className="truncate">{profile.email}</span>
                  </a>
                  <span aria-hidden="true" className="my-2.5 w-px bg-white/35" />
                  <CopyEmailButton
                    email={profile.email}
                    content={content}
                    className="h-full rounded-r-full pr-4 pl-3 transition-colors hover:bg-white/10 sm:pr-5 sm:pl-4"
                  />
                </div>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                <a href={localePath(locale, "cv")} className={outlineButton}>
                  <DownloadIcon className="size-4" />
                  {content.downloadCv}
                </a>
                <a
                  href={profile.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={outlineButton}
                >
                  <GithubIcon className="size-4" />
                  GitHub
                </a>
                <a
                  href={profile.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={outlineButton}
                >
                  <LinkedinIcon className="size-4" />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
