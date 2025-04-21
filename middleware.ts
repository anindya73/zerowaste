import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the path
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const isPublicPath = path === "/login" || path === "/reset-password"

  // Check for authentication token
  const token = request.cookies.get("auth-token")?.value

  // Redirect logic
  if (isPublicPath && token) {
    // If user is authenticated and tries to access public path, redirect to dashboard
    return NextResponse.redirect(new URL("/", request.url))
  }

  if (!isPublicPath && !token) {
    // If user is not authenticated and tries to access protected path, redirect to login
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

// Configure which paths should trigger this middleware
export const config = {
  matcher: [
    "/",
    "/inventory/:path*",
    "/scanner",
    "/notifications",
    "/analytics",
    "/settings",
    "/login",
    "/reset-password",
  ],
}
