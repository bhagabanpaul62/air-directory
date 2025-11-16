import { NextResponse } from "next/server";
import connectDb from "@/app/lib/conncetDb";
import Office from "@/model/official.model";

export const dynamic = "force-dynamic";

// GET - Fetch all offices with pagination and search
export async function GET(request) {
  try {
    await connectDb();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";

    const skip = (page - 1) * limit;

    // Build search query
    const query = search
      ? {
          $or: [
            { Name: { $regex: search, $options: "i" } },
            { City: { $regex: search, $options: "i" } },
            { Country: { $regex: search, $options: "i" } },
            { Type: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const [offices, total] = await Promise.all([
      Office.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Office.countDocuments(query),
    ]);

    return NextResponse.json({
      offices,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching offices:", error);
    return NextResponse.json(
      { message: "Error fetching offices", error: error.message },
      { status: 500 }
    );
  }
}

// POST - Create a new office
export async function POST(request) {
  try {
    await connectDb();
    const body = await request.json();

    const office = new Office(body);
    await office.save();

    return NextResponse.json(
      { message: "Office created successfully", office },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating office:", error);
    return NextResponse.json(
      { message: "Error creating office", error: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete all offices
export async function DELETE() {
  try {
    await connectDb();
    const result = await Office.deleteMany({});

    return NextResponse.json({
      message: "All offices deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Error deleting offices:", error);
    return NextResponse.json(
      { message: "Error deleting offices", error: error.message },
      { status: 500 }
    );
  }
}
