import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const getJwtSecretKey = () => {
  const secret = process.env.ADMIN_SECRET;
  if (!secret || secret.length === 0) {
    return "fallback-dev-secret-key-do-not-use-in-prod";
  }
  return secret;
};

export async function middleware(req: NextRequest) {
  // Protect all /admin routes
  if (req.nextUrl.pathname.startsWith("/admin")) {
    const sessionCookie = req.cookies.get("admin_session");

    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      // Verify the JWT signature
      const { payload } = await jwtVerify(
        sessionCookie.value,
        new TextEncoder().encode(getJwtSecretKey())
      );
      
      // Verification successful, allow request
      return NextResponse.next();
    } catch (err) {
      // Token is invalid or expired
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
