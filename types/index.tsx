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
};

export type Cart = {
  cartId: number;
  products: Product[];
  dateCreated: Date;
};
