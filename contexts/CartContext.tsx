"use client";
import useCart from "@/hooks/useCart";
import { CartContextType } from "@/types";
import { createContext, useContext } from "react";

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
        cart,
        addProductToCart,
        removeCartItem,
        isProductInCart,
        updateItemQuantity,
        applyPromoCode,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext) as CartContextType;
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};

export default CartContextProvider;
