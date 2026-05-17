# Quickstart — Landing Page Mulheres Primeiro Lugar

**Feature**: `001-formulario-avaliacao-evento` | **Date**: 2026-05-16

## Pré-requisitos

- Node.js 18+ instalado
- Conta no [Resend](https://resend.com) com domínio verificado (ou usar e-mail de teste `onboarding@resend.dev` em desenvolvimento)
- `RESEND_API_KEY` disponível

## Setup local

```bash
# 1. Instalar dependências
npm install

# 2. Criar arquivo de variáveis de ambiente
cp .env.example .env.local  # se existir, senão criar manualmente

# 3. Preencher .env.local
RESEND_API_KEY=re_...
RESEND_TO_EMAIL=seu-email@dominio.com
RESEND_FROM_EMAIL=noreply@seudominio.com  # deve ser verificado no Resend

# 4. Iniciar servidor de desenvolvimento
npm run dev
```

A landing page estará disponível em `http://localhost:3000`.

## Validação antes de commitar

```bash
npm run ts-check && npm run lint
```

Ambos devem passar sem erros antes de qualquer commit.

## Estrutura dos arquivos principais desta feature

| Arquivo | Responsabilidade |
|---------|-----------------|
| `src/lib/content.ts` | Todo o conteúdo estático (copy, cards, opções de rating) |
| `src/app/page.tsx` | Composição das seções da landing page |
| `src/app/globals.css` | Paleta de cores, glassmorphism, animações base |
| `src/components/hero/hero-content.tsx` | Hero section celebratória |
| `src/components/about/about-content.tsx` | Descrição do evento |
| `src/components/experiences/experiences-content.tsx` | Grid de 15 cards |
| `src/components/experiences/experience-card.tsx` | Card individual animado |
| `src/components/evaluation/evaluation-form.tsx` | Formulário interativo (client) |
| `src/features/evaluation/submit-evaluation.ts` | Server Action + Resend |

## Ordem das seções na página

```
Hero → Sobre o Evento → Experiências → Formulário de Avaliação → Rodapé
```

## Testando o formulário localmente

1. Acesse `http://localhost:3000`
2. Role até o formulário de avaliação
3. Selecione uma nota (0–5)
4. Opcionalmente preencha o campo de comentário
5. Clique em "Enviar Avaliação"
6. Verifique o e-mail configurado em `RESEND_TO_EMAIL`

**Teste do honeypot**: Inspecione o DOM e preencha manualmente o campo `_trap` — o formulário deve retornar sucesso aparente sem enviar e-mail.

## Deploy na Vercel

1. Configure as variáveis de ambiente no painel da Vercel:
   - `RESEND_API_KEY`
   - `RESEND_TO_EMAIL`
   - `RESEND_FROM_EMAIL`
2. Push para `master` → deploy automático

## Referências

- [Spec](spec.md)
- [Plano de Implementação](plan.md)
- [Modelo de Dados](data-model.md)
- [Contrato do Server Action](contracts/server-actions.md)
- [Constituição do Projeto](../../.specify/memory/constitution.md)
