import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { jwt } from "./utils";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  if (req.nextUrl.pathname.startsWith("/checkout")) {
    const { token = "" } = req.cookies as { token?: string };
    try {
      await jwt.isValidToken(token);
      return NextResponse.next();
    } catch (error) {
      const loginUrl = new URL(
        `/auth/login?p=${req.nextUrl.pathname}`,
        req.nextUrl.origin
      );
      return NextResponse.redirect(loginUrl.toString());
    }
  }
}
