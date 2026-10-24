import { notFound } from "next/navigation";
import About from "@/components/about";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Hero from "@/components/hero";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import { profile, projectLinks, skillGroups } from "@/data/portfolio";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";

export default async function LocaleHome({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale);
  const projects = projectLinks.map((project, index) => ({
    ...project,
    ...dictionary.projects.items[index],
  }));
  const skills = skillGroups.map((group) => ({
    ...group,
    category: dictionary.skills.categories[group.id],
  }));

  return (
    <>
      <Header
        locale={locale}
        name={profile.name}
        navigation={dictionary.navigation}
        theme={dictionary.theme}
      />
      <main id="content">
        <Hero name={profile.name} content={dictionary.hero} />
        <About profile={profile} content={dictionary.about} />
        <Projects content={dictionary.projects} projects={projects} />
        <Skills content={dictionary.skills} groups={skills} />
        <Contact profile={profile} content={dictionary.contact} />
      </main>
      <Footer profile={profile} content={dictionary.footer} />
    </>
  );
}
