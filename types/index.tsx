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

export interface CartContextType {
  addProductToCart: (product: Product) => Promise<void>;
  removeCartItem: (cartItemId: string) => Promise<void>;
  isProductInCart: (productId: number) => boolean;
  updateItemQuantity: (
    cartItemId: string,
    newQuantity: number
  ) => Promise<void>;
  applyPromoCode: (promoCode: string) => Promise<void>;
  cart: Cart;
}
