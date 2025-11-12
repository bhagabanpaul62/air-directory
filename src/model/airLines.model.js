import mongoose from "mongoose";

const AirLinesSchema = new mongoose.Schema(
  {
    airline_id: { type: String, index: true, trim: true },
    Continent: { type: String, trim: true },
    Country: { type: String, trim: true },
    Region: { type: String, trim: true },
    City: { type: String, trim: true },
    Name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, sparse: true, lowercase: true },
    Info: { type: String, trim: true },
    Description: { type: String, trim: true },
    Website: { type: String, trim: true },
    youtube: { type: String, trim: true },
    Address: { type: String, trim: true },
    Facebook: { type: String, trim: true },
    Instagram: { type: String, trim: true },
    LinkedIn: { type: String, trim: true },
    Email: { type: String, trim: true, lowercase: true },
    Phone: { type: String, trim: true },
    IATA: {
      type: String,
      trim: true,
      uppercase: true,
      minlength: 2,
      maxlength: 3,
    },
    ICAO: {
      type: String,
      trim: true,
      uppercase: true,
      minlength: 3,
      maxlength: 4,
    },
    Logo: { type: String, trim: true },
    Background_Image: { type: String, trim: true },
    Google_Maps_Link: { type: String, trim: true },
  },
  {
    timestamps: true,
  }
);

// Delete the cached model if it exists
if (mongoose.models.AirLine) {
  delete mongoose.models.AirLine;
}

const AirLine = mongoose.model("AirLine", AirLinesSchema);

export default AirLine;
