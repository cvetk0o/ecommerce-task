import { Product, Wishlist } from "@/types";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { addProductToWishlist, initiliazeWishlist } from "./wishlistOperations";

const wishlistStore = new Map<string, Wishlist>();

export async function GET() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value;

  if (!sessionId) {
    return NextResponse.json({ error: "Session not found" }, { status: 401 });
  }

  const wishlist = wishlistStore.get(sessionId) || [];
  return NextResponse.json(wishlist);
}

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value;

  if (!sessionId) {
    return NextResponse.json({ error: "Session not found" }, { status: 401 });
  }

  try {
    const product = (await req.json()) as Product;

    let wishlist = wishlistStore.get(sessionId);
    if (!wishlist) {
      wishlist = initiliazeWishlist(sessionId);
      wishlistStore.set(sessionId, wishlist);
    }
    wishlist = addProductToWishlist(wishlist, product);

    wishlistStore.set(sessionId, wishlist);
    return NextResponse.json(wishlist);
  } catch (error) {
    return NextResponse.json(
      { error: `Invalid request data: ${error}` },
      { status: 400 }
    );
  }
}
