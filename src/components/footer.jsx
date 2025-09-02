"use client"; 

import React, { useState, useEffect } from "react";
const FooterSection = () => {
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const email = e.target.email.value;

    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      setMessage("✅ Subscribed successfully!");
      setIsError(false);
      e.target.reset(); // clear input
    } else {
      setMessage("❌ Something went wrong.");
      setIsError(true);
    }

    // ✅ Auto-hide after 5 seconds
    setTimeout(() => {
      setMessage("");
    }, 5000);
  }

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-12 mb-0">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo & About */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Solance</h2>
          <p className="text-sm leading-relaxed">
            Solance: Where Fashion Meets You. Explore trendy collections,
            exclusive styles, and premium fashion at the best prices.
          </p>
        </div>

        {/* Shop Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Shop</h3>
          <ul className="space-y-2">
            <li>
              <a href="/mens_section" className="hover:text-white transition">
                Men’s Collection
              </a>
            </li>
            <li>
              <a href="/womens_section" className="hover:text-white transition">
                Women’s Collection
              </a>
            </li>
            <li>
              <a href="/kids" className="hover:text-white transition">
                Kid's Collection
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Deals
              </a>
            </li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
          <ul className="space-y-2">
            <li>
              <a href="https://my-first-portfolio-git-master-mukesh-kumars-projects-cd8abb2b.vercel.app/" className="hover:text-white transition">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/shippingRetrun" className="hover:text-white transition">
                Shipping & Returns
              </a>
            </li>
            <li>
              <a href="/faq" className="hover:text-white transition">
                FAQs
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-white transition">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Stay in Touch
          </h3>
          <p className="text-sm mb-3">Subscribe for the latest fashion & deals:</p>

          {/* ✅ Show message above the input */}
          {message && (
            <p
              className={`mb-2 text-sm ${
                isError ? "text-red-500" : "text-green-500"
              }`}
            >
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit} className="flex">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="bg-gray-600 w-full px-3 py-2 rounded-l-lg text-white focus:outline-none"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition cursor-pointer"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Solance. All rights reserved.
      </div>
    </footer>
  );
};

export default FooterSection;
