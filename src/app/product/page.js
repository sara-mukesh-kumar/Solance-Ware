"use client";
import { useEffect, useState } from "react";

export default function Nav() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="grid grid-cols-4 gap-6 p-6">
      {products.map((p) => (
        <div key={p.id} className="border p-4 rounded-lg shadow">
          <img src={p.imageUrl} alt={p.name} className="w-full h-48 object-cover" />
          <h2 className="text-lg font-bold mt-2">{p.name}</h2>
          <p className="text-gray-500">{p.description}</p>
          <p className="text-blue-600 font-semibold">₹{p.price}</p>
          <button className="bg-blue-500 text-white px-3 py-1 rounded mt-2">Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
