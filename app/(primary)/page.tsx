import MarkedText from "@/components/MarkedText";
import { MarkedTextElements } from "@/components/MarkedText/types";
import RecommendedProducts from "@/components/RecommendedProducts";
import { getAllCategories } from "@/services/categories";
import { getFeaturedProducts } from "@/services/products";

export default async function Home() {
  const products = await getFeaturedProducts();
  const categories = await getAllCategories();

  return (
    <>
      <MarkedText text="Welcome to Ecommerce" element={MarkedTextElements.h1} />
      {categories.map((category) => {
        return <div key={category.slug}>{category.name}</div>;
      })}
      <RecommendedProducts products={products} />
    </>
  );
}
