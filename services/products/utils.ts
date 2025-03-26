import { Product } from "@/types";
import { ProductResponse } from "./types";

export function mapProductsResponse(productsResponse: ProductResponse[]) {
  return productsResponse.map(
    (product) =>
      ({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      } as Product)
  );
}
