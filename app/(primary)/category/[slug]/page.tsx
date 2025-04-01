import MarkedText from "@/components/MarkedText";
import { MarkedTextElements } from "@/components/MarkedText/types";
import ProductsSection from "@/components/ProductsSection";
import { getCategoryDetails } from "@/services/categories";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const categoryDetails = await getCategoryDetails(slug);
  return (
    <>
      <MarkedText
        text={categoryDetails.name.toUpperCase()}
        element={MarkedTextElements.h1}
      />
      <ProductsSection
        products={categoryDetails.products}
        sectionTitle={"All Products"}
        additionalInfo={`${categoryDetails.products.length} Products Available`}
      />
    </>
  );
}
