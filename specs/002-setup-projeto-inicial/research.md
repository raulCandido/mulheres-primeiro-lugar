# Research: Estrutura Inicial do Projeto

**Feature**: 002-setup-projeto-inicial
**Data**: 2026-05-16

## 1. Inicialização do projeto Next.js 14 com Tailwind CSS v4

**Decisão**: Inicializar via `create-next-app` com flags específicas, depois substituir Tailwind v3 (padrão do CLI) pelo v4 manualmente.

**Racional**: O CLI do Next.js 14 ainda instala Tailwind CSS v3 por padrão. Como a constituição exige v4, o processo correto é:
1. Rodar `create-next-app` com TypeScript, App Router, src/, alias @/ e sem Tailwind
2. Instalar Tailwind CSS v4 via `npm install tailwindcss@4 @tailwindcss/postcss`
3. Configurar `postcss.config.mjs` com o plugin do Tailwind v4
4. Substituir `globals.css` pelo padrão CSS-first (`@import "tailwindcss"`)

**Alternativa rejeitada**: Instalar com Tailwind v3 e fazer upgrade — mais etapas, maior risco de conflito de configuração.

---

## 2. Tailwind CSS v4 — configuração CSS-first

**Decisão**: Sem `tailwind.config.ts`. Toda customização em `globals.css` via `@theme` e variáveis CSS nativas.

**Racional**: Tailwind v4 adota configuração CSS-first. O arquivo `globals.css` deve conter:
```css
@import "tailwindcss";

@theme {
  --font-sans: "Inter", sans-serif;
  --font-serif: "Playfair Display", serif;
  /* cores, espaçamentos customizados aqui */
}
```

**Dark mode via `prefers-color-scheme`**: Em Tailwind v4, o dark mode responde automaticamente à preferência do sistema quando configurado via variantes CSS nativas — sem classe `.dark` no `<html>`. Configuração em `globals.css`:
```css
@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}
```

**Alternativa rejeitada**: `darkMode: 'class'` exigiria lógica JS para alternar a classe no `<html>` — conflito com o requisito "sem JS adicional".

---

## 3. NextUI v2.6 — App Router setup

**Decisão**: Criar `src/app/providers.tsx` como Client Component contendo `<NextUIProvider>`. Importar em `layout.tsx`.

**Racional**: NextUI exige `"use client"` no provider. O padrão recomendado pela documentação NextUI para App Router é encapsular em um arquivo `providers.tsx` separado para não marcar o layout inteiro como client component.

```tsx
// providers.tsx
"use client";
import { NextUIProvider } from "@nextui-org/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
```

**Alternativa rejeitada**: Colocar `"use client"` diretamente em `layout.tsx` — tornaria o layout inteiro um client component, perdendo os benefícios de server rendering.

---

## 4. React Toastify 11.x — integração com App Router

**Decisão**: Importar `<ToastContainer>` dentro de `providers.tsx` (já client component), junto com `import "react-toastify/dist/ReactToastify.css"`.

**Racional**: `ToastContainer` é um client component e o CSS deve ser importado uma única vez globalmente. O `providers.tsx` já está marcado como `"use client"`, sendo o lugar correto.

**Alternativa rejeitada**: Importar em `globals.css` — o CSS do Toastify não é compatível com a sintaxe de import do Tailwind v4 CSS-first sem configuração adicional.

---

## 5. Fontes — Playfair Display + Inter via next/font

**Decisão**: Carregar ambas as fontes em `src/app/layout.tsx` via `next/font/google` e expor como variáveis CSS.

**Racional**: `next/font` otimiza automaticamente o carregamento (self-hosted, sem requisição extra ao Google no runtime). O padrão é expor as fontes como variáveis CSS para uso no Tailwind:

```tsx
import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
```

Aplicar no `<body>`: `className={`${inter.variable} ${playfair.variable}`}`

As variáveis `--font-inter` e `--font-playfair` são referenciadas no `@theme` do `globals.css`.

**Alternativa rejeitada**: Carregar fontes via `<link>` em `<head>` — sem otimização, com request extra, contrário ao padrão Next.js.

---

## 6. Framer Motion 12.x — compatibilidade com App Router

**Decisão**: Componentes que usam Framer Motion devem ser marcados com `"use client"`. Na estrutura inicial (shells), não há animações — Framer Motion fica apenas como dependência instalada.

**Racional**: Framer Motion usa hooks do React que requerem client-side. Os shells da estrutura inicial não terão animações; a dependência é instalada agora para não gerar conflito de versão quando as features de animação forem adicionadas.

**Alternativa rejeitada**: Não instalar agora e instalar depois — risco de conflito com versões de React/Next.js que já estarão fixadas no lock file.

---

## 7. Metadados SEO e og:image placeholder

**Decisão**: Exportar `metadata` de `src/app/layout.tsx` com todos os campos obrigatórios. Para `og:image`, usar uma imagem estática simples em `public/og-image.png` (1200×630).

**Racional**: A API `Metadata` do Next.js 14 é o padrão da constituição. A imagem `og-image.png` pode ser gerada com qualquer ferramenta (ou criada com cor sólida + texto). Deve estar em `public/` para ser servida estaticamente.

**Estrutura do metadata**:
```tsx
export const metadata: Metadata = {
  title: "Mulheres Primeiro Lugar",
  description: "[placeholder — preencher antes do lançamento]",
  openGraph: {
    title: "Mulheres Primeiro Lugar",
    description: "[placeholder]",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};
```

---

## 8. Conteúdo estático — estrutura de content.ts

**Decisão**: Exportar um objeto `content` tipado com uma interface por seção. Cada seção tem ao menos `title` e `description` (placeholder).

**Racional**: Centralizar em um único arquivo tipado facilita substituição de conteúdo sem tocar em nenhum componente. TypeScript garante que nenhum campo fique faltando.

**Alternativa rejeitada**: Exportar constantes separadas por arquivo — mais fragmentação, mais imports nos componentes.

---

## 9. Estrutura de pastas — domínios em components/

**Decisão**: Criar um domínio por seção: `hero/`, `about/`, `features/`, `testimonials/`, `cta/`, `footer/`. Cada um com `*-content.tsx` + `index.ts`.

**Racional**: Alinhado com a constituição. O domínio `cta/` terá apenas `cta-content.tsx` agora (shell); o `src/features/cta/` receberá a Server Action na feature do formulário.

**Alternativa rejeitada**: Componentes diretamente em `components/` sem subpastas — viola a convenção da constituição e dificulta organização quando houver múltiplos arquivos por domínio.
