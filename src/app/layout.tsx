import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Mulheres Primeiro Lugar — Avalie sua experiência",
  description:
    "Um encontro criado por mulheres e para mulheres. Compartilhe sua opinião sobre o evento e nos ajude a tornar o próximo ainda mais especial.",
  openGraph: {
    title: "Mulheres Primeiro Lugar",
    description: "Você fez parte de algo extraordinário. Conta pra gente o que achou!",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${playfair.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
