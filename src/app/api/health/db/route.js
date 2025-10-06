import { NextResponse } from "next/server";
import connectDb from "@/app/lib/conncetDb";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  try {
    const conn = await connectDb();
    return NextResponse.json(
      { ok: true, host: conn?.connection?.host },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: String(err?.message || err) },
      { status: 500 }
    );
  }
}
