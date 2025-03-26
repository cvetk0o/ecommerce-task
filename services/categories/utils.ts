import { Category } from "./types";

export function mapCategoriesResponse(categories: string[]) {
  return categories.map((item) => {
    return {
      name: item.toUpperCase(),
      slug: item.toLowerCase().replace(/\s+/g, "_"),
    } as Category;
  });
}
