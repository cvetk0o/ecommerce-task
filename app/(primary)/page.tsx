import MarkedText from "@/components/MarkedText";
import { MarkedTextElements } from "@/components/MarkedText/types";
import { getAllCategories } from "@/services/categories";
import { getFeaturedProducts } from "@/services/products";

export default async function Home() {
  const products = await getFeaturedProducts();
  const categories = await getAllCategories();

  return (
    <div>
      <MarkedText text="Welcome to Ecommerce" element={MarkedTextElements.h1} />
      {categories.map((category) => {
        return <div key={category.slug}>{category.name}</div>;
      })}
      {products.map((product) => (
        <div key={product.id}>
          <MarkedText text={product.title} element={MarkedTextElements.h3} />
          <MarkedText
            text={`${product.price}`}
            element={MarkedTextElements.small}
          />
        </div>
      ))}
    </div>
  );
}
