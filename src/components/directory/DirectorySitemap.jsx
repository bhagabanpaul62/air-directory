"use client";
import Link from "next/link";
import { useState } from "react";

function DirectorySitemap({ airlines, airports }) {
  const [expandedContinents, setExpandedContinents] = useState({});

  // Group data by continent and country
  const sitemapData = {};

  [...airlines, ...airports].forEach((item) => {
    const continent = item.Continent || "Other";
    const country = item.Country || "Unknown";

    if (!sitemapData[continent]) {
      sitemapData[continent] = {};
    }
    if (!sitemapData[continent][country]) {
      sitemapData[continent][country] = { airlines: 0, airports: 0 };
    }

    if (airlines.includes(item)) {
      sitemapData[continent][country].airlines++;
    } else {
      sitemapData[continent][country].airports++;
    }
  });

  const toggleContinent = (continent) => {
    setExpandedContinents((prev) => ({
      ...prev,
      [continent]: !prev[continent],
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <svg
          className="w-5 h-5 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7"
          />
        </svg>
        Directory Sitemap
      </h3>

      <div className="space-y-2">
        {Object.entries(sitemapData)
          .sort()
          .map(([continent, countries]) => {
            const isExpanded = expandedContinents[continent];
            const totalAirlines = Object.values(countries).reduce(
              (sum, counts) => sum + counts.airlines,
              0
            );
            const totalAirports = Object.values(countries).reduce(
              (sum, counts) => sum + counts.airports,
              0
            );

            return (
              <div
                key={continent}
                className="border-b border-gray-100 last:border-b-0"
              >
                <button
                  onClick={() => toggleContinent(continent)}
                  className="w-full flex items-center justify-between py-3 px-2 text-left hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <svg
                      className={`w-4 h-4 text-gray-500 transition-transform ${
                        isExpanded ? "rotate-90" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    <span className="font-medium text-gray-900">
                      {continent}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span>{totalAirlines} airlines</span>
                    <span>{totalAirports} airports</span>
                  </div>
                </button>

                {isExpanded && (
                  <div className="pl-6 pb-2 space-y-1">
                    {Object.entries(countries)
                      .sort()
                      .map(([country, counts]) => (
                        <Link
                          key={country}
                          href={`/directory?continent=${encodeURIComponent(
                            continent
                          )}&country=${encodeURIComponent(country)}`}
                          className="flex items-center justify-between py-2 px-3 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <span>{country}</span>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            {counts.airlines > 0 && (
                              <span>{counts.airlines}✈️</span>
                            )}
                            {counts.airports > 0 && (
                              <span>{counts.airports}🏢</span>
                            )}
                          </div>
                        </Link>
                      ))}
                  </div>
                )}
              </div>
            );
          })}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 space-y-1">
          <div className="flex items-center justify-between">
            <span>Total Airlines:</span>
            <span className="font-medium">{airlines.length}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Total Airports:</span>
            <span className="font-medium">{airports.length}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Countries:</span>
            <span className="font-medium">
              {
                [
                  ...new Set(
                    [...airlines, ...airports].map((item) => item.Country)
                  ),
                ].length
              }
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DirectorySitemap;
