import { Product } from "@/types";
import { ProductResponse } from "./types";

const normalizeRatingValue = (rate: number) => {
  return Math.round(rate * 2) / 2;
};

export const mapProductResponseToProduct = (
  productResponse: ProductResponse
) => {
  return {
    id: productResponse.id,
    title: productResponse.title,
    price: productResponse.price,
    image: productResponse.image,
    category: productResponse.category,
    rating: {
      rate: normalizeRatingValue(productResponse.rating.rate),
      count: productResponse.rating.count,
    },
    description: productResponse.description,
  } as Product;
};

export function mapProductsResponse(productsResponse: ProductResponse[]) {
  return productsResponse.map(mapProductResponseToProduct);
}
