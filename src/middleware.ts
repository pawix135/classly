import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { studentAuth, teacherAuth } from "./utils/useAuth";

export function middleware(request: NextRequest) {
  let pathname = request.nextUrl.pathname;

  if (pathname.includes("/teacher")) {
    // Get teacher data from access token
    let teacher = teacherAuth();

    // Check if teacher is already signed in and redirect to dashboard
    if (pathname.includes("/teacher/signin") && teacher)
      return NextResponse.redirect(new URL("/teacher/dashboard", request.url));

    // Skip middleware if teacher tries to sign in
    if (pathname.includes("/teacher/signin")) return NextResponse.next();

    // If teacher doesn't exist, redirect to sign in page
    if (!teacher) return NextResponse.redirect(new URL("/teacher/signin", request.url));

    return NextResponse.next();
  }

  if (pathname.includes("/dashboard")) {
    // Get student data from access token
    let student = studentAuth();

    // If student doesn't exist, redirect to sign in page
    if (!student) return NextResponse.redirect(new URL("/signin", request.url));

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/teacher/:path*"],
};
