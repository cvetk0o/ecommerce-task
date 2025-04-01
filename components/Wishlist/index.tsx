"use client";
import ProductsSection from "@/components/ProductsSection";
import { useWishlistContext } from "@/contexts/Wishlist";
import MarkedText from "../MarkedText";
import { MarkedTextElements } from "../MarkedText/types";

const Wishlist = () => {
  const { wishlist } = useWishlistContext();

  if (!wishlist || !wishlist.numberOfItems)
    return (
      <MarkedText
        text={"Your wishlist is empty"}
        element={MarkedTextElements.h3}
      />
    );
  return (
    <ProductsSection
      products={wishlist.items.map((item) => item.product)}
      sectionTitle={"Your Wishlist"}
    />
  );
};

export default Wishlist;
