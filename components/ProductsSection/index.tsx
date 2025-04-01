import { Product } from "@/types";
import MarkedText from "../MarkedText";
import { MarkedTextElements } from "../MarkedText/types";
import ProductCard from "../ProductCard";
import styles from "./ProductsSection.module.css";

interface IProductsSection {
  sectionTitle: string;
  products: Product[];
  additionalInfo?: string;
}

const ProductsSection: React.FC<IProductsSection> = ({
  sectionTitle,
  products,
  additionalInfo,
}) => {
  return (
    <div className={styles.recomendedProductsContainer}>
      <div className={styles.sectionTitle}>
        <MarkedText text={sectionTitle} element={MarkedTextElements.h2} />
        {additionalInfo && <p className="body">{additionalInfo}</p>}
      </div>
      <div className={styles.recommendedProducts}>
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};

export default ProductsSection;
