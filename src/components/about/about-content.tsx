import { content } from "@/lib/content";

export function AboutContent() {
  return (
    <section aria-label="Sobre">
      <h2>{content.about.title}</h2>
      <p>{content.about.description}</p>
      <ul>
        {content.about.highlights.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
