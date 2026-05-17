interface SectionContent {
  title: string;
  description: string;
}

interface HeroContent extends SectionContent {
  cta: string;
  subtitle?: string;
}

interface AboutContent extends SectionContent {
  highlights: string[];
}

interface FeatureItem {
  title: string;
  description: string;
}

interface FeaturesContent extends SectionContent {
  items: FeatureItem[];
}

interface Testimonial {
  name: string;
  role?: string;
  quote: string;
}

interface TestimonialsContent extends SectionContent {
  items: Testimonial[];
}

interface CtaContent extends SectionContent {
  buttonLabel: string;
  fields: {
    nameLabel: string;
    contactLabel: string;
    commentLabel: string;
    namePlaceholder: string;
    contactPlaceholder: string;
    commentPlaceholder: string;
  };
  successMessage: string;
}

interface FooterContent {
  copyright: string;
  links?: { label: string; href: string }[];
}

export interface SiteContent {
  hero: HeroContent;
  about: AboutContent;
  features: FeaturesContent;
  testimonials: TestimonialsContent;
  cta: CtaContent;
  footer: FooterContent;
}

export const content: SiteContent = {
  hero: {
    title: "Mulheres Primeiro Lugar",
    description:
      "Uma plataforma de apoio, empoderamento e conexão para mulheres que querem ocupar o espaço que merecem.",
    cta: "Quero participar",
    subtitle: "Juntas somos mais fortes",
  },
  about: {
    title: "Quem somos",
    description:
      "Somos um movimento que acredita no potencial de cada mulher de transformar sua realidade e a de sua comunidade.",
    highlights: [
      "Rede de apoio e mentoria entre mulheres",
      "Conteúdo educativo e inspirador",
      "Eventos presenciais e online",
      "Comunidade ativa em todo o Brasil",
    ],
  },
  features: {
    title: "Por que o Mulheres Primeiro Lugar?",
    description: "Tudo que você precisa para crescer, se conectar e se inspirar.",
    items: [
      {
        title: "Mentoria personalizada",
        description: "Conectamos você com mentoras experientes que já trilharam o caminho.",
      },
      {
        title: "Comunidade acolhedora",
        description: "Um espaço seguro para compartilhar conquistas e desafios.",
      },
      {
        title: "Eventos e workshops",
        description: "Encontros presenciais e online com especialistas e referências femininas.",
      },
      {
        title: "Conteúdo exclusivo",
        description: "Materiais práticos sobre carreira, saúde, finanças e bem-estar.",
      },
    ],
  },
  testimonials: {
    title: "O que dizem nossas participantes",
    description: "Histórias reais de mulheres que transformaram suas vidas.",
    items: [
      {
        name: "Ana Lima",
        role: "Empreendedora",
        quote:
          "Encontrei aqui a rede de apoio que precisava para dar o próximo passo no meu negócio.",
      },
      {
        name: "Carla Souza",
        role: "Profissional de TI",
        quote:
          "A mentoria me ajudou a superar a síndrome da impostora e conquistar minha promoção.",
      },
      {
        name: "Fernanda Costa",
        role: "Estudante",
        quote:
          "Nunca imaginei que encontraria tantas mulheres incríveis dispostas a me apoiar.",
      },
    ],
  },
  cta: {
    title: "Faça sua avaliação gratuita",
    description:
      "Preencha o formulário e nossa equipe entrará em contato para entender como podemos apoiar sua jornada.",
    buttonLabel: "Enviar avaliação",
    fields: {
      nameLabel: "Nome completo",
      contactLabel: "E-mail ou WhatsApp",
      commentLabel: "Conte um pouco sobre você (opcional)",
      namePlaceholder: "Seu nome",
      contactPlaceholder: "seuemail@exemplo.com ou (11) 99999-9999",
      commentPlaceholder: "O que você busca no Mulheres Primeiro Lugar?",
    },
    successMessage: "Recebemos sua avaliação! Entraremos em contato em breve.",
  },
  footer: {
    copyright: `© ${new Date().getFullYear()} Mulheres Primeiro Lugar. Todos os direitos reservados.`,
    links: [
      { label: "Privacidade", href: "#privacidade" },
      { label: "Contato", href: "#contato" },
    ],
  },
};
