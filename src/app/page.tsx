import { HeroContent } from "@/components/hero";
import { AboutContent } from "@/components/about";
import { FeaturesContent } from "@/components/features";
import { TestimonialsContent } from "@/components/testimonials";
import { CtaContent } from "@/components/cta";
import { FooterContent } from "@/components/footer";

export default function HomePage() {
  return (
    <main>
      <HeroContent />
      <AboutContent />
      <FeaturesContent />
      <TestimonialsContent />
      <CtaContent />
      <FooterContent />
    </main>
  );
}
