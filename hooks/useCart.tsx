"use client";

import { addItemToCart, getCart } from "@/services/cart";
import { Cart, Product } from "@/types";
import { useEffect, useState } from "react";

const useCart = () => {
  const [cart, setCart] = useState<Cart>();

  const getCartDetails = async () => {
    const data = await getCart();
    setCart(data);
  };

  const addProductToCart = async (product: Product) => {
    const updatedCart = await addItemToCart(product);
    setCart(updatedCart);
  };

  useEffect(() => {
    getCartDetails();
  }, []);

  return {
    cart,
    addProductToCart,
  };
};

export default useCart;
