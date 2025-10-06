import Continents from "@/components/content/continents";
import Banner from "@/components/home/banner";
import AirPort from "@/components/home/highlights/airePort";
import AirLine from "@/components/home/highlights/airLine";

export default async function Home() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getData/airLine`,
    {
      cache: "no-store", // always fresh
    }
  );

  const res2 = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getData/airPort`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch airlines");
  if (!res2.ok) throw new Error("Failed to fetch airports");

  const data = await res.json(); //airLine
  const data2 = await res2.json(); //airport

  return (
    <div className=" text-black">
      <main>
        <Banner />
        <Continents Continents={data} airPort={data2} />
        <section className="bg-gradient-to-br from-gray-50 to-white py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <header className="text-center mb-8 lg:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                Featured Highlights
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                Discover top airlines and airports from around the world
              </p>
              <div className="mt-4 flex justify-center">
                <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>
              </div>
            </header>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
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
                    <h3 className="text-xl font-semibold text-white">
                      Top Airlines
                    </h3>
                  </div>
                </div>
                <div className="p-0">
                  <AirLine AirLine={data} title="" limit={6} />
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
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
                    <h3 className="text-xl font-semibold text-white">
                      Top Airports
                    </h3>
                  </div>
                </div>
                <div className="p-0">
                  <AirPort AirPort={data2} title="" limit={6} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
