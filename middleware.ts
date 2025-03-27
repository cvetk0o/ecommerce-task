import { NextRequest, NextResponse } from "next/server";
import { generateMockId } from "./utils/uuid";

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const sessionId = req.cookies.get("sessionId");

  if (!sessionId) {
    const newSessionId = generateMockId();
    res.cookies.set("sessionId", newSessionId, { httpOnly: true, path: "/" });
  }

  return res;
}
