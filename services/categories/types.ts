import { Product } from "@/types";

export type Category = {
  name: string;
  slug: string;
};

export type CategoryDetails = {
  name: string;
  slug: string;
  numberOfProducts: number;
  products: Product[];
};

export type CategoryProducts = {
  [category: string]: CategoryDetails;
};
