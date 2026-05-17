"use client";

import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { content } from "@/lib/content";
import { submitEvaluation } from "@/features/evaluation";

export function EvaluationForm() {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (selectedRating === null) return;

    setErrorMessage(null);
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await submitEvaluation(formData);
      if (result.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(result.error);
      }
    });
  }

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="glass-card-strong rounded-3xl p-10 text-center"
          role="status"
          aria-live="polite"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto mb-6 w-16 h-16 rounded-full bg-gold/20 border-2 border-gold/60 flex items-center justify-center"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-8 h-8 text-gold"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </motion.div>
          <h3 className="font-serif text-3xl font-bold text-nude mb-3">
            {content.evaluation.successMessage}
          </h3>
          <p className="text-nude/70 text-lg leading-relaxed">
            {content.evaluation.successSubtitle}
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, y: -10 }}
          onSubmit={handleSubmit}
          className="glass-card-strong rounded-3xl p-7 sm:p-8 md:p-10 space-y-8"
          aria-label="Formulário de avaliação do evento"
          noValidate
        >
          {/* Honeypot — CSS-hidden, fillable by bots */}
          <input
            name="_trap"
            type="text"
            style={{ position: "absolute", opacity: 0, pointerEvents: "none", height: 0, width: 0 }}
            aria-hidden="true"
            autoComplete="off"
            tabIndex={-1}
          />

          {/* Hidden rating input for form submission */}
          <input type="hidden" name="rating" value={selectedRating ?? ""} />

          {/* Rating selector */}
          <fieldset>
            <legend className="font-serif text-2xl md:text-3xl font-semibold text-nude text-center mb-6">
              {content.evaluation.question}
            </legend>

            <div
              className="flex flex-wrap justify-center gap-3 sm:gap-4"
              role="group"
              aria-label="Selecione uma nota de 0 a 5 (obrigatório)"
            >
              {content.evaluation.ratingOptions.map((opt) => {
                const isSelected = selectedRating === opt.value;
                return (
                  <motion.button
                    key={opt.value}
                    type="button"
                    onClick={() => setSelectedRating(opt.value)}
                    aria-label={`Nota ${opt.value}: ${opt.label}`}
                    aria-pressed={isSelected}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.94 }}
                    animate={
                      isSelected
                        ? { scale: 1.1, borderColor: "rgba(201, 168, 76, 0.9)" }
                        : { scale: 1, borderColor: "rgba(201, 168, 76, 0.2)" }
                    }
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`
                      flex flex-col items-center gap-1 w-20 py-4 rounded-2xl border-2 transition-colors
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black-soft
                      ${isSelected
                        ? "bg-gold/20 shadow-lg shadow-gold/20"
                        : "bg-white/5 hover:bg-white/10"}
                    `}
                  >
                    <span className={`text-2xl font-bold leading-none ${isSelected ? "text-gold" : "text-nude/70"}`}>
                      {opt.value}
                    </span>
                    <span className={`text-xs font-medium ${isSelected ? "text-gold" : "text-nude/60"}`}>
                      {opt.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </fieldset>

          {/* Optional comment */}
          <div className="space-y-2">
            <label htmlFor="comment" className="block text-nude/80 text-sm font-medium">
              {content.evaluation.commentLabel}{" "}
              <span className="text-nude/40 font-normal">(opcional)</span>
            </label>
            <textarea
              id="comment"
              name="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              maxLength={1000}
              rows={4}
              placeholder={content.evaluation.commentPlaceholder}
              className="
                w-full rounded-xl border border-gold/20 bg-white/5 px-4 py-3
                text-nude placeholder:text-nude/30 text-sm leading-relaxed resize-none
                focus:outline-none focus:border-gold/60 focus:ring-1 focus:ring-gold/40
                transition-colors
              "
            />
            <p className="text-right text-nude/30 text-xs" aria-live="polite">
              {comment.length}/1000
            </p>
          </div>

          {/* Error message */}
          {errorMessage && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-rose-burnt text-sm text-center"
              role="alert"
            >
              {errorMessage}
            </motion.p>
          )}

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={selectedRating === null || isPending}
            whileHover={selectedRating !== null && !isPending ? { scale: 1.02 } : {}}
            whileTap={selectedRating !== null && !isPending ? { scale: 0.98 } : {}}
            className="
              w-full py-5 rounded-full font-semibold text-black-soft
              bg-gradient-to-r from-gold to-rose-burnt
              disabled:opacity-40 disabled:cursor-not-allowed
              transition-opacity shadow-lg shadow-rose-burnt/20
              focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-black-soft
            "
          >
            {isPending ? "Enviando..." : content.evaluation.submitLabel}
          </motion.button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
