import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(req, { params }) {
  try {
    const id = Number(params.id);
    if (!id) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

    const { action } = await req.json();
    if (!["inc", "dec"].includes(action)) {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    const item = await prisma.cartItem.findUnique({
      where: { id },
      include: { product: true },
    });
    if (!item) return NextResponse.json({ error: "Item not found" }, { status: 404 });

    const userId = 1;
    if (item.userId !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    if (action === "inc") {
      const stock = item.product.stock ?? 0;
      if (item.quantity >= stock) {
        return NextResponse.json(
          { error: "Not enough stock" },
          { status: 400 }
        );
      }
      const updated = await prisma.cartItem.update({
        where: { id },
        data: { quantity: { increment: 1 } },
      });
      return NextResponse.json({ item: updated }, { status: 200 });
    } else {
      // dec: if goes to 0, delete
      if (item.quantity <= 1) {
        await prisma.cartItem.delete({ where: { id } });
        return NextResponse.json({ deleted: true }, { status: 200 });
      }
      const updated = await prisma.cartItem.update({
        where: { id },
        data: { quantity: { decrement: 1 } },
      });
      return NextResponse.json({ item: updated }, { status: 200 });
    }
  } catch (err) {
    console.error("PATCH /api/cart/:id error", err);
    return NextResponse.json({ error: "Failed to update cart" }, { status: 500 });
  }
}

// ( already have DELETE; keep it here too)
export async function DELETE(_req, { params }) {
  try {
    const id = Number(params.id);
    if (!id) return NextResponse.json({ error: "Invalid id" }, { status: 400 });

    // Optional: scope to a user (replace 1 with real auth user)
    const userId = 1;

    const item = await prisma.cartItem.findUnique({ where: { id } });
    if (!item) return NextResponse.json({ error: "Item not found" }, { status: 404 });
    if (item.userId !== userId) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.cartItem.delete({ where: { id } });
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("DELETE /api/cart/:id error", err);
    return NextResponse.json({ error: "Failed to remove item" }, { status: 500 });
  }
}
