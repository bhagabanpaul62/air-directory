import Continents from "@/components/content/continents";
import Banner from "@/components/home/banner";
import AirPort from "@/components/home/highlights/airePort";
import AirLine from "@/components/home/highlights/airLine";
import Office from "@/components/home/highlights/office";
import connectDb from "@/app/lib/conncetDb";
import AirLineModel from "@/model/airLines.model";
import AirPortModel from "@/model/airPort.model";
import OfficeModel from "@/model/official.model";

// Force dynamic rendering since this page fetches data from MongoDB
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Home - Global Aviation Directory",
  description:
    "Explore the world's most comprehensive aviation directory. Find detailed information about airlines, airports, and aviation offices across all continents. Search by continent, country, or name.",
  openGraph: {
    title: "OfficeLookup - Your Gateway to Global Aviation",
    description:
      "Discover airlines, airports, and offices worldwide with comprehensive contact details, codes, and locations.",
  },
};

export default async function Home() {
  await connectDb();

  // Direct database queries - no domain-based fetch
  const data = await AirLineModel.find({}).lean(); //airLine
  const data2 = await AirPortModel.find({}).lean(); //airport
  const data3 = await OfficeModel.find({}).lean(); //office

  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "OfficeLookup",
    url: "https://officelookup.com",
    description:
      "Global aviation directory with comprehensive information about airlines, airports, and aviation offices worldwide.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://officelookup.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <div className=" text-black">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main>
        <Banner />

        <section className="bg-gradient-to-br from-gray-50 to-white py-8 sm:py-10 lg:py-12 xl:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <header className="text-center mb-6 sm:mb-8 lg:mb-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
                Featured Highlights
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-4">
                Discover top airlines, airports, and offices from around the
                world
              </p>
              <div className="mt-3 sm:mt-4 flex justify-center">
                <div className="h-1 w-16 sm:w-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>
              </div>
            </header>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {/* Airlines */}
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 sm:px-6 sm:py-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="p-1.5 sm:p-2 bg-white/20 rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 sm:h-6 sm:w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                    </div>
                    <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-white">
                      Top Airlines
                    </h3>
                  </div>
                </div>
                <div className="p-0">
                  <AirLine AirLine={data} title="" limit={6} />
                </div>
              </div>

              {/* Airports */}
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-3 sm:px-6 sm:py-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="p-1.5 sm:p-2 bg-white/20 rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 sm:h-6 sm:w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                    </div>
                    <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-white">
                      Top Airports
                    </h3>
                  </div>
                </div>
                <div className="p-0">
                  <AirPort AirPort={data2} title="" limit={6} />
                </div>
              </div>

              {/* Offices */}
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-3 sm:px-6 sm:py-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="p-1.5 sm:p-2 bg-white/20 rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 sm:h-6 sm:w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-white">
                      Top Offices
                    </h3>
                  </div>
                </div>
                <div className="p-0">
                  <Office Office={data3} title="" limit={6} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
