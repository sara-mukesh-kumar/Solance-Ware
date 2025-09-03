import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/header";
import FooterSection from "@/components/footer";
import "./globals.css";

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error("Missing NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY");
}
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Solance",
  description: "Discover latest fashion trends",
};

export default function RootLayout({ children }) {
  if (!publishableKey) {
    throw new Error("Missing NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY. Please set it in your environment.");
  }

  return (
    <ClerkProvider publishableKey={publishableKey}>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-t from-[#fbc2eb] to-[#a6c1ee] flex flex-col min-h-screen`}
        >
          {/* header */}
          <Header />

          {/* main body grows to push footer down */}
          <main className="flex-grow">{children}</main>

          {/* footer */}
          <FooterSection />
        </body>
      </html>
    </ClerkProvider>
  );
}
