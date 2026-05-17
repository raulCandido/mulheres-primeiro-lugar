# Tasks: Landing Page — Mulheres Primeiro Lugar

**Input**: Design documents from `specs/001-formulario-avaliacao-evento/`

**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/server-actions.md ✅

**Tests**: Não solicitados — sem tarefas de teste automatizado nesta versão.

**Organization**: Tarefas agrupadas por user story para permitir implementação e validação independente de cada história.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Pode rodar em paralelo (arquivos diferentes, sem dependências entre si)
- **[Story]**: User story à qual a tarefa pertence (US1–US5)
- Caminhos de arquivo relativos à raiz do repositório

---

## Phase 1: Setup

**Purpose**: Remover código legado incompatível com o novo design e preparar variáveis de ambiente.

- [x] T001 Remover diretórios de componentes legados: `src/components/cta/`, `src/components/features/`, `src/components/testimonials/`
- [x] T002 [P] Remover feature action legada: `src/features/cta/`
- [x] T003 [P] Criar `.env.example` na raiz com as três variáveis necessárias: `RESEND_API_KEY`, `RESEND_TO_EMAIL`, `RESEND_FROM_EMAIL` (com comentários explicativos)

**Checkpoint**: Código legado removido — repositório pronto para receber a nova implementação.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Infraestrutura compartilhada que DEVE estar completa antes de qualquer user story.

**⚠️ CRÍTICO**: Nenhuma user story pode ser iniciada até esta fase estar concluída.

- [x] T004 Reescrever `src/lib/content.ts` completamente: novas interfaces TypeScript (`HeroContent`, `AboutContent`, `ExperiencesContent`, `EvaluationContent`, `FooterContent`, `SiteContent`) e objeto `content` com todos os dados — 15 cards de experiências (título, speaker?, emoji), 6 opções de rating (value 0–5, label, emoji), copy do hero celebratório, descrição do evento, labels do formulário e rodapé conforme `data-model.md`
- [x] T005 [P] Atualizar `src/app/globals.css`: adicionar variáveis CSS da paleta (`--color-rose-burnt: #C4717A`, `--color-nude: #E8D5C4`, `--color-gold: #C9A84C`, `--color-wine: #7B2D42`, `--color-black-soft: #120A0E`, `--color-glass-bg`, `--color-glass-border`), classe `.glass-card` com `backdrop-filter: blur(12px)`, e `scroll-behavior: smooth` no `html`
- [x] T006 [P] Atualizar `src/app/layout.tsx`: importar `Playfair_Display` e `Inter` via `next/font/google`, aplicar como variáveis CSS, atualizar `metadata` com título e descrição do evento "Mulheres Primeiro Lugar"

**Checkpoint**: Base de dados, estilos e tipografia prontos — implementação das user stories pode começar.

---

## Phase 3: User Story 1 — Explorar a Proposta e Navegar até o Formulário (P1) 🎯 MVP

**Goal**: A participante acessa a landing page, é impactada emocionalmente pelo hero, percorre as seções (hero → sobre → experiências) e é conduzida ao formulário.

**Independent Test**: Acessar `http://localhost:3000`, verificar que hero section exibe headline + subtítulo + botão CTA; rolar a página e confirmar que as seções aparecem nesta ordem com os 15 cards de experiências visíveis com efeito hover.

### Implementação

- [x] T007 [US1] Reescrever `src/components/hero/hero-content.tsx` como server component: headline emocional celebrando a experiência, subtítulo acolhedor, botão CTA com `href="#evaluation"` e scroll suave, background escuro com gradiente vinho/preto; importar copy de `@/lib/content`
- [x] T008 [P] [US1] Atualizar `src/components/hero/index.ts` barrel export para exportar `HeroContent`
- [x] T009 [P] [US1] Reescrever `src/components/about/about-content.tsx` como server component: título de seção, parágrafo descritivo do evento ("criado por mulheres e para mulheres..."), estilização com paleta premium; importar copy de `@/lib/content`
- [x] T010 [US1] Criar `src/components/experiences/experience-card.tsx` como client component (`"use client"`): Framer Motion `whileInView` com `initial={{ opacity: 0, y: 24 }}` e `viewport={{ once: true }}`, emoji grande, título, speaker (opcional em texto menor), classe `.glass-card`, efeito hover com scale e borda dourada
- [x] T011 [US1] Criar `src/components/experiences/experiences-content.tsx` como server component: título da seção, subtítulo, grid responsivo (`grid-cols-2 md:grid-cols-3 lg:grid-cols-5`) renderizando os 15 `ExperienceCard` a partir de `content.experiences.items`
- [x] T012 [P] [US1] Criar `src/components/experiences/index.ts` com barrel export de `ExperiencesContent` e `ExperienceCard`

**Checkpoint**: Hero, sobre e experiências renderizando corretamente. Página navegável da hero até onde o formulário será inserido.

---

## Phase 4: User Story 2 — Avaliar o Evento com Nota (P1)

**Goal**: A participante visualiza o formulário com a pergunta principal e seleciona uma das 6 notas (0–5) com feedback visual imediato.

**Independent Test**: Inspecionar a seção do formulário; clicar em cada um dos 6 botões de nota e verificar destaque visual com animação; confirmar que apenas uma nota pode estar ativa por vez e que o botão de envio permanece desabilitado sem nota selecionada.

### Implementação

- [x] T013 [US2] Criar `src/components/evaluation/evaluation-form.tsx` como client component (`"use client"`): `useState` para `selectedRating` (null | 0–5); renderizar 6 botões circulares grandes com emoji + label vindos de `content.evaluation.ratingOptions`; botão ativo com borda dourada + escala aumentada (Framer Motion `animate`); botão "Enviar Avaliação" desabilitado quando `selectedRating === null`; incluir campo `_trap` honeypot oculto via CSS (`position: absolute; opacity: 0; pointer-events: none`)
- [x] T014 [US2] Criar `src/components/evaluation/evaluation-content.tsx` como server component: título da seção com `id="evaluation"` para ancoragem do CTA, pergunta principal, renderizar `<EvaluationForm />` client component
- [x] T015 [P] [US2] Criar `src/components/evaluation/index.ts` barrel export de `EvaluationContent` e `EvaluationForm`

**Checkpoint**: Formulário com seletor de nota funcional. Botão de envio desabilitado sem nota. Feedback visual ao selecionar.

---

## Phase 5: User Story 3 — Enviar Avaliação e Receber Confirmação (P1)

**Goal**: Com nota selecionada, a participante clica em "Enviar Avaliação", o formulário é processado e substituído por mensagem de agradecimento elegante em menos de 3 segundos.

**Independent Test**: Selecionar nota 5, clicar em "Enviar Avaliação"; verificar estado de loading no botão; confirmar que o formulário some e a mensagem de agradecimento aparece com animação; verificar recebimento do e-mail em `RESEND_TO_EMAIL` com nota, label e timestamp.

### Implementação

- [x] T016 [US3] Criar `src/features/evaluation/submit-evaluation.ts` com diretiva `"use server"`: extrair e verificar campo `_trap` (retornar `{ success: true }` silenciosamente se preenchido); validar `rating` (0 ≤ n ≤ 5, obrigatório); sanitizar `comment` (trim, max 1000 chars); derivar label e emoji da opção correspondente em `content.evaluation.ratingOptions`; compor HTML do e-mail com nota em destaque, comentário (se presente) e timestamp em `America/Sao_Paulo`; chamar `resend.emails.send()`; retornar `ActionResult` conforme contrato em `contracts/server-actions.md`
- [x] T017 [P] [US3] Criar `src/features/evaluation/index.ts` barrel export de `submitEvaluation`
- [x] T018 [US3] Atualizar `src/components/evaluation/evaluation-form.tsx`: adicionar `useState` para `status` (`"idle" | "submitting" | "success" | "error"`); conectar `submitEvaluation` ao submit handler com `startTransition`; exibir loading no botão durante `"submitting"` (desabilitar + spinner ou texto); em `"success"`, substituir formulário por mensagem de agradecimento com Framer Motion `AnimatePresence`; em `"error"`, exibir mensagem amigável com opção de nova tentativa
- [x] T019 [US3] Atualizar `src/app/page.tsx`: importar e compor todas as seções na ordem canônica — `HeroContent`, `AboutContent`, `ExperiencesContent`, `EvaluationContent`, `FooterContent` — removendo imports legados de `cta`, `features` e `testimonials`

**Checkpoint**: Fluxo completo funcional — selecionar nota → enviar → confirmação. E-mail recebido. Mensagem de erro amigável em caso de falha.

---

## Phase 6: User Story 4 — Adicionar Comentário Opcional (P2)

**Goal**: Além da nota, a participante pode optar por deixar um comentário em texto livre. O campo é visualmente marcado como opcional e não bloqueia o envio.

**Independent Test**: Preencher o campo de comentário e enviar — verificar que o texto aparece no e-mail recebido; enviar sem preencher — verificar que o envio ocorre normalmente sem erros de validação.

### Implementação

- [x] T020 [US4] Atualizar `src/components/evaluation/evaluation-form.tsx`: adicionar `useState` para `comment`; inserir `<textarea>` abaixo do seletor de rating com `placeholder` de `content.evaluation.commentPlaceholder`, `maxLength={1000}`, contador de caracteres visível (`{comment.length}/1000`), estilização elegante com `.glass-card` e efeito de foco com borda dourada; incluir `comment` no `FormData` enviado para `submitEvaluation`

**Checkpoint**: Comentário opcional funcional. Contador de caracteres visível. Envio com e sem comentário testado.

---

## Phase 7: User Story 5 — Rodapé com Contato e Redes Sociais (P3)

**Goal**: A participante encontra no rodapé o branding do evento, links de redes sociais, informação de contato e uma mensagem acolhedora de encerramento.

**Independent Test**: Rolar até o rodapé e verificar presença de: nome do evento, links de redes sociais (abrindo em nova aba), e-mail de contato e mensagem de encerramento.

### Implementação

- [x] T021 [US5] Reescrever `src/components/footer/footer-content.tsx` como server component: nome/branding do evento, links de redes sociais de `content.footer.socialLinks` (cada link com `target="_blank" rel="noopener noreferrer"`), e-mail de contato, mensagem acolhedora de encerramento, copyright; estilização com gradiente vinho/preto e detalhes dourados
- [x] T022 [P] [US5] Atualizar `src/components/footer/index.ts` barrel export

**Checkpoint**: Rodapé com todos os elementos do spec. Links de redes sociais funcionais abrindo em nova aba.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Animações premium, WCAG 2.1 AA, responsividade e validação final.

- [x] T023 [P] Adicionar Framer Motion `whileInView` ao `src/components/hero/hero-content.tsx`: `initial={{ opacity: 0, y: -16 }}` na headline e `initial={{ opacity: 0 }}` no subtítulo, com `transition` escalonado
- [x] T024 [P] Adicionar Framer Motion `whileInView` ao `src/components/about/about-content.tsx`: fade-in suave da seção ao entrar no viewport
- [x] T025 [P] Verificar acessibilidade WCAG 2.1 AA em `src/components/evaluation/evaluation-form.tsx`: adicionar `aria-label` a cada botão de rating (`aria-label="Nota 5: Excelente"`), `aria-required="true"` no grupo de rating, garantir navegação por teclado funcional
- [x] T026 [P] Verificar contraste de cores e `alt` em todos os componentes: imagens com `alt` descritivo, textos com contraste mínimo 4.5:1 contra backgrounds
- [x] T027 Executar validação completa: `npm run ts-check && npm run lint` a partir da raiz — corrigir todos os erros de tipo e lint antes de commitar
- [x] T028 [P] Verificar responsividade em `http://localhost:3000` nos breakpoints 320px, 375px e 768px via DevTools — confirmar que não há scroll horizontal, elementos cortados ou textos ilegíveis

**Checkpoint Final**: Todos os critérios de sucesso do spec atendidos. TypeScript e lint passando. Landing page pronta para deploy.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Sem dependências — pode iniciar imediatamente
- **Foundational (Phase 2)**: Depende da Phase 1 — BLOQUEIA todas as user stories
- **US1 (Phase 3)**: Depende da Phase 2
- **US2 (Phase 4)**: Depende da Phase 2 — pode rodar em paralelo com US1
- **US3 (Phase 5)**: Depende de US2 (Phase 4) — precisa do formulário com rating pronto
- **US4 (Phase 6)**: Depende de US2 (Phase 4) — adiciona campo ao mesmo componente
- **US5 (Phase 7)**: Depende da Phase 2 — pode rodar em paralelo com US1, US2
- **Polish (Phase 8)**: Depende de todas as user stories concluídas

### User Story Dependencies

- **US1 (P1)**: Inicia após Phase 2 — sem dependência de outras US
- **US2 (P1)**: Inicia após Phase 2 — sem dependência de outras US
- **US3 (P1)**: Depende de US2 (precisa do formulário com rating)
- **US4 (P2)**: Depende de US2 (adiciona campo ao mesmo componente)
- **US5 (P3)**: Inicia após Phase 2 — sem dependência de outras US

### Within Each User Story

- Componentes content (server) antes de referenciá-los em page.tsx
- Componentes form (client) antes de conectar server actions
- Server actions antes de conectar ao form
- Implementação core antes de polish/animações

### Parallel Opportunities

- T002, T003 paralelos em Phase 1
- T005, T006 paralelos em Phase 2 (após T004)
- T008, T009 paralelos com T007 em Phase 3
- T010–T012 podem ser distribuídos em Phase 3
- US1 e US2 podem rodar em paralelo após Phase 2
- US1 e US5 podem rodar em paralelo após Phase 2
- T023–T026 todos paralelos em Phase 8

---

## Parallel Example: US1

```bash
# Após T007 estar completo, lançar em paralelo:
Task: "T008 — Atualizar hero/index.ts barrel export"
Task: "T009 — Reescrever about-content.tsx"

# Após T009, lançar em paralelo:
Task: "T010 — Criar experience-card.tsx (animation + hover)"
Task: "T012 — Criar experiences/index.ts"
```

## Parallel Example: US3

```bash
# T016 e T017 podem rodar em paralelo:
Task: "T016 — Criar submit-evaluation.ts server action"
Task: "T017 — Criar features/evaluation/index.ts"

# Após T016 e T018 completos:
Task: "T018 — Conectar action ao evaluation-form.tsx"
Task: "T019 — Atualizar page.tsx com todas as seções"
```

---

## Implementation Strategy

### MVP First (US1 + US2 + US3 — fluxo completo mínimo)

1. Completar Phase 1: Setup
2. Completar Phase 2: Foundational
3. Completar Phase 3: US1 (landing page navegável)
4. Completar Phase 4: US2 (seletor de rating)
5. Completar Phase 5: US3 (envio + confirmação)
6. **PARAR E VALIDAR**: Testar fluxo completo — acessar página, rolar, selecionar nota, enviar, verificar e-mail
7. Deploy MVP se aprovado

### Incremental Delivery

1. Setup + Foundational → base pronta
2. US1 → página navegável com hero + about + experiences → validar
3. US2 + US3 → formulário funcional end-to-end → validar e-mail → **Deploy MVP**
4. US4 → comentário opcional → validar
5. US5 → rodapé completo → validar
6. Polish → animações + WCAG + responsividade → **Deploy Final**

---

## Notes

- `[P]` = arquivos diferentes, sem dependências entre si — podem rodar em paralelo
- `[USn]` = rastreabilidade para a user story correspondente
- Cada US deve ser testada de forma independente antes de avançar
- Executar `npm run ts-check && npm run lint` antes de commitar qualquer fase
- T004 (`content.ts`) é o arquivo mais crítico — todos os componentes dependem dele
- Honeypot `_trap`: campo CSS-oculto, não `type="hidden"`, verificado em T016 antes de qualquer processamento
