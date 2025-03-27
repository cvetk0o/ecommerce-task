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

    return cart as Cart;
  } catch (error) {
    console.error("Error fetching cart:", error);
    throw error;
  }
}
