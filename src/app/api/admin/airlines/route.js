import { NextResponse } from "next/server";
import connectDb from "@/app/lib/conncetDb";
import AirLine from "@/model/airLines.model";

export async function GET(request) {
  await connectDb();

  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";

    const skip = (page - 1) * limit;

    // Build search filter
    let filter = {};
    if (search) {
      filter = {
        $or: [
          { Name: { $regex: search, $options: "i" } },
          { IATA: { $regex: search, $options: "i" } },
          { ICAO: { $regex: search, $options: "i" } },
          { Country: { $regex: search, $options: "i" } },
          { City: { $regex: search, $options: "i" } },
        ],
      };
    }

    const [airlines, total] = await Promise.all([
      AirLine.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      AirLine.countDocuments(filter),
    ]);

    return NextResponse.json({
      airlines,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit,
      },
    });
  } catch (error) {
    console.error("Error fetching airlines:", error);
    return NextResponse.json(
      { error: "Failed to fetch airlines" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  await connectDb();

  try {
    const data = await request.json();
    const airline = new AirLine(data);
    await airline.save();

    return NextResponse.json({
      message: "Airline created successfully",
      airline,
    });
  } catch (error) {
    console.error("Error creating airline:", error);
    return NextResponse.json(
      { error: "Failed to create airline" },
      { status: 500 }
    );
  }
}
