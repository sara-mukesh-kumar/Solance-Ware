import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/header";
import FooterSection from "@/components/footer";
import ClientClerkProvider from "@/components/ClientClerkProvider"; // import client wrapper
import "./globals.css";
import { SpeedInsights } from "@vercel/analytics/react";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  title: "Solance",
  description: "Discover latest fashion trends",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-t from-[#fbc2eb] to-[#a6c1ee] flex flex-col min-h-screen`}
      >
        <ClientClerkProvider>
          <Header /> {/* now SignedIn inside Header works */}
          <main className="flex-grow">{children}</main>
          <FooterSection />
          <SpeedInsights/>
        </ClientClerkProvider>
      </body>
    </html>
  );
}

