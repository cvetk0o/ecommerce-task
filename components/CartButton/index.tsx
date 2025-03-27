import paths from "@/utils/paths";
import Link from "next/link";
import CartIcon from "../../public/cart.svg";
import CartWhiteIcon from "../../public/cartWhite.svg";
import Image from "next/image";
import { useTheme } from "@/hooks/useTheme";
import styles from "./CartButton.module.css";

const NUMBER_OF_PRODUCTS = 31;

const CartButton: React.FC = () => {
  const theme = useTheme();
  return (
    <div className={styles.cartIcon}>
      {NUMBER_OF_PRODUCTS > 0 && (
        <div className={styles.cartIcon__numberOfProducts}>
          <p className="small">
            {" "}
            {NUMBER_OF_PRODUCTS >= 99 ? "99+" : NUMBER_OF_PRODUCTS}
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
