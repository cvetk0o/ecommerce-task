"use client";
import Button from "../Button";
import CartIcon from "../../public/cartPlus.svg";
import CheckIcon from "../../public/checked.svg";
import styles from "./AddToCartButton.module.css";
import Image from "next/image";
import { useCartContext } from "@/contexts/CartContext";
import { Product } from "@/types";
import { useToast } from "@/contexts/ToastContext";

interface IAddToCartButton {
  product: Product;
  isLoading?: boolean;
}

const AddToCartButton: React.FC<IAddToCartButton> = ({
  isLoading,
  product,
}) => {
  const { addProductToCart, isProductInCart } = useCartContext();
  const { showToast } = useToast();
  const addedToCart = isProductInCart(product.id);
  const handleRemoveCartItem = async () => {
    const [error] = await addProductToCart(product);

    if (error) {
      showToast("Failed to Add product to Cart:", "error");
    }
  };
  return (
    <Button
      isLoading={!!isLoading}
      className={addedToCart ? styles.buttonAdded : ""}
      onClick={handleRemoveCartItem}
    >
      <div className={styles.addToCart}>
        <Image
          src={addedToCart ? CheckIcon : CartIcon}
          alt={addedToCart ? "Added to cart" : "Add to cart"}
          width={24}
          height={24}
        />
        <p className={`${styles.addToCart__text}`}>
          {addedToCart ? "Added!" : "Add to cart"}
        </p>
      </div>
    </Button>
  );
};

export default AddToCartButton;
