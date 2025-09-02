// src/components/ProductCard.js
"use client";

export default function ProductCard({ product }) {
  const addToCart = async () => {
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id }),
      });

      if (!res.ok) throw new Error("Failed to add to cart");

      alert(`${product.name} added to cart 🛒`);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover rounded"
      />
      <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
      <p className="text-gray-600">₹{product.price}</p>
      <button
        onClick={addToCart}
        className="mt-4 bg-black text-white py-2 w-full rounded-lg hover:bg-gray-800"
      >
        Add to Cart
      </button>
    </div>
  );
}
