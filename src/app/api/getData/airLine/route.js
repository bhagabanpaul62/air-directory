import { NextResponse } from "next/server";
import connectDb from "@/app/lib/conncetDb";
import AirLine from "@/model/airLines.model";

export async function GET() {
  await connectDb();

  try {
    const airLine = await AirLine.find({});
    return NextResponse.json(airLine, { status: 200 });
  } catch (error) {
    console.log("message ::", error);
    return NextResponse.json(
      {
        message: "Error retrieving airlines",
        error: String(error.message || error),
      },
      { status: 500 }
    );
  }
}
