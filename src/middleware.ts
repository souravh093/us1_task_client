import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

const AuthRoutes = ["/login", "/register"];

const RoleBasedRoutes = {
  USER: [/^\/$/, /^\/profile/, /^\/client/],
  ADMIN: [/^\/$/, /^\/admin/, /^\/profile/],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get token from cookies
  const token = request.cookies.get("token")?.value;

  console.log("Token:", token);

  let user: { role?: string } | null = null;


  if (token) {
    try {
      user = jwtDecode(token); // Decode token to extract user details
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  console.log(user)

  // If user is not authenticated
  if (!user) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next(); // Allow login/register pages
    } else {
      return NextResponse.redirect(new URL(`/login?redirect=${pathname}`, request.url));
    }
  }

  // Check user role and allowed routes
  if (user.role && RoleBasedRoutes[user.role as keyof typeof RoleBasedRoutes]) {
    const allowedRoutes = RoleBasedRoutes[user.role as keyof typeof RoleBasedRoutes];

    if (allowedRoutes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  // Redirect to home if no match
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    "/",
    "/profile",
    "/profile/:path*",
    "/admin",
    "/admin/:path*",
    "/login",
    "/register",
  ],
};
