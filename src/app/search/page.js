"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import AddToCartButton from "@/components/AddToCartButton"; // adjust path if needed

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    // Fetch your products (API / local JSON)
    const fetchProducts = async () => {
      const res = await fetch("/api/products"); // adjust to your backend
      const data = await res.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (query.trim()) {
      const results = products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase())
      );
      setFiltered(results);
    } else {
      setFiltered([]);
    }
  }, [query, products]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Search Results for "{query}"
      </h1>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="flex flex-col border bg-white p-4 rounded-lg shadow"
            >
              <div className="overflow-hidden rounded-xl shadow-md">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-30 md:h-80 sm:h-60 object-contain transform transition duration-300 hover:scale-105 cursor-pointer"
                />
              </div>

              <p className="mt-2">
                {product.name.length > 50
                  ? product.name.substring(0, 50) + "..."
                  : product.name}
              </p>
              <p className="text-gray-500 text-sm">{product.description}</p>
              <p className="text-blue-600 font-semibold mt-1">
                ₹{product.price}
              </p>
              <div className="flex-grow"></div>
              <AddToCartButton productId={product.id} />
            </div>
          ))}
        </div>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
}
