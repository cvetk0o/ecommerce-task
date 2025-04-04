"use client";

import styles from "./CartSummary.module.css";
import { useCartContext } from "@/contexts/CartContext";
import Button from "../Button";
import ApplyPromoCode from "../ApplyPromoCode";
import CartItemComponent from "../CartItemComponent";

const LOCAL_CURRENCY = process.env.NEXT_LOCAL_CURRENCY || "USD";

const CartSummary: React.FC = () => {
  const { cart } = useCartContext();

  if (!cart || !cart.numberOfItems) {
    return <h3>Empty Cart</h3>;
  }
  const renderCartItems = () => {
    return cart.items.map((cartItem, index) => {
      const shouldRenderDivider = cart.items.length !== index + 1;
      return (
        <div className={styles.cartItem__container} key={cartItem.id}>
          <CartItemComponent cartItem={cartItem} />
          {shouldRenderDivider && <div className="divider" />}
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
        <ApplyPromoCode />
        <Button fullWidth={true}>Go to Checkout</Button>
      </div>
    </div>
  );
};

export default CartSummary;
