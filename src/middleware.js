import { NextResponse } from "next/server";
import { decode } from "next-auth/jwt";

export async function middleware(request) {
  let sessionToken = undefined;

  if (request.cookies.get("next-auth.session-token")?.value !== undefined) {
    sessionToken = request.cookies.get("next-auth.session-token")?.value;
  }

  if (
    request.cookies.get("__Secure-next-auth.session-token")?.value !== undefined
  ) {
    sessionToken = request.cookies.get(
      "__Secure-next-auth.session-token"
    )?.value;
  }

  if (
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/register")
  ) {
    try {
      if (sessionToken === undefined) {
        throw new Error("Error");
      }
      return NextResponse.redirect(new URL("/", request.url));
    } catch {
      return NextResponse.next();
    }
  }

  if (request.nextUrl.pathname.startsWith("/user")) {
    try {
      if (sessionToken === undefined) {
        throw new Error("Error");
      }
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith("/admin")) {
    try {
      if (sessionToken === undefined) {
        throw new Error("Error");
      }
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
  matcher: [
    "/admin/addcourse/:path*",
    "/admin/assignment/:path*",
    "/admin/courselist/:path*",
    "/admin/editcourse/:path*",
    "/login/:path*",
    "/register/:path*",
    "/user/:path*",
  ],
};
