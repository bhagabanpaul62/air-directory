import HorizontalScroller from "@/components/ui/HorizontalScroller";
import Link from "next/link";

function Continents({ Continents, airPort }) {
  // Unique list of continents from airlines data; fall back to airports if needed
  const continentsList = Array.from(
    new Map(
      (Array.isArray(Continents) ? Continents : [])
        .filter((c) => c && c.Continent)
        .map((c) => [c.Continent, c])
    ).values()
  ).sort((a, b) => a.Continent.localeCompare(b.Continent));

  const countAirlines = (continentName) =>
    (Array.isArray(Continents) ? Continents : []).filter(
      (c) => c?.Continent === continentName
    ).length;

  const countAirports = (continentName) =>
    (Array.isArray(airPort) ? airPort : []).filter(
      (a) => a?.Continent === continentName
    ).length;

  return (
    <section className="w-full bg-white text-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
            Explore by Continent
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Swipe or scroll horizontally to browse.
          </p>
        </header>

        {continentsList.length === 0 ? (
          <div className="text-sm text-gray-600">No continents to display.</div>
        ) : (
          <HorizontalScroller className="" aria-label="Continents list">
            {continentsList.map((con) => {
              const name = con.Continent;
              const airlines = countAirlines(name);
              const airports = countAirports(name);
              return (
                <div
                  key={name}
                  className="snap-start shrink-0 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden min-w-[240px] sm:min-w-[280px] md:min-w-[320px]"
                >
                  <div className="h-1 bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-500 opacity-80" />
                  <div className="p-4 sm:p-5">
                    <h3 className="text-base sm:text-lg font-semibold mb-1">
                      {name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-4">
                      Discover carriers and hubs across {name}.
                    </p>

                    <div className="flex items-center gap-4 text-xs sm:text-sm">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex h-2 w-2 rounded-full bg-blue-600" />
                        <span className="text-gray-800 font-medium">
                          {airlines}
                        </span>
                        <span className="text-gray-600">Airlines</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex h-2 w-2 rounded-full bg-emerald-600" />
                        <span className="text-gray-800 font-medium">
                          {airports}
                        </span>
                        <span className="text-gray-600">Airports</span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <Link
                        href={`/directory?continent=${encodeURIComponent(
                          name
                        )}`}
                        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-1.5 text-white text-xs sm:text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                      >
                        View more
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="h-4 w-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </HorizontalScroller>
        )}
      </div>
    </section>
  );
}

export default Continents;
