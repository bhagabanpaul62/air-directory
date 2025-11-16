import DataBox from "@/components/card/dataBox";
import Banner2 from "@/components/home/banner2";
import DynamicBreadcrumb from "@/components/ui/DynamicBreadcrumb";

async function Country({ params }) {
  const { country } = await params;
  console.log(country);

  const Country = country
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getData/office`,
    {
      cache: "no-store",
    }
  );

  const offices = await response.json();

  const data = [
    ...new Set(
      offices.filter((item) => item.Country == Country).map((item) => item.Name)
    ),
  ];
  console.log(data);

  return (
    <div>
      <Banner2 />
      <DynamicBreadcrumb />
      <DataBox
        mainText={`Offices in ${Country}`}
        subtext="Select an Office to view details"
        data={data}
      />
    </div>
  );
}

export default Country;
