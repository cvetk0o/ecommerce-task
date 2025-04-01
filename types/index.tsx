export type ProductRating = {
  rate: number;
  count: number;
};

export type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  rating: ProductRating;
  description: string;
};

export type CartItem = {
  id: string;
  product: Product;
  quantity: number;
};

export type Cart = {
  cartId: string;
  items: CartItem[];
  dateCreated: Date;
  numberOfItems: number;
  subTotalPrice: number;
  totalPrice: number;
  discount: {
    percentage: number;
    amount: number;
  };
  deliveryFee: number;
  promoCode?: string;
};
export type CartOperationResult = [string | null, Cart | null];

export interface CartContextType {
  addProductToCart: (product: Product) => Promise<CartOperationResult>;
  removeCartItem: (cartItemId: string) => Promise<CartOperationResult>;
  isProductInCart: (productId: number) => boolean;
  updateItemQuantity: (
    cartItemId: string,
    newQuantity: number
  ) => Promise<CartOperationResult>;
  applyPromoCode: (promoCode: string) => Promise<CartOperationResult>;
  cart: Cart;
}

export type ToastType = "success" | "error" | "info";

export type WishlistItem = {
  id: string;
  product: Product;
};

export type Wishlist = {
  wishlistId: string;
  numberOfItems: number;
  items: WishlistItem[];
};

export interface IWhishlistContext {
  wishlist: Wishlist;
  isProductInWishlist: (productId: number) => boolean;
  addProductToWishlist: (product: Product) => Promise<CartOperationResult>;
}
