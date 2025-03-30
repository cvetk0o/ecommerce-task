"use client";
import paths from "@/utils/paths";
import Link from "next/link";
import CartIcon from "../../public/cart.svg";
import CartWhiteIcon from "../../public/cartWhite.svg";
import Image from "next/image";
import { useTheme } from "@/hooks/useTheme";
import styles from "./CartButton.module.css";
import { useCartContext } from "@/contexts/CartContext";

const CartButton: React.FC = () => {
  const theme = useTheme();
  const { cart } = useCartContext();
  return (
    <div className={styles.cartIcon}>
      {cart?.numberOfItems > 0 && (
        <div className={styles.cartIcon__numberOfProducts}>
          <p className="small">
            {" "}
            {cart?.numberOfItems >= 99 ? "99+" : cart?.numberOfItems}
          </p>
        </div>
      )}
      <Link href={paths.cart()}>
        <Image
          alt="cart"
          src={theme?.theme === "dark" ? CartWhiteIcon : CartIcon}
          width={24}
          height={24}
        />
      </Link>
    </div>
  );
};

export default CartButton;
