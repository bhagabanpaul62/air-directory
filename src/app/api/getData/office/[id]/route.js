import { NextResponse } from "next/server";
import connectDb from "@/app/lib/conncetDb";
import Office from "@/model/official.model";

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
    let office = await Office.findOne({ slug: id });

    // If not found by slug, try by _id (for backward compatibility)
    if (!office) {
      office = await Office.findOne({ _id: id });
    }

    if (!office) {
      return NextResponse.json(
        { message: "Office not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(office, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "error retrieving office data",
        error: String(error?.message || error),
      },
      { status: 500 }
    );
  }
}
