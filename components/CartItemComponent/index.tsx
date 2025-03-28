"use client";

import { CartContext } from "@/contexts/CartContext";
import { CartContextType, CartItem } from "@/types";
import Image from "next/image";
import { useContext } from "react";
import Rating from "../Rating";
import DeleteProductButton from "../DeleteProductButton";
import QuantityControl from "../QuantityControl";
import styles from "./CartItemComponent.module.css";

const LOCAL_CURRENCY = process.env.NEXT_LOCAL_CURRENCY || "USD";

const CartItemComponent = ({ cartItem }: { cartItem: CartItem }) => {
  const {
    product: { title, image, description, category, rating, price },
    quantity,
  } = cartItem;

  const { updateItemQuantity } = useContext(CartContext) as CartContextType;

  const totalPrice = Number(cartItem.quantity * price).toFixed(2);
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
        <div className={styles.cartItem__details}>
          <Rating rating={rating.rate} numberOfReviews={rating.count} />
          <p className="subtitle">{title}</p>
          <p className={styles.cartItem__category}>{category}</p>
          <p
            className={`small ${styles.cartItem__description}`}
            title={description}
          >
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
        <div className={styles.cartItem__actionButtons}>
          <DeleteProductButton cartItem={cartItem} />
          <QuantityControl
            quantity={quantity}
            onIncrease={() => updateItemQuantity(cartItem.id, quantity + 1)}
            onDecrease={() => updateItemQuantity(cartItem.id, quantity - 1)}
          />
        </div>
      </div>
    </div>
  );
};

export default CartItemComponent;
