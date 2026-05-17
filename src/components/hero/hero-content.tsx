"use client";

import { motion } from "framer-motion";
import { content } from "@/lib/content";

export function HeroContent() {
  return (
    <section
      aria-label="Bem-vinda"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black-soft"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black-soft via-wine/60 to-black-soft" />

      {/* Decorative glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-rose-burnt/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-gold/5 blur-[100px] pointer-events-none" />

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-gold text-sm font-medium tracking-widest uppercase mb-6"
        >
          Mulheres Primeiro Lugar
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-nude leading-tight mb-6"
        >
          {content.hero.headline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="text-nude/70 text-lg md:text-xl leading-relaxed mb-10 max-w-xl mx-auto"
        >
          {content.hero.subtitle}
        </motion.p>

        <motion.a
          href="#evaluation"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="inline-block px-10 py-4 rounded-full font-semibold text-black-soft bg-gradient-to-r from-gold to-rose-burnt shadow-lg shadow-rose-burnt/30 hover:shadow-rose-burnt/50 transition-shadow"
        >
          {content.hero.ctaLabel}
        </motion.a>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-nude/30 text-xs"
        aria-hidden="true"
      >
        <span>role para baixo</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="text-lg"
        >
          ↓
        </motion.span>
      </motion.div>
    </section>
  );
}
