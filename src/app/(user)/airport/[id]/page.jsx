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
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getData/airPort/${id}`,
    {
      cache: "no-store",
    }
  );
  const data = await res.json();

  // const data = {
  //   _id: "68ca7c484ccd0069db4be466",
  //   airport_id: "AP001",
  //   Address: "1 World Way, Los Angeles, CA 90045",
  //   Background_Image:
  //     "https://plus.unsplash.com/premium_photo-1725408106567-a77bd9beff7c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   City: "Los Angeles",
  //   Continent: "North America",
  //   Country: "USA",
  //   Description:
  //     "One of the busiest airports in the world Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio adipisci nisi nemo deserunt mollitia tempore. Provident odio magni quis accusamus eum eaque at! Nesciunt, nostrum! Ex quia dolore quo odio!lorem67",
  //   Email: "info@lax.com",
  //   Facebook: "https://facebook.com/laxairport",
  //   IATA: "LAX",
  //   ICAO: "KLAX",
  //   Info: "LAX - Gateway to the Pacific",
  //   Latitude: 33.9416,
  //   LinkedIn: "https://linkedin.com/company/lax",
  //   Logo: "https://plus.unsplash.com/premium_photo-1700495922514-7cb4f692cd72?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   Longitude: -118.4085,
  //   Name: "Los Angeles International Airport",
  //   Phone: "+1-855-463-5259",
  //   Region: "California",
  //   Website: "https://www.flylax.com",
  //   X: "https://twitter.com/flyLAX",
  //   YouTube: "https://youtube.com/laxairport",
  //   __v: 0,
  //   createdAt: "2025-09-17T09:15:33.557Z",
  //   updatedAt: "2025-09-17T09:15:33.557Z",
  // };

  console.log(data);

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
            text={"airports office in other location"}
            type={"Airport"}
            api={"airPort"}
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
