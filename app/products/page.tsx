import SectionContainer from "@/app/components/SectionContainer";
import CategoryHero from "@/app/components/products/CategoryHero";
import CategoryProductGrid from "@/app/components/products/CategoryProductGrid";
import { naturalSpices } from "@/app/lib/products";
import SpicesBenefits from "@/app/components/products/SpicesBenefits";
import SpicesProcessing from "@/app/components/products/SpicesProcessing";
import SpicesPackaging from "@/app/components/products/SpicesPackaging";
import SpicesWhoWeServe from "@/app/components/products/SpicesWhoWeServe";
import SpicesCTA from "@/app/components/products/SpicesCTA";

export const metadata = {
  title: "Natural Spices | Thuliragam",
  description:
    "Premium natural spices processed hygienically to retain their authentic flavor and aroma.",
};

export default function NaturalSpicesPage() {
  return (
    <main>
      <SectionContainer className="pt-32 pb-20">
        <CategoryHero
          title="Natural Spices"
          description="Enhance your cooking with Thuliragam's premium natural spices, carefully selected and processed to deliver authentic taste, rich aroma, and exceptional quality."
        />

        <CategoryProductGrid products={naturalSpices} />
      </SectionContainer>
      <SpicesBenefits />
      <SpicesProcessing />
      <SpicesPackaging />
      <SpicesWhoWeServe />
      <SpicesCTA />
      
    </main>
  );
}