import { NextResponse } from "next/server";
import { getSession } from "next-auth/react";
import { decode } from "next-auth/jwt";

export async function middleware(request) {
  if (
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/register")
  ) {
    const sessionToken = request.cookies.get("next-auth.session-token")?.value;

    if (sessionToken) {
      return NextResponse.redirect(new URL("/homepage", request.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/homepage/:path*",
    "/api/auth/logout/:path*",
    "/login/:path*",
    "/register/:path*",
  ],
};
