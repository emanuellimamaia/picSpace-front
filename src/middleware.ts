import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // const userAccessLevel = request.cookies.get('role.user')?.value;
  const token = request.cookies.get('picspace.token')?.value;
  //const userRole = request.cookies.get("picspace.user")?.value;
  // const { pathname } = request.nextUrl

  const signInUrl = new URL("/sign-in", request.url)
  const home = new URL("/gallery", request.url)

  //const restrictedRoutes = [""];

  if (!token) {
    return NextResponse.redirect(signInUrl);
  }

  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(home);
  }

  // if (restrictedRoutes.includes(request.nextUrl.pathname) && userRole !== "Admin") {
  //   return NextResponse.redirect(dashboardUrl);
  // }




  return NextResponse.next();
}

export const config = {
  matcher: [
    "/gallery/:path*",
  ]
}