import { content } from "@/lib/content";

export function CtaContent() {
  return (
    <section aria-label="Avaliação">
      <h2>{content.cta.title}</h2>
      <p>{content.cta.description}</p>
      <button type="button">{content.cta.buttonLabel}</button>
    </section>
  );
}
