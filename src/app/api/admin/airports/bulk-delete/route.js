import { NextResponse } from "next/server";
import connectDb from "@/app/lib/conncetDb";
import AirPort from "@/model/airPort.model";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    await connectDb();
    const { ids } = await request.json();

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: "No IDs provided" },
        { status: 400 }
      );
    }

    const result = await AirPort.deleteMany({ _id: { $in: ids } });

    return NextResponse.json({
      message: "Airports deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Error bulk deleting airports:", error);
    return NextResponse.json(
      { error: "Failed to delete airports", details: error.message },
      { status: 500 }
    );
  }
}
