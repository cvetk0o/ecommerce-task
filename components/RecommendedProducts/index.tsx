import { Product } from "@/types";
import MarkedText from "../MarkedText";
import { MarkedTextElements } from "../MarkedText/types";
import ProductCard from "../ProductCard";
import styles from "./RecommendedProducts.module.css";

interface IRecommendedProducts {
  products: Product[];
}

const RecommendedProducts: React.FC<IRecommendedProducts> = ({ products }) => {
  return (
    <div className={styles.recomendedProductsContainer}>
      <MarkedText text="Recommended for you" element={MarkedTextElements.h2} />
      <div className={styles.recommendedProducts}>
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;
