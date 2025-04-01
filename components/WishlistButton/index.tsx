"use client";
import paths from "@/utils/paths";
import Link from "next/link";
import WishlistIcon from "../../public/wishlist.svg";
import WishlistWhiteIcon from "../../public/wishlistWhite.svg";
import Image from "next/image";
import { useTheme } from "@/hooks/useTheme";
import styles from "./WishlistButton.module.css";
import { useWishlistContext } from "@/contexts/Wishlist";

const WishlistButton: React.FC = () => {
  const theme = useTheme();
  const { wishlist } = useWishlistContext();
  return (
    <div className={styles.cartIcon}>
      {wishlist?.numberOfItems > 0 && (
        <div className={styles.cartIcon__numberOfProducts}>
          <p className="small">
            {" "}
            {wishlist?.numberOfItems >= 99 ? "99+" : wishlist?.numberOfItems}
          </p>
        </div>
      )}
      <Link href={paths.wishlist()}>
        <Image
          alt="cart"
          src={theme?.theme === "dark" ? WishlistWhiteIcon : WishlistIcon}
          width={24}
          height={24}
        />
      </Link>
    </div>
  );
};

export default WishlistButton;
