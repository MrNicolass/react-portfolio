import { portfolio } from "@/data/portfolio";

export default function Skills() {
  return (
    <section
      id="skills"
      className="border-t border-black/10 py-24 dark:border-white/10"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 className="text-3xl font-bold tracking-tight">Skills</h2>
        <div className="mt-10 grid gap-10 sm:grid-cols-3">
          {portfolio.skills.map((group) => (
            <div key={group.category}>
              <h3 className="font-semibold">{group.category}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-black/10 px-3 py-1 text-sm dark:border-white/15"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}