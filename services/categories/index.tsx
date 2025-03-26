import { getProducts } from "../products";
import { ProductResponse } from "../products/types";
import { mapCategoriesResponse } from "./utils";

export async function getAllCategories() {
  try {
    const allProducts = await getProducts();

    const categories = Array.from(
      new Set<string>(
        allProducts.map((product: ProductResponse) => product.category)
      )
    );

    return mapCategoriesResponse(categories);
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}
