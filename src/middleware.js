import { NextResponse } from "next/server";
import { jwtVerify, importJWK } from "jose";
import { cookies } from "next/headers";

export async function middleware(request) {
  if (request.nextUrl.pathname.startsWith("/homepage")) {
    try {
      console.log("test success1");
      let token = request.cookies.get("token");
      const secretJWK = {
        kty: "oct",
        k: process.env.SECRET_KEY,
      };
      console.log("test success 2");

      const secretKey = await importJWK(secretJWK, "HS256");
      console.log("test success 3");
      const { payload } = await jwtVerify(token.value, secretKey);

      return NextResponse.next();
    } catch (error) {
      const response = NextResponse.next();
      response.cookies.delete("token");

      return response;
    }
  }

  if (
    (request.nextUrl.pathname.startsWith("/login") ||
      request.nextUrl.pathname.startsWith("/register")) &&
    request.cookies.get("token")
  ) {
    return NextResponse.redirect(new URL("/homepage", request.url));
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
