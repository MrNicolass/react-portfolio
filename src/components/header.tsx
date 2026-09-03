"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { portfolio } from "@/data/portfolio";
import ThemeToggle from "./theme-toggle";
import { MenuIcon, XIcon } from "./icons";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

const navLinks = [
  { href: "#sobre", label: "Sobre" },
  { href: "#projetos", label: "Projetos" },
  { href: "#skills", label: "Skills" },
  { href: "#contato", label: "Contato" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const scroll = useSmoothScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setOpen(false);
    scroll(href);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-black/10 bg-background/80 backdrop-blur-md dark:border-white/10"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link
          href="#inicio"
          onClick={(e) => {
            e.preventDefault();
            scroll("#inicio");
          }}
          className="text-lg font-bold tracking-tight transition-opacity hover:opacity-80"
        >
          {portfolio.name.split(" ")[0]}
          <span className="bg-gradient-to-r from-indigo-500 to-fuchsia-500 bg-clip-text text-transparent">
            .
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <ul className="hidden items-center gap-1 text-sm font-medium sm:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="rounded-full px-3 py-2 text-foreground/70 transition-colors hover:bg-black/5 hover:text-foreground dark:hover:bg-white/10"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <ThemeToggle />

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            className="flex size-9 items-center justify-center rounded-full border border-black/10 text-foreground/70 transition-colors hover:bg-black/5 hover:text-foreground sm:hidden dark:border-white/15 dark:hover:bg-white/10"
          >
            {open ? (
              <XIcon className="size-4" />
            ) : (
              <MenuIcon className="size-4" />
            )}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-black/10 bg-background/95 backdrop-blur-md sm:hidden dark:border-white/10">
          <ul className="mx-auto flex max-w-5xl flex-col gap-1 px-4 py-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-black/5 hover:text-foreground dark:hover:bg-white/10"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}