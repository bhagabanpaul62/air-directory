import { NextResponse } from "next/server";
import { jwtVerify } from "jose"; // Use jose for Edge runtime compatibility if needed, or stick to standard verification

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  const isAdminPath = path.startsWith("/admin");
  const isLoginPage = path === "/admin/login";

  // Define public paths that shouldn't be protected
  if (!isAdminPath && !isLoginPage) {
    return NextResponse.next();
  }

  const token = request.cookies.get("admin_token")?.value;
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  let isAuthenticated = false;

  if (token) {
    try {
      await jwtVerify(token, secret);
      isAuthenticated = true;
    } catch (error) {
      // Token invalid or expired
      isAuthenticated = false;
    }
  }

  // Redirect logic
  if (isAdminPath && !isAuthenticated && !isLoginPage) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (isLoginPage && isAuthenticated) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
