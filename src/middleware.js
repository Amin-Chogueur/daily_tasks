import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;
  const isAuthRoute = pathname === "/" || pathname === "/signUp";

  if (!token && !isAuthRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home", "/", "/signUp"],
};
