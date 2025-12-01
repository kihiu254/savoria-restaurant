import { HeroSection } from "@/components/hero-section";
import { FeaturedItems } from "@/components/featured-items";

export default function Home() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      <HeroSection />
      <FeaturedItems />
    </div>
  );
}
