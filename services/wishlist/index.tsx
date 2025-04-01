import { Product, Wishlist } from "@/types";

export async function getWishlist() {
  try {
    const wishlistResponse = await fetch("/api/wishlist");

    const wishlist = await wishlistResponse.json();

    return wishlist as Wishlist;
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    throw error;
  }
}

export async function addItemtoWishlist(product: Product) {
  try {
    const wishlistResponse = await fetch("/api/wishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    const wishlist = await wishlistResponse.json();
    if (!wishlistResponse.ok) {
      throw new Error(wishlist.error || "Failed to add item");
    }

    return wishlist as Wishlist;
  } catch (error) {
    console.error("Error adding item to wishlist:", error);
    throw error;
  }
}
