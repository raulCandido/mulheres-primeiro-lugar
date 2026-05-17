"use server";

import { Resend } from "resend";
import { content } from "@/lib/content";

type ActionResult = { success: true } | { success: false; error: string };

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitEvaluation(formData: FormData): Promise<ActionResult> {
  // Honeypot check — bots that fill this field are silently rejected
  const trap = formData.get("_trap");
  if (trap && String(trap).trim() !== "") {
    return { success: true };
  }

  // Validate rating
  const rawRating = formData.get("rating");
  if (!rawRating || String(rawRating).trim() === "") {
    return { success: false, error: "Selecione uma nota para continuar." };
  }

  const rating = Number(rawRating);
  if (!Number.isInteger(rating) || rating < 0 || rating > 5) {
    return { success: false, error: "Selecione uma nota para continuar." };
  }

  // Sanitize comment
  const rawComment = formData.get("comment");
  const comment = rawComment ? String(rawComment).trim() : "";
  if (comment.length > 1000) {
    return { success: false, error: "O comentário deve ter no máximo 1000 caracteres." };
  }

  // Derive label and emoji from rating options
  const option = content.evaluation.ratingOptions.find((o) => o.value === rating);
  const label = option?.label ?? String(rating);
  const emoji = option?.emoji ?? "⭐";

  // Timestamp in Brasília timezone
  const submittedAt = new Date().toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    dateStyle: "full",
    timeStyle: "short",
  });

  const toEmail = process.env.RESEND_TO_EMAIL;
  const fromEmail = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";

  if (!toEmail) {
    console.error("[submitEvaluation] RESEND_TO_EMAIL não configurado");
    return { success: false, error: "Não foi possível enviar. Tente novamente em instantes." };
  }

  const subject = `${emoji} Avaliação recebida: ${label} (${rating}/5) — Mulheres Primeiro Lugar`;

  const html = `
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #120A0E; color: #E8D5C4; padding: 40px; border-radius: 16px; border: 1px solid rgba(201,168,76,0.3);">
      <h1 style="color: #C9A84C; font-size: 24px; margin-bottom: 8px;">Mulheres Primeiro Lugar</h1>
      <p style="color: #E8D5C4; opacity: 0.6; margin-bottom: 32px; font-size: 14px;">Nova avaliação recebida</p>

      <div style="background: rgba(255,255,255,0.05); border: 1px solid rgba(201,168,76,0.2); border-radius: 12px; padding: 24px; margin-bottom: 24px; text-align: center;">
        <p style="font-size: 48px; margin: 0 0 8px;">${emoji}</p>
        <p style="font-size: 28px; font-weight: bold; color: #C9A84C; margin: 0;">${label}</p>
        <p style="color: #E8D5C4; opacity: 0.5; margin: 4px 0 0; font-size: 14px;">Nota ${rating} de 5</p>
      </div>

      ${comment ? `
      <div style="background: rgba(255,255,255,0.03); border-left: 3px solid rgba(201,168,76,0.5); border-radius: 0 8px 8px 0; padding: 16px 20px; margin-bottom: 24px;">
        <p style="color: #E8D5C4; opacity: 0.5; font-size: 12px; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">Comentário</p>
        <p style="color: #E8D5C4; margin: 0; line-height: 1.6;">${comment.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
      </div>
      ` : ""}

      <p style="color: #E8D5C4; opacity: 0.4; font-size: 12px; text-align: center; margin-top: 32px; border-top: 1px solid rgba(201,168,76,0.1); padding-top: 24px;">
        Recebido em ${submittedAt}
      </p>
    </div>
  `;

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject,
      html,
    });

    if (error) {
      console.error("[submitEvaluation] Resend error:", error);
      return { success: false, error: "Não foi possível enviar. Tente novamente em instantes." };
    }

    return { success: true };
  } catch (err) {
    console.error("[submitEvaluation] Unexpected error:", err);
    return { success: false, error: "Algo deu errado. Tente novamente." };
  }
}
