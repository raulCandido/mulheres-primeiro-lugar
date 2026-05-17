# Tasks: Refinamento Visual e UX Mobile-First

**Input**: Design documents from `/specs/003-mobile-layout-polish/`

**Prerequisites**: plan.md ✅ | spec.md ✅ | research.md ✅ | data-model.md ✅

**Organização**: Tarefas agrupadas por user story para permitir implementação e validação independente de cada história.

## Formato: `[ID] [P?] [Story] Descrição`

- **[P]**: Pode rodar em paralelo (arquivos diferentes, sem dependência de tarefas incompletas)
- **[Story]**: A qual user story a tarefa pertence (US1, US2, US3)

---

## Phase 1: Setup

**Purpose**: Verificar ambiente antes de iniciar as modificações

- [x] T001 Verificar que `npm run ts-check` e `npm run lint` passam na branch atual (baseline limpa)

---

## Phase 2: Foundational — Limpeza de dados em `content.ts`

**Purpose**: Remover campos e valores de emoji das interfaces e dados de conteúdo. Bloqueante — todos os componentes dependem de `content.ts` e o TypeScript falhará até que os componentes sejam atualizados nas fases seguintes.

**⚠️ CRITICAL**: Nenhuma fase de user story pode começar até esta fase estar completa.

- [x] T002 Remover declarações dos campos `emoji` das interfaces `RatingOption` e `ExperienceCard`, e campo `icon` da interface `SocialLink` em `src/lib/content.ts`
- [x] T003 [P] Remover valores `emoji` de todos os 6 itens do array `ratingOptions` em `src/lib/content.ts`
- [x] T004 [P] Remover valores `emoji` de todos os 15 itens do array `experiences.items` em `src/lib/content.ts`
- [x] T005 Remover campos `icon` dos 2 itens de `socialLinks`; remover emoji `💛` de `commentPlaceholder`, `🌸` de `successMessage` e `💕` de `closingMessage` em `src/lib/content.ts`
- [x] T006 Executar `npm run ts-check` para listar todos os erros TypeScript causados pelos campos removidos (checkpoint — esperado falhar nos componentes que ainda referenciam `emoji`/`icon`)

**Checkpoint**: content.ts limpo — iniciar fases de user story sequencialmente (arquivo por arquivo)

---

## Phase 3: User Story 1 — Espaçamentos e margens confortáveis no mobile (Priority: P1) 🎯 MVP

**Goal**: Todos os elementos da página têm margens laterais visíveis e áreas de toque generosas em viewports de 360px–430px.

**Independent Test**: Abrir a página em viewport de 375px — nenhum conteúdo encosta nas bordas laterais, botões têm área de toque ampla e confortável.

- [x] T007 [P] [US1] Aumentar padding do botão CTA de `px-10 py-4` para `px-12 py-5` e adicionar `sm:px-8` ao container em `src/components/hero/hero-content.tsx`
- [x] T008 [P] [US1] Atualizar padding lateral de `px-6` para `px-5 sm:px-6` e `mb-16` para `mb-12` no header de experiências em `src/components/experiences/experiences-content.tsx`
- [x] T009 [P] [US1] Atualizar padding da seção para `py-20 sm:py-24` e lateral para `px-5 sm:px-6` em `src/components/evaluation/evaluation-content.tsx`
- [x] T010 [US1] Aumentar padding interno do card do formulário para `p-7 sm:p-8 md:p-10`, botões de nota para `py-4` e botão submit para `py-5` em `src/components/evaluation/evaluation-form.tsx`
- [x] T011 [P] [US1] Atualizar padding do footer de `py-16 px-6` para `py-16 px-5 sm:px-6` em `src/components/footer/footer-content.tsx`

**Checkpoint**: User Story 1 completa — espaçamento mobile verificado visualmente em 375px

---

## Phase 4: User Story 2 — Identidade visual sofisticada e sem emojis (Priority: P2)

**Goal**: Zero emojis visíveis em qualquer parte da interface. Visual limpo, tipográfico e premium.

**Independent Test**: Percorrer a página inteira em qualquer dispositivo — nenhum caractere emoji em título, card, botão, link ou texto.

- [x] T012 [US2] Remover o `<span>` de emoji e a prop `emoji` da desestruturação no componente `ExperienceCard`; card passa a exibir apenas título e speaker em `src/components/experiences/experience-card.tsx`
- [x] T013 [US2] Remover `<span className="text-2xl">{opt.emoji}</span>` dos botões de avaliação no loop de `ratingOptions` em `src/components/evaluation/evaluation-form.tsx`
- [x] T014 [US2] Substituir `<motion.span>` com emoji `🌸` no estado de sucesso por SVG inline de checkmark em círculo com animação Framer Motion em `src/components/evaluation/evaluation-form.tsx`
- [x] T015 [US2] Remover `<span aria-hidden="true">{link.icon}</span>` dos links sociais e remover `📧` inline do link de e-mail em `src/components/footer/footer-content.tsx`

**Checkpoint**: User Stories 1 e 2 completas — zero emojis visíveis, espaçamento mobile correto

---

## Phase 5: User Story 3 — Sistema de avaliação em destaque e CTA irresistível (Priority: P3)

**Goal**: O sistema de avaliação 1–5 é o elemento visual mais proeminente da área principal; o CTA é imediatamente identificável sem necessidade de scroll extensivo.

**Independent Test**: Abrir a página — o sistema de notas e o botão "Avaliar minha experiência" são identificados em menos de 3 segundos sem leitura completa do conteúdo.

- [x] T016 [US3] Substituir o espaço vazio deixado pelo emoji nos botões de nota por número com tipografia destacada: `<span className="text-2xl font-bold ...">` com cor `text-gold` quando selecionado e `text-nude/70` quando não selecionado, em `src/components/evaluation/evaluation-form.tsx`
- [x] T017 [US3] Aumentar peso visual da legenda do sistema de avaliação — ajustar `text-xl md:text-2xl` para `text-2xl md:text-3xl` mantendo `font-semibold`, reforçando hierarquia da pergunta principal em `src/components/evaluation/evaluation-form.tsx`

**Checkpoint**: Todas as user stories completas — sistema de avaliação em destaque, CTA premium e sem emojis

---

## Phase 6: Polish & Validação Final

**Purpose**: Garantir qualidade técnica e visual antes do merge.

- [x] T018 [P] Executar `npm run ts-check` e confirmar zero erros TypeScript
- [x] T019 [P] Executar `npm run lint` e confirmar zero warnings
- [ ] T020 Inspeção visual completa em viewport 375px: confirmar margens laterais visíveis em todas as seções, zero emojis, botões com área de toque confortável e sistema de notas em destaque
- [ ] T021 Inspeção visual em viewport 768px+: confirmar ausência de regressão de layout em tablet e desktop


---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Sem dependências — iniciar imediatamente
- **Foundational (Phase 2)**: Depende do Setup — **bloqueia todas as user stories**
- **US1 (Phase 3)**: Depende da Phase 2 — pode iniciar após T006 listar os erros
- **US2 (Phase 4)**: Depende da Phase 3 — `evaluation-form.tsx` é modificado nas duas fases; sequenciar para evitar conflito
- **US3 (Phase 5)**: Depende da Phase 4 — complementa os botões de nota modificados em T013/T016
- **Polish (Phase 6)**: Depende de todas as user stories estarem completas

### User Story Dependencies

- **US1 (P1)**: Pode iniciar após Phase 2. T007, T008, T009, T011 são paralelos. T010 depende de T009 estar concluído.
- **US2 (P2)**: Deve iniciar após US1. T012, T013, T014, T015 são sequenciais por segurança (mesmo arquivo `evaluation-form.tsx`).
- **US3 (P3)**: Deve iniciar após US2. T016 depende de T013 (mesmos botões de nota).

### Oportunidades de paralelismo

- **Phase 2**: T003 e T004 são paralelos (arrays diferentes no mesmo arquivo — editar com cuidado sequencial se necessário)
- **Phase 3**: T007, T008, T009, T011 são totalmente paralelos (arquivos distintos)
- **Phase 6**: T018 e T019 são paralelos

---

## Parallel Example: Phase 3 (US1)

```
# Editar em paralelo — arquivos distintos:
T007 → src/components/hero/hero-content.tsx
T008 → src/components/experiences/experiences-content.tsx
T009 → src/components/evaluation/evaluation-content.tsx
T011 → src/components/footer/footer-content.tsx

# Após T009 concluído:
T010 → src/components/evaluation/evaluation-form.tsx
```

---

## Implementation Strategy

### MVP (US1 apenas)

1. Completar Phase 1: Setup (T001)
2. Completar Phase 2: Foundational (T002–T006)
3. Completar Phase 3: US1 (T007–T011)
4. **PARAR e VALIDAR**: inspeção visual em 375px
5. Continuar com US2 e US3

### Entrega incremental

1. Setup + Foundational → content.ts limpo
2. US1 → espaçamento mobile validado → pode fazer deploy de preview
3. US2 → zero emojis validado → pode fazer deploy de preview
4. US3 → destaque do sistema de avaliação validado → merge e deploy final

---

## Notes

- [P] = arquivos diferentes, sem dependência de tarefas incompletas
- Cada user story é independentemente testável após sua fase estar completa
- Após T006 (checkpoint TypeScript esperado falhar), seguir a ordem de fases para corrigir os erros incrementalmente
- `evaluation-form.tsx` é modificado em 4 fases (T010, T013, T014 foram separados de T016 intencionalmente para rastreabilidade por story)
- Commitar após cada fase ou grupo lógico de tarefas
