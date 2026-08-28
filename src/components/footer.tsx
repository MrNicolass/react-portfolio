import { portfolio } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer className="border-t border-black/10 py-8 dark:border-white/10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-4 text-sm text-foreground/60 sm:flex-row sm:px-6">
        <p>
          © {new Date().getFullYear()} {portfolio.name}. Todos os direitos
          reservados.
        </p>
        <p>Feito com Next.js e Tailwind CSS</p>
      </div>
    </footer>
  );
}