import DataBox from "@/components/card/dataBox";
import Banner2 from "@/components/home/banner2";
import DynamicBreadcrumb from "@/components/ui/DynamicBreadcrumb";

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

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getData/airPort`,
    {
      cache: "no-store",
    }
  );

  // Check if response is ok
  if (!response.ok) {
    throw new Error(`Failed to fetch airports: ${response.status}`);
  }

  // Parse JSON response
  const airports = await response.json();

  const countryData = [
    ...new Set(
      airports
        .filter((item) => item.Continent == continentName)
        .map((item) => item.Country)
    ),
  ];

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
