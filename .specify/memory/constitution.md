# Mulheres Primeiro Lugar — Constituição

## Stack tecnológica

| Pacote | Versão |
|---|---|
| Next.js (App Router) | 14.x |
| React | 19.x |
| TypeScript | 6.x (strict mode) |
| Tailwind CSS | 4.x |
| @nextui-org/react | 2.6.x |
| Framer Motion | 12.x |
| React Toastify | 11.x |

- Hospedagem: Vercel (plano gratuito)
- Gerenciador de pacotes: npm
- Sem banco de dados.
- Envio de e-mail via **Resend** (Server Action no CTA).

> **Tailwind CSS v4**: configuração CSS-first — não há `tailwind.config.ts`. Customizações via `@import "tailwindcss"` e variáveis CSS nativas em `globals.css`.

## I. Idiomas

- **Documentação** (comentários, READMEs, mensagens de commit, specs, planos): **português (pt-BR)**
- **Código** (variáveis, funções, componentes, arquivos, branches): **inglês (en-US)**

## II. Arquitetura de componentes

Cada página é composta por três camadas:

- **Page component** (`src/app/*/page.tsx`): minimalista, apenas importa e retorna o content component correspondente.
- **Content component** (`*-content.tsx`): estrutura visual e layout da seção ou página. Pode ser server ou client component.
- **Form component** (`*-form.tsx`): sempre `"use client"`, gerencia estado local com `useState`.

Preferir server components por padrão. Usar `'use client'` somente quando necessário (APIs do browser, event handlers).

## III. Estrutura da landing page

A página raiz (`src/app/page.tsx`) empilha seções nesta ordem:

```
Hero → About → Features/Benefits → Testimonials → CTA → Footer
```

Cada seção é um componente `*-content.tsx` isolado em `src/components/`. Seções recebem apenas as props que exibem — sem estado compartilhado entre elas.

O CTA é um formulário de captura de contato com campos de nome, contato (e-mail ou telefone) e nota/opinião relacionada a um evento. Processado via Server Action em `src/features/`.

## IV. Dados estáticos

Textos, depoimentos e conteúdos ficam em `src/lib/content.ts` como objetos e arrays tipados. Componentes importam desse arquivo — nunca hardcodam strings inline.

## V. Nomenclatura

- Arquivos e pastas: `kebab-case` (`hero-content.tsx`, `cta-section.tsx`)
- Componentes React: `PascalCase` (`HeroContent`, `CtaSection`)
- Funções e variáveis: `camelCase`
- Cada pasta de `components/` tem um `index.ts` com barrel export.

## VI. Imports

- Alias `@/` para todas as importações internas: `import { HeroContent } from "@/components/hero"`
- Usar barrel exports: `import { HeroContent, HeroCta } from "@/components/hero"`

## VII. Estilização

- Tailwind CSS para utilitários; NextUI para componentes prontos.
- Sem CSS-in-JS.
- Imagens via `<Image>` do `next/image`.
- Fontes via `next/font` (Google Fonts) em `src/app/layout.tsx`.
- Dark mode configurado via classe CSS em `globals.css`.

## VIII. Acessibilidade

Padrão mínimo: **WCAG 2.1 nível AA**. Aplicar em todos os componentes: contraste de cores, navegação por teclado, atributos `aria-*`, textos alternativos em imagens.

## IX. SEO

Usar exclusivamente a API nativa `Metadata` do Next.js — sem bibliotecas SEO de terceiros. Exportar `metadata` de `src/app/layout.tsx` (global) ou de `src/app/page.tsx` (por página).

## X. Deploy

Deploy automático na Vercel a cada push na branch `main`. Variáveis de ambiente configuradas no painel da Vercel: `process.env.NEXT_PUBLIC_*` para client-side, `process.env.*` para server-side.

## XI. Fora do escopo

Qualquer funcionalidade dinâmica além do formulário CTA está explicitamente fora do escopo: autenticação, área de membros, CMS, blog, painel administrativo, notificações em tempo real, pagamentos e integrações com plataformas externas de terceiros. Novas features dinâmicas exigem alteração desta constituição.

## Governança

Esta constituição tem precedência sobre qualquer outra convenção. Alterações exigem justificativa explícita e atualização deste documento.

**Versão**: 1.0.0 | **Ratificada**: 2026-05-16 | **Última alteração**: 2026-05-16

## Clarificações

### Sessão 2026-05-16

- Q: Qual versão do Next.js usar? → A: 14.x
- Q: O que o CTA deve fazer? → A: Formulário de captura de contato com nota/opinião relacionada a um evento
- Q: Destino dos dados do formulário? → A: E-mail via Resend (Server Action)
- Q: Padrão de acessibilidade? → A: WCAG 2.1 nível AA
- Q: O que está fora do escopo? → A: Qualquer funcionalidade dinâmica além do formulário CTA
