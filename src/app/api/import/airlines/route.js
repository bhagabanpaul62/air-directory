import { NextResponse } from "next/server";
import { parse } from "csv-parse/sync";
import connectDb from "@/app/lib/conncetDb";
import AirLine from "@/model/airLines.model";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function toNumber(v) {
  if (v === undefined || v === null || v === "") return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
}

function mapRecord(r) {
  return {
    airline_id: r.aireline_id || r.airline_id || undefined,
    Continent: r.Continent || undefined,
    Country: r.Country || undefined,
    Region: r.Region || undefined,
    City: r.City || undefined,
    Name: r.Name,
    Info: r.Info || undefined,
    Description: r.Description || undefined,
    Website: r.Website || undefined,
    Address: r.Address || undefined,
    Facebook: r.Facebook || undefined,
    Instagram: r.Instagram || undefined,
    LinkedIn: r.LinkedIn || undefined,
    Email: (r.Email || "").toLowerCase() || undefined,
    Phone: r.Phone || undefined,
    IATA: (r.IATA || "").toUpperCase() || undefined,
    ICAO: (r.ICAO || "").toUpperCase() || undefined,
    Logo: r.Logo || undefined,
    Background_Image: r["Background Image"] || r.Background_Image || undefined,
    youtube: r.YouTube || r.youtube || undefined,
    Latitude: toNumber(r.Latitude),
    Longitude: toNumber(r.Longitude),
  };
}

export async function POST(request) {
  await connectDb();

  const form = await request.formData();
  const file = form.get("file");

  if (!file || typeof file === "string") {
    return NextResponse.json(
      { message: "Upload a CSV file field named 'file'." },
      { status: 400 }
    );
  }

  const text = Buffer.from(await file.arrayBuffer()).toString("utf8");

  let records;
  try {
    records = parse(text, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });
  } catch (err) {
    return NextResponse.json(
      { message: "CSV parse error", error: String(err.message || err) },
      { status: 400 }
    );
  }

  const docs = records.map(mapRecord).filter((d) => d.Name);
  if (docs.length === 0) {
    return NextResponse.json(
      { message: "No valid rows found." },
      { status: 400 }
    );
  }

  const ops = docs.map((d) => ({
    updateOne: {
      filter: d.airline_id ? { airline_id: d.airline_id } : { Name: d.Name },
      update: { $set: d },
      upsert: true,
    },
  }));

  try {
    const result = await AirLine.bulkWrite(ops, { ordered: false });
    const summary = {
      upserted: result.upsertedCount ?? result.nUpserted ?? 0,
      modified: result.modifiedCount ?? result.nModified ?? 0,
      matched: result.matchedCount ?? result.nMatched ?? 0,
    };
    return NextResponse.json(
      { ok: true, count: docs.length, ...summary },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "DB import error", error: String(err.message || err) },
      { status: 500 }
    );
  }
}
