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
    "Premium natural spices carefully selected and hygienically processed to preserve their authentic flavor, aroma, and nutritional value.",
};

export default function NaturalSpicesPage() {
  return (
    <main>
      <SectionContainer className="pt-32 pb-20">
        <CategoryHero
          title="Natural Spices"
          description="Enhance every meal with Thuliragam's premium natural spices. Sourced from trusted farms and processed with care to retain their natural aroma, freshness, and rich taste."
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