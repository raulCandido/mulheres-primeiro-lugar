# Feature Specification: Estrutura Inicial do Projeto

**Feature Branch**: `002-setup-projeto-inicial`

**Created**: 2026-05-16

**Status**: Draft

**Input**: Estrutura inicial do projeto — configurar base técnica, estrutura de pastas, providers globais, layout raiz com metadados SEO, página inicial com todas as seções em estado shell e conteúdo estático tipado. Base sólida para receber as demais features da landing page Mulheres Primeiro Lugar.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Iniciar o Ambiente de Desenvolvimento (Priority: P1)

O desenvolvedor clona o repositório, instala as dependências e inicia o servidor local. A landing page abre no navegador mostrando todas as seções definidas na constituição, com estrutura visual funcional e conteúdo placeholder.

**Why this priority**: Sem um ambiente funcional desde o primeiro comando, nenhuma outra feature pode ser desenvolvida ou testada. É o pré-requisito absoluto do projeto.

**Independent Test**: Executar `npm install && npm run dev`, abrir o navegador e verificar que a landing page carrega com todas as seções visíveis e sem erros no console.

**Acceptance Scenarios**:

1. **Given** o repositório foi clonado e as dependências instaladas, **When** o servidor de desenvolvimento é iniciado, **Then** a landing page carrega em menos de 5 segundos sem erros no console
2. **Given** a landing page está carregada, **When** o desenvolvedor rola a página, **Then** todas as 6 seções aparecem na ordem correta: Hero → About → Features/Benefits → Testimonials → CTA → Footer
3. **Given** o servidor está rodando, **When** um arquivo de componente é editado, **Then** a página atualiza automaticamente sem perda de estado

---

### User Story 2 - Criar Nova Seção Seguindo o Padrão Estabelecido (Priority: P1)

O desenvolvedor precisa adicionar uma nova seção à landing page. Ele encontra a estrutura de pastas clara e intuitiva, sabe exatamente onde criar os arquivos e como seguir o padrão sem precisar consultar documentação externa.

**Why this priority**: A consistência da estrutura é o que permite que qualquer desenvolvedor contribua sem introduzir divergências arquiteturais. É o valor central da feature de setup.

**Independent Test**: Criar um novo domínio em `components/`, adicionar um componente `*-content.tsx` com barrel export em `index.ts` e verificar que ele pode ser importado e renderizado na página sem configuração adicional.

**Acceptance Scenarios**:

1. **Given** a estrutura de pastas está criada, **When** o desenvolvedor cria `components/nova-secao/nova-secao-content.tsx`, **Then** o componente pode ser importado e renderizado sem erros de configuração
2. **Given** um barrel export `index.ts` existe no domínio, **When** o componente é importado via `@/components/nova-secao`, **Then** a importação resolve corretamente
3. **Given** a estrutura está estabelecida, **When** um segundo desenvolvedor entra no projeto, **Then** ele consegue identificar onde criar novos componentes apenas lendo a estrutura de pastas

---

### User Story 3 - Gerar Build de Produção e Fazer Deploy (Priority: P1)

O desenvolvedor gera o build de produção e faz deploy na Vercel. O processo ocorre sem erros, a página é publicada e está acessível publicamente com todos os metadados SEO configurados.

**Why this priority**: O deploy funcional desde o início valida que a estrutura base está correta e permite iterações rápidas a cada feature adicionada.

**Independent Test**: Executar `npm run build` e verificar ausência de erros; confirmar que `npm run ts-check && npm run lint` passam sem alertas.

**Acceptance Scenarios**:

1. **Given** o projeto está configurado, **When** o build de produção é gerado, **Then** conclui com sucesso em menos de 3 minutos sem erros ou avisos críticos
2. **Given** o build foi gerado, **When** `npm run start` é executado, **Then** a landing page está acessível e idêntica ao ambiente de desenvolvimento
3. **Given** a landing page está publicada, **When** um mecanismo de busca lê a página, **Then** encontra título, descrição e metadados de compartilhamento (og:title, og:description, og:image) preenchidos

---

### User Story 4 - Garantir Qualidade de Código desde o Início (Priority: P2)

O desenvolvedor escreve código e confia que erros de tipo e estilo são detectados imediatamente. A verificação de qualidade passa sem erros na estrutura inicial, estabelecendo o padrão que todas as features futuras devem manter.

**Why this priority**: Detectar problemas cedo é exponencialmente mais barato que corrigir depois. A estrutura inicial deve ser o exemplo de código correto do projeto.

**Independent Test**: Executar `npm run ts-check && npm run lint` e verificar saída sem erros ou avisos.

**Acceptance Scenarios**:

1. **Given** a estrutura inicial está criada, **When** a verificação de tipos TypeScript é executada, **Then** retorna zero erros
2. **Given** a estrutura inicial está criada, **When** o linter é executado, **Then** retorna zero erros e zero avisos
3. **Given** um arquivo com erro de tipo é criado, **When** a verificação é executada, **Then** o erro é reportado com localização precisa

---

### Edge Cases

- O que acontece se `RESEND_API_KEY` não estiver configurada no ambiente local? → O projeto deve iniciar normalmente — a variável só é necessária para o formulário CTA, não para a estrutura base
- O que acontece se o desenvolvedor tentar importar um componente inexistente? → O TypeScript deve reportar erro claro em tempo de verificação
- O que acontece se a ordem das seções for alterada na página? → A constituição deve ser consultada como referência — a ordem é canônica e documentada
- O que acontece se as fontes não carregarem (sem internet)? → A página deve renderizar com fontes fallback sem quebrar o layout

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O projeto DEVE ter uma página inicial funcional com as 6 seções da landing page na ordem canônica: Hero, About, Features/Benefits, Testimonials, CTA, Footer
- **FR-002**: Cada seção DEVE ser um componente isolado em seu próprio domínio dentro de `components/`, com barrel export via `index.ts`
- **FR-003**: O sistema DEVE ter providers globais disponíveis em todas as páginas sem necessidade de configuração por página
- **FR-004**: O layout raiz DEVE exportar metadados SEO completos: título, descrição, og:title, og:description, og:image e URL canônica
- **FR-005**: Todo o conteúdo textual estático da landing page DEVE estar centralizado em um único arquivo tipado em `lib/`; componentes NÃO DEVEM ter strings de conteúdo inline
- **FR-006**: O projeto DEVE ter fontes carregadas via serviço de fontes web otimizado para performance
- **FR-007**: O dark mode DEVE estar configurado e funcional via classe CSS, sem necessidade de lógica JavaScript adicional
- **FR-008**: A estrutura de pastas DEVE estar criada e pronta para receber novos domínios em `components/`, `features/` e `lib/`
- **FR-009**: O projeto DEVE passar sem erros na verificação de tipos TypeScript
- **FR-010**: O projeto DEVE passar sem erros ou avisos no linter
- **FR-011**: O build de produção DEVE ser gerado com sucesso sem erros ou avisos críticos
- **FR-012**: Cada seção DEVE ter marcação HTML semântica correta (headings, landmarks, roles) para atender WCAG 2.1 AA desde a estrutura inicial

### Key Entities

- **Seção**: Nome, ordem de exibição, componente visual associado, conteúdo estático correspondente
- **Metadado SEO**: Título da página, descrição, og:title, og:description, og:image, URL canônica, locale
- **Conteúdo Estático**: Coleção tipada de textos, títulos, depoimentos e dados de cada seção

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Desenvolvedor consegue instalar dependências e ver a landing page no navegador em menos de 5 minutos após clonar o repositório
- **SC-002**: Todas as 6 seções são renderizadas corretamente no primeiro acesso, na ordem canônica definida
- **SC-003**: Build de produção é gerado em menos de 3 minutos sem erros
- **SC-004**: Zero erros de TypeScript e zero erros de lint na estrutura inicial
- **SC-005**: Um desenvolvedor novo consegue criar e renderizar um componente de nova seção em menos de 10 minutos, seguindo apenas a estrutura de pastas existente como guia

## Assumptions

- A "estrutura inicial" entrega componentes shell — a aparência visual final de cada seção será refinada em features subsequentes
- O conteúdo placeholder (textos de exemplo) em `content.ts` será substituído pelo conteúdo real antes do lançamento
- A variável de ambiente `RESEND_API_KEY` não é necessária para esta feature — ela será exigida apenas pela feature do formulário CTA
- O deploy automático na Vercel já está configurado via integração com o repositório Git
- Acessibilidade (WCAG 2.1 AA) é um requisito desde a estrutura inicial, não um refinamento posterior
- O projeto não terá banco de dados, autenticação ou CMS nesta fase nem nas subsequentes (conforme constituição)
- O projeto usa uma única rota (`/`) — não haverá sub-páginas nesta fase
