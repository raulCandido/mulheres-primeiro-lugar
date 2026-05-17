import { content } from "@/lib/content";

export function FooterContent() {
  return (
    <footer
      aria-label="Rodapé"
      className="relative overflow-hidden bg-gradient-to-t from-black-soft via-wine/15 to-black-soft py-16 px-6"
    >
      {/* Top divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />

      <div className="max-w-2xl mx-auto text-center space-y-6">
        {/* Brand */}
        <div>
          <h3 className="font-serif text-2xl font-bold text-nude">{content.footer.brandName}</h3>
          <p className="text-gold/70 text-sm tracking-wider mt-1">{content.footer.tagline}</p>
        </div>

        {/* Social links */}
        <nav aria-label="Redes sociais">
          <ul className="flex justify-center gap-6 flex-wrap">
            {content.footer.socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${link.label} — abre em nova aba`}
                  className="flex items-center gap-2 text-nude/70 hover:text-gold transition-colors text-sm font-medium"
                >
                  <span aria-hidden="true">{link.icon}</span>
                  <span>{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <p className="text-nude/50 text-sm">
          <a
            href={`mailto:${content.footer.contactEmail}`}
            className="hover:text-gold transition-colors"
            aria-label={`Enviar e-mail para ${content.footer.contactEmail}`}
          >
            📧 {content.footer.contactEmail}
          </a>
        </p>

        {/* Closing message */}
        <p className="text-nude/60 text-sm italic leading-relaxed max-w-md mx-auto">
          {content.footer.closingMessage}
        </p>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

        {/* Copyright */}
        <p className="text-nude/30 text-xs">{content.footer.copyright}</p>
      </div>
    </footer>
  );
}
