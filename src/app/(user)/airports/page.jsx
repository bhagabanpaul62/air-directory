import DataBox from "@/components/card/dataBox";
import Banner2 from "@/components/home/banner2";
import DynamicBreadcrumb from "@/components/ui/DynamicBreadcrumb";
import React from "react";

async function Airport() {
  try {
    // Fetch all airports
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/getData/airPort`,
      {
        cache: "no-store", // Always get fresh data
      }
    );

    // Check if response is ok
    if (!response.ok) {
      throw new Error(`Failed to fetch airports: ${response.status}`);
    }

    // Parse JSON response
    const airports = await response.json();

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
