// /app/api/auth/check/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken");
  const refreshToken = req.cookies.get("refreshToken");

  if (accessToken) {
    return NextResponse.json({ authenticated: true });
  }

  if (refreshToken) {
    return NextResponse.json({ authenticated: false, refresh: true });
  }

  return NextResponse.json({ authenticated: false });
}
