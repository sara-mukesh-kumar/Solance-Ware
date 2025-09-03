"use client";
import Header from "@/components/header";
import FooterSection from "@/components/footer";
import ClientClerkProvider from "@/components/ClientClerkProvider";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen antialiased bg-gradient-to-t from-[#fbc2eb] to-[#a6c1ee]">
        <ClientClerkProvider>
          <Header /> {/* SignedIn/SignedOut safe here */}
          <main className="flex-grow">{children}</main>
          <FooterSection />
        </ClientClerkProvider>
      </body>
    </html>
  );
}
