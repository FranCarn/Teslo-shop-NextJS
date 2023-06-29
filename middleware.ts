import { NextFetchEvent, NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwt } from "./utils";

export async function middleware(request: NextRequest, ev: NextFetchEvent) {
  const cookies = request.cookies;
  const previousPage = request.nextUrl.pathname;
  const token = cookies.get("token");

  let isValidToken = false;

  if (!token) {
    return NextResponse.redirect(
      new URL(`/auth/login?p=${previousPage}`, request.url)
    );
  }
  try {
    await jwt.isValidToken(token.toString());
    isValidToken = true;
  } catch (error) {
    return NextResponse.redirect(
      new URL(`/auth/login?p=${previousPage}`, request.url)
    );
  }
  if (!isValidToken) {
    return NextResponse.redirect(
      new URL(`/auth/login?p=${previousPage}`, request.url)
    );
  }
  NextResponse.next();
}

export const config = {
  matcher: "/checkout/:path*",
};
