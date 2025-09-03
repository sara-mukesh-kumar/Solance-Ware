"use client";
import { ClerkProvider } from "@clerk/nextjs";

export default function ClientClerkProvider({ children }) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey) {
    console.warn("NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY missing, ClerkProvider not initialized.");
    return <>{children}</>; // fallback
  }

  return <ClerkProvider publishableKey={publishableKey}>{children}</ClerkProvider>;
}
