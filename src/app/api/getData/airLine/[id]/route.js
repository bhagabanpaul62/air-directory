import { NextResponse } from "next/server";
import connectDb from "@/app/lib/conncetDb";
import AirLine from "@/model/airLines.model";

export async function GET(request, { params }) {
  await connectDb();
  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { message: "id or slug is required" },
      { status: 400 }
    );
  }

  try {
    // Try to find by slug first, then fallback to _id
    let airline = await AirLine.findOne({ slug: id });

    // If not found by slug, try by _id (for backward compatibility)
    if (!airline) {
      airline = await AirLine.findOne({ _id: id });
    }

    if (!airline) {
      return NextResponse.json(
        { message: "Airline not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(airline, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error retrieving data", error: String(error.message) },
      { status: 500 }
    );
  }
}
