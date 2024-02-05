import { NextResponse } from "next/server";
import { getSession } from "next-auth/react";
import { decode } from "next-auth/jwt";

export async function middleware(request) {
  if (
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/register")
  ) {
    try {
      const sessionToken = request.cookies.get("next-auth.session-token").value;
      return NextResponse.redirect(new URL("/homepage", request.url));
    } catch {
      return NextResponse.next();
    }
  }

  if (request.nextUrl.pathname.startsWith("/admin/dashboard")) {
    try {
      const sessionToken = request.cookies.get("next-auth.session-token").value;

      const result = await decode({
        token: sessionToken,
        secret: process.env.NEXTAUTH_SECRET,
      });

      if (result.role !== "admin") {
        throw new Error("Failed to validate");
      }

      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }
}

export const config = {
  matcher: ["/admin/dashboard/:path*", "/login/:path*", "/register/:path*"],
};
