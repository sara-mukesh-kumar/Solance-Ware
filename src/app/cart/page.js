"use client";
import { useEffect, useState, useMemo } from "react";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [busyId, setBusyId] = useState(null); // lock buttons per-item while updating

  // Load cart
  useEffect(() => {
    (async () => {
      const res = await fetch("/api/cart");
      if (!res.ok) return;
      const data = await res.json();
      setCart(data);
    })();
  }, []);

  // Remove item
  const removeFromCart = async (itemId) => {
    setBusyId(itemId);
    try {
      const res = await fetch(`/api/cart/${itemId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to remove item");
      setCart((prev) => prev.filter((i) => i.id !== itemId));
    } finally {
      setBusyId(null);
    }
  };

  // Update quantity (inc/dec)
  const updateQty = async (itemId, action) => {
    setBusyId(itemId);
    try {
      const res = await fetch(`/api/cart/${itemId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }), // "inc" | "dec"
      });
      if (!res.ok) throw new Error("Failed to update quantity");

      const payload = await res.json();
      // If item was deleted due to going to 0, remove it
      if (payload?.deleted) {
        setCart((prev) => prev.filter((i) => i.id !== itemId));
      } else if (payload?.item) {
        // Replace with updated item
        setCart((prev) =>
          prev.map((i) =>
            i.id === itemId ? { ...i, quantity: payload.item.quantity } : i
          )
        );
      }
    } finally {
      setBusyId(null);
    }
  };

  // Totals
  const { totalQty, subtotal } = useMemo(() => {
    const totalQty = cart.reduce((s, i) => s + i.quantity, 0);
    const subtotal = cart.reduce(
      (s, i) => s + i.quantity * i.product.price,
      0
    );
    return { totalQty, subtotal };
  }, [cart]);

  const handleBuy = () => {
    if (!cart.length) return;
    // Hook up to your checkout later
    alert(
      "🚧 Under Build 🚧\nThank you for visiting 🙏",
      "color: white; background: #f87171; font-size:18px; font-weight:bold; padding:8px 12px; border-radius:8px;",
      "color: #10b981; font-size:16px; font-weight:bold;"
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Your Cart 🛒</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">No items in cart</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => {
              const stock = item.product.stock ?? 0;
              const canInc = item.quantity < stock;
              const canDec = item.quantity > 1;
              const lineTotal = item.quantity * item.product.price;

              return (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center gap-4 border rounded-xl p-4 shadow-sm bg-white hover:shadow-md transition"
                >
                  {/* Image */}
                  <div className="w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 mx-auto sm:mx-0">
                    <img
                      src={item.product.imageUrl || "/placeholder.png"}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-semibold text-gray-900 line-clamp-2">
                      {item.product.name}
                    </h2>
                    {item.product.description && (
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {item.product.description}
                      </p>
                    )}

                    <div className="mt-2 flex items-center gap-3 text-sm flex-wrap">
                      <span className="text-gray-700">Price:</span>
                      <span className="font-medium">
                        ₹{item.product.price}
                      </span>
                      <span className="hidden sm:inline text-gray-300">•</span>
                      <span
                        className={`font-medium ${
                          stock > 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {stock > 0
                          ? `In stock: ${stock}`
                          : "Out of stock"}
                      </span>
                    </div>

                    {/* Quantity controls */}
                    <div className="mt-3 flex items-center gap-3 flex-wrap">
                      <button
                        onClick={() => updateQty(item.id, "dec")}
                        disabled={busyId === item.id || !canDec}
                        className={`w-9 h-9 rounded-lg border flex items-center justify-center
                          ${
                            canDec
                              ? "hover:bg-gray-100"
                              : "opacity-50 cursor-not-allowed"
                          }
                        `}
                        title="Decrease"
                      >
                        −
                      </button>

                      <div className="w-12 text-center font-semibold select-none">
                        {item.quantity}
                      </div>

                      <button
                        onClick={() => updateQty(item.id, "inc")}
                        disabled={busyId === item.id || !canInc}
                        className={`w-9 h-9 rounded-lg border flex items-center justify-center
                          ${
                            canInc
                              ? "hover:bg-gray-100"
                              : "opacity-50 cursor-pointer"
                          }
                        `}
                        title={
                          canInc ? "Increase" : "Max stock reached"
                        }
                      >
                        +
                      </button>

                      {/* Remove */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        disabled={busyId === item.id}
                        className="ml-0 sm:ml-4 h-8 px-3 rounded-full bg-red-500 text-white hover:bg-red-800 text-sm cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Line total */}
                  <div className="text-right sm:self-start">
                    <div className="text-sm text-gray-500">Total</div>
                    <div className="text-lg font-semibold">
                      ₹{lineTotal.toFixed(2)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <aside className="h-fit border rounded-xl p-5 shadow-sm bg-white sticky top-24">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between text-gray-700">
              <span>Items</span>
              <span className="font-medium">{totalQty}</span>
            </div>
            <div className="flex justify-between text-gray-700 mt-2">
              <span>Subtotal</span>
              <span className="font-semibold">
                ₹{subtotal.toFixed(2)}
              </span>
            </div>
            <button
              onClick={handleBuy}
              disabled={!cart.length}
              className={`mt-5 w-full py-3 rounded-lg text-white transition 
                ${
                  cart.length
                    ? "bg-black hover:bg-gray-800"
                    : "bg-gray-300 cursor-not-allowed"
                }
              `}
            >
              Buy Now
            </button>
          </aside>
        </div>
      )}
    </div>
  );
}
