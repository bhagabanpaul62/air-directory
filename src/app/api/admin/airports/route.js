import { NextResponse } from "next/server";
import connectDb from "@/app/lib/conncetDb";
import AirPort from "@/model/airPort.model";

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

    const [airports, total] = await Promise.all([
      AirPort.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      AirPort.countDocuments(filter),
    ]);

    return NextResponse.json({
      airports,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: limit,
      },
    });
  } catch (error) {
    console.error("Error fetching airports:", error);
    return NextResponse.json(
      { error: "Failed to fetch airports" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  await connectDb();

  try {
    const data = await request.json();
    const airport = new AirPort(data);
    await airport.save();

    return NextResponse.json({
      message: "Airport created successfully",
      airport,
    });
  } catch (error) {
    console.error("Error creating airport:", error);
    return NextResponse.json(
      { error: "Failed to create airport" },
      { status: 500 }
    );
  }
}
