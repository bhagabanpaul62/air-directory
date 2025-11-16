import DataBox from "@/components/card/dataBox";
import Banner2 from "@/components/home/banner2";
import DynamicBreadcrumb from "@/components/ui/DynamicBreadcrumb";
import React from "react";

async function Office() {
  try {
    // Fetch all offices
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/getData/office`,
      {
        cache: "no-store", // Always get fresh data
      }
    );

    // Check if response is ok
    if (!response.ok) {
      throw new Error(`Failed to fetch offices: ${response.status}`);
    }

    // Parse JSON response
    const offices = await response.json();

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

export default Office;
