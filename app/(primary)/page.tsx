import MarkedText from "@/components/MarkedText";
import { MarkedTextElements } from "@/components/MarkedText/types";
import ProductsSection from "@/components/ProductsSection";
import { getFeaturedProducts } from "@/services/products";

export default async function Home() {
  const products = await getFeaturedProducts();

  return (
    <>
      <MarkedText text="Welcome to Ecommerce" element={MarkedTextElements.h1} />
      <ProductsSection sectionTitle="Recommended for you" products={products} />
    </>
  );
}
