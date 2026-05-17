# Research: Landing Page — Mulheres Primeiro Lugar

**Feature**: `001-formulario-avaliacao-evento` | **Date**: 2026-05-16

## 1. Paleta de Cores

**Decisão**: Variáveis CSS nativas em `globals.css` via Tailwind v4 CSS-first.

| Token | Nome | Hex | Uso principal |
|-------|------|-----|---------------|
| `--color-rose-burnt` | Rosa queimado | `#C4717A` | Destaques, botões primários, hover do CTA |
| `--color-nude` | Nude | `#E8D5C4` | Backgrounds suaves, texto secundário |
| `--color-gold` | Dourado | `#C9A84C` | Bordas premium, ícones de destaque, labels |
| `--color-wine` | Vinho | `#7B2D42` | Gradientes profundos, estados ativos |
| `--color-black-soft` | Preto sofisticado | `#120A0E` | Background principal, texto |
| `--color-glass-bg` | Glassmorphism bg | `rgba(255,255,255,0.05)` | Cards, formulário |
| `--color-glass-border` | Glassmorphism border | `rgba(201,168,76,0.25)` | Bordas douradas translúcidas |

**Racional**: Combinação escuro (vinho/preto) com acentos quentes (dourado/rosa) cria o contraste premium necessário. O dourado translúcido nas bordas dos cards glassmorphism reforça o aspecto exclusivo.

**Alternativas consideradas**: Paleta pastéis suaves (rejeitada — não transmite sofisticação); branco dominante (rejeitado — perde o aspecto premium noturno).

---

## 2. Glassmorphism com Tailwind CSS v4

**Decisão**: Utilitários nativos do Tailwind + variáveis CSS; sem plugin adicional.

```css
/* globals.css */
.glass-card {
  background: var(--color-glass-bg);
  border: 1px solid var(--color-glass-border);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
```

**Racional**: Tailwind v4 suporta `backdrop-blur-*` como utilitário nativo. A classe auxiliar `.glass-card` encapsula o padrão repetido sem quebrar a abordagem utility-first.

**Alternativas consideradas**: CSS-in-JS (rejeitado — viola constituição); plugin tailwind-glassmorphism (rejeitado — dependência desnecessária).

---

## 3. Animações Scroll-Triggered com Framer Motion

**Decisão**: Usar `whileInView` + `viewport={{ once: true }}` em componentes `"use client"` isolados.

```typescript
// Padrão para cards de experiências
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-60px" }}
  transition={{ duration: 0.5, ease: "easeOut" }}
>
```

**Racional**: `whileInView` é o padrão recomendado pelo Framer Motion para App Router — sem `useEffect` ou `IntersectionObserver` manual. `once: true` garante que a animação não re-execute ao rolar de volta, preservando performance.

**Alternativas consideradas**: CSS `@keyframes` + Intersection Observer (rejeitado — mais código boilerplate); `useScroll` (rejeitado — para parallax, desnecessário aqui).

---

## 4. Componente de Rating (0–5)

**Decisão**: Botões interativos circulares com número + label + emoji, controlados via `useState`.

| Valor | Label | Emoji |
|-------|-------|-------|
| 0 | Muito Ruim | 😞 |
| 1 | Ruim | 😕 |
| 2 | Regular | 😐 |
| 3 | Bom | 🙂 |
| 4 | Muito Bom | 😊 |
| 5 | Excelente | 🤩 |

**Racional**: Botões grandes e circulares com emoji são visualmente memoráveis, rápidos de compreender e funcionam bem em mobile. O label abaixo do emoji garante acessibilidade (não depende apenas de emojis). Implementado com NextUI `Button` + estado controlado em `evaluation-form.tsx`.

**Alternativas consideradas**: Estrelas clicáveis (rejeitado — ambíguo se vai de 1 a 5 ou 0 a 5); slider (rejeitado — maior fricção em mobile); apenas números (rejeitado — menos emocional e instagramável).

---

## 5. Honeypot no Server Action

**Decisão**: Campo `_trap` oculto via CSS (não `type="hidden"`), verificado no servidor antes de qualquer processamento.

```typescript
// submit-evaluation.ts
const trap = formData.get("_trap");
if (trap && trap.toString().trim() !== "") {
  return { success: true }; // resposta falsa positiva para não sinalizar ao bot
}
```

**Racional**: Usar `visibility: hidden; position: absolute` em vez de `type="hidden"` porque bots frequentemente ignoram campos hidden mas preenchem campos CSS-ocultos. A resposta falsa positiva (`success: true`) evita que bots identifiquem o mecanismo de proteção.

**Alternativas consideradas**: Rate limiting por IP (rejeitado — Vercel free plan tem limitações para edge middleware); reCAPTCHA (rejeitado — adiciona fricção e depende de conta Google).

---

## 6. Template de E-mail (Resend)

**Decisão**: E-mail em HTML simples com as informações da avaliação; sem template React/JSX para manter a dependência mínima.

**Campos incluídos**:
- Nota (número + label + emoji)
- Comentário (se fornecido)
- Timestamp (data/hora do envio, fuso horário de Brasília)

**Racional**: Resend suporta HTML string diretamente. Um template React (react-email) seria uma dependência extra desnecessária para um e-mail tão simples.

---

## 7. Tipografia

**Decisão**: `Playfair Display` (serifada) para headlines + `Inter` (sem serifa) para corpo de texto — ambas via `next/font/google`.

**Racional**: `Playfair Display` transmite elegância e sofisticação feminina. `Inter` garante legibilidade máxima no corpo. A combinação é a dupla premium-moderna mais comum em wellness e eventos exclusivos.

---

## 8. Ícones das Experiências

**Decisão**: Usar emojis como ícones nos cards de experiência — sem biblioteca de ícones adicional.

**Racional**: Emojis são universais, não exigem dependência, funcionam em todos os dispositivos e têm apelo visual imediato. A estilização do card garante a aparência premium sem depender do ícone em si.

**Alternativas consideradas**: Lucide React (rejeitado — adiciona dependência e os ícones disponíveis não capturam bem o universo wellness/feminino); Heroicons (mesmo motivo).
