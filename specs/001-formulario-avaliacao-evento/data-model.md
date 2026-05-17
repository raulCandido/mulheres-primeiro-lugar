# Data Model: Landing Page — Mulheres Primeiro Lugar

**Feature**: `001-formulario-avaliacao-evento` | **Date**: 2026-05-16

## Entidades

### EvaluationSubmission

Dados enviados pela participante ao submeter o formulário.

| Campo | Tipo | Obrigatório | Regras de validação |
|-------|------|-------------|---------------------|
| `rating` | `0 \| 1 \| 2 \| 3 \| 4 \| 5` | Sim | Inteiro entre 0 e 5 inclusive |
| `comment` | `string` | Não | Máximo 1000 caracteres; string vazia é tratada como ausente |
| `submittedAt` | `Date` | Sim (gerado pelo servidor) | Gerado no momento do processamento; fuso horário América/São_Paulo |
| `_trap` | `string` | Sim (honeypot) | DEVE ser string vazia; qualquer valor não-vazio rejeita silenciosamente o envio |

**Estado de ciclo de vida**: O formulário existe em três estados UI — `idle` (aguardando), `submitting` (enviando), `success` (agradecimento exibido) e `error` (falha com retry). Não há persistência além do e-mail enviado.

---

### RatingOption

Configuração das 6 opções de avaliação. Dados estáticos em `src/lib/content.ts`.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `value` | `0 \| 1 \| 2 \| 3 \| 4 \| 5` | Valor numérico da nota |
| `label` | `string` | Descrição textual (ex: "Excelente") |
| `emoji` | `string` | Representação emoji (ex: "🤩") |

**Valores canônicos**:

| value | label | emoji |
|-------|-------|-------|
| 0 | Muito Ruim | 😞 |
| 1 | Ruim | 😕 |
| 2 | Regular | 😐 |
| 3 | Bom | 🙂 |
| 4 | Muito Bom | 😊 |
| 5 | Excelente | 🤩 |

---

### ExperienceCard

Um dos 15 cards de experiências do evento. Dados estáticos em `src/lib/content.ts`.

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `title` | `string` | Sim | Nome da experiência |
| `speaker` | `string` | Não | Nome da profissional responsável (quando aplicável) |
| `emoji` | `string` | Sim | Emoji representativo da experiência |

**Instâncias definidas**:

| title | speaker | emoji |
|-------|---------|-------|
| Palestra de Sexologia | Brenda Genes | 🎤 |
| Massagem Tântrica Terapêutica | Nayade Benicio | 🌸 |
| Defesa Pessoal Feminina | Analia Oliveira | 🥊 |
| Pole Dance Experience | Pilar Fernandez | 💃 |
| Feira Empreendedora Feminina | — | 🛍️ |
| Serviços de Beleza | — | 💄 |
| Bartender & Drinks | — | 🍹 |
| Epilação e Estética | — | ✨ |
| Espaço de Tatuagem | — | 🖋️ |
| Refeições no Local | — | 🍽️ |
| Spa Facial | — | 🧖‍♀️ |
| Massagem Relaxante | — | 💆‍♀️ |
| Reflexologia | — | 🦶 |
| Nutricionista | — | 🥗 |
| Espaço Fotográfico Instagramável | — | 📸 |

---

### SocialLink

Links de redes sociais do evento no rodapé. Dados estáticos em `src/lib/content.ts`.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `label` | `string` | Nome da rede social |
| `href` | `string` | URL completa do perfil |
| `icon` | `string` | Emoji representativo |

---

## Estrutura do `content.ts` (interfaces tipadas)

```typescript
interface RatingOption {
  value: 0 | 1 | 2 | 3 | 4 | 5;
  label: string;
  emoji: string;
}

interface ExperienceCard {
  title: string;
  speaker?: string;
  emoji: string;
}

interface SocialLink {
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
  title: string;
  question: string;
  commentPlaceholder: string;
  submitLabel: string;
  successMessage: string;
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
```

---

## Resultado do Server Action

```typescript
type ActionResult =
  | { success: true }
  | { success: false; error: string };
```

O campo `error` contém mensagem amigável em português para exibição na UI — nunca detalhes técnicos internos.
