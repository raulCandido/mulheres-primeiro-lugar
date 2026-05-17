"use client";

import { motion } from "framer-motion";
import type { ExperienceCard as ExperienceCardProps } from "@/lib/content";

export function ExperienceCard({ title, speaker, emoji }: ExperienceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.04, borderColor: "rgba(201, 168, 76, 0.6)" }}
      className="glass-card rounded-2xl p-5 text-center flex flex-col items-center gap-2 cursor-default transition-colors"
    >
      <span className="text-4xl" role="img" aria-hidden="true">
        {emoji}
      </span>
      <h3 className="text-nude text-sm font-semibold leading-tight">{title}</h3>
      {speaker && <p className="text-gold/60 text-xs">{speaker}</p>}
    </motion.div>
  );
}
