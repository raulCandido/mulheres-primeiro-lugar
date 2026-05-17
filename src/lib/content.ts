export interface RatingOption {
  value: 0 | 1 | 2 | 3 | 4 | 5;
  label: string;
}

export interface ExperienceCard {
  title: string;
  speaker?: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

interface HeroContent {
  headline: string;
  subtitle: string;
  ctaLabel: string;
}

interface AboutContent {
  title: string;
  description: string;
}

interface ExperiencesContent {
  title: string;
  subtitle: string;
  items: ExperienceCard[];
}

interface EvaluationContent {
  sectionTitle: string;
  question: string;
  commentLabel: string;
  commentPlaceholder: string;
  submitLabel: string;
  successMessage: string;
  successSubtitle: string;
  errorMessage: string;
  ratingOptions: RatingOption[];
}

interface FooterContent {
  brandName: string;
  tagline: string;
  closingMessage: string;
  contactEmail: string;
  socialLinks: SocialLink[];
  copyright: string;
}

export interface SiteContent {
  hero: HeroContent;
  about: AboutContent;
  experiences: ExperiencesContent;
  evaluation: EvaluationContent;
  footer: FooterContent;
}

export const content: SiteContent = {
  hero: {
    headline: "Você fez parte de algo extraordinário",
    subtitle:
      "Sua opinião nos ajuda a tornar o próximo encontro ainda mais especial. Leva menos de um minuto.",
    ctaLabel: "Avaliar minha experiência",
  },

  about: {
    title: "O Evento",
    description:
      "Um encontro criado por mulheres e para mulheres, focado em experiências, autocuidado, empreendedorismo, sensualidade saudável, bem-estar, liberdade e conexão feminina.",
  },

  experiences: {
    title: "Experiências do Evento",
    subtitle: "Tudo que vivemos juntas nessa noite inesquecível",
    items: [
      { title: "Palestra de Sexologia", speaker: "Brenda Genes" },
      { title: "Massagem Tântrica Terapêutica", speaker: "Nayade Benicio" },
      { title: "Defesa Pessoal Feminina", speaker: "Analia Oliveira" },
      { title: "Pole Dance Experience", speaker: "Pilar Fernandez" },
      { title: "Feira Empreendedora Feminina" },
      { title: "Serviços de Beleza" },
      { title: "Bartender & Drinks" },
      { title: "Epilação e Estética" },
      { title: "Espaço de Tatuagem" },
      { title: "Refeições no Local" },
      { title: "Spa Facial" },
      { title: "Massagem Relaxante" },
      { title: "Reflexologia" },
      { title: "Nutricionista" },
      { title: "Espaço Fotográfico Instagramável" },
    ],
  },

  evaluation: {
    sectionTitle: "Compartilhe sua experiência",
    question: "O que você achou do nosso evento?",
    commentLabel: "Deseja deixar alguma sugestão ou comentário?",
    commentPlaceholder:
      "Opcional — conte o que mais te marcou, o que podemos melhorar ou qualquer mensagem que queira deixar para nós.",
    submitLabel: "Enviar Avaliação",
    successMessage: "Obrigada de coração!",
    successSubtitle:
      "Sua avaliação foi recebida. Ela nos inspira a criar encontros ainda mais especiais.",
    errorMessage: "Não foi possível enviar. Verifique sua conexão e tente novamente.",
    ratingOptions: [
      { value: 0, label: "Muito Ruim" },
      { value: 1, label: "Ruim" },
      { value: 2, label: "Regular" },
      { value: 3, label: "Bom" },
      { value: 4, label: "Muito Bom" },
      { value: 5, label: "Excelente" },
    ],
  },

  footer: {
    brandName: "Mulheres Primeiro Lugar",
    tagline: "Criado por mulheres. Para mulheres.",
    closingMessage:
      "Gratidão por fazer parte desse encontro. Você é a razão de tudo isso existir. Até a próxima!",
    contactEmail: "contato@mulheresprimeiralugar.com.br",
    socialLinks: [
      { label: "Instagram", href: "https://instagram.com/mulheresprimeiralugar" },
      { label: "WhatsApp", href: "https://wa.me/5500000000000" },
    ],
    copyright: `© ${new Date().getFullYear()} Mulheres Primeiro Lugar. Todos os direitos reservados.`,
  },
};
