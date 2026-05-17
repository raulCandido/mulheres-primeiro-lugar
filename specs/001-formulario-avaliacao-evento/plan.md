# Implementation Plan: Landing Page — Mulheres Primeiro Lugar

**Branch**: `001-formulario-avaliacao-evento` | **Date**: 2026-05-16 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/001-formulario-avaliacao-evento/spec.md`

## Summary

Redesign completo da landing page existente para celebrar o evento "Mulheres Primeiro Lugar" (já realizado) e coletar feedback pós-evento das participantes. A página apresenta hero emocional, seção "Sobre o Evento", 15 cards de experiências com animações scroll-triggered e um formulário de avaliação com nota 0–5 + comentário opcional. O formulário é processado via Server Action que envia o resultado por e-mail via Resend, com proteção honeypot. A identidade visual é premium: glassmorphism, gradientes, rosa queimado / nude / dourado / vinho / preto sofisticado.

## Technical Context

**Language/Version**: TypeScript 6.x (strict mode)

**Primary Dependencies**: Next.js 14.x (App Router), React 19.x, NextUI 2.6.x, Tailwind CSS 4.x (CSS-first), Framer Motion 12.x, React Toastify 11.x, Resend (e-mail)

**Storage**: N/A — sem banco de dados; dados enviados por e-mail via Resend

**Testing**: N/A — projeto sem suite de testes configurada nesta versão

**Target Platform**: Web — mobile-first, Vercel (plano gratuito)

**Project Type**: Landing page (web application estática com Server Action)

**Performance Goals**: Carregamento do conteúdo principal em < 3 s em 4G; confirmação de envio em < 3 s após clique

**Constraints**: Sem banco de dados, sem autenticação, sem CMS; hospedagem no plano gratuito da Vercel; `RESEND_API_KEY` configurada via variável de ambiente

**Scale/Scope**: Evento único, público-alvo pequeno (participantes do evento); sem requisito de escalabilidade horizontal

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Princípio | Status | Observação |
|-----------|--------|------------|
| Três camadas: page → content → form | ✅ Pass | Todos os componentes seguirão o padrão |
| Server components por padrão | ✅ Pass | Apenas `evaluation-form.tsx` usará `"use client"` |
| Conteúdo estático em `content.ts` | ✅ Pass | Todos os textos e dados em `src/lib/content.ts` |
| Tailwind + NextUI, sem CSS-in-JS | ✅ Pass | Glassmorphism via utilitários Tailwind |
| Mobile-first, responsivo | ✅ Pass | Requisito P1 do spec |
| WCAG 2.1 AA | ⚠️ Ajuste | Spec assumia dispensa; **constituição tem precedência** — WCAG 2.1 AA se aplica |
| SEO via Next.js Metadata | ✅ Pass | `metadata` exportado de `layout.tsx` |
| Sem banco de dados | ✅ Pass | Apenas e-mail via Resend |
| Sem autenticação | ✅ Pass | Formulário público sem login |

**Resultado**: APROVADO — nenhum gate bloqueante. O conflito WCAG foi resolvido em favor da constituição.

## Project Structure

### Documentation (this feature)

```text
specs/001-formulario-avaliacao-evento/
├── plan.md              # Este arquivo
├── research.md          # Decisões técnicas e paleta de cores
├── data-model.md        # Entidades e contratos de dados
├── contracts/
│   └── server-actions.md  # Contrato da Server Action submitEvaluation
├── quickstart.md        # Setup e guia de desenvolvimento
└── tasks.md             # Gerado por /speckit-tasks (não criado aqui)
```

### Source Code

```text
src/
├── app/
│   ├── layout.tsx              # atualizar: metadados SEO, fontes Playfair Display + Inter
│   ├── page.tsx                # atualizar: compor novas seções (remover features/testimonials/cta)
│   ├── globals.css             # atualizar: paleta de cores, glassmorphism, scroll-behavior
│   └── providers.tsx           # sem alteração
├── components/
│   ├── hero/
│   │   ├── index.ts            # atualizar barrel export
│   │   └── hero-content.tsx    # reescrever: headline celebratória, subtítulo acolhedor, CTA
│   ├── about/
│   │   ├── index.ts            # sem alteração
│   │   └── about-content.tsx   # reescrever: descrição pós-evento do encontro feminino
│   ├── experiences/            # novo domínio (substitui features/)
│   │   ├── index.ts
│   │   ├── experiences-content.tsx  # grid de cards, título da seção
│   │   └── experience-card.tsx      # card individual com hover + animação
│   ├── evaluation/             # novo domínio (substitui cta/)
│   │   ├── index.ts
│   │   ├── evaluation-content.tsx   # seção do formulário, server component wrapper
│   │   └── evaluation-form.tsx      # "use client" — estado do formulário, rating, envio
│   └── footer/
│       ├── index.ts            # sem alteração
│       └── footer-content.tsx  # reescrever: redes sociais, contato, mensagem de encerramento
├── features/
│   └── evaluation/             # novo domínio (substitui cta/)
│       ├── index.ts
│       └── submit-evaluation.ts  # "use server" — validação honeypot, envio Resend
└── lib/
    └── content.ts              # reescrever completamente: novas interfaces e dados

# Removidos:
# src/components/features/       → substituído por experiences/
# src/components/testimonials/   → fora do escopo do spec
# src/components/cta/            → substituído por evaluation/
# src/features/cta/              → substituído por features/evaluation/
```

**Structure Decision**: Single-project, App Router. A estrutura segue o padrão da constituição com domínios de componentes isolados. Os domínios `features/`, `testimonials/` e `cta/` existentes são removidos pois não constam no spec e seriam código morto após o redesign.

## Complexity Tracking

| Violação | Por que necessária | Alternativa mais simples rejeitada porque |
|----------|-------------------|------------------------------------------|
| WCAG 2.1 AA (conflito com spec) | Constituição tem precedência sobre assumptions do spec | A assumption do spec foi um erro — a constituição define o padrão mínimo irrevogável |
