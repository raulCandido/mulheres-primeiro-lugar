"use client";

import { motion } from "framer-motion";
import { content } from "@/lib/content";

export function AboutContent() {
  return (
    <section aria-label="Sobre o Evento" className="py-24 bg-black-soft relative overflow-hidden">
      {/* Subtle divider glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-gold/40 to-transparent" />

      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-gold text-sm font-medium tracking-widest uppercase mb-4"
        >
          O Encontro
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-serif text-3xl md:text-4xl font-bold text-nude mb-8"
        >
          {content.about.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="text-nude/70 text-lg md:text-xl leading-relaxed"
        >
          {content.about.description}
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="mt-12 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
        />
      </div>
    </section>
  );
}
