"use client";
import { useRouter, useSearchParams } from "next/navigation";

function DirectoryFilters({ airlines, airports, currentFilters }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get unique values for filters
  const continents = [
    ...new Set(
      [...airlines, ...airports].map((item) => item.Continent).filter(Boolean)
    ),
  ];
  const countries = [
    ...new Set(
      [...airlines, ...airports].map((item) => item.Country).filter(Boolean)
    ),
  ];

  const updateFilter = (key, value) => {
    const params = new URLSearchParams(searchParams);

    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    // Reset to first page when filters change
    params.delete("page");

    router.push(`/directory?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push("/directory");
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <button
          onClick={clearFilters}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-6">
        {/* Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type
          </label>
          <select
            value={currentFilters.type || "all"}
            onChange={(e) => updateFilter("type", e.target.value)}
            className="w-full px-3 py-2 text-black bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer"
            style={{ color: "#000000" }}
          >
            <option value="all" className="text-black bg-white">
              All
            </option>
            <option value="airlines" className="text-black bg-white">
              Airlines Only
            </option>
            <option value="airports" className="text-black bg-white">
              Airports Only
            </option>
          </select>
        </div>

        {/* Continent Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Continent
          </label>
          <select
            value={currentFilters.continent || ""}
            onChange={(e) => updateFilter("continent", e.target.value)}
            className="w-full px-3 py-2 text-black bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer"
            style={{ color: "#000000" }}
          >
            <option value="" className="text-black bg-white">
              All Continents
            </option>
            {continents.sort().map((continent) => (
              <option
                key={continent}
                value={continent}
                className="text-black bg-white"
              >
                {continent}
              </option>
            ))}
          </select>
        </div>

        {/* Country Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country
          </label>
          <select
            value={currentFilters.country || ""}
            onChange={(e) => updateFilter("country", e.target.value)}
            className="w-full px-3 py-2 text-black bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer"
            style={{ color: "#000000" }}
          >
            <option value="" className="text-black bg-white">
              All Countries
            </option>
            {countries.sort().map((country) => (
              <option
                key={country}
                value={country}
                className="text-black bg-white"
              >
                {country}
              </option>
            ))}
          </select>
        </div>

        {/* Active Filters Display */}
        {(currentFilters.continent ||
          currentFilters.country ||
          currentFilters.search ||
          (currentFilters.type && currentFilters.type !== "all")) && (
          <div className="pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Active Filters:
            </h4>
            <div className="flex flex-wrap gap-2">
              {currentFilters.type && currentFilters.type !== "all" && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {currentFilters.type}
                  <button
                    onClick={() => updateFilter("type", "all")}
                    className="ml-1 hover:text-blue-600"
                  >
                    ×
                  </button>
                </span>
              )}
              {currentFilters.continent && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {currentFilters.continent}
                  <button
                    onClick={() => updateFilter("continent", "")}
                    className="ml-1 hover:text-green-600"
                  >
                    ×
                  </button>
                </span>
              )}
              {currentFilters.country && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  {currentFilters.country}
                  <button
                    onClick={() => updateFilter("country", "")}
                    className="ml-1 hover:text-purple-600"
                  >
                    ×
                  </button>
                </span>
              )}
              {currentFilters.search && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                  "{currentFilters.search}"
                  <button
                    onClick={() => updateFilter("search", "")}
                    className="ml-1 hover:text-orange-600"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DirectoryFilters;
