"use client";
import Button from "../Button";
import CartIcon from "../../public/cartPlus.svg";
import CheckIcon from "../../public/checked.svg";
import styles from "./AddToCartButton.module.css";
import Image from "next/image";
import { useContext } from "react";
import { CartContext } from "@/contexts/CartContext";
import { CartContextType, Product } from "@/types";

interface IAddToCartButton {
  product: Product;
  isLoading?: boolean;
  addedToCart: boolean;
}

const AddToCartButton: React.FC<IAddToCartButton> = ({
  isLoading,
  product,
  addedToCart,
}) => {
  const { addProductToCart } = useContext(CartContext) as CartContextType;
  return (
    <Button
      isLoading={!!isLoading}
      className={addedToCart ? styles.buttonAdded : ""}
      onClick={() => {
        addProductToCart(product);
      }}
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
