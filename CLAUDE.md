# CLAUDE.md

Este arquivo fornece orientações ao Claude Code (claude.ai/code) ao trabalhar com o código neste repositório.

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

# Validar mudanças (rodar antes de commitar)
npm run ts-check && npm run lint
```

## Plano de implementação ativo

Feature em andamento: **Estrutura Inicial do Projeto** (`002-setup-projeto-inicial`)
Plano completo: [specs/002-setup-projeto-inicial/plan.md](specs/002-setup-projeto-inicial/plan.md)
Quickstart: [specs/002-setup-projeto-inicial/quickstart.md](specs/002-setup-projeto-inicial/quickstart.md)

## Variáveis de ambiente

Crie um `.env.local` na raiz com:

```bash
RESEND_API_KEY=re_...   # Chave da API Resend para envio de e-mail via Server Action
```

No deploy, configure `RESEND_API_KEY` no painel da Vercel (variável server-side).

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
│   └── [dominio]/        # ex: hero/, cta/, footer/
│       ├── index.ts      # Barrel export do domínio
│       ├── *-content.tsx # Estrutura visual da seção/página
│       └── *-form.tsx    # Componentes com estado client-side
├── features/             # Server Actions organizadas por domínio
│   └── [dominio]/        # ex: cta/
│       ├── index.ts
│       └── *.ts          # "use server" — lógica de servidor
└── lib/                  # Utilitários e helpers compartilhados
    └── content.ts        # Conteúdo estático da landing page
```

## Ordem das seções

A ordem canônica das seções da landing page está definida em [.specify/memory/constitution.md](.specify/memory/constitution.md) e deve ser respeitada ao criar ou reorganizar componentes.

## Providers globais

`<NextUIProvider>` e `<ToastContainer>` já estão em `src/app/layout.tsx` — disponíveis em todas as páginas sem configuração adicional.

## Clarificações

### Sessão 2026-05-16

- Q: O bloco SPECKIT deve referenciar o quê? → A: Removido — a constitution já serve de referência principal
- Q: Qual variável de ambiente é necessária localmente? → A: `RESEND_API_KEY`
- Q: Como validar mudanças de código? → A: `npm run ts-check && npm run lint`
- Q: Quais domínios existem ou são previstos? → A: `hero`, `cta`, `footer`
- Q: A ordem das seções deve ser seguida? → A: Sim — referenciar a constitution como fonte única da ordem
