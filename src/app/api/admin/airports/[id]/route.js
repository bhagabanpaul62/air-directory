import { NextResponse } from "next/server";
import connectDb from "@/app/lib/conncetDb";
import AirPort from "@/model/airPort.model";

export async function PUT(request, { params }) {
  await connectDb();

  try {
    const { id } = await params;
    const data = await request.json();

    const airport = await AirPort.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!airport) {
      return NextResponse.json({ error: "Airport not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Airport updated successfully",
      airport,
    });
  } catch (error) {
    console.error("Error updating airport:", error);
    return NextResponse.json(
      { error: "Failed to update airport" },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  await connectDb();

  try {
    const { id } = await params;

    const airport = await AirPort.findByIdAndDelete(id);

    if (!airport) {
      return NextResponse.json({ error: "Airport not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Airport deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting airport:", error);
    return NextResponse.json(
      { error: "Failed to delete airport" },
      { status: 500 },
    );
  }
}

export async function GET(request, { params }) {
  await connectDb();

  try {
    const { id } = await params;

    const airport = await AirPort.findById(id);

    if (!airport) {
      return NextResponse.json({ error: "Airport not found" }, { status: 404 });
    }

    return NextResponse.json({ airport });
  } catch (error) {
    console.error("Error fetching airport:", error);
    return NextResponse.json(
      { error: "Failed to fetch airport" },
      { status: 500 },
    );
  }
}
