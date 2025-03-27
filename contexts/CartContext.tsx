"use client";
import useCart from "@/hooks/useCart";
import { createContext } from "react";

export const CartContext = createContext({});

const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { cart, addProductToCart } = useCart();
  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        cart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
