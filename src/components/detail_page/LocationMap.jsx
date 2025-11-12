import React from "react";

function LocationMap({
  Google_Maps_Link,
  Name,
  Address,
  Phone,
  Email,
  Country,
}) {
  if (!Google_Maps_Link) {
    return (
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Location & Map
        </h3>
        <div className="bg-gray-100 rounded-xl p-8 text-center">
          <svg
            className="w-12 h-12 text-gray-400 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <p className="text-gray-500 text-sm">Location map not available</p>
        </div>
      </div>
    );
  }

  const getEmbedUrl = (link) => {
    if (!link) return "";
    if (link.includes("/embed")) return link;
    const match = link.match(/q=([-\d.]+),([-\d.]+)/);
    if (match) {
      const [, lat, lng] = match;
      return `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15000!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1234567890`;
    }
    return link;
  };

  const embedUrl = getEmbedUrl(Google_Maps_Link);

  return (
    <div className="p-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
        <svg
          className="w-7 h-7 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        {Country} Headquarter Information
      </h3>

      {/* Contact Information */}
      <div className="flex justify-center gap-4 mb-6">
        {Phone && (
          <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg w-[50%] border border-gray-200">
            <p className="text-xs text-gray-500 font-medium mb-1">
              Phone Number
            </p>
            <p className="text-gray-900 text-sm font-semibold">{Phone}</p>
          </div>
        )}
        {Email && (
          <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg w-[50%] border border-gray-200">
            <p className="text-xs text-gray-500 font-medium mb-1">
              Email Address
            </p>
            <p className="text-gray-900 text-sm font-semibold break-all">
              {Email}
            </p>
          </div>
        )}
      </div>

      {/* Address */}
      {Address && (
        <div className="mb-6">
          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-l-4 border-blue-600">
            <p className="text-xs text-blue-600 font-semibold uppercase tracking-wide mb-2">
              Office Address
            </p>
            <p className="text-blue-900 text-base font-medium">{Address}</p>
          </div>
        </div>
      )}

      {/* Google Maps Embed */}
      <div
        className="relative bg-gray-200 rounded-xl overflow-hidden shadow-lg mb-4"
        style={{ height: "400px" }}
      >
        <iframe
          src={embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Location map of ${Name || "office"}`}
          className="rounded-xl"
        />
      </div>

      {/* Open in Google Maps Button */}
      <div className="mt-4">
        <a
          href={Google_Maps_Link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center py-3 px-4 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
          Open in Google Maps
        </a>
      </div>
    </div>
  );
}

export default LocationMap;
