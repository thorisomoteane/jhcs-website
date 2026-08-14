import { HeroSlideshow } from "@/components/home/HeroSlideshow";
import { ImpactCards } from "@/components/home/ImpactCards";
import { CTASection, MissionSection } from "@/components/home/CTASection";

export default function Home() {
  return (
    <>
      <HeroSlideshow />
      <MissionSection />
      <ImpactCards />
      <CTASection />
    </>
  );
}
