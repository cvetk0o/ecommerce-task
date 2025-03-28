import { Cart, Product } from "@/types";
import { generateMockId } from "@/utils/uuid";
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
        discount: {
          percentage: 0,
          amount: 0,
        },
        deliveryFee: 0,
      } as Cart;
      cartStore.set(sessionId, cart);
    }
    const existingItem = cart.items.find(
      (item) => item.product.id === product.id
    );
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({ id: generateMockId(), product, quantity: 1 });
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

    const cart = cartStore.get(sessionId);
    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    const itemIndex = cart.items.findIndex((item) => item.id === cartItemId);
    if (itemIndex === -1) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    const removedItem = cart.items[itemIndex];
    cart.numberOfItems -= removedItem.quantity;
    cart.totalPrice -= removedItem.product.price * removedItem.quantity;

    cart.items.splice(itemIndex, 1);

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
    const { quantity } = await req.json();

    if (!cartItemId) {
      return NextResponse.json(
        { error: "Item ID is required" },
        { status: 400 }
      );
    }

    if (typeof quantity !== "number" || quantity < 1) {
      return NextResponse.json({ error: "Invalid quantity" }, { status: 400 });
    }

    const cart = cartStore.get(sessionId);
    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    const cartItem = cart.items.find((item) => item.id === cartItemId);
    if (!cartItem) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    const quantityDiff = quantity - cartItem.quantity;

    cart.numberOfItems += quantityDiff;
    cart.totalPrice += cartItem.product.price * quantityDiff;

    cartItem.quantity = quantity;

    cartStore.set(sessionId, cart);
    return NextResponse.json(cart);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to update quantity: ${error}` },
      { status: 500 }
    );
  }
}
