import { Product } from "@/types";
import styles from "./ProductCard.module.css";
import Image from "next/image";
import Rating from "../Rating";
import AddToCartButton from "../AddToCartButton";
import AddToFavourites from "../AddToFavouritesButton";

interface IProductCard {
  product: Product;
}
const LOCAL_CURRENCY = process.env.NEXT_LOCAL_CURRENCY || "USD";

const ProductCard: React.FC<IProductCard> = ({ product }) => {
  return (
    <div className={styles.productCard}>
      <div className={styles.actionButtons__mobile}>
        <AddToFavourites product={product} />
      </div>
      <div className={styles.productCard__imgContainer}>
        <Image
          src={product.image}
          alt={product.title}
          fill
          className={styles.productCard__img}
          sizes="(max-width: 576px) 163px,(max-width: 1500px) 220px, 260px"
          priority
        />
      </div>

      <div className={styles.infoContainer}>
        <div className={styles.metadata}>
          <Rating
            rating={product.rating.rate}
            numberOfReviews={product.rating.count}
          />
          <p className={`subtitle boldText`}>
            {product.category.toUpperCase()}
          </p>
          <p className="small">{product.title}</p>
        </div>
        <div>
          <h3 className={styles.productPrice}>
            {LOCAL_CURRENCY} {product.price}
          </h3>
          <div className={styles.actionButtons}>
            <AddToCartButton product={product} />
            <div className={styles.hideOnMobile}>
              <AddToFavourites product={product} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
