// app/api/subscribe/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Here we could save the email to a database (MongoDB, PostgreSQL, etc.)
    console.log("📩 New subscriber:", email);

    return NextResponse.json({ message: "Subscribed successfully!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
