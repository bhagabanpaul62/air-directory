import Link from "next/link";

function Card({
  id,
  Name,
  Background_Image,

  Country,
  city,
  IATA,
  ICAO,
  type,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Header Section with Background Image */}
      <div
        className="relative h-40 bg-gradient-to-r from-blue-500 to-blue-700"
        style={{
          backgroundImage: Background_Image
            ? `url(${Background_Image})`
            : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Type Badge */}
        <div className="absolute top-4 right-4">
          <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {type}
          </span>
        </div>

        {/* Airplane Icon Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-full p-4">
            <svg
              className="w-16 h-16 text-white opacity-80"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Airline/Airport Name */}
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-1">
          {Name}
        </h3>

        {/* Location */}
        <p className="text-gray-600 text-sm mb-4">
          {Country},{city}
        </p>

        {/* Codes Section */}
        <div className="flex justify-between items-center mb-6">
          {IATA && (
            <div>
              <span className="text-gray-500 text-xs uppercase tracking-wide">
                IATA
              </span>
              <p className="text-gray-900 font-semibold">{IATA}</p>
            </div>
          )}
          {ICAO && (
            <div className="text-right">
              <span className="text-gray-500 text-xs uppercase tracking-wide">
                ICAO
              </span>
              <p className="text-gray-900 font-semibold">{ICAO}</p>
            </div>
          )}
        </div>

        {/* Quick View Button */}
        <div className="flex justify-center items-center">
          <Link
            href={`/${type === "Airline" ? "airLine" : "airport"}/${id}`}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-4 rounded-lg transition-colors duration-200 text-center"
          >
            Quick View
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Card;
