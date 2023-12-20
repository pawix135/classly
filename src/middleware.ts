import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { useAuth } from "./utils/useAuth";

export function middleware(request: NextRequest) {
  // Get student data from access token
  let student = useAuth();

  // If student doesn't exist, redirect to sign in page
  if (!student) return NextResponse.redirect(new URL("/signin", request.url));

  return NextResponse.next();
}

export const config = {
  matcher: "/dashboard/:path*",
};
