import SectionContainer from "@/app/components/SectionContainer";
import CategoryHero from "@/app/components/products/CategoryHero";
import GalleryGrid from "@/app/components/gallery/GalleryGrid";

export default function GalleryPage() {
  return (
    <main>
      <SectionContainer className="pt-32 pb-20">
        <CategoryHero
          title="Gallery"
          description="Explore our collection of premium microgreens, herbal powders, natural spices, dehydrated vegetables, harvesting, processing, and packaging."
        />
      </SectionContainer>

      <GalleryGrid />
    </main>
  );
}