# Data Model: Estrutura Inicial do Projeto

**Feature**: 002-setup-projeto-inicial
**Data**: 2026-05-16

## Visão geral

Esta feature não envolve banco de dados ou estado persistido. O "modelo de dados" é a estrutura de tipos TypeScript que define o conteúdo estático da landing page em `src/lib/content.ts`.

---

## Entidade: SectionContent (base)

Tipo base compartilhado por todas as seções.

```ts
interface SectionContent {
  title: string;        // Heading principal da seção
  description: string;  // Texto de apoio/subtítulo
}
```

---

## Entidade: HeroContent

```ts
interface HeroContent extends SectionContent {
  cta: string;         // Texto do botão de call-to-action
  subtitle?: string;   // Linha adicional abaixo do título (opcional)
}
```

---

## Entidade: AboutContent

```ts
interface AboutContent extends SectionContent {
  highlights: string[];  // Lista de pontos-chave (bullets)
}
```

---

## Entidade: FeaturesContent

```ts
interface FeatureItem {
  title: string;
  description: string;
}

interface FeaturesContent extends SectionContent {
  items: FeatureItem[];  // Lista de benefícios/funcionalidades
}
```

---

## Entidade: TestimonialsContent

```ts
interface Testimonial {
  name: string;
  role?: string;
  quote: string;
}

interface TestimonialsContent extends SectionContent {
  items: Testimonial[];
}
```

---

## Entidade: CtaContent

```ts
interface CtaContent extends SectionContent {
  buttonLabel: string;          // Texto do botão principal
  fields: {
    nameLabel: string;          // Label do campo nome
    contactLabel: string;       // Label do campo e-mail/telefone
    commentLabel: string;       // Label do campo comentário (opcional)
    namePlaceholder: string;
    contactPlaceholder: string;
    commentPlaceholder: string;
  };
  successMessage: string;       // Mensagem pós-envio
}
```

---

## Entidade: FooterContent

```ts
interface FooterContent {
  copyright: string;
  links?: { label: string; href: string }[];
}
```

---

## Entidade: SiteContent (raiz)

Tipo exportado por `src/lib/content.ts`.

```ts
export interface SiteContent {
  hero: HeroContent;
  about: AboutContent;
  features: FeaturesContent;
  testimonials: TestimonialsContent;
  cta: CtaContent;
  footer: FooterContent;
}

export const content: SiteContent = { /* ... dados placeholder ... */ };
```

---

## Entidade: Metadados SEO

Não é um tipo customizado — usa `Metadata` do Next.js diretamente em `src/app/layout.tsx`.

Campos obrigatórios nesta feature:
- `title`: string
- `description`: string
- `openGraph.title`: string
- `openGraph.description`: string
- `openGraph.images`: `[{ url: "/og-image.png", width: 1200, height: 630 }]`
- `metadataBase`: URL da Vercel (configurada via `process.env.NEXT_PUBLIC_SITE_URL`)

---

## Regras de validação

- Nenhum componente deve conter string de conteúdo inline — todo texto vem de `content`
- Todos os campos de `SiteContent` são obrigatórios exceto onde marcados com `?`
- O arquivo `content.ts` exporta uma única constante `content` do tipo `SiteContent`
- Conteúdo placeholder deve ser em português (pt-BR) e representativo (não lorem ipsum genérico)
