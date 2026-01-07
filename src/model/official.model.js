import mongoose from "mongoose";

const officeSchema = new mongoose.Schema(
  {
    office_id: { type: String, unique: true, sparse: true, trim: true },
    Continent: { type: String, trim: true },
    Country: { type: String, trim: true },
    Region: { type: String, trim: true },
    City: { type: String, trim: true },
    Name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, trim: true },
    Type: { type: String, trim: true }, // e.g., "Tourism Board", "Embassy", "Consulate", "Government Office"
    Info: { type: String, trim: true },
    Description: { type: String, trim: true },
    Website: { type: String, trim: true },
    Address: { type: String, trim: true },
    Facebook: { type: String, trim: true },
    Instagram: { type: String, trim: true },
    LinkedIn: { type: String, trim: true },
    X: { type: String, trim: true },
    YouTube: { type: String, trim: true },
    Email: { type: String, lowercase: true, trim: true },
    Phone: { type: String, trim: true },
    Logo: { type: String, trim: true },
    Background_Image: { type: String, trim: true },
    Google_Maps_Link: { type: String, trim: true },
  },
  {
    timestamps: true,
    collection: "offices",
  }
);

// Generate slug from name before saving
officeSchema.pre("save", function (next) {
  if (this.isModified("Name") && this.Name) {
    this.slug = this.Name.toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  }
  next();
});

// Indexes
officeSchema.index({ Country: 1, City: 1 });
officeSchema.index({ Continent: 1 });
officeSchema.index({ Type: 1 });

const Office = mongoose.models.Office || mongoose.model("Office", officeSchema);

export default Office;
