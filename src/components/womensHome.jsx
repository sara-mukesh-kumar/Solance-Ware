"use client";
import { useState, useEffect } from "react";
import AddToCartButton from "./AddToCartButton";

export default function MenSection() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async (query = "") => {
    const res = await fetch(`/api/products/womens?q=${query}`);
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section className="p-6">
      <p className="mt-3 text-lg md:text-xl text-gray-700 italic">
        <b>
          <u> Women’s Collection</u>
        </b>
      </p>
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 p-6 gap-6">
        {products.slice(0, 4).map((prod) => (
          <div
            key={prod.id}
            className="flex flex-col border bg-white p-4 rounded-lg shadow"
          >
            <div className="overflow-hidden rounded-xl shadow-md">
              <img
                src={prod.imageUrl}
                alt={prod.name}
                className="w-full h-30 md:h-80 sm:h-60 object-contain transform transition duration-300 hover:scale-105 cursor-pointer"
              />
            </div>

            <p className="mt-2">
              {prod.name.length > 50
                ? prod.name.substring(0, 50) + "..."
                : prod.name}
            </p>
            <p className="text-gray-500 text-sm">{prod.description}</p>
            <p className="text-blue-600 font-semibold mt-1">₹{prod.price}</p>
            <div className="flex-grow"></div>
            <AddToCartButton productId={prod.id} />
          </div>
        ))}
      </div>
    </section>
  );
}

