import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const TARGET_DOMAIN = (
  process.env.TARGET_DOMAIN || "https://akurainteractive.dpdns.org"
).replace(/\/$/, "");

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Allow internal Next.js assets to load without redirection if requested
  if (
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // Preserve path and query parameters exactly
  const destination = `${TARGET_DOMAIN}${pathname}${search}`;

  // Issue HTTP 301 Moved Permanently for maximum PageRank / SEO authority transfer
  const response = NextResponse.redirect(destination, 301);

  // Search Engine Signal Headers (Googlebot, Bingbot, etc.)
  response.headers.set("Link", `<${destination}>; rel="canonical"`);
  response.headers.set("X-Robots-Tag", "index, follow");
  response.headers.set(
    "Cache-Control",
    "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400"
  );

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static assets:
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
