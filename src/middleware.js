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
        k: process.env.SECRET_KEY, // Replace with your actual base64 encoded secret key
      };

      const secretKey = await importJWK(secretJWK, "HS256");
      const { payload } = await jwtVerify(token.value, secretKey);

      // const requestHeaders = new Headers(request.headers);
      // requestHeaders.set("user", JSON.stringify({ email: payload.email }));
      // const response = NextResponse.next({
      //   request: {
      //     headers: requestHeaders,
      //   },
      // });
      // return response;

      return NextResponse.next();
    } catch (error) {
      // const requestHeaders = new Headers(request.headers);
      // requestHeaders.set("user", JSON.stringify({ email: "" }));
      // const response = NextResponse.next({
      //   request: {
      //     headers: requestHeaders,
      //   },
      // });
      // return response;
      const response = NextResponse.next();
      response.cookies.delete("token");

      return response;
    }
  }

  // if (request.nextUrl.pathname.startsWith("/api/auth/logout")) {
  //   const requestHeaders = new Headers(request.headers);
  //   requestHeaders.set("user", JSON.stringify({ email: "" }));
  //   const response = NextResponse.next({
  //     request: {
  //       headers: requestHeaders,
  //     },
  //   });
  //   return response;
  // }
}

export const config = {
  matcher: ["/homepage/:path*", "/api/auth/logout/:path*"],
};
