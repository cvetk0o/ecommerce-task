import { Product } from "@/types";
import MarkedText from "../MarkedText";
import { MarkedTextElements } from "../MarkedText/types";
import ProductCard from "../ProductCard";
import styles from "./ProductsSection.module.css";

interface IProductsSection {
  sectionTitle: string;
  products: Product[];
}

const ProductsSection: React.FC<IProductsSection> = ({
  sectionTitle,
  products,
}) => {
  return (
    <div className={styles.recomendedProductsContainer}>
      <MarkedText text={sectionTitle} element={MarkedTextElements.h2} />
      <div className={styles.recommendedProducts}>
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};

export default ProductsSection;
