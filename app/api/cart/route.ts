import { Cart, Product } from "@/types";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const cartStore = new Map<string, Cart>();

export async function GET() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value;

  if (!sessionId) {
    return NextResponse.json({ error: "Session not found" }, { status: 401 });
  }

  const cart = cartStore.get(sessionId) || [];
  return NextResponse.json(cart);
}

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value;

  if (!sessionId) {
    return NextResponse.json({ error: "Session not found" }, { status: 401 });
  }

  try {
    const product = (await req.json()) as Product;

    let cart = cartStore.get(sessionId);
    if (!cart) {
      cart = {
        cartId: sessionId,
        items: [],
        dateCreated: new Date(),
        numberOfItems: 0,
        totalPrice: 0,
      } as Cart;
      cartStore.set(sessionId, cart);
    }
    const existingItem = cart.items.find(
      (item) => item.product.id === product.id
    );
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({ product, quantity: 1 });
    }
    cart.numberOfItems += 1;
    cart.totalPrice += product.price;

    cartStore.set(sessionId, cart);
    return NextResponse.json(cart);
  } catch (error) {
    return NextResponse.json(
      { error: `Invalid request data: ${error}` },
      { status: 400 }
    );
  }
}
