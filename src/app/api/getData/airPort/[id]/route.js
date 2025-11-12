import { NextResponse } from "next/server";
import connectDb from "@/app/lib/conncetDb";
import AirPort from "@/model/airPort.model";

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
    let airport = await AirPort.findOne({ slug: id });

    // If not found by slug, try by _id (for backward compatibility)
    if (!airport) {
      airport = await AirPort.findOne({ _id: id });
    }

    if (!airport) {
      return NextResponse.json(
        { message: "Airport not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(airport, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "error retrieving airport data",
        error: String(error?.message || error),
      },
      { status: 500 }
    );
  }
}
