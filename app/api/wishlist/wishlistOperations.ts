import { Product, Wishlist } from "@/types";
import { generateMockId } from "@/utils/uuid";

export function initiliazeWishlist(sessionId: string): Wishlist {
  return {
    wishlistId: sessionId,
    numberOfItems: 0,
    items: [],
  };
}

export function addProductToWishlist(
  wishlist: Wishlist,
  product: Product
): Wishlist {
  const existingItem = wishlist.items.find(
    (item) => item.product.id === product.id
  );

  if (existingItem) {
    wishlist.items = wishlist.items.filter(
      (item) => item.product.id !== product.id
    );
    wishlist.numberOfItems -= 1;
  } else {
    wishlist.items.push({ id: generateMockId(), product });
    wishlist.numberOfItems += 1;
  }

  return wishlist;
}
