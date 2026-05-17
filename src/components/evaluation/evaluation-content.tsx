import { content } from "@/lib/content";
import { EvaluationForm } from "./evaluation-form";

export function EvaluationContent() {
  return (
    <section
      id="evaluation"
      aria-label="Avaliação do Evento"
      className="py-24 relative overflow-hidden bg-gradient-to-b from-wine/15 via-black-soft to-black-soft"
    >
      {/* Top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-wine/10 blur-[100px] pointer-events-none" />

      <div className="max-w-xl mx-auto px-6">
        <div className="text-center mb-10">
          <p className="text-gold text-sm font-medium tracking-widest uppercase mb-4">
            Sua opinião importa
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-nude">
            {content.evaluation.sectionTitle}
          </h2>
        </div>

        <EvaluationForm />
      </div>
    </section>
  );
}
