# Feature Specification: Landing Page — Mulheres Primeiro Lugar

**Feature Branch**: `001-formulario-avaliacao-evento`

**Created**: 2026-05-16

**Status**: Draft

**Input**: Landing page moderna, sofisticada e emocionalmente envolvente para o evento exclusivo feminino "Mulheres Primeiro Lugar", que **já foi realizado**. Objetivo principal: coletar feedback pós-evento de participantes de forma rápida e simples por meio de um formulário de avaliação com notas de 0 a 5 e campo opcional de comentário. A página é compartilhada diretamente com as participantes — não é pública para captação. A identidade visual deve ser premium (rosa queimado, nude, dourado, vinho, preto sofisticado, glassmorphism, gradientes suaves e animações leves), transmitindo acolhimento, empoderamento, sofisticação e exclusividade.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Explorar a Proposta do Evento e Navegar até o Formulário (Priority: P1)

A participante do evento chega à landing page (compartilhada pós-evento). A hero section a acolhe emocionalmente, celebrando a experiência vivida e convidando-a a compartilhar sua opinião. Ela rola a página, revisita as experiências do evento e é conduzida naturalmente ao formulário de avaliação.

**Why this priority**: É o ponto de entrada. Se o acolhimento emocional não for imediato, a participante abandona a página sem chegar ao formulário.

**Independent Test**: Acessar a landing page, verificar que a hero section exibe headline, subtítulo e CTA; rolar a página e confirmar que as seções aparecem na ordem correta (hero → sobre o evento → experiências → formulário → rodapé).

**Acceptance Scenarios**:

1. **Given** a participante acessa a landing page, **When** a página carrega, **Then** a hero section é exibida com headline emocional celebrando a experiência vivida, subtítulo acolhedor e botão CTA visível
2. **Given** a participante está na hero section, **When** clica no CTA, **Then** a página rola suavemente até o formulário de avaliação
3. **Given** a participante rola a página, **When** passa pela seção de experiências, **Then** 15 cards são exibidos com ícones, títulos e efeito de hover elegante
4. **Given** a participante está em um dispositivo móvel, **When** acessa a landing page, **Then** todo o conteúdo é legível e utilizável sem zoom ou scroll horizontal

---

### User Story 2 - Avaliar o Evento com Nota (Priority: P1)

A participante chega ao formulário, visualiza a pergunta "O que você achou do nosso evento?" e seleciona uma das 6 opções de avaliação (0 a 5). Ao selecionar, recebe feedback visual imediato que confirma sua escolha antes de enviar.

**Why this priority**: É o núcleo da landing page. Sem a coleta da nota, o objetivo principal de validar aceitação do evento não é atingido.

**Independent Test**: Exibir o formulário isoladamente, clicar em cada uma das 6 opções e verificar o estado visual resultante (destaque, animação, label de texto correspondente ao valor selecionado).

**Acceptance Scenarios**:

1. **Given** o formulário está visível, **When** a participante clica na nota 5 (Excelente), **Then** o elemento é destacado visualmente com animação suave e o label "Excelente" está evidenciado
2. **Given** a participante selecionou a nota 3 (Bom), **When** clica na nota 1 (Ruim), **Then** a seleção anterior é desmarcada e a nova nota fica destacada
3. **Given** nenhuma nota foi selecionada, **When** a participante tenta enviar, **Then** o botão "Enviar Avaliação" permanece desabilitado ou exibe indicação visual clara de que a nota é obrigatória
4. **Given** a participante seleciona a nota 0 (Muito Ruim), **When** observa o formulário, **Then** a opção 0 é tratada igualmente às demais — sem julgamento visual diferenciado

---

### User Story 3 - Enviar Avaliação e Receber Confirmação (Priority: P1)

Com a nota selecionada, a participante clica em "Enviar Avaliação" e recebe uma mensagem de agradecimento elegante com animação suave que substitui o formulário, transmitindo acolhimento e confirmação do envio.

**Why this priority**: Sem confirmação visual, a participante não sabe se o envio funcionou, o que gera desconfiança e percepção negativa do evento.

**Independent Test**: Com nota pré-selecionada, clicar em "Enviar Avaliação" e validar que a mensagem de agradecimento é exibida com animação em menos de 3 segundos, e que o formulário não é mais visível.

**Acceptance Scenarios**:

1. **Given** a nota 4 está selecionada e o campo de comentário está vazio, **When** a participante clica em "Enviar Avaliação", **Then** o formulário é substituído por mensagem de agradecimento com animação suave em menos de 3 segundos
2. **Given** o formulário foi enviado com sucesso, **When** a mensagem de agradecimento aparece, **Then** o tom é acolhedor e positivo, sem linguagem técnica ou fria
3. **Given** o envio está em processamento, **When** a participante observa o botão, **Then** o botão está desabilitado e exibe indicação de carregamento, impedindo duplo clique

---

### User Story 4 - Adicionar Comentário Opcional (Priority: P2)

Além da nota, a participante pode optar por deixar uma sugestão ou comentário em texto livre. O campo é claramente marcado como opcional e possui visual acolhedor que convida — mas não obriga — o preenchimento.

**Why this priority**: Agrega valor qualitativo às avaliações sem bloquear ou aumentar a fricção da experiência principal.

**Independent Test**: Preencher o campo de comentário e enviar — verificar que o comentário é incluído nos dados coletados; enviar sem preencher — verificar que o envio ocorre normalmente sem erros de validação.

**Acceptance Scenarios**:

1. **Given** o campo de sugestão está visível, **When** a participante clica nele, **Then** a borda exibe efeito de foco elegante, diferenciado do estado padrão
2. **Given** o campo está vazio, **When** a participante envia a avaliação apenas com nota, **Then** o envio é processado sem erros de validação
3. **Given** a participante preencheu o campo de comentário, **When** o formulário é enviado, **Then** o comentário é incluído nos dados da avaliação enviados por e-mail

---

### User Story 5 - Acessar Informações de Contato e Redes Sociais (Priority: P3)

A participante, ao final da página, encontra o rodapé com as redes sociais do evento, branding, contato e uma mensagem acolhedora final que reforça a identidade do evento.

**Why this priority**: Reforça a credibilidade do evento e oferece um canal adicional de engajamento sem desviar do objetivo principal da página.

**Independent Test**: Rolar até o rodapé e verificar que links de redes sociais, informações de contato e branding do evento são exibidos.

**Acceptance Scenarios**:

1. **Given** a participante está no rodapé, **When** visualiza a seção, **Then** o nome/branding do evento, links de redes sociais, informação de contato e mensagem final estão presentes
2. **Given** a participante clica em um link de rede social, **Then** é direcionada ao perfil correspondente em uma nova aba

---

### Edge Cases

- O que acontece se a conexão cair durante o envio? → Exibir mensagem de erro amigável (não técnica) e permitir nova tentativa sem perder os dados preenchidos
- O que acontece se o serviço de e-mail retornar erro? → Exibir mensagem de erro acolhedora sem expor detalhes técnicos
- O que acontece se a participante tentar enviar sem selecionar nota? → Botão desabilitado ou feedback visual claro de campo obrigatório
- O que acontece se o comentário for extremamente longo? → Limitar a 1000 caracteres com contador visual
- A participante pode reenviar após ver a mensagem de agradecimento? → Não — a mensagem de agradecimento é o estado final da sessão
- O que acontece se a participante acessa de um dispositivo com tela muito pequena (320px)? → A página deve permanecer utilizável e legível
- O que acontece se um bot preencher o campo honeypot e tentar enviar? → A submissão é silenciosamente rejeitada; nenhum dado é coletado e nenhum e-mail é enviado — a bot não recebe sinal de que foi bloqueada

## Requirements *(mandatory)*

### Functional Requirements

#### Hero Section

- **FR-001**: A seção hero DEVE exibir uma headline emocional que celebre a experiência vivida pelas participantes, um subtítulo acolhedor convidando ao compartilhamento de feedback e um botão CTA chamativo que rola suavemente até o formulário de avaliação; o copy (headline, subtítulo e CTA) é criado pelo desenvolvedor, definido como constante no código e alinhado ao tom do evento
- **FR-002**: A seção hero DEVE apresentar um background visual com mulheres diversas em ambiente sofisticado e acolhedor, transmitindo sensação de celebração, autoestima e gratidão pela experiência compartilhada

#### Sobre o Evento

- **FR-003**: A seção "Sobre o Evento" DEVE apresentar o evento como: "Um encontro criado por mulheres e para mulheres, focado em experiências, autocuidado, empreendedorismo, sensualidade saudável, bem-estar, liberdade e conexão feminina."

#### Experiências do Evento

- **FR-004**: A seção de experiências DEVE exibir 15 cards modernos e elegantes para as seguintes experiências: Palestra de Sexologia (Brenda Genes), Massagem Tântrica Terapêutica (Nayade Benicio), Defesa Pessoal Feminina (Analia Oliveira), Pole Dance Experience (Pilar Fernandez), Feira Empreendedora Feminina, Serviços de Beleza, Bartender & Drinks, Epilação e Estética, Espaço de Tatuagem, Refeições no Local, Spa Facial, Massagem Relaxante, Reflexologia, Nutricionista e Espaço Fotográfico Instagramável
- **FR-005**: Cada card DEVE possuir ícone representativo, título da experiência, efeito de hover elegante e animação suave de entrada ao entrar no viewport

#### Formulário de Avaliação

- **FR-006**: O formulário DEVE exibir a pergunta "O que você achou do nosso evento?" como título principal visível
- **FR-007**: O sistema DEVE apresentar 6 opções de avaliação com as seguintes correspondências: 0=Muito Ruim, 1=Ruim, 2=Regular, 3=Bom, 4=Muito Bom, 5=Excelente
- **FR-008**: Cada opção DEVE ter efeito visual de hover e animação suave ao ser selecionada, com botões grandes e visual premium (podendo utilizar emojis, estrelas ou círculos interativos)
- **FR-009**: A participante DEVE poder alterar a nota selecionada antes do envio — apenas uma nota pode estar ativa por vez
- **FR-010**: O formulário DEVE conter um campo de texto NÃO obrigatório com placeholder acolhedor para sugestões ou comentários, limitado a 1000 caracteres
- **FR-011**: O botão "Enviar Avaliação" DEVE estar desabilitado até que uma nota seja selecionada
- **FR-012**: Durante o processamento do envio, o botão DEVE ser desabilitado para prevenir submissões duplicadas
- **FR-013**: Após envio bem-sucedido, o formulário DEVE ser substituído por mensagem de agradecimento com animação suave e tom acolhedor
- **FR-014**: O sistema DEVE enviar por e-mail os dados da avaliação (nota, label correspondente, comentário opcional, timestamp) ao responsável configurado
- **FR-015**: Em caso de falha no envio, o sistema DEVE exibir mensagem de erro amigável e permitir nova tentativa sem perder os dados preenchidos
- **FR-021**: O formulário DEVE incluir um campo honeypot invisível para a participante — envios que preencham esse campo (bots) devem ser silenciosamente rejeitados sem expor o mecanismo de proteção

#### Rodapé

- **FR-016**: O rodapé DEVE conter branding do evento, links para redes sociais, informações de contato e uma mensagem acolhedora final

#### Experiência Visual e UX

- **FR-017**: A página DEVE ser totalmente responsiva com abordagem mobile-first, funcionando em dispositivos a partir de 320px de largura
- **FR-018**: A navegação entre seções DEVE utilizar scroll suave
- **FR-019**: A identidade visual DEVE utilizar a paleta: rosa queimado, nude, dourado, vinho e preto sofisticado, com efeitos de glassmorphism, gradientes suaves e iluminação discreta
- **FR-020**: A página DEVE incluir microinterações premium: transições fluidas, efeitos de transparência, sombras elegantes e animações leves de entrada (scroll-triggered)

### Key Entities

- **Avaliação**: Nota numérica (0–5), label textual da nota, comentário opcional (string, máx. 1000 caracteres), timestamp do envio
- **Experiência do Evento**: Nome da experiência, nome do profissional responsável (quando aplicável), ícone representativo
- **Notificação**: E-mail enviado ao responsável com os dados da avaliação formatados de forma legível

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A participante completa a avaliação (selecionar nota + clicar enviar) em menos de 30 segundos a partir do momento em que o formulário se torna visível
- **SC-002**: 85% das visitantes que rolam até o formulário completam o envio (taxa de conversão do formulário)
- **SC-003**: A mensagem de confirmação aparece em menos de 3 segundos após o clique em "Enviar Avaliação"
- **SC-004**: Taxa de abandono da página inferior a 30% antes de atingir a seção do formulário
- **SC-005**: A página carrega e exibe o conteúdo principal em menos de 3 segundos em conexão 4G
- **SC-006**: O formulário é utilizável integralmente em dispositivos móveis sem scroll horizontal ou elementos cortados
- **SC-007**: A participante compreende imediatamente a proposta do evento ao visualizar a hero section, sem necessidade de ler todo o conteúdo da página

## Assumptions

- O evento **já foi realizado** — a landing page é compartilhada pós-evento diretamente com as participantes (por link, WhatsApp ou e-mail), não é uma página pública de captação
- Uma avaliação por sessão é suficiente — sem autenticação ou controle de acesso por participante
- O e-mail destinatário das avaliações é configurado via variável de ambiente no servidor
- O formulário e toda a landing page são exclusivamente em português (BR)
- Não há necessidade de dashboard, histórico ou relatórios — os dados chegam por e-mail
- O evento referenciado é único e fixo nesta versão (não multi-evento)
- Imagens do background da hero section serão fornecidas ou utilizadas imagens de stock adequadas ao contexto como placeholder inicial
- As redes sociais do evento serão configuradas no código como constantes (Instagram, WhatsApp ou similares)
- Acessibilidade básica (navegação por teclado, contraste mínimo) é esperada, mas WCAG 2.1 AA completo não é requisito desta versão
- Conformidade com LGPD está fora do escopo — o formulário é tratado como ferramenta interna de feedback, sem aviso de privacidade ou checkbox de consentimento
- O copy da hero section (headline, subtítulo, CTA) é criado pelo desenvolvedor e definido como constante no código — não depende de aprovação ou entrega externa da organizadora
- O conteúdo dos cards de experiências (nomes de profissionais e experiências) é fixo e definido no código, sem painel de administração

## Clarifications

### Session 2026-05-16

- Q: O formulário avalia um evento que já aconteceu ou é para medir o interesse antes de o evento acontecer? → A: Evento já aconteceu — formulário coleta feedback real de quem participou
- Q: O formulário precisa de algum mecanismo de proteção contra envios abusivos ou duplicados? → A: Honeypot oculto no formulário — bloqueia bots sem afetar a experiência da participante
- Q: Os dados da avaliação devem ser armazenados em algum lugar além do e-mail? → A: Apenas e-mail — sem banco de dados, planilha ou armazenamento adicional nesta versão
- Q: O formulário precisa de aviso de privacidade ou checkbox de consentimento LGPD? → A: Nenhum aviso — tratar como formulário interno sem obrigação LGPD
- Q: O texto da headline e do subtítulo da hero section será criado pelo desenvolvedor ou fornecido pela organizadora? → A: Desenvolvedor cria o copy — textos definidos no código como constantes, alinhados ao tom do evento
