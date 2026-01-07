import DataBox from "@/components/card/dataBox";
import Banner2 from "@/components/home/banner2";
import DynamicBreadcrumb from "@/components/ui/DynamicBreadcrumb";
import connectDb from "@/app/lib/conncetDb";
import AirPort from "@/model/airPort.model";

// Force dynamic rendering since this page fetches data from MongoDB
export const dynamic = "force-dynamic";

export default async function ContinentPage({ params }) {
  // Get the slug from URL (e.g., "north-america")
  const { continent } = await params;

  // Convert slug back to display name: "north-america" → "North America"
  const continentName = continent
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  console.log("URL slug:", continent); // "north-america"
  console.log("Display name:", continentName); // "North America"

  await connectDb();

  // Direct database query
  const airports = await AirPort.find(
    { Continent: continentName },
    { Country: 1 }
  ).lean();

  const countryData = [...new Set(airports.map((item) => item.Country))].filter(
    Boolean
  );

  console.log(countryData);

  return (
    <div>
      <Banner2 />
      <DynamicBreadcrumb />
      <DataBox
        mainText={`Airports in ${continentName}`}
        subtext="Select a Country to get List of airports"
        data={countryData}
      />
    </div>
  );
}
