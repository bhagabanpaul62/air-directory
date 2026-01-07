import DataBox from "@/components/card/dataBox";
import Banner2 from "@/components/home/banner2";
import DynamicBreadcrumb from "@/components/ui/DynamicBreadcrumb";
import React from "react";
import connectDb from "@/app/lib/conncetDb";
import AirPort from "@/model/airPort.model";

// Force dynamic rendering since this page fetches data from MongoDB
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Airports Directory - Browse Airports Worldwide",
  description:
    "Comprehensive directory of airports worldwide. Browse airports by continent including Africa, Asia, Europe, North America, South America, Oceania. Find airport information, IATA codes, ICAO codes, and contact details.",
  keywords: [
    "airports directory",
    "global airports",
    "airport list",
    "IATA airport codes",
    "ICAO codes",
    "international airports",
    "world airports",
    "airport information",
  ],
  openGraph: {
    title: "Global Airports Directory - OfficeLookup",
    description:
      "Browse and search thousands of airports worldwide by continent and country.",
  },
};

async function Airport() {
  try {
    await connectDb();

    // Direct database query
    const airports = await AirPort.find({}, { Continent: 1 }).lean();

    // Get unique continents
    const airPortData = [
      ...new Set(airports.map((airport) => airport.Continent)),
    ].filter(Boolean);

    return (
      <div>
        <Banner2 />
        <DynamicBreadcrumb />
        <DataBox
          mainText="World Airport Guide"
          subtext="Select a Continent to get List of airports"
          data={airPortData}
        />
      </div>
    );
  } catch (error) {
    console.error("Error fetching airports:", error);
    return (
      <div>
        <Banner2 />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p className="text-red-600">
            Error loading airports: {error.message}
          </p>
        </div>
      </div>
    );
  }
}

export default Airport;
