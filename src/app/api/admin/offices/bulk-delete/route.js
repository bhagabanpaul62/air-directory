import { NextResponse } from "next/server";
import connectDb from "@/app/lib/conncetDb";
import Office from "@/model/official.model";

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

    const result = await Office.deleteMany({ _id: { $in: ids } });

    return NextResponse.json({
      message: "Offices deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Error bulk deleting offices:", error);
    return NextResponse.json(
      { error: "Failed to delete offices", details: error.message },
      { status: 500 }
    );
  }
}
