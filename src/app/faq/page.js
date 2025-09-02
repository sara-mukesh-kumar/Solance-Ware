"use client"; 
import React, { useState } from "react";

export default function FaqContactPage() {
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    setSubmitted(true);
    setMessage("");

    // Hide after 5 sec
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">FAQs & Support</h1>
        <p className="text-gray-600 mb-6">
         Leave us a message, and our support
          team will get back to you shortly.
        </p>

        {submitted && (
          <p className="mb-4 text-green-600 text-sm font-medium">
            ✅ Thanks for your message! Our team will respond soon.
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your question or message here..."
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={5}
            required
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
