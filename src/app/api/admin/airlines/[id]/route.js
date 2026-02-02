import { NextResponse } from "next/server";
import connectDb from "@/app/lib/conncetDb";
import AirLine from "@/model/airLines.model";

export async function PUT(request, { params }) {
  await connectDb();

  try {
    const { id } = await params;
    const data = await request.json();

    const airline = await AirLine.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!airline) {
      return NextResponse.json({ error: "Airline not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Airline updated successfully",
      airline,
    });
  } catch (error) {
    console.error("Error updating airline:", error);
    return NextResponse.json(
      { error: "Failed to update airline" },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  await connectDb();

  try {
    const { id } = await params;

    const airline = await AirLine.findByIdAndDelete(id);

    if (!airline) {
      return NextResponse.json({ error: "Airline not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Airline deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting airline:", error);
    return NextResponse.json(
      { error: "Failed to delete airline" },
      { status: 500 },
    );
  }
}

export async function GET(request, { params }) {
  await connectDb();

  try {
    const { id } = await params;

    const airline = await AirLine.findById(id);

    if (!airline) {
      return NextResponse.json({ error: "Airline not found" }, { status: 404 });
    }

    return NextResponse.json({ airline });
  } catch (error) {
    console.error("Error fetching airline:", error);
    return NextResponse.json(
      { error: "Failed to fetch airline" },
      { status: 500 },
    );
  }
}
