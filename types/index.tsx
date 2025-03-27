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
  totalPrice: number;
};

export interface CartContextType {
  addProductToCart: (product: Product) => void;
  removeCartItem: (cartItemId: string) => void;
  isProductInCart: (productId: number) => boolean;
  cart: Cart;
}
