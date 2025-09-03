// import Header from "@/components/header";
// import FooterSection from "@/components/footer";
// import ClientClerkProvider from "@/components/ClientClerkProvider";
// import "./globals.css";

// export const metadata = {
//   title: "Solance",
//   description: "Discover latest fashion trends",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className="flex flex-col min-h-screen antialiased bg-gradient-to-t from-[#fbc2eb] to-[#a6c1ee]">
//         <ClientClerkProvider>
//           <Header /> {/* SignedIn / SignedOut will now work safely */}
//           <main className="flex-grow">{children}</main>
//           <FooterSection />
//         </ClientClerkProvider>
//       </body>
//     </html>
//   );
// }


// app/layout.js
"use client";

import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
