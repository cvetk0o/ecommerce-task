"use client";

import { CartContextType } from "@/types";
import styles from "./CartSummary.module.css";
import { useContext } from "react";
import { CartContext } from "@/contexts/CartContext";
import Button from "../Button";
import ApplyDiscount from "../ApplyDiscount";
import CartItemComponent from "../CartItemComponent";

const LOCAL_CURRENCY = process.env.NEXT_LOCAL_CURRENCY || "USD";

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
              {LOCAL_CURRENCY} {cart.subTotalPrice}
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
        <ApplyDiscount />
        <Button fullWidth={true}>Go to Checkout</Button>
      </div>
    </div>
  );
};

export default CartSummary;
