import React from "react";

function LocationMap({ Latitude, Longitude, Name, Address }) {
  // If no coordinates are provided, show placeholder
  if (!Latitude || !Longitude) {
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
          <p className="text-gray-500 text-sm">
            Location coordinates not available
          </p>
        </div>
      </div>
    );
  }

  // Generate map URLs for different providers
  const googleMapsUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBHCxKG6pJhGE6H1HcFwqWqjOqY5B4mOaY&q=${Latitude},${Longitude}&zoom=15`;
  const openStreetMapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${
    Longitude - 0.01
  },${Latitude - 0.01},${Longitude + 0.01},${
    Latitude + 0.01
  }&layer=mapnik&marker=${Latitude},${Longitude}`;

  return (
    <div className="p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Location & Map</h3>

      {/* Address Information */}
      {Address && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Address</p>
          <p className="text-gray-900 text-sm font-medium">{Address}</p>
        </div>
      )}

      {/* Coordinates */}
      <div className="mb-4 grid grid-cols-2 gap-3">
        <div className="p-3 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-600 font-medium">Latitude</p>
          <p className="text-blue-900 text-sm font-mono">{Latitude}°</p>
        </div>
        <div className="p-3 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-600 font-medium">Longitude</p>
          <p className="text-blue-900 text-sm font-mono">{Longitude}°</p>
        </div>
      </div>

      {/* OpenStreetMap Embed */}
      <div
        className="relative bg-gray-200 rounded-xl overflow-hidden"
        style={{ height: "300px" }}
      >
        <iframe
          src={openStreetMapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Map showing location of ${Name || "Airport"}`}
          className="rounded-xl"
        />
      </div>

      {/* Map Links */}
      <div className="mt-4 flex space-x-3">
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${Latitude},${Longitude}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center py-2 px-3 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
          Open in Google Maps
        </a>

        <a
          href={`https://www.openstreetmap.org/?mlat=${Latitude}&mlon=${Longitude}&zoom=15`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center py-2 px-3 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors"
        >
          <svg
            className="w-4 h-4 mr-2"
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
          Open in OSM
        </a>
      </div>

      {/* Get Directions Link */}
      <div className="mt-3">
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${Latitude},${Longitude}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center py-2 px-3 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
            />
          </svg>
          Get Directions
        </a>
      </div>
    </div>
  );
}

export default LocationMap;
