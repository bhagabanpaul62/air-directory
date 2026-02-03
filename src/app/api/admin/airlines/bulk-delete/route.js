import { NextResponse } from "next/server";
import connectDb from "@/app/lib/conncetDb";
import AirLine from "@/model/airLines.model";
import { submitToIndexNow, getAirlineUrl } from "@/lib/indexNow";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    await connectDb();
    const { ids } = await request.json();

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: "No IDs provided" }, { status: 400 });
    }

    // Fetch items before deletion to get URLs for IndexNow
    const itemsToDelete = await AirLine.find({ _id: { $in: ids } });
    const urls = itemsToDelete
      .map((item) => getAirlineUrl(item))
      .filter((url) => url !== null);

    const result = await AirLine.deleteMany({ _id: { $in: ids } });

    // Submit to IndexNow
    if (urls.length > 0) {
      await submitToIndexNow(urls);
    }

    return NextResponse.json({
      message: "Airlines deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Error bulk deleting airlines:", error);
    return NextResponse.json(
      { error: "Failed to delete airlines", details: error.message },
      { status: 500 },
    );
  }
}
