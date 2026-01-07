import DataBox from "@/components/card/dataBox";
import Banner2 from "@/components/home/banner2";
import DynamicBreadcrumb from "@/components/ui/DynamicBreadcrumb";
import connectDb from "@/app/lib/conncetDb";
import AirPort from "@/model/airPort.model";

// Force dynamic rendering since this page fetches data from MongoDB
export const dynamic = "force-dynamic";

async function Country({ params }) {
  const { country } = await params;
  console.log(country);

  const Country = country
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  await connectDb();

  // Direct database query
  const airports = await AirPort.find({ Country: Country }, { Name: 1 }).lean();

  const data = [...new Set(airports.map((item) => item.Name))].filter(Boolean);
  console.log(data);

  return (
    <div>
      <Banner2 />
      <DynamicBreadcrumb />
      <DataBox
        mainText={`Airports in ${Country}`}
        subtext="Select an Airport to view details"
        data={data}
      />
    </div>
  );
}

export default Country;
