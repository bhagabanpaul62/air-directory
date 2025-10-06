import { NextResponse } from "next/server";
import connectDb from "@/app/lib/conncetDb";
import AirLine from "@/model/airLines.model";

export async function GET(request,{params}) {
    await connectDb()
  const { id } = params;

  if (!id) {
    return NextResponse.json({ message: "id is required" }, { status: 400 });
  }

  try {
    const airline = await AirLine.findOne({_id:id});
    return NextResponse.json(airline, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error retrieving data", error: String(error.message) },
      { status: 500 }
    );
  }
}
