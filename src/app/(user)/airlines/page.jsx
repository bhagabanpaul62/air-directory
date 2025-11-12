import DataBox from "@/components/card/dataBox";
import Banner2 from "@/components/home/banner2";
import DynamicBreadcrumb from "@/components/ui/DynamicBreadcrumb";
import React from "react";

async function Airline() {
  try {
    // Fix 1: Missing slash before 'api'
    // Fix 2: Add proper fetch options
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/getData/airLine`,
      {
        cache: "no-store", // Always get fresh data
      }
    );

    // Fix 3: Check if response is ok
    if (!response.ok) {
      throw new Error(`Failed to fetch airlines: ${response.status}`);
    }

    // Fix 4: Parse JSON response
    const airlines = await response.json();

    // Get unique continents - simplified and more efficient
    const airLineData = [
      ...new Set(airlines.map((airline) => airline.Continent)),
    ].filter(Boolean);



    return (
      <div>
        <Banner2 />
       <DynamicBreadcrumb/>
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
