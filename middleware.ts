import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// export async function middleware(req: NextRequest) {
//   const session: any = await getToken({
//     req,
//     secret: process.env.NEXTAUTH_SECRET,
//   });
//   console.log(session);
//   const requestedPage = req.nextUrl.pathname;
//   const validRoles = ["admin", "super-user", "SEO"];

//   if (!session) {
//     const url = req.nextUrl.clone();

//     url.pathname = `/auth/login`;
//     url.search = `p=${requestedPage}`;

//     if (requestedPage.includes("/api")) {
//       throw new Error(JSON.stringify({ message: "No autorizado" }));
//     }

//     throw NextResponse.redirect(url);
//   }

//   if (
//     requestedPage.includes("/api/admin") &&
//     !validRoles.includes(session.user.role)
//   ) {
//     throw new Error(JSON.stringify({ message: "No autorizado" }));
//   }

//   if (
//     requestedPage.includes("/admin") &&
//     !validRoles.includes(session.user.role)
//   ) {
//     throw NextResponse.redirect(new URL("/", req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/checkout/:path*",
//     "/orders/:path*",
//     "/api/orders/:path*",
//     "/admin/:path*",
//     "/api/admin/:path*",
//   ],
// };
