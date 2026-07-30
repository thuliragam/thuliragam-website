import SectionContainer from "@/app/components/SectionContainer";
import CategoryHero from "@/app/components/products/CategoryHero";
import CategoryProductGrid from "@/app/components/products/CategoryProductGrid";
import { dehydratedVegetables } from "@/app/lib/products";
import DehydratedBenefits from "@/app/components/products/DehydratedBenefits";
import DehydratedProcessing from "@/app/components/products/DehydratedProcessing";
import DehydratedPackaging from "@/app/components/products/DehydratedPackaging";
import DehydratedWhoWeServe from "@/app/components/products/DehydratedWhoWeServe";
import DehydratedCTA from "@/app/components/products/DehydratedCTA";
export const metadata = {
  title: "Dehydrated Vegetables | Thuliragam",
  description:
    "Naturally dehydrated vegetables that retain nutrition, freshness, and convenience.",
};

export default function DehydratedVegetablesPage() {
  return (
    <main>
      <SectionContainer className="pt-32 pb-20">
        <CategoryHero
          title="Dehydrated Vegetables"
          description="Our dehydrated vegetables are processed using modern drying techniques to preserve their natural color, flavor, and nutritional value for everyday cooking."
        />

        <CategoryProductGrid products={dehydratedVegetables} />
      </SectionContainer>
      <DehydratedBenefits />
      <DehydratedProcessing />
      <DehydratedPackaging />
      <DehydratedWhoWeServe />
      <DehydratedCTA />
           
    </main>
  );
}