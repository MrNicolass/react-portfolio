import { notFound } from "next/navigation";
import About from "@/components/about";
import Activity from "@/components/activity";
import Contact from "@/components/contact";
import ExperienceSection from "@/components/experience";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import { education, experience, profile, projects, skillGroups } from "@/data/portfolio";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";

export default async function LocaleHome({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale);

  return (
    <>
      <Header
        locale={locale}
        name={profile.name}
        navigation={dictionary.navigation}
        theme={dictionary.theme}
        paletteLabel={dictionary.palette.open}
      />
      <main id="content">
        <Hero locale={locale} name={profile.name} handle={profile.handle} content={dictionary.hero} />
        <About profile={profile} content={dictionary.about} />
        <ExperienceSection
          locale={locale}
          content={dictionary.experience}
          roles={experience}
          schools={education}
        />
        <Projects locale={locale} content={dictionary.projects} projects={projects} />
        <Skills
          content={dictionary.skills}
          groups={skillGroups}
          projects={projects}
          projectTitles={dictionary.projects.items}
        />
        <Activity
          locale={locale}
          content={dictionary.activity}
          homelab={dictionary.homelab}
          profile={profile}
        />
        <Contact locale={locale} profile={profile} content={dictionary.contact} />
      </main>
      <Footer profile={profile} content={dictionary.footer} />
    </>
  );
}
