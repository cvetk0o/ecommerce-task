"use client";
import Image from "next/image";
import Heart from "../../public/heart.svg";
import FilledHeart from "../../public/filledHeart.svg";
import styles from "./AddToFavouritesButton.module.css";
import { useWishlistContext } from "@/contexts/Wishlist";
import { Product } from "@/types";
import { useToast } from "@/contexts/ToastContext";

interface IAddToFavourites {
  product: Product;
}
const AddToFavourites: React.FC<IAddToFavourites> = ({ product }) => {
  const { isProductInWishlist, addProductToWishlist } = useWishlistContext();
  const addedToWishlist = isProductInWishlist(product.id);
  const { showToast } = useToast();

  const handleAddWishlistItem = async () => {
    const [error] = await addProductToWishlist(product);
    if (error) {
      showToast(
        `Failed to ${addedToWishlist ? "Remove" : "Add"} product to Wishlist:`,
        "error"
      );
    }
  };
  return (
    <button
      className={styles.addToFavouritesButton}
      onClick={handleAddWishlistItem}
    >
      <Image
        src={addedToWishlist ? FilledHeart : Heart}
        alt={addedToWishlist ? "Favourite" : "Add to favourite"}
        width={24}
        height={24}
      />
    </button>
  );
};

export default AddToFavourites;
