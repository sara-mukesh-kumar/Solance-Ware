import { NextResponse } from "next/server";

export async function GET() {
  const kidsProducts = [
    { id: 101, name: "Amazon Brand - Symbol Boys 100% Cotton Oversized Graphic Printed Half Sleeves T-Shirt | Age 6-14 Years (Available in Combo Pack of 2)", price:499 , imageUrl: "https://m.media-amazon.com/images/I/71XKF-3PO-L._SX522_.jpg", description:"80+bought in past month" },
    { id: 100, name: "Googo Gaaga Boys Mid Rise Googa Gaaga Denim Joggers With Cute Cartoon Prints | Soft Elastic Waist Jeans Pants | Casual Trousers Stylish Playtime Outfits", price:599 , imageUrl: "https://m.media-amazon.com/images/I/513KB-A-htL._SX569_.jpg",description:"1000+bought in past month" },
    { id: 99, name: "Kids Boys White Denim Jeans", price:499 , imageUrl:"https://m.media-amazon.com/images/I/51Q-2n3IYkL._SX569_.jpg" ,description:"900+bought in past month"},
    { id: 96, name: "T2F Boy's Solid Regular Fit T-Shirt", price:559 , imageUrl: "https://m.media-amazon.com/images/I/71EJdN6g29L._SX679_.jpg",description:"1000+bought in past month" },
  ];

  return NextResponse.json(kidsProducts);
}
