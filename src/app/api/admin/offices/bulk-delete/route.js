import { NextResponse } from "next/server";
import connectDb from "@/app/lib/conncetDb";
import Office from "@/model/official.model";
import { submitToIndexNow, getOfficeUrl } from "@/lib/indexNow";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    await connectDb();
    const { ids } = await request.json();

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: "No IDs provided" }, { status: 400 });
    }

    // Fetch items before deletion to get URLs for IndexNow
    const itemsToDelete = await Office.find({ _id: { $in: ids } });
    const urls = itemsToDelete
      .map((item) => getOfficeUrl(item))
      .filter((url) => url !== null);

    const result = await Office.deleteMany({ _id: { $in: ids } });

    // Submit to IndexNow
    if (urls.length > 0) {
      await submitToIndexNow(urls);
    }

    return NextResponse.json({
      message: "Offices deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Error bulk deleting offices:", error);
    return NextResponse.json(
      { error: "Failed to delete offices", details: error.message },
      { status: 500 },
    );
  }
}
