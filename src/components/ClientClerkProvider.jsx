"use client"; // must be client component
import { ClerkProvider } from "@clerk/nextjs";

export default function ClientClerkProvider({ children }) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey) {
    console.warn("NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is missing. ClerkProvider will not initialize.");
    return <>{children}</>; // render children without Clerk
  }

  return <ClerkProvider publishableKey={publishableKey}>{children}</ClerkProvider>;
}
