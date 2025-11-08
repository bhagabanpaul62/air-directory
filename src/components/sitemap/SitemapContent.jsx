"use client";
import { useState, useMemo } from "react";
import Link from "next/link";

function SitemapContent({ airlines, airports }) {
  const [selectedType, setSelectedType] = useState("");
  const [selectedContinent, setSelectedContinent] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  // Organize data
  const organizedData = useMemo(() => {
    const data = {};
    const continents = new Set();

    // Process airlines
    airlines.forEach((airline) => {
      const continent = airline.Continent || "Other";
      const country = airline.Country || "Unknown";
      continents.add(continent);

      if (!data[continent]) data[continent] = {};
      if (!data[continent][country])
        data[continent][country] = { airlines: [], airports: [] };
      data[continent][country].airlines.push(airline);
    });

    // Process airports
    airports.forEach((airport) => {
      const continent = airport.Continent || "Other";
      const country = airport.Country || "Unknown";
      continents.add(continent);

      if (!data[continent]) data[continent] = {};
      if (!data[continent][country])
        data[continent][country] = { airlines: [], airports: [] };
      data[continent][country].airports.push(airport);
    });

    return { data, continents: Array.from(continents).sort() };
  }, [airlines, airports]);

  // Get available continents based on selected type
  const availableContinents = useMemo(() => {
    if (!selectedType) return [];

    return organizedData.continents.filter((continent) => {
      const countries = organizedData.data[continent];
      return Object.values(countries).some((country) =>
        selectedType === "airlines"
          ? country.airlines.length > 0
          : country.airports.length > 0
      );
    });
  }, [selectedType, organizedData]);

  // Get available countries based on selected type and continent
  const availableCountries = useMemo(() => {
    if (!selectedContinent) return [];

    const countries = organizedData.data[selectedContinent] || {};
    return Object.keys(countries)
      .filter((country) => {
        const data = countries[country];
        return selectedType === "airlines"
          ? data.airlines.length > 0
          : data.airports.length > 0;
      })
      .sort();
  }, [selectedContinent, selectedType, organizedData]);

  // Get results based on selections
  const results = useMemo(() => {
    if (!selectedCountry || !selectedContinent || !selectedType) return null;

    const countryData =
      organizedData.data[selectedContinent]?.[selectedCountry];
    if (!countryData) return null;

    return {
      airlines:
        selectedType === "airlines"
          ? countryData.airlines.sort((a, b) => a.Name.localeCompare(b.Name))
          : [],
      airports:
        selectedType === "airports"
          ? countryData.airports.sort((a, b) => a.Name.localeCompare(b.Name))
          : [],
    };
  }, [selectedCountry, selectedContinent, selectedType, organizedData]);

  // Reset dependent selections when parent changes
  const handleTypeChange = (type) => {
    setSelectedType(type);
    setSelectedContinent("");
    setSelectedCountry("");
  };

  const handleContinentChange = (continent) => {
    setSelectedContinent(continent);
    setSelectedCountry("");
  };

  // If no selection, show type selection
  if (!selectedType) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content - Type Selection */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <h2 className="text-3xl font-semibold text-gray-900 mb-4">
                Browse Directory
              </h2>
              <p className="text-gray-600 mb-8">
                Select a category to explore airlines, airports, and offices by
                region.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button
                  onClick={() => handleTypeChange("airlines")}
                  className="group p-6 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-left"
                >
                  <div className="text-4xl mb-3">✈️</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Airlines
                  </h3>
                  <p className="text-sm text-gray-600">
                    Browse airlines by continent and country
                  </p>
                </button>

                <button
                  onClick={() => handleTypeChange("airports")}
                  className="group p-6 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all text-left"
                >
                  <div className="text-4xl mb-3">🛬</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Airports
                  </h3>
                  <p className="text-sm text-gray-600">
                    Browse airports by continent and country
                  </p>
                </button>

                <button
                  onClick={() => handleTypeChange("offices")}
                  className="group p-6 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all text-left"
                >
                  <div className="text-4xl mb-3">🏢</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Offices
                  </h3>
                  <p className="text-sm text-gray-600">
                    Browse offices by continent and country
                  </p>
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar - Statistics */}
          <aside className="lg:w-80">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Directory Statistics
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Airlines:</span>
                  <span className="text-lg font-bold text-blue-600">
                    {airlines.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Airports:</span>
                  <span className="text-lg font-bold text-green-600">
                    {airports.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Continents:</span>
                  <span className="text-lg font-bold text-purple-600">
                    {organizedData.continents.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Countries:</span>
                  <span className="text-lg font-bold text-orange-600">
                    {
                      new Set(
                        [...airlines, ...airports].map((item) => item.Country)
                      ).size
                    }
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    );
  }

  // If type selected but no continent, show continent selection
  if (selectedType && !selectedContinent) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link
                href="/"
                className="text-blue-600 hover:text-blue-800 hover:underline"
              >
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <button
                onClick={() => setSelectedType("")}
                className="text-blue-600 hover:text-blue-800 hover:underline"
              >
                {selectedType === "airlines"
                  ? "Airlines"
                  : selectedType === "airports"
                  ? "Airports"
                  : "Offices"}
              </button>
            </li>
          </ol>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <h2 className="text-3xl font-semibold text-gray-900 mb-2">
                {selectedType === "airlines"
                  ? "Airline Guide"
                  : selectedType === "airports"
                  ? "Airport Guide"
                  : "Office Guide"}
              </h2>
              <p className="text-gray-600 mb-8">
                Select a continent/region to browse{" "}
                {selectedType === "airlines"
                  ? "airlines"
                  : selectedType === "airports"
                  ? "airports"
                  : "offices"}
                .
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {availableContinents.map((continent) => (
                  <button
                    key={continent}
                    onClick={() => handleContinentChange(continent)}
                    className="p-4 text-left border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
                  >
                    <div className="text-blue-600 hover:text-blue-800 hover:underline font-medium">
                      {continent}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-80">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                International{" "}
                {selectedType === "airlines"
                  ? "Airlines"
                  : selectedType === "airports"
                  ? "Airports"
                  : "Offices"}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Select a country/region to get a list of{" "}
                {selectedType === "airlines"
                  ? "airlines"
                  : selectedType === "airports"
                  ? "airports"
                  : "offices"}
                .
              </p>

              <div className="grid grid-cols-2 gap-2">
                {availableContinents.map((continent) => (
                  <button
                    key={continent}
                    onClick={() => handleContinentChange(continent)}
                    className="text-left text-sm text-blue-600 hover:text-blue-800 hover:underline py-1"
                  >
                    {continent}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    );
  }

  // If continent selected but no country, show country selection
  if (selectedContinent && !selectedCountry) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <Link
                href="/"
                className="text-blue-600 hover:text-blue-800 hover:underline"
              >
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <button
                onClick={() => {
                  setSelectedType("");
                  setSelectedContinent("");
                }}
                className="text-blue-600 hover:text-blue-800 hover:underline"
              >
                {selectedType === "airlines"
                  ? "Airlines"
                  : selectedType === "airports"
                  ? "Airports"
                  : "Offices"}
              </button>
            </li>
            <li>/</li>
            <li>
              <button
                onClick={() => setSelectedContinent("")}
                className="text-blue-600 hover:text-blue-800 hover:underline"
              >
                {selectedContinent}
              </button>
            </li>
          </ol>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <h2 className="text-3xl font-semibold text-gray-900 mb-2">
                {selectedType === "airlines"
                  ? "Airlines"
                  : selectedType === "airports"
                  ? "Airports"
                  : "Offices"}{" "}
                in {selectedContinent}
              </h2>
              <p className="text-gray-600 mb-8">
                Select a country to view{" "}
                {selectedType === "airlines"
                  ? "airlines"
                  : selectedType === "airports"
                  ? "airports"
                  : "offices"}
                .
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {availableCountries.map((country) => (
                  <button
                    key={country}
                    onClick={() => setSelectedCountry(country)}
                    className="p-4 text-left border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
                  >
                    <div className="text-blue-600 hover:text-blue-800 hover:underline font-medium">
                      {country}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-80">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                International{" "}
                {selectedType === "airlines"
                  ? "Airlines"
                  : selectedType === "airports"
                  ? "Airports"
                  : "Offices"}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Select a country/region to get a list of{" "}
                {selectedType === "airlines"
                  ? "airlines"
                  : selectedType === "airports"
                  ? "airports"
                  : "offices"}
                .
              </p>

              <div className="grid grid-cols-2 gap-2">
                {availableCountries.map((country) => (
                  <button
                    key={country}
                    onClick={() => setSelectedCountry(country)}
                    className="text-left text-sm text-blue-600 hover:text-blue-800 hover:underline py-1"
                  >
                    {country}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    );
  }

  // Show results
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          <li>
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <button
              onClick={() => {
                setSelectedType("");
                setSelectedContinent("");
                setSelectedCountry("");
              }}
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              {selectedType === "airlines"
                ? "Airlines"
                : selectedType === "airports"
                ? "Airports"
                : "Offices"}
            </button>
          </li>
          <li>/</li>
          <li>
            <button
              onClick={() => {
                setSelectedContinent("");
                setSelectedCountry("");
              }}
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              {selectedContinent}
            </button>
          </li>
          <li>/</li>
          <li className="text-gray-900">{selectedCountry}</li>
        </ol>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content - Results */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h2 className="text-3xl font-semibold text-gray-900 mb-2">
              {selectedType === "airlines"
                ? "Airlines"
                : selectedType === "airports"
                ? "Airports"
                : "Offices"}{" "}
              in {selectedCountry}
            </h2>
            <p className="text-gray-600 text-sm mb-6">
              Select{" "}
              {selectedType === "airlines"
                ? "an airline"
                : selectedType === "airports"
                ? "an airport"
                : "an office"}{" "}
              for detailed contact information.
            </p>

            {results && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
                {selectedType === "airlines" &&
                  results.airlines.map((airline) => (
                    <Link
                      key={airline._id}
                      href={`/airLine/${airline._id}`}
                      className="text-blue-600 hover:text-blue-800 hover:underline text-sm"
                    >
                      {airline.Name}
                    </Link>
                  ))}
                {selectedType === "airports" &&
                  results.airports.map((airport) => (
                    <Link
                      key={airport._id}
                      href={`/airport/${airport._id}`}
                      className="text-blue-600 hover:text-blue-800 hover:underline text-sm"
                    >
                      {airport.Name}
                    </Link>
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:w-80">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              International{" "}
              {selectedType === "airlines"
                ? "Airlines"
                : selectedType === "airports"
                ? "Airports"
                : "Offices"}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Select a country/region to get a list of{" "}
              {selectedType === "airlines"
                ? "airlines"
                : selectedType === "airports"
                ? "airports"
                : "offices"}
              .
            </p>

            <div className="grid grid-cols-2 gap-2">
              {availableContinents.map((continent) => (
                <button
                  key={continent}
                  onClick={() => {
                    setSelectedContinent(continent);
                    setSelectedCountry("");
                  }}
                  className="text-left text-sm text-blue-600 hover:text-blue-800 hover:underline py-1"
                >
                  {continent}
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default SitemapContent;
