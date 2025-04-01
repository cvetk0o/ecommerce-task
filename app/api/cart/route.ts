import { Cart, Product } from "@/types";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  addProductToCart,
  applyPromoCode,
  initializeCart,
  removeProductFromCart,
  updateProductQuantity,
} from "./cartOperations";

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
      cart = initializeCart(sessionId);
      cartStore.set(sessionId, cart);
    }
    cart = addProductToCart(cart, product);

    cartStore.set(sessionId, cart);
    return NextResponse.json(cart);
  } catch (error) {
    return NextResponse.json(
      { error: `Invalid request data: ${error}` },
      { status: 400 }
    );
  }
}

export async function DELETE(req: Request) {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value;

  if (!sessionId) {
    return NextResponse.json({ error: "Session not found" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const cartItemId = searchParams.get("itemId");

    if (!cartItemId) {
      return NextResponse.json(
        { error: "Item ID is required" },
        { status: 400 }
      );
    }

    let cart = cartStore.get(sessionId);
    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    cart = removeProductFromCart(cart, cartItemId);

    cartStore.set(sessionId, cart);
    return NextResponse.json(cart);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to remove item: ${error}` },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value;

  if (!sessionId) {
    return NextResponse.json({ error: "Session not found" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const cartItemId = searchParams.get("itemId");
    const isPromoCode = searchParams.get("applyPromoCode") !== null;

    const requestData = await req.json();
    let cart = cartStore.get(sessionId);
    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    if (isPromoCode) {
      const { promoCode } = requestData;

      cart = applyPromoCode(cart, promoCode);

      cartStore.set(sessionId, cart);
      return NextResponse.json(cart);
    }

    const { quantity } = requestData;

    if (!cartItemId) {
      return NextResponse.json(
        { error: "Item ID is required" },
        { status: 400 }
      );
    }

    if (typeof quantity !== "number" || quantity < 1) {
      return NextResponse.json({ error: "Invalid quantity" }, { status: 400 });
    }

    cart = updateProductQuantity(cart, cartItemId, quantity);

    cartStore.set(sessionId, cart);
    return NextResponse.json(cart);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to patch Cart: ${error}` },
      { status: 500 }
    );
  }
}
