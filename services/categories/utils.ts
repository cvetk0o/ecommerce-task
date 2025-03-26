import { Category, CategoryDetails, CategoryProducts } from "./types";
import { ProductResponse } from "../products/types";
import { mapProductResponseToProduct } from "../products/utils";

export function mapCategoriesResponse(categories: string[]) {
  return categories.map((item) => {
    return {
      name: item.toUpperCase(),
      slug: item.toLowerCase().replace(/\s+/g, "_"),
    } as Category;
  });
}

export const groupByCategory = (
  products: ProductResponse[]
): CategoryProducts => {
  return products.reduce((acc, product) => {
    const categorySlug = product.category.toLowerCase().replace(/\s+/g, "_");
    if (!acc[categorySlug]) {
      acc[categorySlug] = {
        name: product.category,
        slug: categorySlug,
        numberOfProducts: 0,
        products: [],
      } as CategoryDetails;
    }
    acc[categorySlug].products.push(mapProductResponseToProduct(product));
    acc[categorySlug].numberOfProducts++;
    return acc;
  }, {} as CategoryProducts);
};
