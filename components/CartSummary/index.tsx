"use client";

import { CartContextType, CartItem } from "@/types";
import styles from "./CartSummary.module.css";
import { useContext } from "react";
import { CartContext } from "@/contexts/CartContext";
import Image from "next/image";
import Rating from "../Rating";

const CartItemComponent = ({ cartItem }: { cartItem: CartItem }) => {
  const {
    product: { title, image, description, category, rating },
  } = cartItem;
  return (
    <div className={styles.cartItem}>
      <div className={styles.cartItem__imgContainer}>
        <Image
          src={image}
          alt={title}
          fill
          className={styles.cartItem__img}
          sizes="(max-width: 576px) 60px, 124px"
          priority
        />
      </div>
      <div className={styles.cartItem__info}>
        <div>
          <Rating rating={rating.rate} numberOfReviews={rating.count} />
          <p className="subtitle">{title}</p>
          <p className={styles.cartItem__category}>{category}</p>
          <p className={`small ${styles.cartItem__description}`}>
            {description}
          </p>
        </div>
        <div>Actions</div>
      </div>
    </div>
  );
};

const CartSummary: React.FC = () => {
  const { cart } = useContext(CartContext) as CartContextType;

  const renderCartItems = () => {
    if (!cart || !cart.numberOfItems) {
      return <h3>Empty Cart</h3>;
    }
    return cart.items.map((cartItem) => {
      return <CartItemComponent key={cartItem.id} cartItem={cartItem} />;
    });
  };
  return (
    <div className={styles.cartSummary}>
      <div className={styles.cartSummary__products}>{renderCartItems()}</div>
      <div className={styles.cartSummary__summary}>Summary</div>
    </div>
  );
};

export default CartSummary;
