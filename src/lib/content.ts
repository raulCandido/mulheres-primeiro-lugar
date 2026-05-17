export interface RatingOption {
  value: 0 | 1 | 2 | 3 | 4 | 5;
  label: string;
  emoji: string;
}

export interface ExperienceCard {
  title: string;
  speaker?: string;
  emoji: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
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
      { title: "Palestra de Sexologia", speaker: "Brenda Genes", emoji: "🎤" },
      { title: "Massagem Tântrica Terapêutica", speaker: "Nayade Benicio", emoji: "🌸" },
      { title: "Defesa Pessoal Feminina", speaker: "Analia Oliveira", emoji: "🥊" },
      { title: "Pole Dance Experience", speaker: "Pilar Fernandez", emoji: "💃" },
      { title: "Feira Empreendedora Feminina", emoji: "🛍️" },
      { title: "Serviços de Beleza", emoji: "💄" },
      { title: "Bartender & Drinks", emoji: "🍹" },
      { title: "Epilação e Estética", emoji: "✨" },
      { title: "Espaço de Tatuagem", emoji: "🖋️" },
      { title: "Refeições no Local", emoji: "🍽️" },
      { title: "Spa Facial", emoji: "🧖‍♀️" },
      { title: "Massagem Relaxante", emoji: "💆‍♀️" },
      { title: "Reflexologia", emoji: "🦶" },
      { title: "Nutricionista", emoji: "🥗" },
      { title: "Espaço Fotográfico Instagramável", emoji: "📸" },
    ],
  },

  evaluation: {
    sectionTitle: "Compartilhe sua experiência",
    question: "O que você achou do nosso evento?",
    commentLabel: "Deseja deixar alguma sugestão ou comentário?",
    commentPlaceholder:
      "Opcional — conte o que mais te marcou, o que podemos melhorar ou qualquer mensagem que queira deixar para nós 💛",
    submitLabel: "Enviar Avaliação",
    successMessage: "Obrigada de coração! 🌸",
    successSubtitle:
      "Sua avaliação foi recebida. Ela nos inspira a criar encontros ainda mais especiais.",
    errorMessage: "Não foi possível enviar. Verifique sua conexão e tente novamente.",
    ratingOptions: [
      { value: 0, label: "Muito Ruim", emoji: "😞" },
      { value: 1, label: "Ruim", emoji: "😕" },
      { value: 2, label: "Regular", emoji: "😐" },
      { value: 3, label: "Bom", emoji: "🙂" },
      { value: 4, label: "Muito Bom", emoji: "😊" },
      { value: 5, label: "Excelente", emoji: "🤩" },
    ],
  },

  footer: {
    brandName: "Mulheres Primeiro Lugar",
    tagline: "Criado por mulheres. Para mulheres.",
    closingMessage:
      "Gratidão por fazer parte desse encontro. Você é a razão de tudo isso existir. Até a próxima! 💕",
    contactEmail: "contato@mulheresprimeiralugar.com.br",
    socialLinks: [
      { label: "Instagram", href: "https://instagram.com/mulheresprimeiralugar", icon: "📸" },
      { label: "WhatsApp", href: "https://wa.me/5500000000000", icon: "💬" },
    ],
    copyright: `© ${new Date().getFullYear()} Mulheres Primeiro Lugar. Todos os direitos reservados.`,
  },
};
