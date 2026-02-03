import { NextResponse } from "next/server";
import connectDb from "@/app/lib/conncetDb";
import AirPort from "@/model/airPort.model";
import { submitToIndexNow, getAirportUrl } from "@/lib/indexNow";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    await connectDb();
    const { ids } = await request.json();

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: "No IDs provided" }, { status: 400 });
    }

    // Fetch items before deletion to get URLs for IndexNow
    const itemsToDelete = await AirPort.find({ _id: { $in: ids } });
    const urls = itemsToDelete
      .map((item) => getAirportUrl(item))
      .filter((url) => url !== null);

    const result = await AirPort.deleteMany({ _id: { $in: ids } });

    // Submit to IndexNow
    if (urls.length > 0) {
      await submitToIndexNow(urls);
    }

    return NextResponse.json({
      message: "Airports deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Error bulk deleting airports:", error);
    return NextResponse.json(
      { error: "Failed to delete airports", details: error.message },
      { status: 500 },
    );
  }
}
