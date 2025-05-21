import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken");
  const refreshToken = req.cookies.get("refreshToken");
  console.log(accessToken,"mdacces")
  console.log(refreshToken,"mdrefresh")
  const { pathname } = req.nextUrl;
   
  if (!accessToken && refreshToken) {
    const refreshURL = new URL('/api/refresh', req.url);
    refreshURL.searchParams.set('redirect', pathname);
    return NextResponse.redirect(refreshURL);
  }

  if (!accessToken && !["/login", "/signup"].includes(pathname)) {
    return NextResponse.redirect(new URL(`/signup`, req.url));
  }

  if (accessToken && ["/login", "/signup"].includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}




export const config = {
    matcher: ["/rental","/roundTrip","/airport","/oneWay"],
};