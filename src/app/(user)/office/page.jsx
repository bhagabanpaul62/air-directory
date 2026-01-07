import DataBox from "@/components/card/dataBox";
import Banner2 from "@/components/home/banner2";
import DynamicBreadcrumb from "@/components/ui/DynamicBreadcrumb";
import React from "react";
import connectDb from "@/app/lib/conncetDb";
import Office from "@/model/official.model";

// Force dynamic rendering since this page fetches data from MongoDB
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Aviation Offices Directory - Browse Offices Worldwide",
  description:
    "Complete directory of aviation offices worldwide. Browse offices by continent including Africa, Asia, Europe, North America, South America, Oceania. Find office locations, contact information, and services.",
  keywords: [
    "aviation offices",
    "airline offices",
    "office directory",
    "aviation services",
    "travel offices",
    "international offices",
    "office locations",
  ],
  openGraph: {
    title: "Global Aviation Offices Directory - OfficeLookup",
    description:
      "Browse and search aviation offices worldwide by continent and country.",
  },
};

async function OfficePage() {
  try {
    await connectDb();

    // Direct database query
    const offices = await Office.find({}, { Continent: 1 }).lean();

    // Get unique continents
    const officeData = [
      ...new Set(offices.map((office) => office.Continent)),
    ].filter(Boolean);

    return (
      <div>
        <Banner2 />
        <DynamicBreadcrumb />
        <DataBox
          mainText="World Office Guide"
          subtext="Select a Continent to get List of offices"
          data={officeData}
        />
      </div>
    );
  } catch (error) {
    console.error("Error fetching offices:", error);
    return (
      <div>
        <Banner2 />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-red-600">Error loading offices: {error.message}</p>
        </div>
      </div>
    );
  }
}

export default OfficePage;
