import { NextResponse } from "next/server";
import connectDb from "@/app/lib/conncetDb";
import AirPort from "@/model/airPort.model";


export async function GET() {
  await connectDb();

  try {
    const airPort = await AirPort.find({});
    return NextResponse.json(airPort, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      {
        message: "Error retrieving airline",
        error: String(err.message || err),
      },
      { status: 500 }
    );
  }
}
