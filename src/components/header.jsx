"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const Header = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setQuery(""); // clear input after searching
    }
  };

  const links = [
    { name: "Home", href: "/" },
    { name: "Men", href: "/mens_section" },
    { name: "Women", href: "/womens_section" },
    { name: "Kids", href: "/kids" },
  ];

  useEffect(() => {
    setQuery(""); // clear when route changes
  }, [pathname]);

  return (
    <header className="bg-gradient-to-r from-[#0c0b0c] to-[#a6c1ee] top-0 left-0 sticky  z-50 bg-white/80 backdrop-blur-md shadow-md">
      <nav className="flex justify-between items-center px-6 py-0">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/Solance_ware_image.png.jpeg"
            alt="Solance Ware logo"
            width={120}
            height={60}
            className="rounded-xl"
          />
        </Link>
        {/* Search Box (mobile) */}
        <div className=" flex items-center border rounded-3xl bg-white shadow-sm px-2 w-35 md:hidden">
          <Search className="w-8 h-8 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
            className="w-full h-11 p-2 pl-3 rounded-2xl bg-white text-black placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-7">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-semibold transition ${
                pathname === link.href
                  ? "text-black border-b-2 border-black"
                  : "text-white hover:text-black"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Search Box (desktop) */}
          <div className="flex items-center w-full border rounded-3xl  py-1 bg-white shadow-sm">
            <Search className="w-10 h-10 pl-2 text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
              className="w-full outline-none text-gray-700 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Auth + Cart */}
        <div className="flex items-center gap-3">
          <SignedIn>
            <Link
              href="/cart"
              className="bg-[#a6c1ee] text-white px-5 py-2 rounded-full hover:bg-[#87acec] transition"
            >
              Cart
            </Link>
            <UserButton />
          </SignedIn>

          <SignedOut>
            <SignInButton>
              <Button className="bg-[#a6c1ee] text-white hover:bg-[#6793df] rounded-full">
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton>
              <Button className="bg-[#a6c1ee] text-white hover:bg-[#6793df] rounded-full">
                Sign Up
              </Button>
            </SignUpButton>
          </SignedOut>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded hover:bg-gray-200"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className=" absolute right-0 top-16 w-48 flex flex-col gap-3 mt-2 bg-gray-500 shadow-md p-4 rounded-lg md:hidden z-50">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)} // close menu on click
              className={`font-semibold ${
                pathname === link.href
                  ? "text-black font-bold"
                  : "text-gray-700"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Search Box (mobile) */}
          {/* <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
            className="w-full bg-black rounded-2xl h-11 pl-2 outline-none text-white placeholder-white"
          /> */}
        </div>
      )}
    </header>
  );
};

export default Header;
