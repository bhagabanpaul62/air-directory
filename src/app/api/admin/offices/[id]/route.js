import { NextResponse } from "next/server";
import connectDb from "@/app/lib/conncetDb";
import Office from "@/model/official.model";
import { submitToIndexNow, getOfficeUrl } from "@/lib/indexNow";

export const dynamic = "force-dynamic";

// GET - Fetch a single office by ID
export async function GET(request, { params }) {
  try {
    await connectDb();
    const { id } = await params;

    const office = await Office.findById(id);

    if (!office) {
      return NextResponse.json(
        { message: "Office not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(office);
  } catch (error) {
    console.error("Error fetching office:", error);
    return NextResponse.json(
      { message: "Error fetching office", error: error.message },
      { status: 500 },
    );
  }
}

// PUT - Update an office
export async function PUT(request, { params }) {
  try {
    await connectDb();
    const { id } = await params;
    const body = await request.json();

    const office = await Office.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!office) {
      return NextResponse.json(
        { message: "Office not found" },
        { status: 404 },
      );
    }

    // Submit to IndexNow
    const url = getOfficeUrl(office);
    if (url) {
      await submitToIndexNow([url]);
    }

    return NextResponse.json({
      message: "Office updated successfully",
      office,
    });
  } catch (error) {
    console.error("Error updating office:", error);
    return NextResponse.json(
      { message: "Error updating office", error: error.message },
      { status: 500 },
    );
  }
}

// DELETE - Delete an office
export async function DELETE(request, { params }) {
  try {
    await connectDb();
    const { id } = await params;

    const office = await Office.findByIdAndDelete(id);

    if (!office) {
      return NextResponse.json(
        { message: "Office not found" },
        { status: 404 },
      );
    }

    // Submit to IndexNow
    const url = getOfficeUrl(office);
    if (url) {
      await submitToIndexNow([url]);
    }

    return NextResponse.json({
      message: "Office deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting office:", error);
    return NextResponse.json(
      { message: "Error deleting office", error: error.message },
      { status: 500 },
    );
  }
}
