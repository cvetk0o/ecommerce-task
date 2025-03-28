"use client";

import { CartContextType, CartItem } from "@/types";
import styles from "./CartSummary.module.css";
import { useContext } from "react";
import { CartContext } from "@/contexts/CartContext";
import Image from "next/image";
import Rating from "../Rating";
import DeleteProductButton from "../DeleteProductButton";
import QuantityControl from "../QuantityControl";
import Button from "../Button";

const LOCAL_CURRENCY = process.env.NEXT_LOCAL_CURRENCY || "USD";

const CartItemComponent = ({ cartItem }: { cartItem: CartItem }) => {
  const {
    product: { title, image, description, category, rating, price },
    quantity,
  } = cartItem;

  const { updateItemQuantity } = useContext(CartContext) as CartContextType;

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

const CartSummary: React.FC = () => {
  const { cart } = useContext(CartContext) as CartContextType;

  if (!cart || !cart.numberOfItems) {
    return <h3>Empty Cart</h3>;
  }
  const renderCartItems = () => {
    return cart.items.map((cartItem, index) => {
      return (
        <div className={styles.cartItem__container} key={cartItem.id}>
          <CartItemComponent cartItem={cartItem} />
          {cart.items.length !== index + 1 && <div className="divider" />}
        </div>
      );
    });
  };
  return (
    <div className={styles.cartSummary}>
      <div className={styles.cartSummary__products}>{renderCartItems()}</div>
      <div className={styles.cartSummary__summary}>
        <h3>Order Summary</h3>
        <div>
          <div className={styles.summaryData}>
            <p className="small">SubTotal</p>
            <p className="small boldText">
              {LOCAL_CURRENCY} {cart.totalPrice}
            </p>
          </div>
          <div className={styles.summaryData}>
            <p className="small">
              Discount{" "}
              {cart.discount?.percentage
                ? `(-${cart.discount.percentage}%)`
                : ""}
            </p>
            <p className="small boldText redText">
              {" "}
              - {LOCAL_CURRENCY} {cart.discount.amount}
            </p>
          </div>
          <div className={styles.summaryData}>
            <p className="small">Delivery Fee</p>
            <p className="small boldText">
              {LOCAL_CURRENCY} {cart.deliveryFee}
            </p>
          </div>
        </div>

        <div className="divider__thiner" />
        <div className={styles.summaryData}>
          <p>Total</p>
          <p className="boldText">
            {LOCAL_CURRENCY} {cart.totalPrice}
          </p>
        </div>
        <Button>Go to Checkout</Button>
      </div>
    </div>
  );
};

export default CartSummary;
