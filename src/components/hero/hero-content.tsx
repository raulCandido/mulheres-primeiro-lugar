import { content } from "@/lib/content";

export function HeroContent() {
  return (
    <section aria-label="Hero">
      <h1>{content.hero.title}</h1>
      {content.hero.subtitle && <p>{content.hero.subtitle}</p>}
      <p>{content.hero.description}</p>
      <button type="button">{content.hero.cta}</button>
    </section>
  );
}
