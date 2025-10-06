import Link from "next/link";
import Card from "@/components/card/Card";

function AirLine({
  AirLine,
  limit = 8,
  title = "Top Airlines",
  useCards = false,
}) {
  const items = Array.isArray(AirLine) ? AirLine : [];

  // Normalize minimal fields we need
  const normalized = items.map((a) => ({
    id:
      a?._id ||
      a?.airline_id ||
      a?.IATA ||
      a?.ICAO ||
      a?.Name ||
      Math.random().toString(36).slice(2),
    name: a?.Name || a?.name || "Unknown Airline",
    logo:
      a?.Logo ||
      a?.logo ||
      a?.logo_url ||
      a?.Logo_URL ||
      a?.["Logo URL"] ||
      null,
  }));

  // Prefer entries with a logo, then alphabetical by name
  const display = normalized
    .sort(
      (a, b) =>
        (b.logo ? 1 : 0) - (a.logo ? 1 : 0) || a.name.localeCompare(b.name)
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
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
            <p>No airlines to display</p>
          </div>
        ) : useCards ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {display.slice(0, limit).map((air) => (
              <Card
                key={air.id}
                id={air.id}
                Name={air.name}
                Background_Image={
                  AirLine.find((a) => (a._id || a.airline_id) === air.id)
                    ?.Background_Image
                }
                Country={
                  AirLine.find((a) => (a._id || a.airline_id) === air.id)
                    ?.Country
                }
                city={
                  AirLine.find((a) => (a._id || a.airline_id) === air.id)?.City
                }
                IATA={
                  AirLine.find((a) => (a._id || a.airline_id) === air.id)?.IATA
                }
                ICAO={
                  AirLine.find((a) => (a._id || a.airline_id) === air.id)?.ICAO
                }
                type="Airline"
              />
            ))}
          </div>
        ) : (
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {display.map((air) => (
              <Link
                href={`/airLine/${air.id}`}
                key={air.id}
                className="group bg-gray-50 hover:bg-blue-50 rounded-xl border border-gray-200 hover:border-blue-200 transition-all duration-200 cursor-pointer"
                title={air.name}
              >
                <div className="p-3 sm:p-4 flex flex-col items-center text-center">
                  <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-white overflow-hidden ring-2 ring-gray-100 group-hover:ring-blue-200 flex items-center justify-center mb-3 transition-all duration-200">
                    {air.logo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={air.logo}
                        alt={`${air.name} logo`}
                        className="h-full w-full object-contain p-1"
                        loading="lazy"
                      />
                    ) : (
                      <span className="text-sm sm:text-base font-bold text-blue-600 group-hover:text-blue-700">
                        {air.name?.charAt(0) || "A"}
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-gray-900 group-hover:text-blue-900 line-clamp-2 leading-tight">
                    {air.name}
                  </p>
                </div>
              </Link>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default AirLine;
