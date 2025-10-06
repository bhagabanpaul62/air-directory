import { NextResponse } from "next/server";
import connectDb from "@/app/lib/conncetDb";
import AirPort from "@/model/airPort.model";

export async function GET(request, { params }) {
  await connectDb();

  const { id } = params;

  if (!id) {
    return NextResponse.json({ message: "id is required" }, { status: 400 });
  }

  try {
    const airport = await AirPort.findOne({_id:id});
    return NextResponse.json(airport, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "error retrieving airport data",
        error: String(error?.message || error),
      },
      { status: 500 }
    );
  }
}
