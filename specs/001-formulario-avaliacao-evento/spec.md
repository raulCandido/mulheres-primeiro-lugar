# Feature Specification: Formulário de Avaliação de Evento

**Feature Branch**: `001-formulario-avaliacao-evento`

**Created**: 2026-05-16

**Status**: Draft

**Input**: Formulário principal da landing page — avaliação de evento com escala de notas 1-5 (visual premium com estrelas/emojis/círculos), campo opcional de sugestão e envio com mensagem de agradecimento animada. Minimalista, elegante e de alta conversão, processado via Server Action com envio de e-mail.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Avaliar o Evento com Nota (Priority: P1)

A usuária acessa a landing page e responde à pergunta "O que você achou do nosso evento?" selecionando uma nota de 1 a 5. Ao selecionar, recebe feedback visual imediato que confirma sua escolha antes de enviar.

**Why this priority**: É o núcleo do formulário. Sem a seleção de nota, nenhum dado é coletado. Toda a experiência gira em torno desta ação.

**Independent Test**: Pode ser testado isoladamente — exibir o seletor de notas, clicar em cada opção e verificar o estado visual resultante (destaque, animação, label de texto).

**Acceptance Scenarios**:

1. **Given** o formulário está visível, **When** a usuária clica na nota 5 (Excelente), **Then** o elemento é destacado visualmente com animação suave e o label "Excelente" aparece ou fica evidenciado
2. **Given** a usuária selecionou a nota 3, **When** clica na nota 1, **Then** a seleção anterior é desmarcada e a nova nota fica destacada
3. **Given** nenhuma nota foi selecionada, **When** a usuária tenta submeter, **Then** o botão "Enviar Avaliação" permanece desabilitado ou exibe indicação visual de que a nota é obrigatória

---

### User Story 2 - Enviar Avaliação e Receber Confirmação (Priority: P1)

Com a nota selecionada, a usuária clica em "Enviar Avaliação" e recebe uma mensagem de agradecimento elegante com animação suave que substitui o formulário, transmitindo acolhimento e confirmação do envio.

**Why this priority**: É o encerramento da jornada. Sem confirmação visual, a usuária não sabe se o envio funcionou, o que gera desconfiança e abandono.

**Independent Test**: Com nota pré-selecionada, clicar em "Enviar Avaliação" e validar que a mensagem de agradecimento é exibida com animação, e que o formulário não é mais visível.

**Acceptance Scenarios**:

1. **Given** a nota 4 está selecionada e campo de comentário vazio, **When** a usuária clica em "Enviar Avaliação", **Then** o formulário é substituído por mensagem de agradecimento com animação suave em menos de 3 segundos
2. **Given** o formulário foi enviado com sucesso, **When** a mensagem de agradecimento aparece, **Then** o tom é acolhedor e positivo (sem linguagem técnica ou fria)
3. **Given** o envio está em processamento, **When** a usuária observa o botão, **Then** o botão está desabilitado ou exibe indicação de carregamento, impedindo duplo clique

---

### User Story 3 - Adicionar Comentário Opcional (Priority: P2)

Além da nota, a usuária pode optar por deixar uma sugestão ou comentário em texto livre. O campo é claramente marcado como opcional e possui visual acolhedor que convida — mas não obriga — o preenchimento.

**Why this priority**: Agrega valor qualitativo às avaliações, mas não bloqueia a experiência principal. A usuária que não quiser comentar ignora o campo sem atrito.

**Independent Test**: Preencher o campo de comentário com texto e enviar — verificar que o comentário é incluído no e-mail recebido; enviar sem preencher — verificar que o envio ocorre normalmente.

**Acceptance Scenarios**:

1. **Given** o campo de sugestão está visível, **When** a usuária clica nele, **Then** a borda exibe efeito de foco moderno (diferenciado do estado padrão)
2. **Given** o campo está vazio, **When** a usuária envia a avaliação apenas com nota, **Then** o envio é processado sem erros de validação
3. **Given** a usuária preencheu o campo de comentário, **When** o formulário é enviado, **Then** o comentário é incluído no e-mail de notificação

---

### Edge Cases

- O que acontece se a conexão cair durante o envio? → Exibir mensagem de erro amigável (não técnica) e permitir nova tentativa
- O que acontece se o serviço de e-mail retornar erro? → Exibir mensagem de erro acolhedora sem expor detalhes técnicos
- O que acontece se a usuária tentar enviar sem selecionar nota? → Botão desabilitado ou feedback visual claro de campo obrigatório
- O que acontece se o comentário for extremamente longo? → Limitar a 1000 caracteres com contador visual
- A usuária pode reenviar após o agradecimento? → Não — a mensagem de agradecimento é o estado final da sessão

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: O formulário DEVE exibir a pergunta "O que você achou do nosso evento?" como título principal visível
- **FR-002**: O sistema DEVE apresentar 5 opções de avaliação numeradas de 1 a 5, com labels descritivos: 1=Muito Ruim, 2=Ruim, 3=Regular, 4=Bom, 5=Excelente
- **FR-003**: Cada opção DEVE ter efeito visual de hover e animação suave ao ser selecionada, transmitindo feedback imediato
- **FR-004**: A usuária DEVE poder alterar a nota selecionada antes do envio — apenas uma nota pode estar selecionada por vez
- **FR-005**: O formulário DEVE conter um campo de texto NÃO obrigatório com placeholder acolhedor para sugestões ou comentários, limitado a 1000 caracteres
- **FR-006**: O botão "Enviar Avaliação" DEVE estar desabilitado até que uma nota seja selecionada
- **FR-007**: Durante o processamento do envio, o botão DEVE ser desabilitado para prevenir submissões duplicadas
- **FR-008**: Após envio bem-sucedido, o formulário DEVE ser substituído por mensagem de agradecimento com animação suave
- **FR-009**: O sistema DEVE enviar por e-mail os dados da avaliação (nota, label, comentário opcional, timestamp) ao responsável configurado
- **FR-010**: Em caso de falha no envio, o sistema DEVE exibir mensagem de erro amigável e permitir nova tentativa sem perder os dados preenchidos

### Key Entities

- **Avaliação**: Nota numérica (1–5), label textual da nota, comentário opcional (string, max 1000 chars), timestamp do envio
- **Notificação**: E-mail enviado ao responsável com os dados da avaliação formatados de forma legível

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A usuária completa a avaliação (selecionar nota + clicar enviar) em menos de 30 segundos
- **SC-002**: 90% das usuárias que visualizam o formulário completam o envio
- **SC-003**: A mensagem de confirmação aparece em menos de 3 segundos após o clique em "Enviar Avaliação"
- **SC-004**: Taxa de abandono do formulário inferior a 10%
- **SC-005**: O formulário é utilizável via teclado (navegação e seleção sem mouse), atendendo ao padrão WCAG 2.1 AA

## Assumptions

- Uma avaliação por sessão é suficiente — sem autenticação ou controle de acesso
- O e-mail destinatário das avaliações é configurado via variável de ambiente no servidor
- O formulário é exclusivamente em português (BR)
- Não há necessidade de dashboard, histórico ou relatórios — os dados chegam por e-mail
- O evento referenciado na pergunta é único e fixo (não multi-evento nesta versão)
- Dispositivos móveis são suporte primário — o formulário deve ser responsivo
