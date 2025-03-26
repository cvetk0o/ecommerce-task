import MarkedText from "@/components/MarkedText";
import { MarkedTextElements } from "@/components/MarkedText/types";
import ProductsSection from "@/components/ProductsSection";
import { getFeaturedProducts } from "@/services/products";

const BRAND_NAME = process.env.NEXT_BRAND_NAME || "";

export default async function Home() {
  const products = await getFeaturedProducts();

  return (
    <>
      <MarkedText
        text={`Welcome to ${BRAND_NAME}`}
        element={MarkedTextElements.h1}
      />
      <ProductsSection sectionTitle="Recommended for you" products={products} />
    </>
  );
}
