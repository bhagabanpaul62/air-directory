import { NextResponse } from "next/server";
import connectDb from "@/app/lib/conncetDb";
import AirLine from "@/model/airLines.model";

export const dynamic = "force-dynamic";

export async function DELETE(request) {
  try {
    await connectDb();

    const result = await AirLine.deleteMany({});

    return NextResponse.json(
      {
        ok: true,
        message: "All airlines deleted successfully",
        deletedCount: result.deletedCount,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Delete error:", err);
    return NextResponse.json(
      { message: "Error deleting airlines", error: String(err.message || err) },
      { status: 500 }
    );
  }
}
