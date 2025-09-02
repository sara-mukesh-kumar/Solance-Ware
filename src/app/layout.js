import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/header"
import FooterSection from "@/components/footer"
import "./globals.css";

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
export default async function RootLayout({ children }) {
  return (
    <ClerkProvider>
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
