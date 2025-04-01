import { ProductResponse } from "./types";
import { mapProductsResponse } from "./utils";

const FAKESTORE_API =
  process.env.NEXT_FAKESTORE_API || "http://localhost:8000/api/v1";
const PRODUCTS_BASE_API = `${FAKESTORE_API}products`;

export async function getProducts() {
  try {
    const res = await fetch(`${PRODUCTS_BASE_API}`, {
      next: { revalidate: 3600 },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status}`);
    }

    const responseProducts: ProductResponse[] = await res.json();
    return responseProducts;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function getAllProducts() {
  try {
    const responseProducts: ProductResponse[] = await getProducts();
    return mapProductsResponse(responseProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function getFeaturedProducts() {
  try {
    const products = await getProducts();
    const featuredProducts = products.filter(
      (product: ProductResponse) => product.rating.rate >= 4
    );
    return mapProductsResponse(featuredProducts.slice(0, 10));
  } catch (error) {
    console.error("Error fetching featured products:", error);
    throw error;
  }
}
