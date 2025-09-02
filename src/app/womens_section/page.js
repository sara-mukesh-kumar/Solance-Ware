import { PrismaClient } from "@prisma/client";
import AddToCartButton from "@/components/AddToCartButton";

const prisma = new PrismaClient();

export default async function Wonens_section() {
  const products = await prisma.product.findMany({
    where: { category: "womens" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="text-center mt-5 mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Women’s Collection
        </h1>
        <p className="text-lg text-gray-600 mt-3">
          Discover elegant trends and everyday classics designed to inspire confidence.
        </p>
      </div>

      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4 flex flex-col"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="rounded-lg h-60 w-full object-contain mb-3 hover:scale-105 transition-transform duration-300"
            />
            <h2 className="text-lg font-semibold">
              {product.name.length > 50
                ? product.name.substring(0, 50) + "..."
                : product.name}
            </h2>
            <p className="text-gray-600 text-sm flex-1">{product.description}</p>
            <p className="text-xl font-bold mt-2">₹{product.price}</p>

            {/* ✅ Use new AddToCartButton */}
            <AddToCartButton productId={product.id} />
          </div>
        ))}
      </div>
    </div>
  );
}
