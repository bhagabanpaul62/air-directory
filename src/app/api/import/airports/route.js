import { NextResponse } from "next/server";
import { parse } from "csv-parse/sync";
import connectDb from "@/app/lib/conncetDb";
import AirPort from "@/model/airPort.model";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function toNumber(v) {
  if (v === undefined || v === null || v === "") return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
}

function normalizeRecordKeys(r) {
  const out = {};
  for (const [k, v] of Object.entries(r || {})) {
    const nk = String(k).trim();
    const lk = nk.toLowerCase();
    out[lk] = typeof v === "string" ? v.trim() : v;
  }
  return out;
}

function mapRecord(r) {
  const rr = normalizeRecordKeys(r);

  const record = {
    airport_id: rr["airport_id"] || undefined, // Remove aireport_id reference
    Continent: rr["continent"] || undefined,
    Country: rr["country"] || undefined,
    Region: rr["region"] || undefined,
    City: rr["city"] || undefined,
    Name: rr["name"],
    Info: rr["info"] || undefined,
    Description: rr["description"] || undefined,
    Website: rr["website"] || undefined,
    Facebook: rr["facebook"] || undefined,
    X: rr["x"] || rr["twitter"] || undefined,
    YouTube: rr["youtube"] || rr["youTube"] || undefined,
    LinkedIn: rr["linkedin"] || undefined,
    Email: (rr["email"] || "").toLowerCase() || undefined,
    Phone: rr["phone"] || undefined,
    Logo: rr["logo"] || rr["logo_url"] || rr["logo url"] || undefined,
    Background_Image:
      rr["background_image"] ||
      rr["background image"] ||
      rr["backgroundimage"] ||
      rr["bg_image"] ||
      rr["bg image"] ||
      undefined,
    IATA: (rr["iata"] || "").toUpperCase() || undefined,
    ICAO: (rr["icao"] || "").toUpperCase() || undefined,
    Address: rr["address"] || undefined,
    Latitude: toNumber(rr["latitude"]),
    Longitude: toNumber(rr["longitude"]),
  };

  // Filter out undefined values to avoid storing them in MongoDB
  const cleanRecord = {};
  for (const [key, value] of Object.entries(record)) {
    if (value !== undefined && value !== null && value !== "") {
      cleanRecord[key] = value;
    }
  }

  return cleanRecord;
}

export async function POST(request) {
  console.log("=== AIRPORT IMPORT STARTED ===");
  await connectDb();

  const form = await request.formData();
  const file = form.get("file");

  if (!file || typeof file === "string") {
    console.log("No file provided or invalid file type");
    return NextResponse.json(
      { message: "Upload a CSV file field named 'file'." },
      { status: 400 }
    );
  }

  console.log("File received:", file.name, "Size:", file.size);

  const text = Buffer.from(await file.arrayBuffer()).toString("utf8");
  console.log("File content length:", text.length);
  console.log("First 200 characters:", text.substring(0, 200));

  const headerLine = text.split(/\r\n|\n|\r/)[0] || "";
  console.log("Header line:", headerLine);
  const delimiter = (() => {
    const candidates = [",", ";", "\t", "|"];
    let best = ",";
    let max = -1;
    for (const d of candidates) {
      const count = headerLine.split(d).length - 1;
      if (count > max) {
        max = count;
        best = d;
      }
    }
    return max > 0 ? best : ",";
  })();

  let records;
  console.log("Using delimiter:", delimiter);
  try {
    records = parse(text, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
      bom: true,
      relax_column_count: true,
      delimiter,
      relax_quotes: true,
    });
    console.log(
      "CSV parsed successfully, records count:",
      records?.length || 0
    );
  } catch (err) {
    console.error("CSV parse error:", err);
    return NextResponse.json(
      { message: "CSV parse error", error: String(err.message || err) },
      { status: 400 }
    );
  }

  // Fallback: some CSV exports quote the entire line, causing parser to see one column.
  if (records?.length && Object.keys(records[0] || {}).length === 1) {
    try {
      records = parse(text, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
        bom: true,
        relax_column_count: true,
        delimiter,
        quote: false,
      });
    } catch (err) {
      return NextResponse.json(
        {
          message: "CSV parse fallback error",
          error: String(err.message || err),
        },
        { status: 400 }
      );
    }
  }

  const docs = records.map(mapRecord).filter((d) => d.Name || d.airport_id); // Remove aireport_id reference

  console.log("Total records parsed:", records?.length || 0);
  console.log("Sample raw record:", records[0]);
  console.log("Total mapped docs:", docs.length);
  console.log("Sample mapped doc:", docs[0]);

  if (docs.length === 0) {
    const headers = records[0] ? Object.keys(records[0]) : [];
    const sample = records[0] || null;
    console.log("No valid docs - Headers:", headers);
    console.log("No valid docs - Sample:", sample);
    return NextResponse.json(
      {
        message:
          "No valid rows found. Ensure at least one of: Name or airport_id is present per row.",
        detectedHeaders: headers,
        sampleRow: sample,
        hint: "Headers are case-insensitive; CSV BOM handled; values are trimmed. Check that your rows have values in Name or an ID column.",
      },
      { status: 400 }
    );
  }

  const ops = docs.map((d) => {
    const id = d.airport_id; // Remove aireport_id since it's not in schema
    const operation = {
      updateOne: {
        filter: id
          ? { airport_id: id } // Only filter by airport_id
          : { Name: d.Name },
        update: { $set: d },
        upsert: true,
      },
    };
    console.log(
      "Operation for",
      d.Name || d.airport_id,
      ":",
      JSON.stringify(operation, null, 2)
    );
    return operation;
  });

  console.log("Total operations to execute:", ops.length);

  try {
    const result = await AirPort.bulkWrite(ops, { ordered: false });
    console.log("MongoDB bulk write result:", result);
    const summary = {
      upserted: result.upsertedCount ?? result.nUpserted ?? 0,
      modified: result.modifiedCount ?? result.nModified ?? 0,
      matched: result.matchedCount ?? result.nMatched ?? 0,
    };
    console.log("Import summary:", summary);
    return NextResponse.json(
      { ok: true, count: docs.length, ...summary },
      { status: 200 }
    );
  } catch (err) {
    console.error("Database import error:", err);
    return NextResponse.json(
      { message: "DB import error", error: String(err.message || err) },
      { status: 500 }
    );
  }
}
