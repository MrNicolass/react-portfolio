import { portfolio } from "@/data/portfolio";

const navLinks = [
  { href: "#sobre", label: "Sobre" },
  { href: "#projetos", label: "Projetos" },
  { href: "#skills", label: "Skills" },
  { href: "#contato", label: "Contato" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-background/80 backdrop-blur dark:border-white/10">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <a href="#inicio" className="text-lg font-bold tracking-tight">
          {portfolio.name}
        </a>
        <ul className="flex items-center gap-4 text-sm font-medium sm:gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-foreground/70 transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}