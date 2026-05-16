# CLAUDE.md

Este arquivo fornece orientações ao Claude Code (claude.ai/code) ao trabalhar com o código neste repositório.

<!-- SPECKIT START -->
Para contexto adicional sobre tecnologias, estrutura do projeto,
comandos de shell e outras informações importantes, leia o plano atual.
<!-- SPECKIT END -->

## Visão geral do projeto

Landing page para **Mulheres Primeiro Lugar**, construída com Next.js (App Router) e TypeScript. Hospedada gratuitamente na Vercel. Para princípios, convenções e decisões tecnológicas, consulte [.specify/memory/constitution.md](.specify/memory/constitution.md).

## Comandos

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Verificar tipos TypeScript
npm run ts-check

# Lint
npm run lint

# Gerar build de produção
npm run build

# Visualizar build de produção localmente
npm run start
```

## Estrutura do projeto

Todo o código-fonte fica em `src/`:

```
src/
├── app/                  # Rotas, layouts e páginas (App Router)
│   ├── layout.tsx        # Layout raiz: Providers, ToastContainer, fontes, metadados globais
│   ├── page.tsx          # Rota / (homepage — a landing page)
│   ├── globals.css       # Estilos globais e configuração do Tailwind v4
│   └── providers.tsx     # NextUIProvider e outros providers globais
├── components/           # Componentes de UI reutilizáveis
│   └── [dominio]/
│       ├── index.ts      # Barrel export do domínio
│       ├── *-content.tsx # Estrutura visual da seção/página
│       └── *-form.tsx    # Componentes com estado client-side
├── features/             # Server Actions organizadas por domínio
│   └── [dominio]/
│       ├── index.ts
│       └── *.ts          # "use server" — lógica de servidor
└── lib/                  # Utilitários e helpers compartilhados
    └── content.ts        # Conteúdo estático da landing page
```

## Providers globais

`<NextUIProvider>` e `<ToastContainer>` já estão em `src/app/layout.tsx` — disponíveis em todas as páginas sem configuração adicional.
