import Link from "next/link";
import Card from "@/components/card/Card";

function AirPort({
  AirPort,
  limit = 5,
  title = "Top Airports",
  useCards = false,
}) {
  const items = Array.isArray(AirPort) ? AirPort : [];

  const normalized = items.map((a) => ({
    id:
      a?._id ||
      a?.airport_id ||
      a?.IATA ||
      a?.ICAO ||
      a?.Name ||
      Math.random().toString(36).slice(2),
    name: a?.Name || a?.name || "Unknown Airport",
    bg:
      a?.Background_Image ||
      a?.background_image ||
      a?.["Background Image"] ||
      null,
  }));

  const display = normalized
    .sort(
      (a, b) => (b.bg ? 1 : 0) - (a.bg ? 1 : 0) || a.name.localeCompare(b.name)
    )
    .slice(0, Math.max(1, limit));

  return (
    <section className="w-full">
      <div className="px-6 py-6">
        {title && (
          <h2 className="mb-4 sm:mb-6 text-lg sm:text-xl font-semibold tracking-tight">
            {title}
          </h2>
        )}

        {display.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto mb-3 text-gray-300"
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
            <p>No airports to display</p>
          </div>
        ) : useCards ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {display.slice(0, limit).map((ap) => (
              <Card
                key={ap.id}
                id={ap.id}
                Name={ap.name}
                Background_Image={
                  AirPort.find((a) => (a._id || a.airport_id) === ap.id)
                    ?.Background_Image
                }
                Country={
                  AirPort.find((a) => (a._id || a.airport_id) === ap.id)
                    ?.Country
                }
                city={
                  AirPort.find((a) => (a._id || a.airport_id) === ap.id)?.City
                }
                IATA={
                  AirPort.find((a) => (a._id || a.airport_id) === ap.id)?.IATA
                }
                ICAO={
                  AirPort.find((a) => (a._id || a.airport_id) === ap.id)?.ICAO
                }
                type="Airport"
              />
            ))}
          </div>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {display.map((ap) => (
              <Link
                href={`/airport/${ap.id}`}
                key={ap.id}
                className="group bg-gray-50 hover:bg-emerald-50 rounded-xl border border-gray-200 hover:border-emerald-200 transition-all duration-200 cursor-pointer overflow-hidden"
                title={ap.name}
              >
                <div className="relative h-24 sm:h-28 w-full bg-gradient-to-br from-gray-200 to-gray-300">
                  {ap.bg ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={ap.bg}
                      alt={`${ap.name} background`}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
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
                  )}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-3 py-2">
                    <p className="text-white text-xs sm:text-sm font-medium line-clamp-2 leading-tight">
                      {ap.name}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default AirPort;
