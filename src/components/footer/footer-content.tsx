import { content } from "@/lib/content";

export function FooterContent() {
  return (
    <footer>
      <p>{content.footer.copyright}</p>
      {content.footer.links && (
        <nav aria-label="Links do rodapé">
          <ul>
            {content.footer.links.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </footer>
  );
}
