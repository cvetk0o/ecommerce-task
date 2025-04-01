"use client";

import { addItemtoWishlist, getWishlist } from "@/services/wishlist";
import { Product, Wishlist } from "@/types";
import { useEffect, useState } from "react";

const useWhishlist = () => {
  const [wishlist, setWishlist] = useState<Wishlist | null>(null);

  const getWishlistDetails = async () => {
    try {
      const data = await getWishlist();
      setWishlist(data);
    } catch (error) {
      console.error("Failed to fetch wishlist:", error);
    }
  };
  const isProductInWishlist = (productId: number) => {
    return (
      wishlist?.items?.some((item) => item.product.id === productId) || false
    );
  };

  const addProductToWishlist = async (product: Product) => {
    try {
      const updatedWishlist = await addItemtoWishlist(product);
      setWishlist(updatedWishlist);
      return [null, updatedWishlist];
    } catch (error) {
      console.error("Failed to add product to wishlist:", error);
      return [
        error instanceof Error
          ? error.message
          : "Failed to add product to wishlist.",
        null,
      ];
    }
  };

  useEffect(() => {
    getWishlistDetails();
  }, []);

  return {
    wishlist,
    isProductInWishlist,
    addProductToWishlist,
  };
};

export default useWhishlist;
