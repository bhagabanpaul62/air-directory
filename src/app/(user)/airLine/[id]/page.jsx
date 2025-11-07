import Recommendation from "@/components/card/recommendation";
import BannerImg from "@/components/detail_page/banner";
import Contact from "@/components/detail_page/contact";
import Info from "@/components/detail_page/info";
import LocationMap from "@/components/detail_page/LocationMap";
import MetaData from "@/components/detail_page/metaData";
import Quick_Fact from "@/components/detail_page/quick_Fact";
import SocialLink from "@/components/detail_page/socialLink";

async function Page({ params }) {
  const { id } = params;
  console.log("our id is ::", id);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getData/airLine/${id}`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();

  // const data = {
  //   "_id": "68c98dbd4ccd0069db4bafdf",
  //   "airline_id": "AL001",
  //   "Address": "123 Sky Blvd, LA, CA",
  //   "Background_Image": "https://bgs.skywings.com/airport.jpg",
  //   "City": "Los Angeles",
  //   "Continent": "North America",
  //   "Country": "USA",
  //   "Description": "Luxury air travel within the US",
  //   "Email": "contact@skywings.com",
  //   "Facebook": "https://facebook.com/skywings",
  //   "IATA": "SW",
  //   "ICAO": "SKW",
  //   "Info": "Premium domestic flights",
  //   "Instagram": "https://instagram.com/skywings_air",
  //   "Latitude": 34.0522,
  //   "LinkedIn": "https://linkedin.com/company/skywings",
  //   "Logo": "https://logos.skywings.com/logo.png",
  //   "Longitude": -118.2437,
  //   "Name": "SkyWings Airlines",
  //   "Phone": "+1-800-555-0101",
  //   "Region": "California",
  //   "Website": "https://skywings.com",
  //   "__v": 0,
  //   "createdAt": "2025-09-16T16:18:05.756Z",
  //   "updatedAt": "2025-09-16T16:18:05.756Z",
  //   "youtube": "https://youtube.com/skywings"
  // }

  // console.log(data);

  return (
    <div className="min-h-screen bg-gray-50">
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
                Latitude={data.Latitude}
                Longitude={data.Longitude}
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
          {/* //other airports same continents cord */}
          <Recommendation
            data={data}
            text={"airlines office in other location"}
            type={"Airline"}
            api={"airLine"}
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
