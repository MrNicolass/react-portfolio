import { portfolio } from "@/data/portfolio";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl flex-col justify-center px-4 py-24 sm:px-6"
    >
      <p className="mb-4 font-mono text-sm text-foreground/60">
        Olá, eu sou
      </p>
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
        {portfolio.name}
      </h1>
      <h2 className="mt-3 text-2xl font-semibold text-foreground/80 sm:text-3xl">
        {portfolio.role}
      </h2>
      <p className="mt-6 max-w-2xl text-lg text-foreground/70">
        {portfolio.tagline}
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <a
          href="#projetos"
          className="rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-80"
        >
          Ver projetos
        </a>
        <a
          href="#contato"
          className="rounded-full border border-black/15 px-6 py-3 text-sm font-semibold transition-colors hover:bg-black/5 dark:border-white/15 dark:hover:bg-white/10"
        >
          Fale comigo
        </a>
      </div>
    </section>
  );
}