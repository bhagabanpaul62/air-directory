"use client";
import { useState, useMemo } from "react";
import Card from "@/components/card/Card";

function DirectoryContent({ airlines, airports, filters }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("grid");
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
        <div className="flex items-center justify-between flex-wrap gap-4">
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

          {/* View Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">View:</span>
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-1 text-sm rounded-md font-medium transition-colors ${
                viewMode === "grid"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-1 text-sm rounded-md font-medium transition-colors ${
                viewMode === "list"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              }`}
            >
              List
            </button>
          </div>
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

      {/* Results Grid/List */}
      {currentData.length > 0 ? (
        <>
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
              {currentData.map((item, index) => {
                const itemType =
                  item.itemType === "airline" ? "Airline" : "Airport";

                return (
                  <Card
                    key={`${item._id}-${index}`}
                    id={item._id}
                    Name={item.Name}
                    Background_Image={item.Background_Image}
                    Country={item.Country}
                    city={item.City}
                    IATA={item.IATA}
                    ICAO={item.ICAO}
                    type={itemType}
                  />
                );
              })}
            </div>
          ) : (
            <div className="space-y-4 mb-8">
              {currentData.map((item, index) => {
                const itemType =
                  item.itemType === "airline" ? "Airline" : "Airport";

                return (
                  <div
                    key={`${item._id}-${index}`}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-6">
                      {/* Image */}
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                          {item.Background_Image ? (
                            <img
                              src={item.Background_Image}
                              alt={item.Name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                              <svg
                                className="w-8 h-8"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">
                              {item.Name}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {itemType}
                              </span>
                              {item.City && <span>{item.City}</span>}
                              {item.Country && <span>{item.Country}</span>}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              {item.IATA && <span>IATA: {item.IATA}</span>}
                              {item.ICAO && <span>ICAO: {item.ICAO}</span>}
                            </div>
                          </div>

                          {/* Action Button */}
                          <a
                            href={`/${itemType.toLowerCase()}/${item._id}`}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            View Details
                            <svg
                              className="ml-2 w-4 h-4"
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
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

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
