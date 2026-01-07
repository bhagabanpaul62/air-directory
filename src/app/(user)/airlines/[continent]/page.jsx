import DataBox from "@/components/card/dataBox";
import Banner2 from "@/components/home/banner2";
import DynamicBreadcrumb from "@/components/ui/DynamicBreadcrumb";
import connectDb from "@/app/lib/conncetDb";
import AirLine from "@/model/airLines.model";

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
  const airlines = await AirLine.find(
    { Continent: continentName },
    { Country: 1 }
  ).lean();

  const cityData = [...new Set(airlines.map((item) => item.Country))].filter(
    Boolean
  );

  console.log(cityData);

  return (
    <div>
      <Banner2 />
      <DynamicBreadcrumb />
      <DataBox
        mainText={`Airline in ${continentName}`}
        subtext="Select a Country to get List of airlines"
        data={cityData}
      />
    </div>
  );
}
