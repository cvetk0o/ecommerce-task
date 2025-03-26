import { getProducts } from "../products";
import { ProductResponse } from "../products/types";
import { groupByCategory, mapCategoriesResponse } from "./utils";

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
    console.error("Error fetching categories:", error);
    throw error;
  }
}

export async function getCategoryDetails(slug: string) {
  try {
    const allProducts = await getProducts();

    const categoriesAndProducts = groupByCategory(allProducts);

    return categoriesAndProducts[slug];
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}
