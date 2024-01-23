import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const logged_in = request.cookies.get("logged_in")?.value;

  const signInUrl = new URL("/", request.url);
  const home = new URL("/home", request.url);

  if (!logged_in) {
    if (request.nextUrl.pathname === "/") {
      return NextResponse.next();
    }

    return NextResponse.redirect(signInUrl);
  }

  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(home);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/card/:path*",
    "/home/:path*",
    "/me/:path*",
    "/notification/:path*",
    "/setting/:path*",
  ],
};
