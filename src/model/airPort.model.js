import mongoose from "mongoose";

const AirPortSchema = new mongoose.Schema(
  {
    // Using provided field names verbatim to match your data headers
    airport_id: { type: String, index: true, trim: true },
    Continent: { type: String, trim: true },
    Country: { type: String, trim: true },
    Region: { type: String, trim: true },
    City: { type: String, trim: true },
    Name: { type: String, required: true, trim: true },
    Info: { type: String, trim: true },
    Description: { type: String, trim: true },
    Website: { type: String, trim: true },
    Facebook: { type: String, trim: true },
    X: { type: String, trim: true },
    YouTube: { type: String, trim: true },
    LinkedIn: { type: String, trim: true },
    Email: { type: String, trim: true, lowercase: true },
    Phone: { type: String, trim: true },
    Background_Image: { type: String, trim: true },
    Logo: { type: String, trim: true },
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
    Address: { type: String, trim: true },
    Latitude: { type: Number },
    Longitude: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.models.AirPort ||
  mongoose.model("AirPort", AirPortSchema);
