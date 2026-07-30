import SectionContainer from "@/app/components/SectionContainer";
import CategoryHero from "@/app/components/products/CategoryHero";
import CategoryProductGrid from "@/app/components/products/CategoryProductGrid";
import { herbalPowders } from "@/app/lib/products";
import HerbalBenefits from "@/app/components/products/HerbalBenefits";
import HerbalProcessing from "@/app/components/products/HerbalProcessing";
import HerbalPackaging from "@/app/components/products/HerbalPackaging";
import HerbalWhoWeServe from "@/app/components/products/HerbalWhoWeServe";
import HerbalCTA from "@/app/components/products/HerbalCTA";
export const metadata = {
  title: "Herbal Powders | Thuliragam",
  description:
    "Explore Thuliragam's range of naturally processed herbal powders made from carefully selected herbs.",
};

export default function HerbalPowdersPage() {
  return (
    <main>
      <SectionContainer className="pt-32 pb-20">
        <CategoryHero
          title="Herbal Powders"
          description="Our herbal powders are prepared from premium-quality herbs using hygienic processing methods to preserve their natural nutrients, aroma, and goodness."
        />

        <CategoryProductGrid products={herbalPowders} />
      </SectionContainer>
      <HerbalBenefits />
      <HerbalProcessing />
      <HerbalPackaging />
      <HerbalWhoWeServe />
      <HerbalCTA />
    </main>
  );
}