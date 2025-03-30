import { Cart, Product } from "@/types";

export async function getCart() {
  try {
    const cartResponse = await fetch("/api/cart");

    const cart = await cartResponse.json();

    return cart as Cart;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
}

export async function addItemToCart(product: Product) {
  try {
    const cartResponse = await fetch("/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    const cart = await cartResponse.json();
    if (!cartResponse.ok) {
      throw new Error(cart.error || "Failed to add item");
    }

    return cart as Cart;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
}

export async function removeCartItem(cartItemId: string) {
  try {
    const cartResponse = await fetch(`/api/cart?itemId=${cartItemId}`, {
      method: "DELETE",
    });
    const cart = await cartResponse.json();
    if (!cartResponse.ok) {
      throw new Error(cart.error || "Failed to remove item");
    }
    return cart as Cart;
  } catch (error) {
    console.error("Error removing cart item:", error);
    throw error;
  }
}

export async function updateCartItemQuantity(
  cartItemId: string,
  newQuantity: number
) {
  try {
    const cartResponse = await fetch(`/api/cart?itemId=${cartItemId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: newQuantity }),
    });
    const cart = await cartResponse.json();
    if (!cartResponse.ok) {
      throw new Error(cart.error || "Failed to update quantity");
    }
    return cart as Cart;
  } catch (error) {
    console.error("Error updateing quantity", error);
    throw error;
  }
}

export async function applyPromoCodeService(cartId: string, promoCode: string) {
  try {
    const response = await fetch(`/api/cart?applyPromoCode`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ promoCode, cartId }),
    });
    const cart = await response.json();
    if (!response.ok) {
      throw new Error(cart.error || "Failed to apply promo code");
    }
    return cart as Cart;
  } catch (error) {
    console.error("Error applying promo code:", error);
    throw error;
  }
}
