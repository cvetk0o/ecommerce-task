import { NextRequest, NextResponse } from "next/server";

function generateMockId() {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 15);
  return `${timestamp}-${randomPart}`;
}

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const sessionId = req.cookies.get("sessionId");

  if (!sessionId) {
    const newSessionId = generateMockId();
    res.cookies.set("sessionId", newSessionId, { httpOnly: true, path: "/" });
  }

  return res;
}
