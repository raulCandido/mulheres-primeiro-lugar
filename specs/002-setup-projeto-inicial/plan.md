# Implementation Plan: Estrutura Inicial do Projeto

**Branch**: `002-setup-projeto-inicial` | **Date**: 2026-05-16 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/002-setup-projeto-inicial/spec.md`

## Summary

Inicializar o projeto Next.js 14 (App Router + TypeScript strict) com Tailwind CSS v4 CSS-first, NextUI, Framer Motion e React Toastify. Criar a estrutura de pastas completa (`app/`, `components/`, `features/`, `lib/`) com shells de todas as 6 seções da landing page, conteúdo estático tipado em `content.ts`, providers globais, layout raiz com metadados SEO (Playfair Display + Inter via next/font) e dark mode automático via `prefers-color-scheme`.

## Technical Context

**Language/Version**: TypeScript 6.x (strict mode)

**Primary Dependencies**: Next.js 14.x (App Router), React 19.x, Tailwind CSS 4.x, @nextui-org/react 2.6.x, Framer Motion 12.x, React Toastify 11.x

**Storage**: N/A — conteúdo estático em `src/lib/content.ts`; sem banco de dados

**Testing**: `npm run ts-check && npm run lint` — zero erros como critério de aceite

**Target Platform**: Vercel (plano gratuito), web browsers, mobile-first

**Project Type**: web-application (landing page, single-page, single-route)

**Performance Goals**: Dev server carrega em menos de 5 segundos; build de produção em menos de 3 minutos

**Constraints**: Vercel free tier, WCAG 2.1 AA desde a estrutura inicial, sem banco de dados, sem autenticação

**Scale/Scope**: Single landing page — 1 rota `/`, 6 seções, 1 formulário (feature futura)

## Constitution Check

| Gate | Status | Observação |
|------|--------|------------|
| Stack tecnológica (versões exatas) | ✅ PASSA | Next.js 14.x, React 19.x, TS 6.x, Tailwind 4.x, NextUI 2.6.x, Framer Motion 12.x, Toastify 11.x |
| Arquitetura page → content → form | ✅ PASSA | page.tsx minimalista, shells em *-content.tsx, sem form nesta feature |
| Dados estáticos em lib/content.ts | ✅ PASSA | Tipos definidos em data-model.md, nenhuma string inline em componentes |
| Nomenclatura kebab-case/PascalCase | ✅ PASSA | Todos os arquivos e componentes seguem a convenção |
| Imports via alias @/ | ✅ PASSA | Configurado no create-next-app |
| Tailwind v4 CSS-first (sem tailwind.config.ts) | ✅ PASSA | postcss.config.mjs + @import "tailwindcss" em globals.css |
| Fontes via next/font | ✅ PASSA | Playfair Display + Inter carregadas em layout.tsx |
| Dark mode via CSS (prefers-color-scheme) | ✅ PASSA | Media query em globals.css, sem JS |
| WCAG 2.1 AA | ✅ PASSA | Marcação semântica (section, h1, aria-label) nos shells |
| SEO via Metadata API (sem libs externas) | ✅ PASSA | Export `metadata` em layout.tsx |
| Deploy na Vercel | ✅ PASSA | Push na main aciona deploy automático |
| Fora do escopo respeitado | ✅ PASSA | Sem auth, DB, CMS, formulário funcional nesta feature |

**Resultado**: Todos os gates passam. Sem violações.

## Project Structure

### Documentation (this feature)

```text
specs/002-setup-projeto-inicial/
├── plan.md              # Este arquivo
├── research.md          # Decisões técnicas e racionais
├── data-model.md        # Tipos TypeScript de content.ts
├── quickstart.md        # Guia passo-a-passo de setup
└── checklists/
    └── requirements.md  # Checklist de qualidade da spec
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── layout.tsx          # Layout raiz: fontes, providers, metadata
│   ├── page.tsx            # Rota / — empilha as 6 seções em ordem canônica
│   ├── globals.css         # Tailwind v4 CSS-first + variáveis CSS + dark mode
│   └── providers.tsx       # NextUIProvider + ToastContainer ("use client")
├── components/
│   ├── hero/
│   │   ├── hero-content.tsx
│   │   └── index.ts
│   ├── about/
│   │   ├── about-content.tsx
│   │   └── index.ts
│   ├── features/
│   │   ├── features-content.tsx
│   │   └── index.ts
│   ├── testimonials/
│   │   ├── testimonials-content.tsx
│   │   └── index.ts
│   ├── cta/
│   │   ├── cta-content.tsx
│   │   └── index.ts
│   └── footer/
│       ├── footer-content.tsx
│       └── index.ts
├── features/
│   └── cta/
│       └── index.ts        # Placeholder — Server Action implementada na feature 001
└── lib/
    └── content.ts          # SiteContent tipado com dados placeholder em pt-BR

public/
└── og-image.png            # Imagem placeholder 1200×630 para og:image

.env.local                  # NEXT_PUBLIC_SITE_URL (RESEND_API_KEY na feature 001)
postcss.config.mjs          # Plugin Tailwind v4
```

**Structure Decision**: Single-project (opção padrão). Projeto Next.js monolítico com src/ conforme constituição. Backend (Server Actions) coexiste com frontend no mesmo projeto — padrão do App Router.
