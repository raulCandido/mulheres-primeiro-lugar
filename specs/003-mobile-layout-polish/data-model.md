# Data Model: Refinamento Visual e UX Mobile-First

Esta feature é exclusivamente de refinamento visual/UX. Não há novos modelos de dados, banco de dados ou estado persistente. As únicas mudanças de "modelo" são nas interfaces TypeScript em `src/lib/content.ts`.

## Alterações nas interfaces de conteúdo

### RatingOption (antes)
```ts
interface RatingOption {
  value: 0 | 1 | 2 | 3 | 4 | 5;
  label: string;
  emoji: string;  // REMOVER
}
```

### RatingOption (depois)
```ts
interface RatingOption {
  value: 0 | 1 | 2 | 3 | 4 | 5;
  label: string;
}
```

---

### ExperienceCard (antes)
```ts
interface ExperienceCard {
  title: string;
  speaker?: string;
  emoji: string;  // REMOVER
}
```

### ExperienceCard (depois)
```ts
interface ExperienceCard {
  title: string;
  speaker?: string;
}
```

---

### SocialLink (antes)
```ts
interface SocialLink {
  label: string;
  href: string;
  icon: string;  // REMOVER
}
```

### SocialLink (depois)
```ts
interface SocialLink {
  label: string;
  href: string;
}
```

---

## Campos de texto com emojis a remover em `content.ts`

| Campo | Conteúdo atual | Ação |
|---|---|---|
| `evaluation.commentPlaceholder` | `"...qualquer mensagem que queira deixar para nós 💛"` | Remover 💛 |
| `evaluation.successMessage` | `"Obrigada de coração! 🌸"` | Remover 🌸 |
| `evaluation.successSubtitle` | sem emoji | Sem alteração |
| `footer.closingMessage` | `"...Até a próxima! 💕"` | Remover 💕 |
| todos os `items[].emoji` | vários emojis | Remover campos |
| todos os `socialLinks[].icon` | `"📸"`, `"💬"` | Remover campos |

## Impacto em cascata

- `src/components/evaluation/evaluation-form.tsx` — remover renderização de `opt.emoji`
- `src/components/experiences/experience-card.tsx` — remover prop `emoji` e seu span
- `src/components/footer/footer-content.tsx` — remover `link.icon` e `📧` inline
