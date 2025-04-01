"use client";

import useWhishlist from "@/hooks/useWhishlist";
import { IWhishlistContext } from "@/types";
import { createContext, useContext } from "react";

export const WishlistContext = createContext({});

const WishlistContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { wishlist, isProductInWishlist, addProductToWishlist } =
    useWhishlist();
  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        isProductInWishlist,
        addProductToWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlistContext = () => {
  const context = useContext(WishlistContext) as IWhishlistContext;
  if (!context) {
    throw new Error(
      "useWhishlist must be used within a wishlistContextProvider"
    );
  }
  return context;
};

export default WishlistContextProvider;
