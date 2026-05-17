import { content } from "@/lib/content";

export function FeaturesContent() {
  return (
    <section aria-label="Benefícios">
      <h2>{content.features.title}</h2>
      <p>{content.features.description}</p>
      <ul>
        {content.features.items.map((item) => (
          <li key={item.title}>
            <strong>{item.title}</strong>
            <p>{item.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
