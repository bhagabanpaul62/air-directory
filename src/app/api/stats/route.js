import { NextResponse } from "next/server";
import connectDb from "@/app/lib/conncetDb";
import AirLine from "@/model/airLines.model";
import AirPort from "@/model/airPort.model";
import Office from "@/model/official.model";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDb();

    const [airlinesCount, airportsCount, officesCount] = await Promise.all([
      AirLine.countDocuments(),
      AirPort.countDocuments(),
      Office.countDocuments(),
    ]);

    return NextResponse.json({
      airlines: airlinesCount,
      airports: airportsCount,
      offices: officesCount,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
