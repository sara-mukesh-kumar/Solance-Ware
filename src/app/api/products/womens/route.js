import { NextResponse } from "next/server";

export async function GET() {
  const womenProducts = [
    { id: 3, name: " Kanjivaram Banarasi Soft Silk Saree", price: 699, imageUrl: "https://m.media-amazon.com/images/I/71A8bhIs5qL._SY550_.jpg", description:"600+bought in past month" },
    { id: 9, name: "Banarasi Style Sari", price:499 , imageUrl: "https://m.media-amazon.com/images/I/61t5Rq80yeL._SY550_.jpg",description:"2k+ bought in past year" },
    { id: 11, name: "Bewakoof Official Disney Merchandise Hakuna Matata Women's 100% Cotton Graphic Print Oversized Fit Round Neck T-Shirt", price:399 , imageUrl: "https://m.media-amazon.com/images/I/61TvmIc8IlL._SY879_.jpg" ,description:"50+bought in past month"},
    { id: 14, name: "Fabindia Women's Kurta", price:799 , imageUrl: "https://m.media-amazon.com/images/I/51WwG8jxM+L._SX679_.jpg",description:"50+bought in past month" },
  ];

  return NextResponse.json(womenProducts);
}
