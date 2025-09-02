// import { NextResponse } from "next/server";

// export async function GET() {
//   const menProducts = [
//     { id: 1, name: "Van Heusen Men's Chino Shorts", price: 859, imageUrl: "https://m.media-amazon.com/images/I/51oer1fPPOL._SY550_.jpg", description:"100+bought in past month" },
//     { id: 2, name: "UNITED COLORS OF BENETTON Men's Polycotton Half Sleeves Plain Stylish Regular Fit Polo T-Shirt", price:1631 , imageUrl: "https://m.media-amazon.com/images/I/41HqK5Wp3NL._SX466_.jpg",description:"100+bought in past month" },
//     { id: 3, name: "U.S. POLO ASSN. Men's Tapered Fit Mid Rise Jeans", price:1699 , imageUrl: "https://m.media-amazon.com/images/I/71i2uoa9ugL._SY879_.jpg" ,description:"100+bought in past month"},
//     { id: 4, name: "Octave Men Checked Polo Collar Cotton T-Shirt", price:799 , imageUrl: "https://m.media-amazon.com/images/I/41y2Vj0MgLL._SX522_.jpg",description:"200+bought in past month" },
//   ];

//   return NextResponse.json(menProducts);
// }

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const searchQuery = searchParams.get("q") || ""; 
    const products = await prisma.product.findMany({
      where: {
        category: "mens",
        name: {
          contains: searchQuery,
          mode: "insensitive",
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

