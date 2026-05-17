# Contratos — Server Actions

**Feature**: `001-formulario-avaliacao-evento` | **Date**: 2026-05-16

## `submitEvaluation`

**Arquivo**: `src/features/evaluation/submit-evaluation.ts`
**Diretiva**: `"use server"`

### Propósito

Receber o formulário de avaliação pós-evento, validar os dados, proteger contra bots via honeypot e enviar o resultado por e-mail via Resend ao responsável configurado.

### Assinatura

```typescript
async function submitEvaluation(formData: FormData): Promise<ActionResult>
```

### Campos de entrada (FormData)

| Campo | Tipo | Obrigatório | Regras |
|-------|------|-------------|--------|
| `rating` | string (coerce para number) | Sim | Inteiro entre 0 e 5 inclusive |
| `comment` | string | Não | Máximo 1000 caracteres |
| `_trap` | string | Sim (honeypot) | DEVE ser string vazia; valor não-vazio → rejeição silenciosa |

### Retorno

```typescript
type ActionResult =
  | { success: true }
  | { success: false; error: string };
```

O campo `error` é sempre uma mensagem em português, amigável, sem detalhes técnicos.

### Fluxo de execução

```
1. Extrair _trap → se não-vazio, retornar { success: true } (rejeição silenciosa)
2. Extrair rating → coercer para number → validar 0 ≤ rating ≤ 5
3. Extrair comment → sanitizar (trim) → validar length ≤ 1000
4. Derivar label e emoji a partir do rating (usando tabela canônica de content.ts)
5. Compor HTML do e-mail com nota, label, emoji, comentário e timestamp
6. Chamar Resend.emails.send() com o HTML
7. Retornar { success: true } em caso de êxito
8. Em caso de erro do Resend → log interno (não expor) → retornar { success: false, error: "..." }
```

### Variáveis de ambiente requeridas

| Variável | Descrição | Contexto |
|----------|-----------|---------|
| `RESEND_API_KEY` | Chave de autenticação da API Resend | Servidor apenas |
| `RESEND_TO_EMAIL` | E-mail destinatário das avaliações | Servidor apenas |
| `RESEND_FROM_EMAIL` | E-mail remetente (deve ser domínio verificado no Resend) | Servidor apenas |

### Comportamento de erro

| Cenário | Resposta ao cliente |
|---------|---------------------|
| Honeypot preenchido | `{ success: true }` (falso positivo intencional) |
| Rating ausente ou inválido | `{ success: false, error: "Selecione uma nota para continuar." }` |
| Comentário > 1000 chars | `{ success: false, error: "O comentário deve ter no máximo 1000 caracteres." }` |
| Resend indisponível | `{ success: false, error: "Não foi possível enviar. Tente novamente em instantes." }` |
| Erro interno inesperado | `{ success: false, error: "Algo deu errado. Tente novamente." }` |

### Formato do e-mail enviado

**Assunto**: `⭐ Avaliação recebida: [label] ([emoji]) — Mulheres Primeiro Lugar`

**Corpo** (HTML):
- Nota em destaque: valor numérico + label + emoji
- Comentário (se presente): bloco de citação
- Timestamp: data e hora no fuso horário América/São_Paulo
