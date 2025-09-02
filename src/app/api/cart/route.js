import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// 🛒 GET all cart items for a user
export async function GET() {
  try {
    const userId = 1; 

    const items = await prisma.cartItem.findMany({
      where: { userId },
      include: {
        product: true, // so we get product details (name, price, stock, etc.)
      },
    });

    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 });
  }
}

// 🛒 POST add to cart
export async function POST(req) {
  try {
    const body = await req.json();
    const { productId } = body;

    if (!productId) {
      return NextResponse.json({ error: "Product ID required" }, { status: 400 });
    }

    const userId = 1; // temp

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const existingItem = await prisma.cartItem.findUnique({
      where: { userId_productId: { userId, productId } },
    });

    let cartItem;
    if (existingItem) {
      cartItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: { increment: 1 } },
      });
    } else {
      cartItem = await prisma.cartItem.create({
        data: { userId, productId, quantity: 1 },
      });
    }

    return NextResponse.json(cartItem, { status: 200 });
  } catch (error) {
    console.error("Error adding to cart:", error);
    return NextResponse.json({ error: "Failed to add to cart" }, { status: 500 });
  }
}

// DELETE remove item from cart
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const itemId = searchParams.get("id");

    if (!itemId) {
      return NextResponse.json({ error: "Item ID required" }, { status: 400 });
    }

    const userId = 1; // temp

    // Check if item belongs to user
    const existingItem = await prisma.cartItem.findUnique({
      where: { id: parseInt(itemId) },
    });

    if (!existingItem || existingItem.userId !== userId) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    await prisma.cartItem.delete({
      where: { id: parseInt(itemId) },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error removing from cart:", error);
    return NextResponse.json({ error: "Failed to remove item" }, { status: 500 });
  }
}

