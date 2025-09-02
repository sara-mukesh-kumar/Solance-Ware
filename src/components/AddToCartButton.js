"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function AddToCartButton({ productId }) {
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const { isSignedIn } = useUser();
  const router = useRouter();

  async function addToCart() {
    // 🔒 If user not signed in → go to Clerk sign-in page
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });

      if (!res.ok) throw new Error("Failed to add to cart");

      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 1000);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center">
      {/* Message area */}
      <div className="h-4 mb-1">
        {showMessage && (
          <p className="text-green-600 text-sm animate-fade">✅ Added to Bag</p>
        )}
      </div>

      <button
        onClick={addToCart}
        disabled={loading}
        className={`mt-3 bg-black w-full text-white px-4 py-2 rounded-lg transition cursor-pointer 
          ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-gray-700"}`}
      >
        {loading ? "Adding..." : "Add to Cart"}
      </button>
    </div>
  );
}
