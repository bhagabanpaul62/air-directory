import { NextResponse } from "next/server";
import connectDb from "@/app/lib/conncetDb";
import AirPort from "@/model/airPort.model";

export const dynamic = "force-dynamic";

export async function DELETE(request) {
  try {
    await connectDb();

    const result = await AirPort.deleteMany({});

    return NextResponse.json(
      {
        ok: true,
        message: "All airports deleted successfully",
        deletedCount: result.deletedCount,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Delete error:", err);
    return NextResponse.json(
      { message: "Error deleting airports", error: String(err.message || err) },
      { status: 500 }
    );
  }
}
