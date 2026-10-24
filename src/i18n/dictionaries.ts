import type { Locale } from "./config";

export type Dictionary = {
  metadata: {
    title: string;
    description: string;
  };
  skipLink: string;
  navigation: {
    about: string;
    projects: string;
    skills: string;
    contact: string;
    openMenu: string;
    closeMenu: string;
    languageSwitcher: string;
    changeLanguage: string;
  };
  theme: {
    enableLight: string;
    enableDark: string;
    light: string;
    dark: string;
  };
  hero: {
    availability: string;
    greeting: string;
    role: string;
    tagline: string;
    viewProjects: string;
    contact: string;
  };
  about: {
    title: string;
    paragraphs: readonly string[];
    highlights: readonly string[];
    information: string;
    location: string;
    contact: string;
  };
  projects: {
    title: string;
    description: string;
    demo: string;
    source: string;
    items: readonly {
      title: string;
      description: string;
    }[];
  };
  skills: {
    title: string;
    description: string;
    categories: {
      frontend: string;
      backend: string;
      tools: string;
    };
  };
  contact: {
    title: string;
    description: string;
  };
  footer: {
    rightsReserved: string;
    backToTop: string;
  };
};

const ptBR = {
  metadata: {
    title: "Nicolas Conte | Portfólio",
    description:
      "Portfólio de Nicolas Conte — desenvolvedor full stack especializado em React, Java, Next.js e TypeScript.",
  },
  skipLink: "Pular para o conteúdo",
  navigation: {
    about: "Sobre",
    projects: "Projetos",
    skills: "Skills",
    contact: "Contato",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    languageSwitcher: "Idioma",
    changeLanguage: "Mudar idioma para inglês",
  },
  theme: {
    enableLight: "Ativar tema claro",
    enableDark: "Ativar tema escuro",
    light: "Tema claro",
    dark: "Tema escuro",
  },
  hero: {
    availability: "Disponível para novos projetos",
    greeting: "Olá, eu sou",
    role: "Desenvolvedor Full Stack",
    tagline:
      "Transformo ideias em experiências web rápidas, acessíveis e bonitas — do design ao deploy.",
    viewProjects: "Ver projetos",
    contact: "Fale comigo",
  },
  about: {
    title: "Sobre mim",
    paragraphs: [
      "Sou desenvolvedor apaixonado por construir produtos para a web. Trabalho com React, Java, Next.js e TypeScript, com foco em código limpo, performance e boa experiência do usuário.",
      "Sempre em busca de aprender novas tecnologias e de entregar o melhor resultado possível em cada projeto.",
    ],
    highlights: [
      "Código limpo e testável",
      "Foco em performance e acessibilidade",
      "Do design ao deploy",
    ],
    information: "Informações",
    location: "Brasil",
    contact: "Contato",
  },
  projects: {
    title: "Projetos",
    description: "Alguns trabalhos dos quais tenho orgulho.",
    demo: "Demo",
    source: "Código",
    items: [
      {
        title: "Projeto Exemplo 1",
        description:
          "Descreva aqui o que o projeto faz, o problema que resolve e qual foi a sua responsabilidade nele.",
      },
      {
        title: "Projeto Exemplo 2",
        description:
          "Outro projeto importante. Inclua resultados concretos quando possível (ex.: reduziu o tempo de carregamento em 40%).",
      },
      {
        title: "Projeto Exemplo 3",
        description:
          "Mais um espaço para destacar um trabalho seu — apps, sites, bibliotecas ou contribuições open source.",
      },
    ],
  },
  skills: {
    title: "Skills",
    description: "Tecnologias e ferramentas que uso no dia a dia.",
    categories: {
      frontend: "Frontend",
      backend: "Backend",
      tools: "Ferramentas",
    },
  },
  contact: {
    title: "Contato",
    description: "Estou aberto a novas oportunidades e projetos. Vamos conversar?",
  },
  footer: {
    rightsReserved: "Todos os direitos reservados.",
    backToTop: "Voltar ao topo",
  },
} satisfies Dictionary;

const en = {
  metadata: {
    title: "Nicolas Conte | Portfolio",
    description:
      "Nicolas Conte's portfolio — a full-stack developer specializing in React, Java, Next.js, and TypeScript.",
  },
  skipLink: "Skip to content",
  navigation: {
    about: "About",
    projects: "Projects",
    skills: "Skills",
    contact: "Contact",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    languageSwitcher: "Language",
    changeLanguage: "Change language to Portuguese",
  },
  theme: {
    enableLight: "Enable light theme",
    enableDark: "Enable dark theme",
    light: "Light theme",
    dark: "Dark theme",
  },
  hero: {
    availability: "Available for new projects",
    greeting: "Hi, I am",
    role: "Full-Stack Developer",
    tagline:
      "I turn ideas into fast, accessible, and beautiful web experiences — from design to deployment.",
    viewProjects: "View projects",
    contact: "Get in touch",
  },
  about: {
    title: "About me",
    paragraphs: [
      "I am a developer passionate about building products for the web. I work with React, Java, Next.js, and TypeScript, focusing on clean code, performance, and a great user experience.",
      "I am always looking to learn new technologies and deliver the best possible outcome for every project.",
    ],
    highlights: [
      "Clean, testable code",
      "Focus on performance and accessibility",
      "From design to deployment",
    ],
    information: "Information",
    location: "Brazil",
    contact: "Contact",
  },
  projects: {
    title: "Projects",
    description: "A selection of work I am proud of.",
    demo: "Demo",
    source: "Code",
    items: [
      {
        title: "Example Project 1",
        description:
          "Describe what the project does, the problem it solves, and your responsibilities in it.",
      },
      {
        title: "Example Project 2",
        description:
          "Another important project. Include concrete results when possible (e.g., reduced loading time by 40%).",
      },
      {
        title: "Example Project 3",
        description:
          "One more space to showcase your work — apps, websites, libraries, or open-source contributions.",
      },
    ],
  },
  skills: {
    title: "Skills",
    description: "Technologies and tools I use every day.",
    categories: {
      frontend: "Frontend",
      backend: "Backend",
      tools: "Tools",
    },
  },
  contact: {
    title: "Contact",
    description: "I am open to new opportunities and projects. Let’s talk?",
  },
  footer: {
    rightsReserved: "All rights reserved.",
    backToTop: "Back to top",
  },
} satisfies Dictionary;

const dictionaries: Record<Locale, Dictionary> = {
  "pt-BR": ptBR,
  en,
};

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
