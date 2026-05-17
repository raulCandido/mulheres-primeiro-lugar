# Tasks: Estrutura Inicial do Projeto

**Input**: Design documents from `specs/002-setup-projeto-inicial/`

**Prerequisites**: plan.md ✅ | spec.md ✅ | research.md ✅ | data-model.md ✅ | quickstart.md ✅

**Testes**: Não solicitados — validação via `ts-check`, `lint` e verificação manual no browser.

**Organização**: Tasks agrupadas por user story para permitir implementação e teste independentes.

## Formato: `[ID] [P?] [Story?] Descrição com caminho de arquivo`

- **[P]**: Pode rodar em paralelo (arquivos diferentes, sem dependências incompletas)
- **[Story]**: A qual user story a task pertence (US1, US2, US3, US4)

---

## Phase 1: Setup (Infraestrutura compartilhada)

**Objetivo**: Inicializar o projeto e instalar todas as dependências

- [X] T001 Inicializar projeto Next.js 14 na raiz via `npx create-next-app@14 . --typescript --app --src-dir --import-alias "@/*" --no-tailwind --yes`
- [X] T001b Atualizar para React 19.x e TypeScript mais recente (create-next-app@14 instala React 18 e TS 5 por padrão; a constitution exige React 19): `npm install react@19 react-dom@19 @types/react@19 @types/react-dom@19 typescript@latest`
- [X] T002 [P] Instalar dependências adicionais: `npm install tailwindcss@4 @tailwindcss/postcss @nextui-org/react framer-motion@12 react-toastify@11 resend`
- [X] T003 [P] Criar `postcss.config.mjs` com plugin `@tailwindcss/postcss` conforme research.md §2
- [X] T004 [P] Criar `.env.local` com `NEXT_PUBLIC_SITE_URL=http://localhost:3000`

> **Por que React 19**: `@nextui-org/react` v2.6.x usa a API de context do React 19 (`<Context value={...}>` como provider direto). Com React 18, isso causa falha silenciosa no build de produção (static generation falha com "Element type is invalid"). React 19 resolve isso nativamente.

---

## Phase 2: Foundational (Pré-requisitos bloqueantes)

**Objetivo**: Base técnica que DEVE estar completa antes de qualquer user story

**⚠️ CRÍTICO**: Nenhuma seção pode ser criada antes desta fase estar completa

- [X] T005 [P] Substituir `src/app/globals.css`: `@import "tailwindcss"`, bloco `@theme` com variáveis de fonte (`--font-sans`, `--font-serif`), variáveis CSS `:root` para background/foreground, media query `prefers-color-scheme: dark` conforme research.md §2
- [X] T006 [P] Criar `src/app/providers.tsx`: `"use client"`, `<NextUIProvider>` wrapping children + `<ToastContainer position="bottom-right" />` com import do CSS do Toastify conforme research.md §3 e §4
- [X] T007 Atualizar `src/app/layout.tsx`: importar `Inter` e `Playfair_Display` via `next/font/google`, exportar `const metadata: Metadata` com title, description, openGraph (og:image apontando para `/og-image.png` 1200×630), envolver `{children}` com `<Providers>` conforme research.md §5 e §7
- [X] T008 [P] Criar `public/og-image.png`: imagem placeholder 1200×630 com cor sólida e texto "Mulheres Primeiro Lugar" (usar editor de imagem ou ferramenta online)
- [X] T009 [P] Criar `src/lib/content.ts`: interfaces `SectionContent`, `HeroContent`, `AboutContent`, `FeaturesContent`, `TestimonialsContent`, `CtaContent`, `FooterContent`, `SiteContent` e exportar `const content: SiteContent` com dados placeholder em pt-BR para todas as 6 seções conforme data-model.md

**Checkpoint**: Providers, layout, fontes, dark mode e conteúdo estático prontos — criação das seções pode começar

---

## Phase 3: User Story 1 — Iniciar o Ambiente de Desenvolvimento (P1) 🎯 MVP

**Objetivo**: `npm run dev` → landing page com 6 seções visíveis na ordem canônica, sem erros no console

**Teste independente**: Executar `npm run dev`, abrir o browser e rolar a página verificando Hero → About → Features/Benefits → Testimonials → CTA → Footer, nessa ordem, sem erros no console

### Implementação para User Story 1

- [X] T010 [P] [US1] Criar `src/components/hero/hero-content.tsx` (server component: `<section aria-label="Hero">`, `<h1>` com `content.hero.title`, `<p>` com `content.hero.description`) e `src/components/hero/index.ts` com named export `HeroContent`
- [X] T011 [P] [US1] Criar `src/components/about/about-content.tsx` (shell com `<section aria-label="Sobre">`, `<h2>`, área de conteúdo) e `src/components/about/index.ts` com named export `AboutContent`
- [X] T012 [P] [US1] Criar `src/components/features/features-content.tsx` (shell com `<section aria-label="Benefícios">`, `<h2>`, lista de itens de `content.features.items`) e `src/components/features/index.ts` com named export `FeaturesContent`
- [X] T013 [P] [US1] Criar `src/components/testimonials/testimonials-content.tsx` (shell com `<section aria-label="Depoimentos">`, `<h2>`, lista de `content.testimonials.items`) e `src/components/testimonials/index.ts` com named export `TestimonialsContent`
- [X] T014 [P] [US1] Criar `src/components/cta/cta-content.tsx` (shell sem formulário funcional: `<section aria-label="Avaliação">`, `<h2>`, botão placeholder) e `src/components/cta/index.ts` com named export `CtaContent`
- [X] T015 [P] [US1] Criar `src/components/footer/footer-content.tsx` (shell com `<footer>`, copyright de `content.footer.copyright`) e `src/components/footer/index.ts` com named export `FooterContent`
- [X] T016 [P] [US1] Criar `src/features/cta/index.ts` como placeholder vazio com comentário indicando que a Server Action será implementada na feature 001-formulario-avaliacao-evento
- [X] T017 [US1] Substituir `src/app/page.tsx`: importar os 6 componentes via `@/components/*`, retornar `<main>` empilhando na ordem canônica: `<HeroContent />` → `<AboutContent />` → `<FeaturesContent />` → `<TestimonialsContent />` → `<CtaContent />` → `<FooterContent />` (depende de T010–T016)

**Checkpoint**: `npm run dev` → landing page abre no browser, 6 seções visíveis na ordem correta, zero erros no console

---

## Phase 4: User Story 2 — Criar Nova Seção Seguindo o Padrão (P1)

**Objetivo**: Estrutura autodocumentada — novos domínios podem ser criados sem configuração adicional

**Teste independente**: Criar `src/components/nova-secao/nova-secao-content.tsx` + `index.ts`, importar via `@/components/nova-secao` em `page.tsx` e verificar que `ts-check` passa sem erros

### Implementação para User Story 2

- [X] T018 [US2] Verificar `tsconfig.json`: confirmar que paths `"@/*": ["./src/*"]` está presente e correto; ajustar se `create-next-app` não tiver gerado
- [X] T019 [US2] Auditar todos os barrel exports em `src/components/*/index.ts`: cada um deve exportar seu componente como named export (`export { HeroContent } from "./hero-content"`) e não como default export

**Checkpoint**: `npm run ts-check` → zero erros; import via `@/components/[dominio]` resolve em todos os domínios

---

## Phase 5: User Story 3 — Build de Produção e Deploy (P1)

**Objetivo**: `npm run build` sem erros; metadados SEO presentes e corretos

**Teste independente**: Executar `npm run build` e verificar saída sem erros; executar `npm run start` e conferir página no browser

### Implementação para User Story 3

- [X] T020 [P] [US3] Confirmar que `public/og-image.png` existe, tem dimensões 1200×630 e está referenciada corretamente em `layout.tsx` (url: `/og-image.png`, width: 1200, height: 630)
- [X] T021 [US3] Executar `npm run build` e corrigir quaisquer erros até build completar com sucesso

**Checkpoint**: `npm run build` → sucesso em menos de 3 minutos; `npm run start` → landing page acessível com metadados SEO visíveis no `<head>`

---

## Phase 6: User Story 4 — Qualidade de Código desde o Início (P2)

**Objetivo**: `npm run ts-check && npm run lint` retorna zero erros e zero avisos

**Teste independente**: Executar os dois comandos em sequência e verificar saída limpa

### Implementação para User Story 4

- [X] T022 [US4] Executar `npm run ts-check` e corrigir todos os erros de tipo até saída limpa (zero erros)
- [X] T023 [P] [US4] Executar `npm run lint` e corrigir todos os erros e avisos até saída limpa (zero warnings)

**Checkpoint**: `npm run ts-check && npm run lint` → saída limpa em ambos os comandos

---

## Phase 7: Polish & Cross-Cutting Concerns

**Objetivo**: Qualidade transversal que afeta todas as seções

- [X] T024 [P] Auditar marcação HTML semântica em todos os 6 shells: cada seção usa `<section>` com `aria-label` descritivo, hierarquia de headings correta (`<h1>` único em Hero, `<h2>` nas demais), `<footer>` no componente footer
- [X] T025 Verificar responsividade mobile-first em DevTools do browser: testar nos breakpoints 320px (mobile), 768px (tablet) e 1280px (desktop) para todas as seções
- [X] T026 [P] Verificar dark mode automático: ativar `prefers-color-scheme: dark` em DevTools e confirmar que fundo e texto alternam corretamente via variáveis CSS definidas em `globals.css`
- [X] T027 Atualizar seção "Plano de implementação ativo" em `CLAUDE.md` após conclusão: marcar feature como concluída e remover ou atualizar o link para o plano

---

## Dependências e Ordem de Execução

### Dependências entre fases

- **Phase 1 (Setup)**: Sem dependências — iniciar imediatamente
- **Phase 2 (Foundational)**: Depende da conclusão da Phase 1 — BLOQUEIA todas as user stories
- **Phase 3 (US1)**: Depende da Phase 2 — MVP mínimo
- **Phase 4 (US2)**: Depende da Phase 3 — valida estrutura criada em US1
- **Phase 5 (US3)**: Pode rodar em paralelo com Phase 4 após Phase 2 (arquivos diferentes)
- **Phase 6 (US4)**: Depende de US1, US2, US3 completas (valida todo o código gerado)
- **Phase 7 (Polish)**: Depende de todas as user stories concluídas

### Dependências internas por fase

- **Phase 1**: T001 → T001b → (T002, T003, T004 em paralelo)
- **Phase 2**: (T005, T006, T008, T009 em paralelo) → T007
- **Phase 3**: (T010–T016 em paralelo) → T017
- **Phase 6**: T022 → T023 (lint após tipos limpos reduz ruído)

### Oportunidades de paralelismo

- Phase 2: T005, T006, T008, T009 — todos arquivos diferentes, sem dependências entre si
- Phase 3: T010 a T016 — cada componente de seção é um arquivo diferente, sem dependências entre si
- Phase 7: T024, T026 — checagens independentes de acessibilidade e dark mode

---

## Exemplo de Paralelismo — Phase 3 (User Story 1)

```bash
# Lançar em paralelo — todos arquivos diferentes:
Task: "Criar src/components/hero/hero-content.tsx e index.ts"
Task: "Criar src/components/about/about-content.tsx e index.ts"
Task: "Criar src/components/features/features-content.tsx e index.ts"
Task: "Criar src/components/testimonials/testimonials-content.tsx e index.ts"
Task: "Criar src/components/cta/cta-content.tsx e index.ts"
Task: "Criar src/components/footer/footer-content.tsx e index.ts"
Task: "Criar src/features/cta/index.ts (placeholder)"

# Após todos concluírem:
Task: "Criar src/app/page.tsx empilhando as 6 seções"
```

---

## Estratégia de Implementação

### MVP First (User Story 1 Apenas)

1. Completar Phase 1: Setup
2. Completar Phase 2: Foundational (**crítico — bloqueia tudo**)
3. Completar Phase 3: User Story 1
4. **PARAR e VALIDAR**: `npm run dev` → landing page com 6 seções no browser
5. Continuar para US2, US3, US4 e Polish

### Entrega Incremental

1. Setup + Foundational → base técnica pronta
2. US1 → dev server funcional (MVP!)
3. US2 → estrutura validada e autodocumentada
4. US3 → build + deploy prontos
5. US4 + Polish → qualidade de código garantida

---

## Notas

- `[P]` = arquivos diferentes, sem dependências entre si — pode rodar em paralelo
- `[Story]` = rastreabilidade da task para a user story correspondente
- Cada user story deve ser testável de forma independente após sua fase
- Commitar após cada fase ou grupo lógico de tasks
- Não há suite de testes automatizados — validação via `ts-check`, `lint` e verificação manual no browser
