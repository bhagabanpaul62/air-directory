import { NextResponse } from "next/server";
import { parse } from "csv-parse/sync";
import connectDb from "@/app/lib/conncetDb";
import Office from "@/model/official.model";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function generateSlug(name) {
  if (!name) return undefined;
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
    .trim();
}

function mapRecord(r) {
  const slug = generateSlug(r.Name);

  return {
    office_id: r.office_id || undefined,
    Continent: r.Continent || undefined,
    Country: r.Country || undefined,
    Region: r.Region || undefined,
    City: r.City || undefined,
    Name: r.Name,
    slug: slug,
    Type: r.Type || undefined,
    Info: r.Info || undefined,
    Description: r.Description || undefined,
    Website: r.Website || undefined,
    Address: r.Address || undefined,
    Facebook: r.Facebook || undefined,
    Instagram: r.Instagram || undefined,
    LinkedIn: r.LinkedIn || undefined,
    X: r.X || r.Twitter || undefined,
    YouTube: r.YouTube || r.youtube || undefined,
    Email: (r.Email || "").toLowerCase() || undefined,
    Phone: r.Phone || undefined,
    Logo: r.Logo || undefined,
    Background_Image: r.Background_Image || r["Background Image"] || undefined,
    Google_Maps_Link: r.Google_Maps_Link || undefined,
  };
}

export async function POST(request) {
  try {
    await connectDb();
  } catch (dbErr) {
    console.error("Database connection error:", dbErr);
    return NextResponse.json(
      {
        message: "Database connection failed",
        error: String(dbErr.message || dbErr),
      },
      { status: 500 }
    );
  }

  const form = await request.formData();
  const file = form.get("file");

  console.log("File received:", file ? file.name : "No file");

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
    console.log(`Parsed ${records.length} records from CSV`);
    if (records.length > 0) {
      console.log("First record keys:", Object.keys(records[0]));
    }
  } catch (err) {
    console.error("CSV parse error:", err);
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

  // Using bulkWrite with save hooks workaround
  try {
    let upserted = 0;
    let modified = 0;
    let matched = 0;

    for (const doc of docs) {
      try {
        // Find existing document
        const filter = doc.office_id
          ? { office_id: doc.office_id }
          : { Name: doc.Name };

        const existing = await Office.findOne(filter);

        if (existing) {
          // Update existing document (triggers pre-save hooks)
          Object.assign(existing, doc);
          await existing.save();
          modified++;
          matched++;
          console.log(`Updated: ${existing.Name}, slug: ${existing.slug}`);
        } else {
          // Create new document (triggers pre-save hooks)
          const newOffice = new Office(doc);
          await newOffice.save();
          upserted++;
          console.log(`Created: ${newOffice.Name}, slug: ${newOffice.slug}`);
        }
      } catch (docErr) {
        console.error(`Error processing office ${doc.Name}:`, docErr.message);
        // Continue with next document
      }
    }

    const summary = {
      upserted,
      modified,
      matched,
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
