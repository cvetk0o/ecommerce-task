"use client";

import {
  addItemToCart,
  getCart,
  removeCartItem as removeCartItemService,
  updateCartItemQuantity,
  applyPromoCodeService,
} from "@/services/cart";
import { Cart, Product } from "@/types";
import { useEffect, useState } from "react";

const useCart = () => {
  const [cart, setCart] = useState<Cart | null>(null);

  const getCartDetails = async () => {
    try {
      const data = await getCart();
      setCart(data);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  };

  const addProductToCart = async (product: Product) => {
    try {
      const updatedCart = await addItemToCart(product);
      setCart(updatedCart);
      return [null, updatedCart];
    } catch (error) {
      console.error("Failed to add product to cart:", error);
      return [
        error instanceof Error
          ? error.message
          : "Failed to add product to cart.",
        null,
      ];
    }
  };

  const removeCartItem = async (cartItemId: string) => {
    try {
      const updatedCart = await removeCartItemService(cartItemId);
      setCart(updatedCart);
      return [null, updatedCart];
    } catch (error) {
      console.error("Failed to remove cart item:", error);
      return [
        error instanceof Error ? error.message : "Failed to remove item.",
        null,
      ];
    }
  };

  const isProductInCart = (productId: number) => {
    return cart?.items?.some((item) => item.product.id === productId) || false;
  };

  const updateItemQuantity = async (
    cartItemId: string,
    newQuantity: number
  ) => {
    try {
      if (newQuantity < 1) throw new Error("Quantity must be at least 1");

      const updatedCart = await updateCartItemQuantity(cartItemId, newQuantity);
      setCart(updatedCart);
      return [null, updatedCart];
    } catch (error) {
      console.error("Error updating quantity:", error);
      return [
        error instanceof Error
          ? error.message
          : "Failed to update item quantity.",
        null,
      ];
    }
  };

  const applyPromoCode = async (promoCode: string) => {
    try {
      if (!cart) throw new Error("No Cart found");

      const updatedCart = await applyPromoCodeService(cart.cartId, promoCode);
      setCart(updatedCart);

      return [null, updatedCart];
    } catch (error) {
      console.error("Error applying promo code:", error);
      return [
        error instanceof Error
          ? error.message
          : "Invalid promo code or failed to apply",
        null,
      ];
    }
  };

  useEffect(() => {
    getCartDetails();
  }, []);

  return {
    cart,
    addProductToCart,
    removeCartItem,
    isProductInCart,
    updateItemQuantity,
    applyPromoCode,
  };
};

export default useCart;
