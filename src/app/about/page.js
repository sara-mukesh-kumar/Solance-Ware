import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-t from-[#fbc2eb] to-[#a6c1ee] p-8 flex flex-col items-center">
      <div className="max-w-4xl text-center">
        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-800 mb-6">About Us</h1>

        {/* Brand Story */}
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          Welcome to <span className="font-semibold text-gray-900">Solance</span>, 
          your one-stop destination for stylish and comfortable clothing. 
          We believe fashion should be affordable, sustainable, and accessible 
          to everyone. Our journey started with a simple vision: 
          <span className="italic"> making every outfit a reflection of your confidence.</span>
        </p>

        {/* Values Section */}
        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <div className="bg-white shadow-md p-6 rounded-xl hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-600">🌱 Sustainability</h3>
            <p className="text-gray-600 mt-2">
              We focus on eco-friendly fabrics and responsible sourcing.
            </p>
          </div>

          <div className="bg-white shadow-md p-6 rounded-xl hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-600">💎 Quality</h3>
            <p className="text-gray-600 mt-2">
              Each product is crafted with attention to comfort and durability.
            </p>
          </div>

          <div className="bg-white shadow-md p-6 rounded-xl hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-600">🤝 Trust</h3>
            <p className="text-gray-600 mt-2">
              Our customers are at the heart of everything we do.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap gap-4 justify-center">
          <Link
            href="/mens_section"
            className="px-6 py-3 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition"
          >
            Shop Men
          </Link>
          <Link
            href="/womens_section"
            className="px-6 py-3 bg-pink-600 text-white rounded-full shadow hover:bg-pink-700 transition"
          >
            Shop Women
          </Link>
          <Link
            href="/kids"
            className="px-6 py-3 bg-green-600 text-white rounded-full shadow hover:bg-green-700 transition"
          >
            Shop Kids
          </Link>
        </div>
      </div>
    </div>
  );
}
