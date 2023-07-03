import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextApiRequest } from "next";

export async function middleware(req: NextApiRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!session) {
    const requestedPage = req.url;
    const url = new URL("/auth/login", process.env.BASE_URL);
    url.searchParams.set("p", requestedPage!);
    return NextResponse.redirect(url.toString());
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/checkout/address", "/checkout/summary"],
};
