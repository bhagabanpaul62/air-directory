import DataBox from "@/components/card/dataBox";
import Banner2 from "@/components/home/banner2";
import DynamicBreadcrumb from "@/components/ui/DynamicBreadcrumb";
import React from "react";
import connectDb from "@/app/lib/conncetDb";
import AirLine from "@/model/airLines.model";

// Force dynamic rendering since this page fetches data from MongoDB
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Airlines Directory - Browse Airlines Worldwide",
  description:
    "Complete directory of airlines worldwide. Browse airlines by continent including Africa, Asia, Europe, North America, South America, Oceania. Find airline contact information, IATA codes, and more.",
  keywords: [
    "airlines directory",
    "global airlines",
    "airline list",
    "IATA codes",
    "airline contacts",
    "international airlines",
    "world airlines",
  ],
  openGraph: {
    title: "Global Airlines Directory - OfficeLookup",
    description:
      "Browse and search thousands of airlines worldwide by continent and country.",
  },
};

async function Airline() {
  try {
    await connectDb();

    // Direct database query
    const airlines = await AirLine.find({}, { Continent: 1 }).lean();

    // Get unique continents - simplified and more efficient
    const airLineData = [
      ...new Set(airlines.map((airline) => airline.Continent)),
    ].filter(Boolean);

    return (
      <div>
        <Banner2 />
        <DynamicBreadcrumb />
        <DataBox
          mainText="World Airline Guide"
          subtext="Select a Continent to get List of airlines"
          data={airLineData}
        />
      </div>
    );
  } catch (error) {
    console.error("Error fetching airlines:", error);
    return (
      <div>
        <Banner2 />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-red-600">
            Error loading airlines: {error.message}
          </p>
        </div>
      </div>
    );
  }
}

export default Airline;
