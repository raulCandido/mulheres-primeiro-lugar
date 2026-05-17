import { HeroContent } from "@/components/hero";
import { AboutContent } from "@/components/about";
import { ExperiencesContent } from "@/components/experiences";
import { EvaluationContent } from "@/components/evaluation";
import { FooterContent } from "@/components/footer";

export default function HomePage() {
  return (
    <main>
      <HeroContent />
      <AboutContent />
      <ExperiencesContent />
      <EvaluationContent />
      <FooterContent />
    </main>
  );
}
