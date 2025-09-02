"use client";
import { useEffect, useState } from "react";
import {
  SignedOut,
} from "@clerk/nextjs";
import HeaderWrapper from "@/components/HeaderWrapper";
import MenSection from "@/components/mensHome";
import WomensSection from "@/components/womensHome";
import KidsSection from "@/components/kidsHome";
import Link from "next/link";
import { SignUpButton } from "@clerk/nextjs";
export default function Home() {
  const [products, setProducts] = useState([]); // <-- declare products

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);
  return (
    <main className="">
      <section className="text-center">
        <div className="container mx-auto flex flex-col md:flex-row items-center px-6 pb-6 md:px-12 pt-10">
          {/* Left Text Content */}
          <div className="md:w-1/2 text-center md:text-left md:space-y-6 space-y-2">
            <HeaderWrapper className="text-4xl md:text-6xl font-bold " />

            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              Welcome to <span className="text-blue-600">Solance</span>
            </h1>
            <h2 className="text-2xl md:text-4xl font-semibold text-gray-800">
              Where Fashion Meets You
            </h2>

            <p className="text-gray-600 text-lg md:text-xl">
              Explore the latest fashion trends and exclusive collections
              designed just for you.
            </p>

            <div className="flex justify-center md:justify-start gap-4 pt-4">
              <SignedOut>
                <SignUpButton>
                <button 
                className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105">
                  Shop Now
                </button>
                </SignUpButton>
              </SignedOut>
              <Link
                href="/about"
                className="px-6 py-3 bg-white text-blue-600 font-medium rounded-full shadow hover:bg-blue-50 transition"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="md:w-1/2 flex justify-center items-center mb-8 pt-3 md:mb-0">
            <img
              src="/top_right image.jpg"
              alt="Hero"
              className="w-full max-w-md md:max-w-lg h-auto rounded-2xl object-contain shadow-lg"
            />
          </div>
        </div>

        <b>
          <h1 className="text-4xl">New Season, New Offers ✨</h1>
        </b>

        <img
          src="/sale up to.jpg"
          alt="Hero"
          className="w-full  px-3  h-auto rounded-4xl object-cover mt-6"
        />
        <br />
        {/* sample products */}
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide text-gray-900">
          <u>Discover Your Style</u>
        </h2>
        {/* mens products */}
        <MenSection />
        {/* womens poducts */}
        <WomensSection />
        {/* Kids Section */}
        <KidsSection />
      </section>
    </main>
  );
}
