# Quickstart: Estrutura Inicial do Projeto

**Feature**: 002-setup-projeto-inicial
**Data**: 2026-05-16

## Pré-requisitos

- Node.js 20.x ou superior
- npm 10.x ou superior
- Conta na Vercel (deploy automático)

---

## Passo 1 — Inicializar o projeto Next.js

```bash
npx create-next-app@14 . \
  --typescript \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --no-tailwind \
  --no-eslint
```

> Usamos `--no-tailwind` porque o CLI instala Tailwind v3 por padrão; instalaremos v4 manualmente.

---

## Passo 2 — Instalar dependências

```bash
npm install \
  tailwindcss@4 \
  @tailwindcss/postcss \
  @nextui-org/react \
  framer-motion@12 \
  react-toastify@11 \
  resend
```

---

## Passo 3 — Configurar Tailwind CSS v4

Criar `postcss.config.mjs`:
```js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

Substituir `src/app/globals.css`:
```css
@import "tailwindcss";

@theme {
  --font-sans: var(--font-inter);
  --font-serif: var(--font-playfair);
}

:root {
  --background: #ffffff;
  --foreground: #171717;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: var(--font-sans);
}
```

---

## Passo 4 — Configurar fontes e layout raiz

`src/app/layout.tsx`:
```tsx
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Mulheres Primeiro Lugar",
  description: "Plataforma de apoio e empoderamento feminino.",
  openGraph: {
    title: "Mulheres Primeiro Lugar",
    description: "Plataforma de apoio e empoderamento feminino.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${playfair.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

---

## Passo 5 — Configurar Providers

`src/app/providers.tsx`:
```tsx
"use client";
import { NextUIProvider } from "@nextui-org/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      {children}
      <ToastContainer position="bottom-right" />
    </NextUIProvider>
  );
}
```

---

## Passo 6 — Criar conteúdo estático tipado

`src/lib/content.ts` — ver `data-model.md` para a estrutura completa de tipos e dados placeholder.

---

## Passo 7 — Criar componentes shell das seções

Para cada seção (`hero`, `about`, `features`, `testimonials`, `cta`, `footer`):

```
src/components/[secao]/
├── [secao]-content.tsx   # Server component com heading + área delimitada
└── index.ts              # Barrel export
```

Exemplo de shell (`hero-content.tsx`):
```tsx
import { content } from "@/lib/content";

export function HeroContent() {
  return (
    <section aria-label="Hero">
      <h1>{content.hero.title}</h1>
      <p>{content.hero.description}</p>
    </section>
  );
}
```

---

## Passo 8 — Montar a página inicial

`src/app/page.tsx`:
```tsx
import { HeroContent } from "@/components/hero";
import { AboutContent } from "@/components/about";
import { FeaturesContent } from "@/components/features";
import { TestimonialsContent } from "@/components/testimonials";
import { CtaContent } from "@/components/cta";
import { FooterContent } from "@/components/footer";

export default function HomePage() {
  return (
    <main>
      <HeroContent />
      <AboutContent />
      <FeaturesContent />
      <TestimonialsContent />
      <CtaContent />
      <FooterContent />
    </main>
  );
}
```

---

## Passo 9 — Adicionar og:image placeholder

Criar ou copiar uma imagem 1200×630 para `public/og-image.png`. Pode ser gerada com qualquer editor ou ferramenta online.

---

## Passo 10 — Variáveis de ambiente

Criar `.env.local`:
```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
# RESEND_API_KEY=re_...   # Necessário apenas para a feature do formulário CTA
```

---

## Validação

```bash
npm run ts-check && npm run lint   # Zero erros esperados
npm run build                      # Build de produção sem erros
npm run dev                        # Servidor de desenvolvimento
```

---

## Deploy na Vercel

1. Push para a branch `main`
2. Vercel detecta automaticamente o projeto Next.js
3. Configurar `NEXT_PUBLIC_SITE_URL` no painel da Vercel
4. `RESEND_API_KEY` será adicionada quando a feature do formulário for implementada
