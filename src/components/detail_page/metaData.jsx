import React from "react";

function MetaData({ Continent, Country, Region, City, Latitude, Longitude }) {
  const metaItems = [
    { label: "Airline ID", value: "12345" },
    { label: "Continent", value: Continent },
    { label: "Country", value: Country },
    { label: "Region", value: Region },
    { label: "City", value: City },
    { label: "IATA", value: "AG" },
    { label: "ICAO", value: "AWG" },
    { label: "Latitude", value: Latitude ? `${Latitude}` : null },
    { label: "Longitude", value: Longitude ? `${Longitude}` : null },
  ].filter((item) => item.value);

  return (
    <div className="p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Metadata</h3>

      {metaItems.length > 0 ? (
        <div className="space-y-3">
          {metaItems.map((item, index) => (
            <div key={index} className="flex justify-between py-1">
              <dt className="text-sm text-gray-600">{item.label}</dt>
              <dd className="text-sm text-gray-900">{item.value}</dd>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-sm">No metadata available</p>
      )}
    </div>
  );
}

export default MetaData;
