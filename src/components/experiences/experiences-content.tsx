import { content } from "@/lib/content";
import { ExperienceCard } from "./experience-card";

export function ExperiencesContent() {
  return (
    <section aria-label="Experiências do Evento" className="py-24 bg-black-soft relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="text-center mb-12">
          <p className="text-gold text-sm font-medium tracking-widest uppercase mb-4">
            O que vivemos juntas
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-nude mb-4">
            {content.experiences.title}
          </h2>
          <p className="text-nude/60 text-lg">{content.experiences.subtitle}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {content.experiences.items.map((item) => (
            <ExperienceCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
