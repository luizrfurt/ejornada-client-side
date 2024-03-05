import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const loggedIn = request.cookies.get("loggedIn")?.value;

  const signInUrl = new URL("/", request.url);
  const home = new URL("/home", request.url);

  if (!loggedIn) {
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
  matcher: ["/", "/home/:path*", "/cards/:path*", "/profile/:path*", "/about/:path*"],
};
