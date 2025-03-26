import { Product } from "@/types";
import { ProductResponse } from "./types";

const normalizeRatingValue = (rate: number) => {
  return Math.round(rate * 2) / 2;
};

export function mapProductsResponse(productsResponse: ProductResponse[]) {
  return productsResponse.map(
    (product) =>
      ({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        category: product.category,
        rating: {
          rate: normalizeRatingValue(product.rating.rate),
          count: product.rating.count,
        },
      } as Product)
  );
}
