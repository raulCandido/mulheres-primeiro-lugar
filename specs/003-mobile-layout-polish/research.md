# Research: Refinamento Visual e UX Mobile-First

## Decisão 1: Substituição dos emojis nos botões de avaliação (1–5)

**Decision**: Exibir apenas o número da nota em tipografia destacada, sem emoji.

**Rationale**: Números são universalmente compreendidos no contexto de avaliação. Eliminam dependência do sistema de renderização de emoji (que varia entre Android/iOS/browsers), mantêm o visual premium e são mais legíveis em telas pequenas.

**Alternatives considered**:
- Ícones SVG (estrelas, corações): adicionam dependência ou assets extras; menos minimalista.
- Emoji mantido: vai contra o requisito de remoção total.
- Barras de cor progressiva: reduz clareza da escala numérica.

---

## Decisão 2: Substituição do emoji de sucesso no formulário (🌸)

**Decision**: Substituir por um ícone SVG inline de checkmark em círculo, renderizado via Tailwind, sem biblioteca de ícones adicional.

**Rationale**: SVG inline é zero-dependency, renderiza identicamente em todos os dispositivos e pode ser animado com Framer Motion já existente no projeto. Mantém a estética premium.

**Alternatives considered**:
- Emoji mantido: não atende o requisito.
- Imagem PNG/WebP: adiciona asset desnecessário.
- Biblioteca de ícones (Heroicons, Lucide): adiciona dependência não prevista na constitution.

---

## Decisão 3: Substituição dos emojis nos experience cards

**Decision**: Remover a exibição do emoji e manter apenas título e nome do palestrante. O card se torna puramente tipográfico.

**Rationale**: Cards puramente tipográficos são mais sofisticados, mais fáceis de manter e eliminam inconsistências de renderização entre plataformas. A ausência de emoji já eleva o visual.

**Alternatives considered**:
- Substituir por ícone SVG temático: requer criação ou importação de 15 ícones diferentes — escopo excessivo.
- Substituir por letra inicial destacada: risco de parecer genérico.

---

## Decisão 4: Substituição dos ícones de redes sociais e e-mail no footer

**Decision**: Remover os emojis de ícone (📸, 💬, 📧) dos links sociais e de e-mail. Manter apenas o label textual.

**Rationale**: Texto puro é mais acessível, mais confiável entre plataformas e suficiente para links de redes sociais com labels claros ("Instagram", "WhatsApp").

**Alternatives considered**:
- SVG inline por rede social: requer importação de assets; fora do escopo desta feature.

---

## Decisão 5: Escala de espaçamento mobile-first

**Decision**: Adotar `px-5` como margem lateral mínima em viewports mobile (≥20px), escalando para `px-6` em sm+. Padding interno dos cards: `p-8` mobile → `p-10` md+. Botão CTA hero e submit: `px-10 py-4` → `px-12 py-5`.

**Rationale**: 20px de margem lateral é o padrão amplamente adotado em landing pages mobile-first (Material Design 3, Apple HIG). Aumentar 1 step de padding nos botões cria área de respiro sem comprometer hierarquia visual.

**Alternatives considered**:
- `px-4` (16px): insuficiente para sensação de respiro.
- `px-8` (32px): reduz muito a área de conteúdo em telas pequenas.

---

## Decisão 6: Interface ExperienceCard e RatingOption — campos emoji

**Decision**: Remover os campos `emoji` das interfaces `ExperienceCard` e `RatingOption` em `content.ts`, e o campo `icon` de `SocialLink`. Atualizar todos os dados e componentes correspondentes.

**Rationale**: Manter campos não utilizados polui os tipos e pode confundir futuras contribuições. A remoção é segura — nenhum outro arquivo depende desses campos além dos componentes que serão atualizados.

**Alternatives considered**:
- Manter os campos e ignorar nos componentes: cria dead code e inconsistência.
