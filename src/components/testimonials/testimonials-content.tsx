import { content } from "@/lib/content";

export function TestimonialsContent() {
  return (
    <section aria-label="Depoimentos">
      <h2>{content.testimonials.title}</h2>
      <p>{content.testimonials.description}</p>
      <ul>
        {content.testimonials.items.map((item) => (
          <li key={item.name}>
            <blockquote>{item.quote}</blockquote>
            <p>
              <strong>{item.name}</strong>
              {item.role && `, ${item.role}`}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
