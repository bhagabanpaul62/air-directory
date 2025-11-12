"use client";
import { useState, useMemo } from "react";

// Helper function to create URL-friendly slug
function createSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function DirectoryContent({ airlines, airports, filters }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Filter and combine data
  const filteredData = useMemo(() => {
    let combinedData = [];

    // Add airlines if type allows
    if (filters.type === "all" || filters.type === "airlines") {
      const airlineData = airlines.map((airline) => ({
        ...airline,
        itemType: "airline",
      }));
      combinedData = [...combinedData, ...airlineData];
    }

    // Add airports if type allows
    if (filters.type === "all" || filters.type === "airports") {
      const airportData = airports.map((airport) => ({
        ...airport,
        itemType: "airport",
      }));
      combinedData = [...combinedData, ...airportData];
    }

    // Apply filters
    let filtered = combinedData.filter((item) => {
      // Continent filter
      if (filters.continent && item.Continent !== filters.continent) {
        return false;
      }

      // Country filter
      if (filters.country && item.Country !== filters.country) {
        return false;
      }

      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return (
          item.Name?.toLowerCase().includes(searchLower) ||
          item.City?.toLowerCase().includes(searchLower) ||
          item.Country?.toLowerCase().includes(searchLower) ||
          item.Continent?.toLowerCase().includes(searchLower) ||
          item.IATA?.toLowerCase().includes(searchLower) ||
          item.ICAO?.toLowerCase().includes(searchLower)
        );
      }

      return true;
    });

    // Sort by name
    return filtered.sort((a, b) => (a.Name || "").localeCompare(b.Name || ""));
  }, [airlines, airports, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll to top of results
      document
        .getElementById("directory-results")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div id="directory-results">
      {/* Results Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Directory Results
          </h2>
          <div className="hidden sm:block w-px h-6 bg-gray-300"></div>
          <p className="text-sm text-gray-600">
            Showing {startIndex + 1}-
            {Math.min(startIndex + itemsPerPage, filteredData.length)} of{" "}
            {filteredData.length} results
            {filters.search && ` for "${filters.search}"`}
          </p>
        </div>

        {/* Filter Summary */}
        {(filters.continent ||
          filters.country ||
          (filters.type && filters.type !== "all")) && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Filtered by:{" "}
              {filters.type && filters.type !== "all" && (
                <span className="font-medium">{filters.type}</span>
              )}
              {filters.continent && (
                <span className="font-medium"> in {filters.continent}</span>
              )}
              {filters.country && (
                <span className="font-medium">, {filters.country}</span>
              )}
            </p>
          </div>
        )}
      </div>

      {/* Results List */}
      {currentData.length > 0 ? (
        <>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Type
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Location
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Codes
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentData.map((item, index) => {
                    const itemType =
                      item.itemType === "airline" ? "Airline" : "Airport";

                    return (
                      <tr
                        key={`${item._id}-${index}`}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        {/* Name Column */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              {item.Background_Image ? (
                                <img
                                  className="h-10 w-10 rounded-lg object-cover"
                                  src={item.Background_Image}
                                  alt={item.Name}
                                />
                              ) : (
                                <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
                                  <span className="text-gray-400 text-lg">
                                    {itemType === "Airline" ? "✈️" : "🛬"}
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {item.Name}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Type Column */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              itemType === "Airline"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {itemType}
                          </span>
                        </td>

                        {/* Location Column */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {item.City || "—"}
                          </div>
                          <div className="text-sm text-gray-500">
                            {item.Country || "—"}
                          </div>
                        </td>

                        {/* Codes Column */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-col gap-1">
                            {item.IATA && (
                              <span className="text-xs text-gray-600">
                                IATA:{" "}
                                <span className="font-mono font-medium text-gray-900">
                                  {item.IATA}
                                </span>
                              </span>
                            )}
                            {item.ICAO && (
                              <span className="text-xs text-gray-600">
                                ICAO:{" "}
                                <span className="font-mono font-medium text-gray-900">
                                  {item.ICAO}
                                </span>
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Action Column */}
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a
                            href={`/${
                              itemType === "airline" ? "airlines" : "airports"
                            }/${createSlug(
                              item.Continent || "other"
                            )}/${createSlug(item.Name)}`}
                            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-900 font-medium transition-colors"
                          >
                            View
                            <svg
                              className="w-4 h-4"
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
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-700">
                  Page {currentPage} of {totalPages}
                </p>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>

                  {/* Page numbers */}
                  {[...Array(Math.min(5, totalPages))].map((_, index) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = index + 1;
                    } else if (currentPage <= 3) {
                      pageNum = index + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + index;
                    } else {
                      pageNum = currentPage - 2 + index;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-4 py-2 text-sm font-medium rounded-md ${
                          pageNum === currentPage
                            ? "bg-blue-600 text-white border border-blue-600"
                            : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="max-w-sm mx-auto">
            <div className="text-gray-400 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Results Found
            </h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your search terms or filters to find what you're
              looking for.
            </p>
            <a
              href="/directory"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear All Filters
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default DirectoryContent;
