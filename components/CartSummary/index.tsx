"use client";

import { CartContextType, CartItem } from "@/types";
import styles from "./CartSummary.module.css";
import { useContext } from "react";
import { CartContext } from "@/contexts/CartContext";
import Image from "next/image";
import Rating from "../Rating";

const LOCAL_CURRENCY = process.env.NEXT_LOCAL_CURRENCY || "USD";

const CartItemComponent = ({ cartItem }: { cartItem: CartItem }) => {
  const {
    product: { title, image, description, category, rating, price },
  } = cartItem;

  const totalPrice = cartItem.quantity * price;
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
          <div className={styles.cartItem__prices}>
            <div className={styles.cartItem__priceGroup}>
              <label className={styles.cartItem__priceLabel}>Each</label>
              <p className={`subtitle ${styles.cartItem__price}`}>
                {LOCAL_CURRENCY} {price}
              </p>
            </div>
            <div className={styles.cartItem__priceGroup}>
              <label className={styles.cartItem__priceLabel}>Total</label>
              <h3 className={styles.cartItem__price}>
                {LOCAL_CURRENCY} {totalPrice}
              </h3>
            </div>
          </div>
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
