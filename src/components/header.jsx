"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Search } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";

// Clerk imports
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const searchRef = useRef(null);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setQuery("");
      setShowSearch(false); // restore navbar
    }
  };

  const links = [
    { name: "Home", href: "/" },
    { name: "Men", href: "/mens_section" },
    { name: "Women", href: "/womens_section" },
    { name: "Kids", href: "/kids" },
  ];

  // close search if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };
    if (showSearch) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showSearch]);

  useEffect(() => {
    setQuery("");
    setShowSearch(false);
  }, [pathname]);

  return (
    <header className="bg-gradient-to-r from-[#0c0b0c] to-[#a6c1ee] sticky top-0 left-0 z-50 bg-white/80 backdrop-blur-md shadow-md">
      {/* Mobile Search Full Bar */}
      {showSearch ? (
        <div ref={searchRef} className="flex items-center px-4 py-1">
          <form
            onSubmit={handleSearch}
            className="flex items-center w-full border rounded-full bg-white px-3 shadow-md"
          >
            <input
              type="text"
              autoFocus
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
              className="w-full h-10 bg-transparent text-black placeholder-gray-400 outline-none"
            />
          </form>
        </div>
      ) : (
        <nav className="flex justify-between items-center px-2 ">
          {/* Logo (basic/original size) */}
          <Link href="/" className="flex items-center">
            <Image
              src="/Solance_ware_image.png.jpeg"
              alt="Solance Ware logo"
              width={100}
              height={50}
              className="rounded-xl"
            />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6">
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

            {/* Desktop Search */}
            <div className="flex items-center border rounded-3xl py-1 px-2 bg-white shadow-sm">
              <Search className="w-6 h-6 text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
                className="w-56 outline-none text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Right Section (Cart + User + Search Icon + Menu) */}
          <div className="flex items-center gap-3">
             {/* Search Icon (mobile only, close to cart) */}
            <button
              onClick={() => setShowSearch(true)}
              className="md:hidden p-2 rounded-full hover:bg-gray-200"
            >
              <Search className="w-6 h-6 text-white" />
            </button>

            <SignedIn>
              <Link
                href="/cart"
                className="bg-[#a6c1ee] text-white px-4 py-1.5 rounded-full hover:bg-[#87acec] transition"
              >
                Cart
              </Link>
              <UserButton />
            </SignedIn>

            <SignedOut>
             
              <SignUpButton>
                <Button className="bg-[#a6c1ee] text-white hover:bg-[#6793df] rounded-full text-sm px-4 py-1.5">
                  Sign Up
                </Button>
              </SignUpButton>
            </SignedOut>

           
            {/* Mobile Menu */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 rounded hover:bg-gray-200"
            >
              {open ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </nav>
      )}

      {/* Mobile Dropdown Menu */}
      {!showSearch && open && (
        <div className="absolute right-0 top-14 w-48 flex flex-col gap-3 mt-2 bg-gray-500 shadow-md p-4 rounded-lg md:hidden z-50">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`font-semibold ${
                pathname === link.href ? "text-black font-bold" : "text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;