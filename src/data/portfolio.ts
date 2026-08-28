// ============================================================
// Conteúdo do portfólio
// Edite este arquivo para personalizar todo o site:
// nome, textos, links, projetos e skills.
// ============================================================

export type Project = {
  title: string;
  description: string;
  tech: string[];
  demo?: string;
  source?: string;
};

export const portfolio = {
  name: "Nicolas Conte",
  role: "Desenvolvedor Full Stack",
  tagline:
    "Transformo ideias em experiências web rápidas, acessíveis e bonitas — do design à deploy.",
  about: [
    "Sou desenvolvedor apaixonado por construir produtos para a web. Trabalho com React, Next.js e TypeScript, com foco em código limpo, performance e boa experiência do usuário.",
    "Sempre em busca de aprender novas tecnologias e de entregar o melhor resultado possível em cada projeto.",
  ],
  email: "nicolascontegt@gmail.com",
  location: "Brasil",
  social: {
    github: "https://github.com/seu-usuario",
    linkedin: "https://www.linkedin.com/in/seu-usuario",
  },
  skills: [
    {
      category: "Frontend",
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML5", "CSS3"],
    },
    {
      category: "Backend",
      items: ["Node.js", "REST APIs", "PostgreSQL"],
    },
    {
      category: "Ferramentas",
      items: ["Git", "GitHub", "Docker", "Vercel"],
    },
  ],
  projects: [
    {
      title: "Projeto Exemplo 1",
      description:
        "Descreva aqui o que o projeto faz, o problema que resolve e qual foi a sua responsabilidade nele.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS"],
      demo: "#",
      source: "#",
    },
    {
      title: "Projeto Exemplo 2",
      description:
        "Outro projeto importante. Inclua resultados concretos quando possível (ex.: reduziu o tempo de carregamento em 40%).",
      tech: ["React", "Node.js"],
      demo: "#",
      source: "#",
    },
    {
      title: "Projeto Exemplo 3",
      description:
        "Mais um espaço para destacar um trabalho seu — apps, sites, bibliotecas ou contribuições open source.",
      tech: ["TypeScript", "PostgreSQL"],
      demo: "#",
      source: "#",
    },
  ] as Project[],
};