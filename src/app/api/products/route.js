// import { NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export async function GET() {
//   try {
//     const products = await prisma.product.findMany();
//     return NextResponse.json(products, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
//   }
// }

// export async function POST(req) {
//   try {
//     const body = await req.json();
//     const { name, description, price, imageUrl, category, stock } = body;

//     const product = await prisma.product.create({
//       data: {
//         name,
//         description,
//         price: parseFloat(price),
//         imageUrl,
//         category,
//         stock: parseInt(stock),
//       },
//     });

//     return NextResponse.json(product, { status: 201 });
//   } catch (error) {
//     console.error("Error adding product:", error);
//     return NextResponse.json({ error: "Failed to add product" }, { status: 500 });
//   }
// }

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") || undefined;

  const products = await prisma.product.findMany({
    where: category ? { category } : {},
    orderBy: { createdAt: "desc" },
  });

  return new Response(JSON.stringify(products), { status: 200 });
}
