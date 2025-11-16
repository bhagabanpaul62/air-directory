import { NextResponse } from "next/server";
import connectDb from "@/app/lib/conncetDb";
import Office from "@/model/official.model";

export async function GET() {
  await connectDb();

  try {
    const offices = await Office.find({});
    return NextResponse.json(offices, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      {
        message: "Error retrieving offices",
        error: String(err.message || err),
      },
      { status: 500 }
    );
  }
}
