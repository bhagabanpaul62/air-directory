import DataBox from "@/components/card/dataBox";
import BannerImg from "@/components/detail_page/banner";
import Contact from "@/components/detail_page/contact";
import Info from "@/components/detail_page/info";
import LocationMap from "@/components/detail_page/LocationMap";
import Quick_Fact from "@/components/detail_page/quick_Fact";
import SocialLink from "@/components/detail_page/socialLink";
import DynamicBreadcrumb from "@/components/ui/DynamicBreadcrumb";

async function Page({ params }) {
  const { airline } = await params;
  console.log("airline slug:", airline);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getData/airLine/${airline}`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();

  // Fetch all offices to filter by country
  const officesRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getData/office`,
    {
      cache: "no-store",
    }
  );
  const allOffices = await officesRes.json();

  // Get unique office names in the same country
  const officesInCountry = [
    ...new Set(
      allOffices
        .filter((office) => office.Country === data.Country)
        .map((office) => office.Name)
    ),
  ];

  // Create basePath for office links
  const continentSlug = data.Continent.toLowerCase().replace(/\s+/g, "-");
  const countrySlug = data.Country.toLowerCase().replace(/\s+/g, "-");
  const officeBasePath = `/office/${continentSlug}/${countrySlug}`;

  // Fetch all airlines to show other airlines in same country
  const airlinesRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getData/airLine`,
    {
      cache: "no-store",
    }
  );
  const allAirlines = await airlinesRes.json();

  // Get unique airline names in the same country (excluding current airline)
  const airlinesInCountry = [
    ...new Set(
      allAirlines
        .filter((a) => a.Country === data.Country && a.Name !== data.Name)
        .map((a) => a.Name)
    ),
  ];

  const airlineBasePath = `/airlines/${continentSlug}/${countrySlug}`;

  return (
    <div className="min-h-screen bg-gray-50 -mt-10">
      {/* Banner Section */}
      <BannerImg
        Background_Image={data.Background_Image}
        logo={data.Logo}
        name={data.Name}
        Continent={data.Continent}
        Country={data.Country}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DynamicBreadcrumb />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Airport Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <Info Info={data.Info} Description={data.Description} />
            </div>

            {/* Location & Map */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <LocationMap
                Google_Maps_Link={data.Google_Maps_Link}
                Name={data.Name}
                Address={data.Address}
                Phone={data.Phone}
                Email={data.Email}
                Country={data.Country}
              />
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Facts */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <Quick_Fact
                City={data.City}
                IATA={data.IATA}
                ICAO={data.ICAO}
                Country={data.Country}
                Region={data.Region}
              />
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <Contact
                Phone={data.Phone}
                Email={data.Email}
                Address={data.Address}
                Website={data.Website}
              />
            </div>
            {/* Social Links */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <SocialLink
                Website={data.Website}
                youtube={data.YouTube}
                Facebook={data.Facebook}
                Instagram={data.Instagram}
                LinkedIn={data.LinkedIn}
                x={data.X}
              />
            </div>
          </div>
        </div>
        <div>
          {/* Other offices in same country */}
          <DataBox
            mainText={`Offices in ${data.Country}`}
            subtext="Select an Office to view details"
            data={officesInCountry}
            basePath={officeBasePath}
          />
        </div>
        
      </div>
    </div>
  );
}

export default Page;

//banner(with title )
//info
//quick fact(city,cuntry,iata code ,icAo code)
//meta data (continent ,region ,address)
//contact link
//location with map

//fetch api get data by ID
