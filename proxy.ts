import { type NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { guestRegex, isDevelopmentEnvironment } from "./lib/constants";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/ping")) {
    return new Response("pong", { status: 200 });
  }

  // Allow all API routes through
  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // Redirect /chat to /chat/[id]
  if (pathname === "/chat") {
    // Generate a valid UUID
    const uuid = crypto.randomUUID();
    return NextResponse.redirect(new URL(`/chat/${uuid}`, request.url));
  }

  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    secureCookie: !isDevelopmentEnvironment,
  });

  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  // Public pages - no auth required, no guest redirect
  const publicPages = ["/", "/login", "/register"];
  
  // Protected pages - allow access, they'll handle auth checks themselves
  const protectedPages = ["/chat", "/campaign", "/documents"];
  
  // Don't redirect to guest for public or protected pages
  const isPublicPage = publicPages.includes(pathname) || 
                       protectedPages.some(page => pathname === page || pathname.startsWith(page + "/"));
  
  if (!token && !isPublicPage) {
    const redirectUrl = encodeURIComponent(new URL(request.url).pathname);

    return NextResponse.redirect(
      new URL(`${base}/api/auth/guest?redirectUrl=${redirectUrl}`, request.url)
    );
  }

  const isGuest = guestRegex.test(token?.email ?? "");

  if (token && !isGuest && ["/login", "/register"].includes(pathname)) {
    return NextResponse.redirect(new URL(`${base}/`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/chat",
    "/chat/:id",
    "/campaign",
    "/documents",
    "/api/:path*",
    "/login",
    "/register",

    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
