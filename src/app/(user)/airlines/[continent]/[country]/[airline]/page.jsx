import DataBox from "@/components/card/dataBox";
import BannerImg from "@/components/detail_page/banner";
import Contact from "@/components/detail_page/contact";
import Info from "@/components/detail_page/info";
import LocationMap from "@/components/detail_page/LocationMap";
import Quick_Fact from "@/components/detail_page/quick_Fact";
import SocialLink from "@/components/detail_page/socialLink";
import DynamicBreadcrumb from "@/components/ui/DynamicBreadcrumb";
import connectDb from "@/app/lib/conncetDb";
import AirLine from "@/model/airLines.model";
import Office from "@/model/official.model";

// Force dynamic rendering since this page fetches data from MongoDB
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { airline, continent, country } = await params;
  await connectDb();
  const data = await AirLine.findOne({ slug: airline }).lean();

  if (!data) {
    return {
      title: "Airline Not Found",
    };
  }

  const title = `${data.Name} - ${data.Country} | Airline Information`;
  const description = data.Description
    ? data.Description.substring(0, 160)
    : `Comprehensive information about ${
        data.Name
      }, including contact details, IATA code ${data.IATA || ""}, ICAO code ${
        data.ICAO || ""
      }, and location in ${data.City}, ${data.Country}.`;

  return {
    title,
    description,
    keywords: [
      data.Name,
      data.IATA,
      data.ICAO,
      data.Country,
      data.City,
      "airline",
      "aviation",
      "flight",
      data.Continent,
    ].filter(Boolean),
    openGraph: {
      title,
      description,
      type: "website",
      images: data.Logo ? [{ url: data.Logo, alt: `${data.Name} logo` }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: data.Logo ? [data.Logo] : [],
    },
    alternates: {
      canonical: `/airlines/${continent}/${country}/${airline}`,
    },
  };
}

async function Page({ params }) {
  const { airline } = await params;
  console.log("airline slug:", airline);

  await connectDb();

  // Direct database query by slug
  const data = await AirLine.findOne({ slug: airline }).lean();

  if (!data) {
    throw new Error("Airline not found");
  }

  // Fetch all offices in the same country
  const allOffices = await Office.find(
    { Country: data.Country },
    { Name: 1 }
  ).lean();

  // Get unique office names in the same country
  const officesInCountry = [
    ...new Set(allOffices.map((office) => office.Name)),
  ];

  // Create basePath for office links
  const continentSlug = data.Continent.toLowerCase().replace(/\s+/g, "-");
  const countrySlug = data.Country.toLowerCase().replace(/\s+/g, "-");
  const officeBasePath = `/office/${continentSlug}/${countrySlug}`;

  // Fetch all airlines in the same country (excluding current airline)
  const allAirlines = await AirLine.find(
    { Country: data.Country, _id: { $ne: data._id } },
    { Name: 1 }
  ).lean();

  // Get unique airline names in the same country (excluding current airline)
  const airlinesInCountry = [...new Set(allAirlines.map((a) => a.Name))];

  const airlineBasePath = `/airlines/${continentSlug}/${countrySlug}`;

  // Structured Data for Airline
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Airline",
    name: data.Name,
    iataCode: data.IATA,
    icaoCode: data.ICAO,
    address: {
      "@type": "PostalAddress",
      addressCountry: data.Country,
      addressLocality: data.City,
      addressRegion: data.Region,
      streetAddress: data.Address,
    },
    ...(data.Phone && { telephone: data.Phone }),
    ...(data.Email && { email: data.Email }),
    ...(data.Website && { url: data.Website }),
    ...(data.Logo && { logo: data.Logo }),
  };

  return (
    <div className="min-h-screen bg-gray-50 -mt-10">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
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
