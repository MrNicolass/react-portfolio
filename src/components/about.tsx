import { portfolio } from "@/data/portfolio";

export default function About() {
  return (
    <section
      id="sobre"
      className="border-t border-black/10 py-24 dark:border-white/10"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 className="text-3xl font-bold tracking-tight">Sobre mim</h2>
        <div className="mt-6 space-y-4 text-foreground/70 sm:text-lg">
          {portfolio.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <p className="mt-6 text-sm text-foreground/50">
          📍 {portfolio.location}
        </p>
      </div>
    </section>
  );
}