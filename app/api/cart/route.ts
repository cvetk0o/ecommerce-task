import { Cart } from "@/types";
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
