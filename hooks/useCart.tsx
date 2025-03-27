"use client";

import {
  addItemToCart,
  getCart,
  removeCartItem as removeCartItemService,
} from "@/services/cart";
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

  const removeCartItem = async (cartItemId: string) => {
    const updatedCart = await removeCartItemService(cartItemId);
    setCart(updatedCart);
  };

  const isProductInCart = (productId: number) => {
    if (!cart) {
      return false;
    }
    return !!cart.items.find((item) => item.product.id === productId);
  };

  useEffect(() => {
    getCartDetails();
  }, []);

  return {
    cart,
    addProductToCart,
    removeCartItem,
    isProductInCart,
  };
};

export default useCart;
