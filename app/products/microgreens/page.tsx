
import SectionContainer from "@/app/components/SectionContainer";
import CategoryHero from "@/app/components/products/CategoryHero";
import MicrogreensHealthBenefits from "@/app/components/products/MicrogreensHealthBenefits";
import LiveMicrogreensGrid from "@/app/components/products/LiveMicrogreensGrid";
import MicrogreensCTA from "@/app/components/products/MicrogreensCTA";
import MicrogreensWhoWeServe from "@/app/components/products/MicrogreensWhoWeServe";
import ScrollReveal from "@/app/components/ScrollReveal";

export const metadata = {
  title: "Premium Microgreens | Thuliragam",
  description:
    "Explore Thuliragam's premium collection of 20 fresh microgreen varieties.",
};

export default function MicrogreensPage() {
  return (
    <main>
      {/* 1. CATEGORY HERO */}
      <SectionContainer className="pt-32 pb-10">
        <CategoryHero
          title="Premium Microgreens"
          description="At Thuliragam, we cultivate a carefully selected collection of 20 premium microgreen varieties using natural and hygienic growing practices. Harvested at their nutritional peak, our microgreens bring vibrant flavour, colour and nutrition to everyday meals."
        />

        {/* 2. MICROGREENS COLLECTION */}
        <LiveMicrogreensGrid />
      </SectionContainer>

      {/* 3. HEALTH BENEFITS */}
      <MicrogreensHealthBenefits />

      {/* 4. WHO WE SERVE */}
      <MicrogreensWhoWeServe />

      {/* 5. GET IN TOUCH */}
      <MicrogreensCTA />
    </main>
  );
}
