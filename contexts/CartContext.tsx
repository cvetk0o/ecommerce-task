"use client";
import useCart from "@/hooks/useCart";
import { createContext } from "react";

export const CartContext = createContext({});

const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    cart,
    addProductToCart,
    removeCartItem,
    isProductInCart,
    updateItemQuantity,
    applyPromoCode,
  } = useCart();

  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        removeCartItem,
        isProductInCart,
        updateItemQuantity,
        applyPromoCode,
        cart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
