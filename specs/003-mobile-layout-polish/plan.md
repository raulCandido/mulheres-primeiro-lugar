# Implementation Plan: Refinamento Visual e UX Mobile-First

**Branch**: `003-mobile-layout-polish` | **Date**: 2026-05-16 | **Spec**: [spec.md](./spec.md)

## Summary

Refinamento visual e de espaçamento da landing page para experiência mobile-first: remoção total de emojis, aumento de margens e paddings em todos os elementos interativos e de conteúdo, e substituição de emojis por alternativas tipográficas ou SVG inline — sem alterações na lógica de negócio ou no fluxo de submissão do formulário.

## Technical Context

**Language/Version**: TypeScript strict, Next.js 14.x App Router

**Primary Dependencies**: React 19.x, Tailwind CSS 4.x (CSS-first), NextUI 2.6.x, Framer Motion 12.x

**Storage**: N/A

**Testing**: Inspeção visual em viewport mobile (360px–430px) + `npm run ts-check && npm run lint`

**Target Platform**: Web mobile-first (360px–430px primário; 768px+ secundário)

**Project Type**: Landing page (web application)

**Performance Goals**: Sem impacto — alterações são puramente de classes CSS e remoção de strings

**Constraints**: Sem novas dependências. Sem alterações na lógica de Server Action ou integração com Resend.

**Scale/Scope**: 5 seções, ~7 arquivos modificados

## Constitution Check

| Gate | Status | Observação |
|---|---|---|
| Sem CSS-in-JS | ✅ | Apenas Tailwind CSS |
| Sem novas dependências além da constitution | ✅ | SVG inline sem biblioteca |
| Preferir server components | ✅ | Nenhum novo `'use client'` adicionado |
| Código em inglês, docs em pt-BR | ✅ | Mantido |
| Acessibilidade WCAG 2.1 AA | ✅ | Remoção de emojis melhora acessibilidade (aria-hidden mantido onde necessário) |
| Conteúdo estático em `src/lib/content.ts` | ✅ | Textos continuam centralizados |

Sem violações. Nenhuma entrada em Complexity Tracking necessária.

## Project Structure

### Documentação (esta feature)

```text
specs/003-mobile-layout-polish/
├── plan.md          ← este arquivo
├── research.md      ← decisões de design
├── data-model.md    ← alterações de interfaces TypeScript
└── tasks.md         ← gerado por /speckit-tasks
```

### Arquivos modificados (repositório)

```text
src/
├── lib/
│   └── content.ts                              ← remover campos emoji/icon; limpar strings
├── components/
│   ├── hero/
│   │   └── hero-content.tsx                   ← aumentar padding do botão CTA
│   ├── about/
│   │   └── about-content.tsx                  ← ajuste de padding lateral mobile
│   ├── experiences/
│   │   ├── experiences-content.tsx            ← ajuste de padding lateral mobile
│   │   └── experience-card.tsx                ← remover emoji, card tipográfico
│   ├── evaluation/
│   │   ├── evaluation-content.tsx             ← ajuste de padding lateral e vertical
│   │   └── evaluation-form.tsx                ← remover emojis, aumentar botões, substituir ícone sucesso
│   └── footer/
│       └── footer-content.tsx                 ← remover emojis, ajuste de espaçamento
```

## Plano de implementação detalhado

### Fase A — Limpeza de dados (`src/lib/content.ts`)

**A1** — Remover campos `emoji` das interfaces `RatingOption` e `ExperienceCard`, e `icon` de `SocialLink`.

**A2** — Remover todos os valores `emoji` dos `ratingOptions` (6 itens).

**A3** — Remover todos os valores `emoji` dos `experiences.items` (15 itens).

**A4** — Remover campos `icon` dos `socialLinks` (2 itens).

**A5** — Limpar emojis dos campos de texto:
- `commentPlaceholder`: remover `💛`
- `successMessage`: remover `🌸` → `"Obrigada de coração!"`
- `closingMessage`: remover `💕` → `"...Até a próxima!"`

---

### Fase B — Hero (`hero-content.tsx`)

**B1** — Aumentar padding do botão CTA: `px-10 py-4` → `px-12 py-5`

**B2** — Garantir margem lateral do container: `px-6` permanece (já adequado), mas adicionar `sm:px-8` para telas maiores.

---

### Fase C — About (`about-content.tsx`)

**C1** — Padding lateral: verificar e manter `px-6`. Sem alterações necessárias — seção já tem boa respiração.

---

### Fase D — Experiences (`experiences-content.tsx` + `experience-card.tsx`)

**D1** (`experiences-content.tsx`) — Padding lateral: `px-6` → `px-5 sm:px-6`. Margem inferior do header: `mb-16` → `mb-12` (mais compacto em mobile).

**D2** (`experience-card.tsx`) — Remover o `<span>` de emoji. Remover prop `emoji` da desestruturação. Card passa a ser tipográfico: título em destaque + speaker abaixo. Ajustar padding interno: `p-5` → `p-4 sm:p-5`.

---

### Fase E — Evaluation (`evaluation-content.tsx` + `evaluation-form.tsx`)

**E1** (`evaluation-content.tsx`) — Padding lateral: `px-6` → `px-5 sm:px-6`. Espaçamento vertical da seção: `py-24` → `py-20 sm:py-24`.

**E2** (`evaluation-form.tsx`) — Substituir emojis dos botões de rating:
- Remover `<span className="text-2xl">{opt.emoji}</span>`
- Substituir por `<span className="text-xl font-bold text-nude/80">{opt.value}</span>` quando não selecionado
- Quando selecionado: `className="text-xl font-bold text-gold"`
- Aumentar tamanho dos botões: `w-20 py-3` → `w-20 py-4`
- Aumentar gap entre botões: `gap-3` → `gap-3 sm:gap-4`

**E3** (`evaluation-form.tsx`) — Substituir emoji de sucesso (🌸):
- Remover o `<motion.span>` com `🌸`
- Substituir por SVG inline de checkmark em círculo com animação Framer Motion existente

**E4** (`evaluation-form.tsx`) — Aumentar padding do botão submit: `py-4` → `py-5`

**E5** (`evaluation-form.tsx`) — Padding do card do formulário: `p-8 md:p-10` → `p-7 sm:p-8 md:p-10`

---

### Fase F — Footer (`footer-content.tsx`)

**F1** — Remover `<span aria-hidden="true">{link.icon}</span>` dos links sociais.

**F2** — Remover `📧` inline do link de e-mail.

**F3** — Ajustar padding: `py-16 px-6` → `py-16 px-5 sm:px-6`.

---

## Ordem de execução recomendada

```
A (content.ts) → B (hero) → C (about) → D (experiences) → E (evaluation) → F (footer)
```

Executar `npm run ts-check` após a fase A para garantir que nenhum componente referencia campos removidos antes de prosseguir para as fases B–F.

## Critérios de conclusão

- `npm run ts-check` passa sem erros
- `npm run lint` passa sem warnings
- Inspeção visual em viewport 375px (iPhone SE): sem conteúdo encostado nas bordas, botões com área de toque confortável, zero emojis visíveis
- Inspeção visual em viewport 768px+: sem regressão de layout
