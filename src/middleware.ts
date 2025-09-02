// src/middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Protect all pages except Next.js internals & static files
    '/((?!_next/static|_next/image|favicon.ico).*)',
    '/api/:path*', // Protect API routes
  ],
};
