import Recommendation from "@/components/card/recommendation";
import BannerImg from "@/components/detail_page/banner";
import Contact from "@/components/detail_page/contact";
import Info from "@/components/detail_page/info";
import LocationMap from "@/components/detail_page/LocationMap";
import Quick_Fact from "@/components/detail_page/quick_Fact";
import SocialLink from "@/components/detail_page/socialLink";
import DynamicBreadcrumb from "@/components/ui/DynamicBreadcrumb";

async function Page({ params }) {
  const { airport } = await params;
  console.log("airport slug:", airport);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getData/airPort/${airport}`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();

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
          {/* Other airports in same continent */}
          <Recommendation
            data={data.Country}
            text={"Airlines office in other location"}
            type={"Airport"}
            api={"airPort"}
          />
        </div>
      </div>
    </div>
  );
}

export default Page;
