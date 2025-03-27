"use client";
import useCart from "@/hooks/useCart";
import { createContext } from "react";

interface CartContextType {
  testValue: number;
}

export const CartContext = createContext<CartContextType>({
  testValue: 0,
});

const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { cart } = useCart();
  console.log("CARTTT:", cart);
  return (
    <CartContext.Provider value={{ testValue: 0 }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
