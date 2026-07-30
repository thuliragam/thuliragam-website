import SectionContainer from "@/app/components/SectionContainer";
import CategoryHero from "@/app/components/products/CategoryHero";
import CategoryProductGrid from "@/app/components/products/CategoryProductGrid";
import MicrogreensBenefits from "@/app/components/products/MicrogreensBenefits";
import MicrogreensHealthBenefits from "@/app/components/products/MicrogreensHealthBenefits";
import { microgreens } from "@/app/lib/products";
import MicrogreensGrowingProcess from "@/app/components/products/MicrogreensGrowingProcess";
import MicrogreensPackaging from "@/app/components/products/MicrogreensPackaging";
import MicrogreensCTA from "@/app/components/products/MicrogreensCTA";
import MicrogreensTestimonials from "@/app/components/products/MicrogreensTestimonials";
import MicrogreensWhoWeServe from "@/app/components/products/MicrogreensWhoWeServe";

export const metadata = {
  title: "Premium Microgreens | Thuliragam",
  description:
    "Explore Thuliragam's premium collection of 20 fresh microgreen varieties.",
};

export default function MicrogreensPage() {
  return (
    <main>
      <SectionContainer className="pt-32 pb-20">
        <CategoryHero
          title="Premium Microgreens"
          description="At Thuliragam, we cultivate a carefully selected collection of 20 premium microgreen varieties using natural and hygienic growing practices. Harvested at their nutritional peak, our microgreens are rich in vitamins, minerals, antioxidants, and fresh flavor."
        />

        <CategoryProductGrid products={microgreens} />
      </SectionContainer>

      <MicrogreensBenefits />

      <MicrogreensHealthBenefits />
      <MicrogreensGrowingProcess />
      <MicrogreensPackaging />
      <MicrogreensTestimonials />
      <MicrogreensWhoWeServe />
      <MicrogreensCTA />
      
    </main>
  );
}