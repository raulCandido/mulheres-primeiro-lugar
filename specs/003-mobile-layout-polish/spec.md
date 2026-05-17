# Feature Specification: Refinamento Visual e UX Mobile-First da Landing Page

**Feature Branch**: `003-mobile-layout-polish`

**Created**: 2026-05-16

**Status**: Draft

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Participante acessa a landing page pelo celular e preenche o formulário de avaliação (Priority: P1)

Uma participante do evento abre o link da landing page no smartphone. A página carrega com espaçamento confortável, textos legíveis e sem emojis. Ela visualiza o sistema de avaliação de 1 a 5, seleciona uma nota, opcionalmente adiciona um comentário e toca no botão "Avaliar minha experiência" com facilidade. O botão tem área de toque ampla e padding generoso.

**Why this priority**: É o fluxo principal da landing page — toda melhoria deve servir a este objetivo. A taxa de conclusão do formulário é a métrica central de sucesso.

**Independent Test**: Pode ser testado abrindo a página em qualquer dispositivo mobile e completando o envio do formulário sem dificuldades.

**Acceptance Scenarios**:

1. **Given** a participante acessa a página em um smartphone com tela entre 360px e 430px de largura, **When** a página carrega, **Then** nenhum conteúdo está cortado ou encostado nas bordas — há margens laterais visíveis em todos os elementos.
2. **Given** a participante visualiza o botão "Avaliar minha experiência", **When** ela o inspeciona visualmente, **Then** o botão possui padding interno amplo e a área de toque é confortável sem parecer comprimida.
3. **Given** a participante lê qualquer texto da página, **When** ela visualiza títulos, subtítulos e descrições, **Then** nenhum texto está encostado nas bordas laterais da tela.
4. **Given** a participante visualiza o formulário, **When** ela interage com campos e cards de avaliação, **Then** todos os elementos têm espaçamento vertical e horizontal equilibrado.

---

### User Story 2 — Participante percebe identidade visual sofisticada e sem emojis (Priority: P2)

A participante abre a página e encontra uma interface limpa, sem emojis, com estética minimalista e premium. O visual transmite acolhimento e profissionalismo, incentivando a confiança para deixar um feedback honesto.

**Why this priority**: A remoção de emojis e o refinamento visual elevam a percepção de qualidade da marca e reduzem distrações que poderiam desviar o foco do CTA principal.

**Independent Test**: Pode ser testado revisando visualmente cada seção da página para confirmar ausência de emojis e coerência estética.

**Acceptance Scenarios**:

1. **Given** a página está carregada, **When** a participante percorre todo o conteúdo, **Then** nenhum emoji é exibido em qualquer elemento — títulos, subtítulos, textos, botões, cards ou labels.
2. **Given** a participante visualiza a hierarquia visual da página, **When** ela lê os títulos e subtítulos, **Then** a tipografia comunica sofisticação, leveza e clareza sem elementos decorativos desnecessários.

---

### User Story 3 — Participante conclui a avaliação em poucos segundos sem distrações (Priority: P3)

O sistema de avaliação de 1 a 5 está em destaque visual e o CTA principal é imediatamente identificável. A participante não precisa rolar extensivamente nem decifrar a interface — o caminho até o envio é intuitivo e rápido.

**Why this priority**: Maximizar a taxa de conversão depende de reduzir o esforço cognitivo e o número de passos percebidos até o envio.

**Independent Test**: Pode ser testado medindo o tempo médio da abertura da página até o clique no botão de envio em sessões de teste com usuários reais ou simuladas.

**Acceptance Scenarios**:

1. **Given** a participante abre a página pela primeira vez, **When** ela visualiza a tela inicial sem rolar, **Then** o sistema de avaliação de 1 a 5 e o CTA principal estão visíveis e em destaque.
2. **Given** a participante quer enviar o feedback, **When** ela toca o botão "Avaliar minha experiência", **Then** a área de toque é ampla o suficiente para não exigir precisão extrema e o botão responde imediatamente.

---

### Edge Cases

- O que acontece quando a participante acessa em um dispositivo com tela muito pequena (< 360px)? O layout deve manter margens mínimas funcionais.
- O que acontece quando o conteúdo textual é mais longo do que o esperado? Os espaçamentos não devem colapsar nem sobrepor elementos.
- Como a hierarquia visual se comporta em modo de alto contraste ou quando o sistema operacional aumenta o tamanho da fonte?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: A interface DEVE exibir margens laterais de no mínimo 20px em todos os elementos de conteúdo (títulos, subtítulos, textos, formulário, botões e cards) em viewports mobile.
- **FR-002**: O espaçamento vertical entre seções e grupos de elementos DEVE ser equilibrado e consistente, seguindo uma escala progressiva.
- **FR-003**: O botão "Avaliar minha experiência" DEVE ter padding interno horizontal de no mínimo 32px e vertical de no mínimo 16px, criando área de respiro visual e de toque generosa.
- **FR-004**: Todos os emojis presentes na interface DEVEM ser removidos — incluindo títulos, subtítulos, textos descritivos, labels, placeholders, botões e quaisquer outros elementos visíveis.
- **FR-005**: A hierarquia visual DEVE ser reforçada: o sistema de avaliação de 1 a 5 e o CTA principal DEVEM ter destaque visual claro em relação aos demais elementos.
- **FR-006**: A interface DEVE comunicar sofisticação e minimalismo — sem elementos decorativos desnecessários, poluição visual ou aparência informal.
- **FR-007**: A legibilidade dos textos DEVE ser priorizada — tamanho, espaçamento entre linhas e contraste adequados para leitura confortável em telas mobile.
- **FR-008**: Todos os ajustes de espaçamento e layout DEVEM ser implementados com abordagem mobile-first, garantindo boa experiência em viewports de 360px a 430px de largura.
- **FR-009**: O layout responsivo DEVE ser preservado para viewports maiores (tablet e desktop), sem regressões.

### Key Entities

- **Seções da landing page**: Hero, CTA (formulário de avaliação), Footer — cada uma com suas próprias regras de espaçamento.
- **Sistema de avaliação**: Cards ou botões numerados de 1 a 5 — devem ter área de toque adequada e espaçamento interno generoso.
- **CTA principal**: Botão "Avaliar minha experiência" — elemento mais crítico para a conversão.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Nenhum conteúdo textual ou interativo está encostado nas bordas laterais da tela em dispositivos com largura entre 360px e 430px.
- **SC-002**: Nenhum emoji é exibido em qualquer parte da interface após a implementação.
- **SC-003**: O botão "Avaliar minha experiência" possui área de toque visível e confortável — confirmado em inspeção visual e testes de interação mobile.
- **SC-004**: O sistema de avaliação de 1 a 5 é o elemento de maior destaque visual na área principal da página, facilmente identificável sem rolar.
- **SC-005**: A experiência de leitura e interação na página é percebida como fluida, limpa e sofisticada — validado por inspeção visual comparativa antes/depois.
- **SC-006**: Nenhuma regressão de layout é introduzida em viewports de tablet (768px+) ou desktop (1024px+).

## Assumptions

- O acesso será predominantemente via dispositivos mobile, com viewports entre 360px e 430px de largura.
- A remoção de emojis é total e definitiva — não há casos de uso onde emojis devem ser mantidos.
- Os ajustes são de natureza visual/UX e não alteram a lógica de negócio, o fluxo de submissão do formulário ou a integração com o serviço de e-mail.
- A paleta de cores, tipografia base e estrutura de seções existentes são mantidas — esta feature é de refinamento, não de redesign completo.
- O conteúdo textual em si (títulos, descrições, labels) pode ser revisado apenas para remover emojis, sem reescrita de copy.
- A ordem canônica das seções definida na constitution permanece inalterada.
