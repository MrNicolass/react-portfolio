import type {
  EducationId,
  ExperienceId,
  ProjectSlug,
  SkillGroupId,
} from "@/data/portfolio";
import type { Locale } from "./config";

export type ProjectCopy = {
  title: string;
  tagline: string;
  summary: string;
  problem: string;
  role: string;
  highlights: readonly string[];
  outcome: string;
  imageAlt: string;
  galleryAlts: readonly string[];
  stats: Record<string, string>;
};

export type Dictionary = {
  metadata: {
    title: string;
    description: string;
    ogAlt: string;
    keywords: readonly string[];
  };
  skipLink: string;
  navigation: {
    home: string;
    about: string;
    experience: string;
    projects: string;
    skills: string;
    activity: string;
    contact: string;
    openMenu: string;
    closeMenu: string;
    languageSwitcher: string;
    changeLanguage: string;
    primary: string;
  };
  theme: {
    enableLight: string;
    enableDark: string;
    light: string;
    dark: string;
  };
  hero: {
    status: string;
    availability: string;
    greeting: string;
    role: string;
    tagline: string;
    facts: readonly { key: string; value: string }[];
    viewProjects: string;
    contact: string;
    downloadCv: string;
    scrollHint: string;
    portrait: { alt: string; reveal: string; hint: string };
  };
  about: {
    title: string;
    paragraphs: readonly string[];
    highlights: readonly string[];
    information: string;
    location: string;
    languages: string;
    contact: string;
  };
  experience: {
    title: string;
    description: string;
    present: string;
    education: string;
    grade: string;
    roles: Record<ExperienceId, { role: string; summary: string; points: readonly string[] }>;
    schools: Record<EducationId, string>;
  };
  projects: {
    title: string;
    description: string;
    featured: string;
    caseStudy: string;
    repository: string;
    live: string;
    filterLabel: string;
    filterAll: string;
    filtering: string;
    items: Record<ProjectSlug, ProjectCopy>;
  };
  caseStudy: {
    back: string;
    problem: string;
    role: string;
    highlights: string;
    outcome: string;
    stack: string;
    gallery: string;
    facts: string;
    year: string;
    next: string;
  };
  skills: {
    title: string;
    description: string;
    hint: string;
    usedIn: string;
    categories: Record<SkillGroupId, string>;
  };
  activity: {
    title: string;
    description: string;
    alt: string;
    profile: string;
  };
  homelab: {
    title: string;
    description: string;
    uptime: string;
    cpu: string;
    memory: string;
    energy: string;
    today: string;
    month: string;
    updated: string;
    offline: string;
    days: string;
    hours: string;
    minutes: string;
    project: string;
  };
  contact: {
    title: string;
    description: string;
    copy: string;
    copied: string;
    copyFailed: string;
    downloadCv: string;
  };
  palette: {
    open: string;
    title: string;
    placeholder: string;
    empty: string;
    groups: { navigate: string; projects: string; actions: string; links: string };
    actions: {
      toggleTheme: string;
      switchLanguage: string;
      copyEmail: string;
      downloadCv: string;
    };
    hint: string;
  };
  cv: {
    title: string;
    description: string;
    print: string;
    download: string;
    otherLanguage: string;
    back: string;
    summary: string;
    experience: string;
    education: string;
    skills: string;
    projects: string;
    languages: string;
    languageList: string;
    headline: string;
    summaryText: string;
  };
  notFound: {
    title: string;
    description: string;
    home: string;
    projects: string;
  };
  footer: {
    rightsReserved: string;
    backToTop: string;
    builtWith: string;
    shortcut: string;
  };
};

const ptBR = {
  metadata: {
    title: "Nicolas Conte | Desenvolvedor Full Stack",
    description:
      "Desenvolvedor Full Stack em P&D na WEG. React, TypeScript, Java e Python, com 5 anos de trajetória entre infraestrutura, suporte, dados e desenvolvimento.",
    ogAlt: "Nicolas Conte, desenvolvedor Full Stack. React, Java, Python e IoT.",
    keywords: [
      "Nicolas Conte",
      "desenvolvedor full stack",
      "React",
      "Next.js",
      "TypeScript",
      "Java",
      "Spring Boot",
      "Python",
      "IoT",
      "portfólio",
    ],
  },
  skipLink: "Pular para o conteúdo",
  navigation: {
    home: "Início",
    about: "Sobre",
    experience: "Experiência",
    projects: "Projetos",
    skills: "Skills",
    activity: "Atividade",
    contact: "Contato",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    languageSwitcher: "Idioma",
    changeLanguage: "Mudar idioma para inglês",
    primary: "Navegação principal",
  },
  theme: {
    enableLight: "Ativar tema claro",
    enableDark: "Ativar tema escuro",
    light: "Tema claro",
    dark: "Tema escuro",
  },
  hero: {
    status: "BEM-VINDO AO MEU WONDERLAND",
    availability: "Aberto a oportunidades · Brasil, UE e Canadá",
    greeting: "Olá, eu sou",
    role: "Desenvolvedor Full Stack",
    tagline:
      "Construo do front ao hardware: interfaces em React, APIs em Java, ferramentas em Python e o servidor onde tudo isso roda.",
    facts: [
      { key: "Hoje", value: "P&D na WEG" },
      { key: "Stack", value: "React + Java + Python" },
      { key: "Também", value: "LLMs locais, homelab, pixel art" },
    ],
    viewProjects: "Ver projetos",
    contact: "Fale comigo",
    downloadCv: "Baixar CV",
    scrollHint: "Role para ver mais",
    portrait: {
      alt: "Retrato de Nicolas Conte em pixel art violeta: cabelo escuro ondulado, barba e camiseta branca",
      reveal: "Revelar a foto real",
      hint: "passe o mouse ou toque",
    },
  },
  about: {
    title: "Sobre mim",
    paragraphs: [
      "Sou desenvolvedor Full Stack com 5 anos de trajetória em tecnologia: comecei na infraestrutura de um hospital, passei pelo suporte e pela engenharia de dados e hoje atuo em P&D na WEG, construindo interfaces em React e ferramentas de Smart Grid e IoT sobre o protocolo LwM2M.",
      "Esse caminho me deu instinto para depurar problemas difíceis e respeito por quem usa o sistema do outro lado. Fora do trabalho, mantenho um servidor doméstico com LLMs locais e crio ferramentas que resolvem problemas meus, como o assistente de voz Naji e o painel físico Vitals-Deck.",
    ],
    highlights: [
      "Liderança técnica de front-end em React com Atomic Design",
      "Do banco de dados ao deploy em produção",
      "Engenharia de Software pela Católica SC, média 9,09",
    ],
    information: "Informações",
    location: "Jaraguá do Sul, SC · Brasil",
    languages: "Português nativo · Inglês avançado",
    contact: "Contato",
  },
  experience: {
    title: "Experiência",
    description: "De infraestrutura a P&D: cada etapa somou uma camada ao que faço hoje.",
    present: "atual",
    education: "Formação",
    grade: "média",
    roles: {
      "weg-rd": {
        role: "Bolsista de P&D em Inovação Tecnológica",
        summary:
          "Ferramentas de Smart Grid e software para gestão de dispositivos inteligentes (IoT) sobre LwM2M.",
        points: [
          "Liderança técnica do front-end em React com Atomic Design, com ganho de 30% em usabilidade",
          "Arquitetura base, padrões de código e documentação do front-end",
          "Testes automatizados em Java com Selenium e Mockito",
          "Levantamento e análise de requisitos com as áreas de negócio",
        ],
      },
      "geovendas-dba": {
        role: "Analista de Banco de Dados Júnior",
        summary: "Engenharia de dados, migrações e BI para clientes da plataforma.",
        points: [
          "Otimização de uma integração de larga escala com 40% menos tempo de execução",
          "Responsável técnico por todas as migrações entre bancos de dados",
          "Views, triggers e consultas complexas para regras de negócio de clientes",
          "Scripts em Python para automatizar fluxos repetitivos",
        ],
      },
      "geovendas-support": {
        role: "Analista de Atendimento ao Cliente",
        summary: "Suporte aos produtos Analytics e Sales Force.",
        points: [
          "Análise e correção de consultas SQL em PostgreSQL, Oracle, SQL Server e Firebird",
          "Resolução de tickets e documentação de processos",
        ],
      },
      clinicorp: {
        role: "Analista de Migração de Dados",
        summary: "Migração de clínicas vindas de outros sistemas ou de planilhas.",
        points: [
          "Transformação e correção de dados com MySQL, Firebird e Excel",
          "Ferramentas de automação em Python para o dia a dia do time",
        ],
      },
      "algar-weg": {
        role: "Técnico de Suporte",
        summary: "Suporte técnico aos colaboradores da WEG, como terceirizado.",
        points: [
          "Gestão dos equipamentos de TI da região designada e atendimento VIP",
          "Projeto de atualização do parque de máquinas",
        ],
      },
      hospital: {
        role: "Assistente de Infraestrutura",
        summary: "Infraestrutura de TI do hospital.",
        points: [
          "Redes locais, computadores, impressoras e usuários da rede interna",
          "Helpdesk e documentação de processos",
        ],
      },
    },
    schools: {
      catolica: "Bacharelado em Engenharia de Software",
      "senai-dev": "Técnico em Desenvolvimento de Sistemas",
      "senai-network": "Aprendizagem Industrial em Redes",
    },
  },
  projects: {
    title: "Projetos",
    description: "Ferramentas que construí para resolver problemas reais, quase todas rodando em casa.",
    featured: "Destaque",
    caseStudy: "Ver estudo de caso",
    repository: "Código",
    live: "Ver ao vivo",
    filterLabel: "Filtrar por skill",
    filterAll: "Todos",
    filtering: "Mostrando projetos com",
    items: {
      naji: {
        title: "Naji",
        tagline: "Assistente de voz que mora na bandeja do sistema.",
        summary:
          "Assistente de voz desktop para Windows e Linux: um atalho global abre uma barra flutuante, você fala e um LLM local responde e executa ações no computador.",
        problem:
          "Assistentes de voz comerciais dependem da nuvem e não controlam bem o desktop. Eu queria algo local, rápido de invocar e que não ocupasse uma janela inteira.",
        role:
          "Projeto pessoal, do zero: arquitetura, interface, integração com o modelo, empacotamento e testes.",
        highlights: [
          "Interface tray-first em PySide6: sem janela principal, só uma barra sempre no topo",
          "Pipeline voz → texto → LLM com ferramentas → voz, usando llama.cpp em tempo real",
          "Mais de 16 ferramentas nativas (volume, janelas, arquivos, energia, timers), com confirmação para ações destrutivas",
          "Três modos de fala (push-to-talk, toggle e detecção de voz), wake word e interrupção por atalho",
          "Interface em PT-BR e EN, tema claro/escuro e tokens do meu design system",
          "Executável único para Windows com PyInstaller, autostart e testes com pytest",
        ],
        outcome:
          "MVP completo em uso diário no meu computador, ligado a um servidor de LLM que roda no meu homelab.",
        imageAlt:
          "Barra flutuante do Naji com o avatar N, o texto 'Pode falar' e um campo para digitar mensagens",
        galleryAlts: ["Barra do Naji em tamanho real, aguardando um comando de voz"],
        stats: { tools: "ferramentas", platforms: "plataformas", locales: "idiomas" },
      },
      "vitals-deck": {
        title: "Vitals-Deck",
        tagline: "Monitor físico do meu servidor, sem o software do fabricante.",
        summary:
          "Monitor de sistema para a mini tela TURZX de 3,5\": CPU, RAM, swap, duas GPUs, temperaturas e consumo de energia acumulado, rodando como serviço no Linux.",
        problem:
          "A tela só funciona com um software proprietário para Windows. Meu servidor roda Linux, então reimplementei o protocolo serial do zero.",
        role: "Projeto pessoal: engenharia reversa do protocolo, renderização, serviço e instalador.",
        highlights: [
          "Protocolo serial reimplementado: comandos de 6 bytes e framebuffer RGB565 via USB CDC-ACM",
          "Atualização só das células que mudaram, porque um frame completo leva cerca de 1,9 s a ~140 KB/s",
          "Energia da CPU via RAPL somada à das GPUs NVIDIA, com estado persistido por dia e por mês",
          "Ponte reversa por TCP para ligar a tela em outra máquina da rede ou do Tailscale",
          "Instalação com unidade systemd e regra udev, configuração validada de forma estrita",
          "195 testes automatizados e modo de preview que gera o frame em PNG sem a tela",
        ],
        outcome:
          "Roda 24/7 ao lado do servidor. O print desta página foi gerado pelo próprio modo de preview, com dados reais.",
        imageAlt:
          "Foto da tela TURZX ao lado do servidor e o frame renderizado com medidores de CPU, RAM, swap, duas GPUs e energia",
        galleryAlts: [
          "Foto da tela TURZX de 3,5 polegadas em um suporte, ao lado do gabinete do servidor",
          "Frame gerado pelo modo de preview com medidores circulares e o consumo de energia do dia e do mês",
        ],
        stats: { tests: "testes", throughput: "taxa serial", display: "resolução" },
      },
      "profile-readme": {
        title: "README do GitHub",
        tagline: "Pixel art gerada por código e um jogo que roda no meu calendário.",
        summary:
          "Perfil do GitHub com painéis em pixel art gerados por scripts e um jogo em que um gatinho percorre o calendário de contribuições, atualizado todo dia por GitHub Actions.",
        problem:
          "O GitHub remove CSS e JavaScript do README. Para ter identidade visual, tudo precisava virar imagem, e o jogo precisava ser só SVG.",
        role: "Projeto pessoal: arte, geradores em Python e automação.",
        highlights: [
          "Aurora em dithering com matriz de Bayer 8×8 e ruído periódico que emenda sem costura",
          "Texto convertido em vetores com fontTools, para nenhum painel depender de fonte instalada",
          "Jogo animado só com SMIL, com dados reais da API GraphQL do GitHub",
          "Validação própria de keyTimes, porque o navegador ignora animações inválidas em silêncio",
          "Versões clara e escura de cada painel, escolhidas pelo tema do visitante",
        ],
        outcome: "Gerado diariamente por um workflow; este site reaproveita a mesma linguagem visual.",
        imageAlt:
          "Banner em pixel art com aurora violeta, lua crescente, colinas azuis e um gatinho branco de coleira laranja, acima do nome Nicolas Conte",
        galleryAlts: [],
        stats: { panels: "painéis", schedule: "atualização", dependencies: "no jogo" },
      },
      imconte: {
        title: "imconte.com",
        tagline: "Este site: meu cartão profissional, feito do zero e hospedado em casa.",
        summary:
          "Portfólio bilíngue em Next.js 16 e React 19, com estudos de caso, CV para impressão, paleta de comandos e uma identidade em pixel art gerada por código, servido pelo meu homelab.",
        problem:
          "Eu queria um lugar só meu para mostrar o trabalho, que carregasse rápido, fosse acessível, aparecesse bem no Google e no LinkedIn e tivesse a minha cara, sem depender de construtor de sites.",
        role: "Projeto pessoal: design, código, conteúdo, SEO e infraestrutura.",
        highlights: [
          "App Router com Server Components e componentes cliente só onde há interação",
          "Português e inglês com rotas por idioma, hreflang, sitemap e imagens de compartilhamento geradas por idioma e por projeto",
          "Tema claro/escuro sem piscar, aplicado antes da primeira pintura",
          "Paleta de comandos Ctrl+K acessível por teclado e CV que vira PDF direto do navegador",
          "Retrato e aurora em dithering com matriz de Bayer, que respeitam a preferência por movimento reduzido",
          "Servido por systemd no meu servidor, atrás do Cloudflare",
        ],
        outcome: "No ar em imconte.com; cada página tem imagem própria ao ser compartilhada.",
        imageAlt:
          "Página inicial do imconte.com com o nome Nicolas Conte em fonte pixel, o cargo Desenvolvedor Full Stack e o retrato em dithering violeta",
        galleryAlts: [],
        stats: { framework: "framework", locales: "idiomas", hosting: "hospedagem" },
      },
    },
  },
  caseStudy: {
    back: "Todos os projetos",
    problem: "O problema",
    role: "Meu papel",
    highlights: "O que eu construí",
    outcome: "Resultado",
    stack: "Stack",
    gallery: "Imagens",
    facts: "Em números",
    year: "Ano",
    next: "Próximo projeto",
  },
  skills: {
    title: "Skills",
    description: "Tecnologias que uso no trabalho e nos meus projetos.",
    hint: "Clique em uma skill para ver os projetos que a usam.",
    usedIn: "Usado em",
    categories: {
      frontend: "Front-end",
      backend: "Back-end",
      data: "Dados",
      infra: "Infra e ferramentas",
    },
  },
  activity: {
    title: "Atividade",
    description:
      "Meu calendário de contribuições no GitHub, regenerado todo dia: o gatinho coleta cada dia em que eu programei.",
    alt: "Um gatinho branco corre pelo meu calendário de contribuições do GitHub, seguido por três mini gatinhos, coletando as contribuições.",
    profile: "Ver perfil no GitHub",
  },
  homelab: {
    title: "Este site roda no meu homelab",
    description: "Dados ao vivo do servidor, os mesmos que aparecem no Vitals-Deck.",
    uptime: "Ligado há",
    cpu: "CPU",
    memory: "RAM",
    energy: "Energia",
    today: "hoje",
    month: "no mês",
    updated: "Última leitura",
    offline: "Sem dados do servidor no momento.",
    days: "d",
    hours: "h",
    minutes: "min",
    project: "Como funciona",
  },
  contact: {
    title: "Contato",
    description:
      "Estou aberto a vagas Full Stack, Front-end ou Back-end, no Brasil ou fora. Vamos conversar?",
    copy: "Copiar e-mail",
    copied: "E-mail copiado",
    copyFailed: "Não foi possível copiar",
    downloadCv: "Baixar CV",
  },
  palette: {
    open: "Abrir paleta de comandos",
    title: "Paleta de comandos",
    placeholder: "Busque seções, projetos ou ações…",
    empty: "Nada encontrado.",
    groups: { navigate: "Navegar", projects: "Projetos", actions: "Ações", links: "Links" },
    actions: {
      toggleTheme: "Alternar tema claro/escuro",
      switchLanguage: "Ver em inglês",
      copyEmail: "Copiar e-mail",
      downloadCv: "Baixar CV",
    },
    hint: "↑↓ para navegar · Enter para abrir · Esc para fechar",
  },
  cv: {
    title: "Currículo",
    description: "Currículo de Nicolas Conte, desenvolvedor Full Stack.",
    print: "Imprimir",
    download: "Baixar PDF",
    otherLanguage: "English version",
    back: "Voltar ao site",
    summary: "Resumo",
    experience: "Experiência",
    education: "Formação",
    skills: "Competências",
    projects: "Projetos",
    languages: "Idiomas",
    languageList: "Português (nativo), inglês (avançado)",
    headline: "Desenvolvedor Full Stack · React · TypeScript · Java · Python",
    summaryText:
      "Desenvolvedor Full Stack com 5 anos de trajetória em tecnologia (infraestrutura, suporte, dados e desenvolvimento). Em P&D na WEG, lidero o front-end em React de ferramentas de Smart Grid e IoT (LwM2M) e automatizo testes em Java. Experiência com PostgreSQL, Oracle, SQL Server e Firebird, otimização de consultas e migrações de dados.",
  },
  notFound: {
    title: "Essa página fugiu",
    description: "O gatinho procurou por todo o calendário e não encontrou nada aqui.",
    home: "Voltar ao início",
    projects: "Ver projetos",
  },
  footer: {
    rightsReserved: "Todos os direitos reservados.",
    backToTop: "Voltar ao topo",
    builtWith: "Feito com Next.js e servido do meu homelab.",
    shortcut: "para navegar",
  },
} satisfies Dictionary;

const en = {
  metadata: {
    title: "Nicolas Conte | Full-Stack Developer",
    description:
      "Full-stack developer in R&D at WEG. React, TypeScript, Java and Python, with 5 years across infrastructure, support, data and software development.",
    ogAlt: "Nicolas Conte, full-stack developer. React, Java, Python and IoT.",
    keywords: [
      "Nicolas Conte",
      "full-stack developer",
      "React",
      "Next.js",
      "TypeScript",
      "Java",
      "Spring Boot",
      "Python",
      "IoT",
      "portfolio",
    ],
  },
  skipLink: "Skip to content",
  navigation: {
    home: "Home",
    about: "About",
    experience: "Experience",
    projects: "Projects",
    skills: "Skills",
    activity: "Activity",
    contact: "Contact",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    languageSwitcher: "Language",
    changeLanguage: "Change language to Portuguese",
    primary: "Main navigation",
  },
  theme: {
    enableLight: "Enable light theme",
    enableDark: "Enable dark theme",
    light: "Light theme",
    dark: "Dark theme",
  },
  hero: {
    status: "WELCOME TO MY WONDERLAND",
    availability: "Open to opportunities · Brazil, EU and Canada",
    greeting: "Hi, I am",
    role: "Full-Stack Developer",
    tagline:
      "I build from the front end down to the hardware: React interfaces, Java APIs, Python tools and the server they all run on.",
    facts: [
      { key: "Now", value: "R&D at WEG" },
      { key: "Stack", value: "React + Java + Python" },
      { key: "Also", value: "local LLMs, homelab, pixel art" },
    ],
    viewProjects: "View projects",
    contact: "Get in touch",
    downloadCv: "Download CV",
    scrollHint: "Scroll for more",
    portrait: {
      alt: "Pixel-art portrait of Nicolas Conte in violet: wavy dark hair, a beard and a white T-shirt",
      reveal: "Reveal the real photo",
      hint: "hover or tap",
    },
  },
  about: {
    title: "About me",
    paragraphs: [
      "I am a full-stack developer with 5 years in tech: I started in a hospital's IT infrastructure, moved through support and data engineering, and now work in R&D at WEG, building React interfaces and Smart Grid and IoT tools on top of the LwM2M protocol.",
      "That path gave me an instinct for debugging hard problems and respect for whoever is on the other side of the screen. Outside work, I run a home server with local LLMs and build tools for my own problems, like the Naji voice assistant and the Vitals-Deck hardware dashboard.",
    ],
    highlights: [
      "Front-end technical lead in React with Atomic Design",
      "From the database to production deploys",
      "BSc in Software Engineering, Católica SC, GPA 9.09/10",
    ],
    information: "Details",
    location: "Jaraguá do Sul, SC · Brazil",
    languages: "Native Portuguese · Advanced English",
    contact: "Contact",
  },
  experience: {
    title: "Experience",
    description: "From infrastructure to R&D: every step added a layer to what I do today.",
    present: "present",
    education: "Education",
    grade: "GPA",
    roles: {
      "weg-rd": {
        role: "R&D Fellow, Technological Innovation",
        summary:
          "Smart Grid tools and software to manage intelligent IoT devices over LwM2M.",
        points: [
          "Front-end technical lead in React with Atomic Design, improving usability by 30%",
          "Base architecture, code standards and documentation for the front end",
          "Automated tests in Java with Selenium and Mockito",
          "Requirements gathering and analysis with business teams",
        ],
      },
      "geovendas-dba": {
        role: "Junior Database Analyst",
        summary: "Data engineering, migrations and BI for the platform's customers.",
        points: [
          "Optimized a large-scale integration, cutting execution time by 40%",
          "Technical owner of every database-to-database migration",
          "Views, triggers and complex queries for customer business rules",
          "Python scripts to automate repetitive workflows",
        ],
      },
      "geovendas-support": {
        role: "Customer Support Analyst",
        summary: "Support for the Analytics and Sales Force products.",
        points: [
          "Analyzed and fixed SQL queries on PostgreSQL, Oracle, SQL Server and Firebird",
          "Ticket resolution and process documentation",
        ],
      },
      clinicorp: {
        role: "Data Migration Analyst",
        summary: "Migrated dental clinics coming from other systems or spreadsheets.",
        points: [
          "Data transformation and cleanup with MySQL, Firebird and Excel",
          "Python automation tools for the team's daily work",
        ],
      },
      "algar-weg": {
        role: "IT Support Technician",
        summary: "On-site IT support for WEG employees, as a contractor.",
        points: [
          "Managed IT equipment for the assigned area and VIP support",
          "Machine fleet upgrade project",
        ],
      },
      hospital: {
        role: "Infrastructure Assistant",
        summary: "IT infrastructure for the hospital.",
        points: [
          "Local networks, computers, printers and internal network users",
          "Helpdesk and process documentation",
        ],
      },
    },
    schools: {
      catolica: "BSc in Software Engineering",
      "senai-dev": "Technical Degree in Systems Development",
      "senai-network": "Industrial Apprenticeship in Networking",
    },
  },
  projects: {
    title: "Projects",
    description: "Tools I built to solve real problems, most of them running at home.",
    featured: "Featured",
    caseStudy: "Read the case study",
    repository: "Code",
    live: "View live",
    filterLabel: "Filter by skill",
    filterAll: "All",
    filtering: "Showing projects with",
    items: {
      naji: {
        title: "Naji",
        tagline: "A voice assistant that lives in the system tray.",
        summary:
          "Desktop voice assistant for Windows and Linux: a global hotkey opens a floating bar, you speak, and a local LLM answers and acts on your computer.",
        problem:
          "Commercial voice assistants depend on the cloud and barely control the desktop. I wanted something local, quick to summon, and that never takes over a whole window.",
        role: "Personal project, from scratch: architecture, UI, model integration, packaging and tests.",
        highlights: [
          "Tray-first PySide6 interface: no main window, just an always-on-top bar",
          "Voice → text → LLM with tools → voice pipeline, on llama.cpp in real time",
          "16+ native tools (volume, windows, files, power, timers), with confirmation for destructive actions",
          "Three speech modes (push-to-talk, toggle and voice activity), wake word and hotkey barge-in",
          "PT-BR and EN interface, light/dark theme and my own design system tokens",
          "Single Windows executable with PyInstaller, autostart and pytest tests",
        ],
        outcome:
          "Complete MVP in daily use on my machine, wired to an LLM server running in my homelab.",
        imageAlt:
          "Naji's floating bar with the N avatar, the text 'Pode falar' (go ahead, speak) and a message field",
        galleryAlts: ["Naji's bar at full size, waiting for a voice command"],
        stats: { tools: "tools", platforms: "platforms", locales: "languages" },
      },
      "vitals-deck": {
        title: "Vitals-Deck",
        tagline: "A physical dashboard for my server, without the vendor software.",
        summary:
          "System monitor for the 3.5\" TURZX mini display: CPU, RAM, swap, two GPUs, temperatures and accumulated energy use, running as a Linux service.",
        problem:
          "The display only works with a proprietary Windows app. My server runs Linux, so I reimplemented the serial protocol from scratch.",
        role: "Personal project: protocol reverse engineering, rendering, service and installer.",
        highlights: [
          "Reimplemented serial protocol: 6-byte commands and an RGB565 framebuffer over USB CDC-ACM",
          "Redraws only the cells that changed, since a full frame takes about 1.9 s at ~140 KB/s",
          "CPU energy from RAPL plus NVIDIA GPU power, persisted per day and per month",
          "Reverse TCP bridge to plug the display into another machine on the LAN or Tailscale",
          "systemd unit and udev rule installer, with strictly validated configuration",
          "195 automated tests and a preview mode that renders the frame to PNG without the display",
        ],
        outcome:
          "Runs 24/7 next to the server. The screenshot on this page came from its own preview mode, with real data.",
        imageAlt:
          "Photo of the TURZX display next to the server and the rendered frame with CPU, RAM, swap, two GPU and energy gauges",
        galleryAlts: [
          "Photo of the 3.5-inch TURZX display on a stand next to the server case",
          "Frame rendered by preview mode with circular gauges and the day's and month's energy use",
        ],
        stats: { tests: "tests", throughput: "serial rate", display: "resolution" },
      },
      "profile-readme": {
        title: "GitHub README",
        tagline: "Code-generated pixel art and a game that runs on my calendar.",
        summary:
          "GitHub profile with pixel-art panels generated by scripts and a game where a kitten runs across my contribution calendar, refreshed daily by GitHub Actions.",
        problem:
          "GitHub strips CSS and JavaScript from READMEs. To have a visual identity, everything had to become an image, and the game had to be pure SVG.",
        role: "Personal project: art, Python generators and automation.",
        highlights: [
          "Dithered aurora with an 8×8 Bayer matrix and periodic noise that tiles seamlessly",
          "Text converted to vector paths with fontTools, so no panel depends on installed fonts",
          "Animated game in pure SMIL, fed by real data from GitHub's GraphQL API",
          "Custom keyTimes validation, because browsers silently ignore invalid animations",
          "Light and dark versions of every panel, picked by the visitor's theme",
        ],
        outcome: "Generated daily by a workflow; this site reuses the same visual language.",
        imageAlt:
          "Pixel-art banner with a violet aurora, a crescent moon, blue hills and a white kitten wearing an orange collar, above the name Nicolas Conte",
        galleryAlts: [],
        stats: { panels: "panels", schedule: "refresh", dependencies: "in the game" },
      },
      imconte: {
        title: "imconte.com",
        tagline: "This site: my professional card, built from scratch and hosted at home.",
        summary:
          "Bilingual portfolio in Next.js 16 and React 19, with case studies, a printable CV, a command palette and a code-generated pixel-art identity, served from my homelab.",
        problem:
          "I wanted a place of my own to show my work: fast, accessible, well presented on Google and LinkedIn, and with my own look, without a site builder.",
        role: "Personal project: design, code, content, SEO and infrastructure.",
        highlights: [
          "App Router with Server Components, and client components only where there is interaction",
          "Portuguese and English with per-locale routes, hreflang, a sitemap and share images generated per locale and per project",
          "Light and dark themes with no flash, applied before the first paint",
          "Keyboard-accessible Ctrl+K command palette and a CV that prints to PDF straight from the browser",
          "Portrait and aurora dithered with a Bayer matrix, honoring the reduced-motion preference",
          "Served by systemd on my own server, behind Cloudflare",
        ],
        outcome: "Live at imconte.com; every page has its own share image.",
        imageAlt:
          "imconte.com home page with the name Nicolas Conte in a pixel font, the Full-Stack Developer title and the violet dithered portrait",
        galleryAlts: [],
        stats: { framework: "framework", locales: "languages", hosting: "hosting" },
      },
    },
  },
  caseStudy: {
    back: "All projects",
    problem: "The problem",
    role: "My role",
    highlights: "What I built",
    outcome: "Outcome",
    stack: "Stack",
    gallery: "Images",
    facts: "By the numbers",
    year: "Year",
    next: "Next project",
  },
  skills: {
    title: "Skills",
    description: "Technologies I use at work and in my own projects.",
    hint: "Click a skill to see the projects that use it.",
    usedIn: "Used in",
    categories: {
      frontend: "Front end",
      backend: "Back end",
      data: "Data",
      infra: "Infra and tooling",
    },
  },
  activity: {
    title: "Activity",
    description:
      "My GitHub contribution calendar, regenerated every day: the kitten collects each day I wrote code.",
    alt: "A small white kitten runs across my GitHub contribution calendar, followed by three mini kittens, collecting my contributions.",
    profile: "View GitHub profile",
  },
  homelab: {
    title: "This site runs in my homelab",
    description: "Live data from the server, the same numbers shown on the Vitals-Deck.",
    uptime: "Up for",
    cpu: "CPU",
    memory: "RAM",
    energy: "Energy",
    today: "today",
    month: "this month",
    updated: "Last reading",
    offline: "No server data right now.",
    days: "d",
    hours: "h",
    minutes: "min",
    project: "How it works",
  },
  contact: {
    title: "Contact",
    description:
      "I am open to full-stack, front-end or back-end roles, in Brazil or abroad. Let’s talk?",
    copy: "Copy email",
    copied: "Email copied",
    copyFailed: "Could not copy",
    downloadCv: "Download CV",
  },
  palette: {
    open: "Open command palette",
    title: "Command palette",
    placeholder: "Search sections, projects or actions…",
    empty: "Nothing found.",
    groups: { navigate: "Navigate", projects: "Projects", actions: "Actions", links: "Links" },
    actions: {
      toggleTheme: "Toggle light/dark theme",
      switchLanguage: "View in Portuguese",
      copyEmail: "Copy email",
      downloadCv: "Download CV",
    },
    hint: "↑↓ to move · Enter to open · Esc to close",
  },
  cv: {
    title: "Résumé",
    description: "Résumé of Nicolas Conte, full-stack developer.",
    print: "Print",
    download: "Download PDF",
    otherLanguage: "Versão em português",
    back: "Back to the site",
    summary: "Summary",
    experience: "Experience",
    education: "Education",
    skills: "Skills",
    projects: "Projects",
    languages: "Languages",
    languageList: "Portuguese (native), English (advanced)",
    headline: "Full-Stack Developer · React · TypeScript · Java · Python",
    summaryText:
      "Full-stack developer with 5 years in tech (infrastructure, support, data and software development). In R&D at WEG, I lead the React front end of Smart Grid and IoT (LwM2M) tools and automate tests in Java. Experienced with PostgreSQL, Oracle, SQL Server and Firebird, query optimization and data migrations.",
  },
  notFound: {
    title: "This page ran away",
    description: "The kitten searched the whole calendar and found nothing here.",
    home: "Back to home",
    projects: "See projects",
  },
  footer: {
    rightsReserved: "All rights reserved.",
    backToTop: "Back to top",
    builtWith: "Built with Next.js and served from my homelab.",
    shortcut: "to navigate",
  },
} satisfies Dictionary;

const dictionaries: Record<Locale, Dictionary> = {
  "pt-BR": ptBR,
  en,
};

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}

/** Formats an ISO month ("2025-02") as a short localized month and year. */
export function formatMonth(locale: Locale, isoMonth: string) {
  const [year, month] = isoMonth.split("-").map(Number);
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, 1)));
}

/** Formats a 0–10 grade with the locale decimal separator, keeping at least one decimal ("8,0"). */
export function formatGrade(locale: Locale, grade: number) {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  }).format(grade);
}
